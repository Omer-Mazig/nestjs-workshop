import {
  BadRequestException,
  Inject,
  Injectable,
  RequestTimeoutException,
  forwardRef,
} from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { HashingProvider } from 'src/auth/providers/hashing.provider';
import { MailService } from 'src/mail/providers/mail.service';

/**
 * Provider class responsible for creating new users.
 */
@Injectable()
export class CreateUserProvider {
  constructor(
    /**
     * Injecting the User repository to interact with the database.
     */
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    /**
     * Injecting the HashingProvider to handle password hashing.
     */
    @Inject(forwardRef(() => HashingProvider))
    private readonly hashingProvider: HashingProvider,

    /**
     * Injecting the MailService to send emails to users.
     */
    private readonly mailService: MailService,
  ) {}

  /**
   * Creates a new user in the system.
   * @param createUserDto Data Transfer Object containing user creation data.
   * @returns A promise that resolves to the newly created user.
   * @throws {RequestTimeoutException} If there's an issue connecting to the database.
   * @throws {BadRequestException} If a user with the same email already exists.
   */
  public async createUser(createUserDto: CreateUserDto) {
    let existingUser = undefined;

    try {
      // Check if a user already exists with the same email
      existingUser = await this.usersRepository.findOne({
        where: { email: createUserDto.email },
      });
    } catch (error) {
      // Handle errors related to database connectivity
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        {
          description: 'Error connecting to the database',
        },
      );
    }

    // If a user with the same email exists, throw an exception
    if (existingUser) {
      throw new BadRequestException(
        'The user already exists, please check your email.',
      );
    }

    // Create a new user with hashed password
    let newUser = this.usersRepository.create({
      ...createUserDto,
      password: await this.hashingProvider.hashPassword(createUserDto.password),
    });

    try {
      // Save the new user to the database
      newUser = await this.usersRepository.save(newUser);
    } catch (error) {
      // Handle errors related to database saving
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        {
          description: 'Error connecting to the database',
        },
      );
    }

    try {
      // Send a welcome email to the new user
      await this.mailService.sendUserWelcome(newUser);
    } catch (error) {
      // Handle errors related to sending emails
      throw new RequestTimeoutException(error);
    }

    // Return the newly created user
    return newUser;
  }
}
