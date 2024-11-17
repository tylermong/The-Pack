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
        coachId: string | null;
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
        coachId: string | null;
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
        coachId: string | null;
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
        coachId: string | null;
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
        coachId: string | null;
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
        coachId: string | null;
    }>;
    assignCoachToClient(clientId: string, coachId: string): Promise<{
        id: string;
        name: string;
        email: string;
        password: string;
        phoneNum: number | null;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
        coachId: string | null;
    }>;
    updatePassword(userId: string, newPassword: string): Promise<{
        id: string;
        name: string;
        email: string;
        password: string;
        phoneNum: number | null;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
        coachId: string | null;
    }>;
}
