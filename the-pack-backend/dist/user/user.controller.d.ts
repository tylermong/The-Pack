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
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
        coachId: string | null;
    }>;
    findAll(role?: 'CLIENT' | 'ADMIN' | 'COACH'): Promise<{
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
        coach: {
            id: string;
            name: string;
            email: string;
            password: string;
            phoneNum: number | null;
            role: import(".prisma/client").$Enums.Role;
            createdAt: Date;
            updatedAt: Date;
            coachId: string | null;
        };
        clients: {
            id: string;
            name: string;
            email: string;
            password: string;
            phoneNum: number | null;
            role: import(".prisma/client").$Enums.Role;
            createdAt: Date;
            updatedAt: Date;
            coachId: string | null;
        }[];
    } & {
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
    getClientByName(name: string): Promise<{
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
    updatePassword(id: string, updateData: {
        password: string;
    }): Promise<{
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
    addClassToUser(userId: string, { classId }: {
        classId: string;
    }): Promise<{
        classJoined: {
            id: string;
            classId: string;
            clientId: string;
        }[];
    } & {
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
    removeClassFromUser(userId: string, classId: string): Promise<{
        classJoined: {
            id: string;
            classId: string;
            clientId: string;
        }[];
    } & {
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
    getClientsByCoach(coachId: string): Promise<{
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
}
