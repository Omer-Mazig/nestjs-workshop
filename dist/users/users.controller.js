"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const create_user_dto_1 = require("./dtos/create-user.dto");
const get_users_params_dto_1 = require("./dtos/get-users-params.dto");
const patch_user_dto_1 = require("./dtos/patch-user.dto");
const users_service_1 = require("./providers/users.service");
const swagger_1 = require("@nestjs/swagger");
let UsersController = class UsersController {
    constructor(userService) {
        this.userService = userService;
    }
    getUsers(getUserParamsDto, limit, page) {
        return this.userService.findAll(getUserParamsDto, limit, page);
    }
    createUser(createUserDto) {
        const user = this.userService.createUser(createUserDto);
        return user;
    }
    patchUser(patchUserDto) {
        return `Patching user with body: ${JSON.stringify(patchUserDto)}`;
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Get)('/:userId?'),
    (0, swagger_1.ApiOperation)({
        summary: 'Fetches a list if registered users on the application',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Users fetched',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'limit',
        type: 'number',
        required: false,
        description: 'The number of entires returned per query',
        example: 10,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'page',
        type: 'number',
        required: false,
        description: 'The page number',
        example: 2,
    }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(10), common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_users_params_dto_1.GetUserParamsDto, Number, Number]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getUsers", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDtod]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "createUser", null);
__decorate([
    (0, common_1.Patch)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [patch_user_dto_1.PatchUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "patchUser", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users'),
    (0, swagger_1.ApiTags)('Users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map