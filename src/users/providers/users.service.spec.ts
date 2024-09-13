import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersCreateManyProvider } from './users-create-many.provider';
import { DataSource } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { MailService } from 'src/mail/providers/mail.service';
import { HashingProvider } from 'src/auth/providers/hashing.provider';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: UsersCreateManyProvider, useValue: {} },

        { provide: DataSource, useValue: {} },
        { provide: getRepositoryToken(User), useValue: {} },

        { provide: MailService, useValue: {} },

        { provide: HashingProvider, useValue: {} },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be define', () => {
    expect(service).toBeDefined();
  });
});
