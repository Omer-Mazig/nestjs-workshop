import { CreateUserDtod } from './dtos/crete-user-dto';
export declare class UsersController {
    getUsers(userId: number | undefined, limit: number, page: number): string;
    createUser(createUserDtod: CreateUserDtod): string;
}
