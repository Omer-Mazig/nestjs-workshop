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
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('/:userId?')
  @ApiOperation({
    summary: 'Fetches a list if registered users on the application',
  })
  @ApiResponse({
    status: 200,
    description: 'Users fetched',
  })
  @ApiQuery({
    name: 'limit',
    type: 'number',
    required: false,
    description: 'The number of entires returned per query',
    example: 10,
  })
  @ApiQuery({
    name: 'page',
    type: 'number',
    required: false,
    description: 'The page number',
    example: 2,
  })
  public getUsers(
    @Param() getUserParamsDto: GetUserParamsDto,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return this.userService.findAll(getUserParamsDto, limit, page);
  }

  @Post()
  public createUser(@Body() createUserDto: CreateUserDtod) {
    return `Creating user with body: ${JSON.stringify(createUserDto)}`;
  }

  @Patch()
  public patchUser(@Body() patchUserDto: PatchUserDto) {
    return `Patching user with body: ${JSON.stringify(patchUserDto)}`;
  }
}
