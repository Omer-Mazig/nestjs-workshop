import {
  ConflictException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { User } from '../user.entity';
import { DataSource } from 'typeorm';
import { CreateManyUsersDto } from '../dtos/create-many-users.dto';

@Injectable()
export class UsersCreateManyProvider {
  constructor(
    /**
     * Injecting datasource
     */
    private readonly datasource: DataSource,
  ) {}

  public async createMany(createManyUsersDto: CreateManyUsersDto) {
    const newUsers: User[] = [];

    const quertRunner = this.datasource.createQueryRunner();

    try {
      await quertRunner.connect();
      await quertRunner.startTransaction();
    } catch (error) {
      throw new RequestTimeoutException('Could not connect to the database');
    }

    try {
      for (const user of createManyUsersDto.users) {
        const newUser = quertRunner.manager.create(User, user);
        const result = await quertRunner.manager.save(newUser);
        newUsers.push(result);
      }
      await quertRunner.commitTransaction();
    } catch (error) {
      await quertRunner.rollbackTransaction();
      throw new ConflictException('Could not complete the transaction', {
        description: String(error),
      });
    } finally {
      try {
        await quertRunner.release();
      } catch (error) {
        throw new RequestTimeoutException('Could not release the connection', {
          description: String(error),
        });
      }
    }

    return newUsers;
  }
}
