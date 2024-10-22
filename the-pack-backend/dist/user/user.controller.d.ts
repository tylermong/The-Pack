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
        phoneNum: number | null;
        role: import(".prisma/client").$Enums.Role | null;
        createdAt: Date;
        updatedAt: Date;
        usersCoachid: string | null;
    }>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
        email: string;
        password: string;
        phoneNum: number | null;
        role: import(".prisma/client").$Enums.Role | null;
        createdAt: Date;
        updatedAt: Date;
        usersCoachid: string | null;
    }>;
    update(id: string, updateUserDto: Prisma.UserUpdateInput): Promise<{
        id: string;
        name: string;
        email: string;
        password: string;
        phoneNum: number | null;
        role: import(".prisma/client").$Enums.Role | null;
        createdAt: Date;
        updatedAt: Date;
        usersCoachid: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        name: string;
        email: string;
        password: string;
        phoneNum: number | null;
        role: import(".prisma/client").$Enums.Role | null;
        createdAt: Date;
        updatedAt: Date;
        usersCoachid: string | null;
    }>;
}
