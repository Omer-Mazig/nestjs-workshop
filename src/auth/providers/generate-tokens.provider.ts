import { Inject, Injectable } from '@nestjs/common';
import jwtConfig from '../config/jwt.config';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';

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
}
