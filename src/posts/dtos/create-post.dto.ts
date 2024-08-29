import { postType } from '../enums/post-type.enum';
import { statusType } from '../enums/status-type.enum';

export class CreatePostDto {
  title: string;
  postType: postType;
  slug: string;
  status: statusType;
  content?: string;
  schema?: string;
  featuredImageUrl?: string;
  publishOn?: Date;
  tags?: string[];
  metaOptions: Record<string, any>[];
}
