import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/providers/auth.service';
import { GetUserParamsDto } from '../dtos/get-users-params.dto';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDtod } from '../dtos/create-user.dto';

/**
 * Class to conect to users table and perform business operations
 */
@Injectable()
export class UsersService {
  constructor(
    /**
     * Injecting auth service. just for learning (circular deps).
     */
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    /**
     * Injecting userRepository
     */
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async createUser(createUserDto: CreateUserDtod) {
    const exsitingUser = await this.userRepository.findOne({
      where: {
        email: createUserDto.email,
      },
    });

    const newUser = this.userRepository.create(createUserDto);
    const savedUser = await this.userRepository.save(newUser);

    return savedUser;
  }

  /**
   * The method to get all the users for the database
   */
  public findAll(
    getUserParamsDto: GetUserParamsDto,
    limit: number,
    page: number,
  ) {
    const isAuth = this.authService.isAuth();
    console.log(isAuth);

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

  /**
   * Finding a single User by id
   */
  public async findOneById(id: number) {
    return await this.userRepository.findOneBy({ id });
  }
}
