import { CreatePostDto } from './create-post.dto';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class PatchPostDto extends PartialType(CreatePostDto) {
  @ApiProperty({
    description: 'the ID of the post',
  })
  @IsInt()
  @IsNotEmpty()
  id: number;
}
