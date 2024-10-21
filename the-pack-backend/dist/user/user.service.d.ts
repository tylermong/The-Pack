import { Prisma } from '@prisma/client';
import { DatabaseService } from '../database/database.service';
export declare class UserService {
    private readonly databaseService;
    constructor(databaseService: DatabaseService);
    create(createUserDto: Prisma.UserCreateInput): Promise<{
        id: string;
        name: string;
        email: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
        usersCoachid: string;
    }>;
    findAll(role?: 'CLIENT' | 'COACH' | 'ADMIN'): Promise<{
        id: string;
        name: string;
        email: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
        usersCoachid: string;
    }[]>;
    findOne(id: number): Promise<{
        id: string;
        name: string;
        email: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
        usersCoachid: string;
    }>;
    update(id: number, updateUserDto: Prisma.UserUpdateInput): Promise<{
        id: string;
        name: string;
        email: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
        usersCoachid: string;
    }>;
    remove(id: number): Promise<{
        id: string;
        name: string;
        email: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
        usersCoachid: string;
    }>;
    countUserInClass(coachId: number): Promise<number>;
    isClassFull(coachId: number): Promise<boolean>;
    isCoachedAssignedToClass(coachId: number): Promise<boolean>;
    scheduleClientInClass(clientId: number, coachId: number): Promise<"Client scheduled in another class with coach ID: ${availableClass.coachId}" | "Client scheduled in class with coach ID: ${coachId}">;
}
