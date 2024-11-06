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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt_1 = require("bcrypt");
let UserService = class UserService {
    constructor(prismaSerivce) {
        this.prismaSerivce = prismaSerivce;
    }
    async create(createUserDto) {
        return this.prismaSerivce.user.create({
            data: {
                ...createUserDto,
                password: await (0, bcrypt_1.hash)(createUserDto.password, 10)
            }
        });
    }
    async findAll(role) {
        if (role)
            return this.prismaSerivce.user.findMany({
                where: {
                    role,
                }
            });
        return this.prismaSerivce.user.findMany();
    }
    async findOne(id) {
        return this.prismaSerivce.user.findUnique({
            where: {
                id,
            }
        });
    }
    async update(id, updateUserDto) {
        return this.prismaSerivce.user.update({
            where: {
                id,
            },
            data: updateUserDto,
        });
    }
    async remove(id) {
        return this.prismaSerivce.user.delete({
            where: {
                id,
            }
        });
    }
    async findByEmail(email) {
        return await this.prismaSerivce.user.findUnique({
            where: {
                email: email,
            },
        });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map