import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserProvider } from './create-user.provider';

describe('CreateUserProvider', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateUserProvider],
    }).compile();
  });

  it('Should be defined', () => {});
});
