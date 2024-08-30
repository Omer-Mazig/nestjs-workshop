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
    @InjectRepository(MetaOption)
    private readonly metaOptionRepository: Repository<MetaOption>,
  ) {}

  public async findAll(userId: string) {
    const user = this.usersService.findOneById(userId);
    const post = await this.postsRepository.find();
    return post;
  }

  public async createPost(@Body() createPostDto: CreatePostDto) {
    const post = this.postsRepository.create(createPostDto);
    return await this.postsRepository.save(post);
  }

  public async deletePost(id: number) {
    const post = await this.postsRepository.findOneBy({ id });
    await this.postsRepository.delete(id);

    await this.metaOptionRepository.delete(post.metaOptions.id);

    return { deleted: true, id };
  }
}
