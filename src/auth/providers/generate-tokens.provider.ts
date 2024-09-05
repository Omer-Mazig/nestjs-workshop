import { Inject, Injectable } from '@nestjs/common';
import jwtConfig from '../config/jwt.config';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import { User } from 'src/users/user.entity';
import { ActiveUserData } from '../interfaces/active-user-data.interface';

@Injectable()
export class GenerateTokensProvider {
  constructor(
    /**
     * Inject JwtService
     */
    private readonly jwtService: JwtService,
    /**
     * Inject JwtConfiguration
     */
    @Inject(jwtConfig.KEY)
    private readonly JwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  public async signToken<T>(userId: number, expiresIn: number, payload?: T) {
    return await this.jwtService.signAsync(
      {
        sub: userId,
        ...payload,
      },
      {
        audience: this.JwtConfiguration.audience,
        issuer: this.JwtConfiguration.issuer,
        secret: this.JwtConfiguration.secret,
        expiresIn: expiresIn,
      },
    );
  }

  public async generateToken(user: User) {
    const [accessToken, refreshToken] = await Promise.all([
      // Access Token
      this.signToken<Partial<ActiveUserData>>(
        user.id,
        this.JwtConfiguration.accessTokenTt,
        {
          email: user.email,
        },
      ),

      // Refresh Token
      this.signToken(user.id, this.JwtConfiguration.refreshTokenTt),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
