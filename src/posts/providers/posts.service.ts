import { Body, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { CreatePostDto } from '../dtos/create-post.dto';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PostsService {
  constructor(
    private readonly usersService: UsersService,
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
  ) {}

  public async findAll(userId: string) {
    const posts = await this.postsRepository.find({
      relations: {
        metaOptions: true,
        author: true,
      },
    });
    return posts;
  }

  public async createPost(@Body() createPostDto: CreatePostDto) {
    const author = await this.usersService.findOneById(createPostDto.authorId);
    const post = this.postsRepository.create({ ...createPostDto, author });
    return await this.postsRepository.save(post);
  }

  public async deletePost(id: number) {
    await this.postsRepository.delete(id);
    return { deleted: true, id };
  }
}
