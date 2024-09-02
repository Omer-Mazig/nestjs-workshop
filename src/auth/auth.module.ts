import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './providers/auth.service';
import { HashingProvider } from './providers/hashing.provider';
import { BcryptProvider } from './providers/bcrypt.provider';
import { UsersModule } from 'src/users/users.module';
import { SignInProvider } from './providers/sign-in.provider';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    // Because HashingProvider is abstract class
    {
      provide: HashingProvider,
      useClass: BcryptProvider,
    },
    SignInProvider,
  ],
  imports: [forwardRef(() => UsersModule)],
  exports: [AuthService, HashingProvider],
})
export class AuthModule {}
