import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import jwtConfig from 'src/auth/config/jwt.config';
import { GoogleTokenDto } from '../dtos/google-token.dto';

@Injectable()
export class GoogleAuthenticationService implements OnModuleInit {
  private oauthClien: OAuth2Client;

  constructor(
    /**
     * Injecting jwtConfiguration
     */
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  onModuleInit() {
    const clientId = this.jwtConfiguration.googleClientId;
    const clientSercret = this.jwtConfiguration.googleClientSecret;
    this.oauthClien = new OAuth2Client(clientId, clientSercret);
  }

  public async authenticate(googleTokenDto: GoogleTokenDto) {
    // Verify the google token
    // Extract payload
    // Find the user by the google ID
    // IF exist - generate token
    // If not - create a new user and then generate token
    // Throw Unauthorised error
  }
}
