import { CreateUserDtod } from './dtos/create-user.dto';
import { GetUserParamsDto } from './dtos/get-users-params.dto';
import { PatchUserDto } from './dtos/patch-user.dto';
import { UsersService } from './providers/users.service';
export declare class UsersController {
    private readonly userService;
    constructor(userService: UsersService);
    getUsers(getUserParamsDto: GetUserParamsDto, limit: number, page: number): {
        firstName: string;
        email: string;
    }[];
    createUser(createUserDto: CreateUserDtod): Promise<any>;
    patchUser(patchUserDto: PatchUserDto): string;
}
