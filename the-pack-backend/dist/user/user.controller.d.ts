import { UserService } from './user.service';
import { Prisma } from '@prisma/client';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: Prisma.UserCreateInput): Promise<{
        id: string;
        name: string;
        email: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
        usersCoachid: string;
    }>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
        email: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
        usersCoachid: string;
    }>;
    update(id: string, updateUserDto: Prisma.UserUpdateInput): Promise<{
        id: string;
        name: string;
        email: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
        usersCoachid: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        name: string;
        email: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
        usersCoachid: string;
    }>;
}
