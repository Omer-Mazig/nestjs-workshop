import {
  BadRequestException,
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
    private readonly userRepository: Repository<User>,

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

  public async findById(id: number): Promise<User> {
    return this._findUserByCriteria({ id });
  }

  public async findOneByEmail(email: string): Promise<User> {
    return this._findUserByCriteria({ email });
  }

  public async create(createUserDto: CreateUserDto) {
    let exsitingUser = null;

    try {
      exsitingUser = await this.userRepository.findOne({
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

    const newUser = this.userRepository.create({
      ...createUserDto,
      password: await this.hashingProvider.hashPassword(createUserDto.password),
    });

    let savedUser = null;

    try {
      savedUser = await this.userRepository.save(newUser);
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

  // consider remove abstruction by calling the database here
  public async createMany(createManyUsersDto: CreateManyUsersDto) {
    return await this.usersCreateManyProvider.createMany(createManyUsersDto);
  }

  private async _findUserByCriteria(
    criteria: FindOptionsWhere<User>,
  ): Promise<User> {
    let user: User | null = null;

    try {
      user = await this.userRepository.findOne({
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
      throw new BadRequestException('User does not exist');
    }

    return user;
  }
}
