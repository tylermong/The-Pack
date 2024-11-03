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
        phoneNum: number | null;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
        usersCoachid: string | null;
    }>;
    findAll(role?: 'CLIENT' | 'COACH' | 'ADMIN'): Promise<{
        id: string;
        name: string;
        email: string;
        password: string;
        phoneNum: number | null;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
        usersCoachid: string | null;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
        email: string;
        password: string;
        phoneNum: number | null;
        role: import(".prisma/client").$Enums.Role;
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
        role: import(".prisma/client").$Enums.Role;
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
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
        usersCoachid: string | null;
    }>;
    findByEmail(email: string): Promise<{
        id: string;
        name: string;
        email: string;
        password: string;
        phoneNum: number | null;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
        usersCoachid: string | null;
    }>;
}
