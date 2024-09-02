import {
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInDto } from '../dtos/signin.dto';
import { UsersService } from 'src/users/providers/users.service';
import { HashingProvider } from './hashing.provider';

@Injectable()
export class SignInProvider {
  constructor(
    /**
     * inject userService
     */
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,

    /**
     * inject hashingProvider
     */
    private readonly hashingProvider: HashingProvider,
  ) {}
  public async signIn(signInDto: SignInDto) {
    // will throw an error if user not found (see findOneUserByEmailProvider class)
    const user = await this.userService.findOneByEmail(signInDto.email);

    let isEqual = false;

    try {
      isEqual = await this.hashingProvider.comparePassword(
        signInDto.password,
        user.password,
      );
    } catch (error) {
      throw new RequestTimeoutException(error, {
        description: 'Could not compare passwords',
      });
    }

    if (!isEqual) {
      throw new UnauthorizedException('Incorrect Password');
    }

    // just for now
    return true;
  }
}
