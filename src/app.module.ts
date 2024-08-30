import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { TagsModule } from './tags/tags.module';
import { MetaOptionModule } from './meta-option/meta-option.module';

@Module({
  imports: [
    UsersModule,
    PostsModule,
    AuthModule,
    TagsModule,
    TypeOrmModule.forRootAsync({
      imports: [],
      inject: [],
      useFactory: () => ({
        type: 'postgres',
        entities: [User],
        synchronize: true, // REMOVE IN PORD
        port: 5432,
        username: 'postgres',
        password: '',
        host: 'localhost',
        database: 'nestjs-blog',
      }),
    }),
    MetaOptionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
