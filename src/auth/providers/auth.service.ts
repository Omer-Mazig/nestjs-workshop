import { Injectable } from '@nestjs/common';
import { SignInDto } from '../dtos/signin.dto';

@Injectable()
export class AuthService {
  public signIn(signInDto: SignInDto) {}
}
