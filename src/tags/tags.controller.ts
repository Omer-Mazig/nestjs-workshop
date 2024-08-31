import {
  Body,
  Controller,
  Delete,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTagDto } from './dtos/create-tag.dto';
import { TagsService } from './providers/tags.service';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  public createPost(@Body() createTagDto: CreateTagDto) {
    return this.tagsService.createTag(createTagDto);
  }

  @Delete()
  public deleteTag(@Query('id', ParseIntPipe) id: number) {
    return this.tagsService.deleteTag(id);
  }

  @Delete('soft-delete')
  public softDeleteTag(@Query('id', ParseIntPipe) id: number) {
    return this.tagsService.softRemove(id);
  }
}
