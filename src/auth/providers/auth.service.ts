import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { SignInDto } from '../dtos/signin.dto';
import { UsersService } from 'src/users/providers/users.service';
import { SignInProvider } from './sign-in.provider';

@Injectable()
export class AuthService {
  constructor(
    /**
     * Injecting UserService (circular deps)
     */
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,

    /**
     * Injecting SignInProvider
     */
    private readonly signInProvider: SignInProvider,
  ) {}

  public async signIn(signInDto: SignInDto) {
    return await this.signInProvider.signIn(signInDto);
  }
}
