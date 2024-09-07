import {
  BadRequestException,
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { GetUserParamsDto } from '../dtos/get-users-params.dto';
import { FindOptionsWhere, Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UsersCreateManyProvider } from './users-create-many.provider';
import { CreateManyUsersDto } from '../dtos/create-many-users.dto';
import { HashingProvider } from 'src/auth/providers/hashing.provider';
import { GoogleUser } from '../interfaces/google-user.interface';

/**
 * Class to connect to users table and perform business operations
 */
@Injectable()
export class UsersService {
  constructor(
    /**
     * Injecting userRepository
     */
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    /**
     * Injecting usersCreateManyProvider
     */
    private readonly usersCreateManyProvider: UsersCreateManyProvider,

    /**
     * inject hashingProvider
     */
    @Inject(forwardRef(() => HashingProvider))
    private readonly hashingProvider: HashingProvider,
  ) {}

  public findAll(
    getUserParamsDto: GetUserParamsDto,
    limit: number,
    page: number,
  ) {
    return [
      {
        firstName: 'John',
        email: 'john@gmail.com',
      },
      {
        firstName: 'Alice',
        email: 'alice@gmail.com',
      },
    ];
  }

  public async findById(id: number) {
    return this._findUserByCriteria({ id });
  }

  public async findOneByEmail(email: string) {
    return this._findUserByCriteria({ email });
  }

  public async findOneByGoogleId(googleId: string) {
    return await this.usersRepository.findOneBy({ googleId });
  }

  public async create(createUserDto: CreateUserDto) {
    let exsitingUser = null;

    try {
      exsitingUser = await this.usersRepository.findOne({
        where: {
          email: createUserDto.email,
        },
      });
    } catch (error) {
      throw new RequestTimeoutException(
        'Undable to process you requst please try later',
        {
          description: 'Error connecting to the database',
        },
      );
    }

    if (exsitingUser) {
      throw new BadRequestException(
        'The user already exsist, please check you email',
      );
    }

    const newUser = this.usersRepository.create({
      ...createUserDto,
      password: await this.hashingProvider.hashPassword(createUserDto.password),
    });

    let savedUser = null;

    try {
      savedUser = await this.usersRepository.save(newUser);
    } catch (error) {
      throw new RequestTimeoutException(
        'Undable to process you requst please try later',
        {
          description: 'Error connecting to the database',
        },
      );
    }

    return savedUser;
  }

  public async createGoogleUser(googleUser: GoogleUser) {
    try {
      const user = this.usersRepository.create(googleUser);
      return await this.usersRepository.save(user);
    } catch (error) {
      throw new ConflictException(error, {
        description: 'Could not create a new google user',
      });
    }
  }

  // consider remove abstruction by calling the database here
  public async createMany(createManyUsersDto: CreateManyUsersDto) {
    return await this.usersCreateManyProvider.createMany(createManyUsersDto);
  }

  private async _findUserByCriteria(criteria: FindOptionsWhere<User>) {
    let user: User | null = null;

    try {
      user = await this.usersRepository.findOne({
        where: criteria,
      });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request, please try later',
        {
          description: 'Error connecting to the database',
        },
      );
    }

    if (!user) {
      console.log('error: User does not exist');
      throw new BadRequestException('User does not exist');
    }

    return user;
  }
}
