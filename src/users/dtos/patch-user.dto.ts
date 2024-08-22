import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDtod } from './create-user.dto';

export class PatchUserDto extends PartialType(CreateUserDtod) {}
