import { Body, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { CreatePostDto } from '../dtos/create-post.dto';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOption } from 'src/meta-options/meta-option.entity';

@Injectable()
export class PostsService {
  constructor(
    private readonly usersService: UsersService,
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
  ) {}

  public findAll(userId: string) {
    const user = this.usersService.findOneById(userId);
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

  public async createPost(@Body() createPostDto: CreatePostDto) {
    const post = this.postsRepository.create(createPostDto);
    return await this.postsRepository.save(post);
  }
}
