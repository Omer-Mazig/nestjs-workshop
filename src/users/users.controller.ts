import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDtod } from './dtos/create-user.dto';
import { GetUserParamsDto } from './dtos/get-users-params.dto';
import { PatchUserDto } from './dtos/patch-user.dto';
import { UsersService } from './providers/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('/:userId?')
  public getUsers(
    @Param() getUserParamsDto: GetUserParamsDto,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return `Users with userId: ${getUserParamsDto.userId}, with limit: ${limit} and page is: ${page}`;
  }

  @Post()
  public createUser(@Body() createUserDtod: CreateUserDtod) {
    return `Creating user with body: ${JSON.stringify(createUserDtod)}`;
  }

  @Patch()
  public patchUser(@Body() patchUserDto: PatchUserDto) {
    return `Patching user with body: ${JSON.stringify(patchUserDto)}`;
  }
}
