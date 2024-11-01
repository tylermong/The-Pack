import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { SrvRecord } from 'dns';
import { PrismaService } from 'src/prisma/prisma.service';



@Injectable()
export class classesService {
    constructor(private prisma: PrismaService){}

    async joinClass(userId: string, classId: string): Promise<string>{
        const existingEnrollment = await this.prisma.userClasses.findUnique({
            where:{
                clientId_classId: {clientId: userId, classId: classId},
            },
        });
        if(existingEnrollment){
            throw new Error('User is already enrolled in this class');
        }
        await this.prisma.userClasses.create({
            data:{
                clientId: userId,
                classId: classId,
            },
        });
        return 'User successfully joined the class';
    }
}