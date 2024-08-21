import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  getUsers(@Query() query: any) {
    return `Users with query: ${JSON.stringify(query)}`;
  }

  @Get('/:userId/:optional?')
  getUserById(@Param() params: any) {
    return `User with params: ${JSON.stringify(params)}`;
  }

  @Post()
  createUser(@Body() body: any) {
    return `Creating user with body: ${JSON.stringify(body)}`;
  }
}
