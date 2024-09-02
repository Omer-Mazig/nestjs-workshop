import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../user.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class UsersCreateManyProvider {
  constructor(
    /**
     * Injecting datasource
     */
    private readonly datasource: DataSource,
  ) {}

  public async createMany(createUsersDto: CreateUserDto[]) {
    const newUsers: User[] = [];

    const quertRunner = this.datasource.createQueryRunner();
    await quertRunner.connect();
    await quertRunner.startTransaction();

    try {
      for (const user of createUsersDto) {
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
