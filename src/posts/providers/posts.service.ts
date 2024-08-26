import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';

@Injectable()
export class PostsService {
  constructor(private readonly userService: UsersService) {}

  public findAll(userId: string) {
    const user = this.userService.findOneById(userId);
    return [
      {
        user,
        title: 'Test Title',
        content: 'Test content',
      },
      {
        user,
        title: 'Test Title 2',
        content: 'Test content 2',
      },
    ];
  }
}
