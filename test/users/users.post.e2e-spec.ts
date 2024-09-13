import * as request from 'supertest';

import { App } from 'supertest/types';
import { ConfigService } from '@nestjs/config';
import { INestApplication } from '@nestjs/common';
import { bootstrapNestApplication } from 'test/helpers/bootstrap-nest-application.helper';
import { dropDatabase } from 'test/helpers/drop-database.helper';
import {
  completeUser,
  missingEmail,
  missingFirstName,
  missingPassword,
} from './users.post.e2e-spec.sample-data';
import { User } from 'src/users/user.entity';

describe('[Users] @Post Endpoints', () => {
  let app: INestApplication;
  let config: ConfigService;
  let httpServer: App;

  beforeEach(async () => {
    // Instantiate the app
    app = await bootstrapNestApplication();
    // Get the config
    config = app.get<ConfigService>(ConfigService);
    // get server endpoint
    httpServer = app.getHttpServer();
  });

  afterEach(async () => {
    await dropDatabase(config);
    await app.close();
  });

  it('/users - Endpoint is public', () => {
    return request(httpServer).post('/users').send({}).expect(400);
  });

  it('/users - firstName is mandatory', () => {
    return request(httpServer)
      .post('/users')
      .send(missingFirstName)
      .expect(400);
  });

  it('/users - email is mandatory', () => {
    return request(httpServer).post('/users').send(missingEmail).expect(400);
  });

  it('/users - password is mandatory', () => {
    return request(httpServer).post('/users').send(missingPassword).expect(400);
  });

  it.todo('/users - password is not returned in response');

  it.todo('/users - googleId is not returned in response');

  // it('/users - Valid request successfully creates user', () => {
  //   return request(httpServer).post('/users').send(completeUser).expect(User);
  // });
});
