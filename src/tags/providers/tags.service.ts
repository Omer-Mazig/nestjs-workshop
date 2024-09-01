import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { CreateTagDto } from '../dtos/create-tag.dto';
import { In, Repository } from 'typeorm';
import { Tag } from '../tag.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagsRepository: Repository<Tag>,
  ) {}

  public async createTag(createTagDto: CreateTagDto) {
    const tag = this.tagsRepository.create(createTagDto);

    try {
      return await this.tagsRepository.save(tag);
    } catch (error) {
      throw new RequestTimeoutException(
        'Undable to process you requst please try later',
        {
          description: 'Error connecting to the database',
        },
      );
    }
  }

  public async findMultipleTags(tags: number[]) {
    try {
      const results = await this.tagsRepository.find({
        where: {
          id: In(tags),
        },
      });

      return results;
    } catch (error) {
      throw new RequestTimeoutException(
        'Undable to process you requst please try later',
        {
          description: 'Error connecting to the database',
        },
      );
    }
  }

  public async deleteTag(id: number) {
    try {
      await this.tagsRepository.delete(id);
      return { deleted: true, id };
    } catch (error) {
      throw new RequestTimeoutException(
        'Undable to process you requst please try later',
        {
          description: 'Error connecting to the database',
        },
      );
    }
  }

  public async softRemove(id: number) {
    try {
      await this.tagsRepository.softDelete(id);
      return { deleted: true, id };
    } catch (error) {
      throw new RequestTimeoutException(
        'Undable to process you requst please try later',
        {
          description: 'Error connecting to the database',
        },
      );
    }
  }
}
