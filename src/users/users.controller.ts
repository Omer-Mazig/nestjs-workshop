import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get('/:userId?')
  public getUsers(
    @Param('userId', ParseIntPipe) userId: number,
    @Query('limit') limit: any,
  ) {
    return `Users with userId: ${userId} and with limit: ${limit}`;
  }

  @Post()
  public createUser(@Body() body: any) {
    return `Creating user with body: ${JSON.stringify(body)}`;
  }
}
