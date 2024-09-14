import { Repository } from 'typeorm';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { GoogleUser } from '../interfaces/google-user.interface';
import { CreateUserDto } from './../dtos/create-user.dto';
import { CreateManyUsersDto } from '../dtos/create-many-users.dto';
import { GetUsersParamsDto } from '../dtos/get-users-params.dto';
import { CreateUserProvider } from './create-user.provider';
import { UsersCreateManyProvider } from './users-create-many.provider';
import { FindOneUserByEmailProvider } from './find-one-user-by-email.provider';
import { FindOneByGoogleIdProvider } from './find-one-by-google-id.provider';
import { CreateGoogleUserProvider } from './create-google-user.provider';

/**
 * Service class for handling user-related operations.
 */
@Injectable()
export class UsersService {
  constructor(
    /**
     * Injecting the User repository to interact with the database.
     */
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    /**
     * Injecting the UsersCreateManyProvider to handle batch creation of users.
     */
    private readonly usersCreateManyProvider: UsersCreateManyProvider,

    /**
     * Injecting the CreateUserProvider to handle single user creation.
     */
    private readonly createUserProvider: CreateUserProvider,

    /**
     * Injecting the FindOneUserByEmailProvider to find users by email.
     */
    private readonly findOneUserByEmailProvider: FindOneUserByEmailProvider,

    /**
     * Injecting the FindOneByGoogleIdProvider to find users by Google ID.
     */
    private readonly findOneByGoogleIdProvider: FindOneByGoogleIdProvider,

    /**
     * Injecting the CreateGoogleUserProvider to create a user with Google account details.
     */
    private readonly createGooogleUserProvider: CreateGoogleUserProvider,
  ) {}

  /**
   * Creates a new user in the system.
   * @param createUserDto Data Transfer Object containing user creation data.
   * @returns A promise that resolves to the created user.
   */
  public async createUser(createUserDto: CreateUserDto) {
    return await this.createUserProvider.createUser(createUserDto);
  }

  /**
   * Handles GET requests to fetch a list of users.
   * @param getUserParamDto Data Transfer Object containing query parameters for filtering users.
   * @param limit The maximum number of users to return.
   * @param page The page number for pagination.
   * @throws {HttpException} Throws an exception indicating that the endpoint is permanently moved.
   */
  public findAll(
    getUserParamDto: GetUsersParamsDto,
    limit: number,
    page: number,
  ) {
    throw new HttpException(
      {
        status: HttpStatus.MOVED_PERMANENTLY,
        error: 'The API endpoint does not exist',
        fileName: 'users.service.ts',
        lineNumber: 88,
      },
      HttpStatus.MOVED_PERMANENTLY,
      {
        cause: new Error(),
        description: 'Occurred because the API endpoint was permanently moved',
      },
    );
  }

  /**
   * Finds a user by their ID.
   * @param id The ID of the user to find.
   * @returns A promise that resolves to the user object.
   * @throws {RequestTimeoutException} If there's an issue connecting to the database.
   * @throws {BadRequestException} If the user ID does not exist.
   */
  public async findOneById(id: number) {
    let user: User = undefined;

    try {
      user = await this.usersRepository.findOneBy({
        id,
      });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        {
          description: 'Error connecting to the database',
        },
      );
    }

    /**
     * Handle the case where the user does not exist.
     */
    if (!user) {
      throw new BadRequestException('The user ID does not exist');
    }

    return user;
  }

  /**
   * Creates multiple users in the system.
   * @param createManyUsersDto Data Transfer Object containing data for creating multiple users.
   * @returns A promise that resolves to an array of created users.
   */
  public async createMany(createManyUsersDto: CreateManyUsersDto) {
    return await this.usersCreateManyProvider.createMany(createManyUsersDto);
  }

  /**
   * Finds a user by their email.
   * @param email The email of the user to find.
   * @returns A promise that resolves to the user object.
   */
  public async findOneByEmail(email: string) {
    return await this.findOneUserByEmailProvider.findOneByEmail(email);
  }

  /**
   * Finds a user by their Google ID.
   * @param googleId The Google ID of the user to find.
   * @returns A promise that resolves to the user object.
   */
  public async findOneByGoogleId(googleId: string) {
    return await this.findOneByGoogleIdProvider.findOneByGoogleId(googleId);
  }

  /**
   * Creates a user using Google account information.
   * @param googleUser Object containing Google user information.
   * @returns A promise that resolves to the created user.
   */
  public async createGoogleUser(googleUser: GoogleUser) {
    return await this.createGooogleUserProvider.createGoogleUser(googleUser);
  }
}
