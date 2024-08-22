import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDtod } from './dtos/crete-user-dto';

@Controller('users')
export class UsersController {
  @Get('/:userId?')
  public getUsers(
    @Param('userId', ParseIntPipe) userId: number | undefined,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return `Users with userId: ${userId}, with limit: ${limit} and page is: ${page}`;
  }

  @Post()
  public createUser(@Body() createUserDtod: CreateUserDtod) {
    return `Creating user with body: ${JSON.stringify(createUserDtod)}`;
  }
}
