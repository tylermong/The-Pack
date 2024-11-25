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
const bcrypt = require("bcrypt");
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
                },
                include: {
                    nutritionEntries: true,
                    programEntries: true,
                }
            });
        return this.prismaSerivce.user.findMany();
    }
    async findOne(id) {
        const user = await this.prismaSerivce.user.findUnique({
            where: {
                id: id
            },
            include: {
                coach: true,
                clients: true
            }
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        return user;
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
    async assignCoachToClient(clientId, coachId) {
        return await this.prismaSerivce.user.update({
            where: { id: clientId },
            data: { coach: { connect: { id: coachId } } },
        });
    }
    async updatePassword(userId, newPassword) {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        return this.prismaSerivce.user.update({
            where: { id: userId },
            data: { password: hashedPassword },
        });
    }
    async getClientByName(name) {
        return this.prismaSerivce.user.findMany({
            where: {
                name: {
                    contains: name
                }
            }
        });
    }
    async addClassToUser(userId, classId) {
        try {
            const [user, classEntity] = await Promise.all([
                this.prismaSerivce.user.findUnique({
                    where: { id: userId }
                }),
                this.prismaSerivce.class.findUnique({
                    where: { id: classId }
                })
            ]);
            if (!user) {
                throw new common_1.NotFoundException(`User with ID ${userId} not found`);
            }
            if (!classEntity) {
                throw new common_1.NotFoundException(`Class with ID ${classId} not found`);
            }
            return await this.prismaSerivce.user.update({
                where: { id: userId },
                data: {
                    classJoined: {
                        create: {
                            classId: classId
                        }
                    }
                },
                include: {
                    classJoined: true
                }
            });
        }
        catch (error) {
            console.error('Error adding class to user:', error);
            throw error;
        }
    }
    async removeClassFromUser(userId, classId) {
        try {
            const [user, classEntity] = await Promise.all([
                this.prismaSerivce.user.findUnique({
                    where: { id: userId },
                    include: { classJoined: true }
                }),
                this.prismaSerivce.class.findUnique({
                    where: { id: classId }
                })
            ]);
            if (!user) {
                throw new common_1.NotFoundException(`User with ID ${userId} not found`);
            }
            if (!classEntity) {
                throw new common_1.NotFoundException(`Class with ID ${classId} not found`);
            }
            return await this.prismaSerivce.user.update({
                where: { id: userId },
                data: {
                    classJoined: {
                        deleteMany: {
                            classId: classId
                        }
                    }
                },
                include: {
                    classJoined: true
                }
            });
        }
        catch (error) {
            console.error('Error removing class from user:', error);
            throw error;
        }
    }
    async getClientsByCoach(coachId) {
        return this.prismaSerivce.user.findMany({
            where: {
                coachId: coachId
            }
        });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map