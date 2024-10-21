import { OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
export declare class DatabaseService extends PrismaClient implements OnModuleInit {
    onModuleInit(): Promise<void>;
}
