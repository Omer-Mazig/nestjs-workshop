"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const users_module_1 = require("./users/users.module");
const posts_module_1 = require("./posts/posts.module");
const auth_module_1 = require("./auth/auth.module");
const typeorm_1 = require("@nestjs/typeorm");
const tags_module_1 = require("./tags/tags.module");
const meta_options_module_1 = require("./meta-options/meta-options.module");
const config_1 = require("@nestjs/config");
const ENV = process.env.NODE_ENV;
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: !ENV ? '.env' : `.env.${ENV}`,
            }),
            users_module_1.UsersModule,
            posts_module_1.PostsModule,
            auth_module_1.AuthModule,
            tags_module_1.TagsModule,
            meta_options_module_1.MetaOptionsModule,
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    type: 'postgres',
                    autoLoadEntities: true,
                    synchronize: true,
                    port: +configService.get('DATABASE_PORT'),
                    username: configService.get('DATABASE_USER'),
                    password: configService.get('DATABASE_PASSWORD'),
                    host: configService.get('DATABASE_HOST'),
                    database: configService.get('DATABASE_DATABASE'),
                }),
            }),
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map