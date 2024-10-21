import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class UserService {
    private prismaSerivce;
    constructor(prismaSerivce: PrismaService);
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
