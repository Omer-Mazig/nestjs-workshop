import { Injectable } from '@nestjs/common';
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
    await quertRunner.connect();
    await quertRunner.startTransaction();

    try {
      for (const user of createManyUsersDto.users) {
        const newUser = quertRunner.manager.create(User, user);
        const result = await quertRunner.manager.save(newUser);
        newUsers.push(result);
      }
      await quertRunner.commitTransaction();
    } catch (error) {
      await quertRunner.rollbackTransaction();
    } finally {
      await quertRunner.release();
    }

    return newUsers;
  }
}
