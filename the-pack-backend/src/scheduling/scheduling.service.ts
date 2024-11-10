import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';



@Injectable()
export class schedulingService {
    constructor(private prisma: PrismaService) {}

    async scheduleAppointment(clientId: string, coachId: string, timeSlot: string, date: Date){
        
        await this.prisma.scheduling.create({
            data: {
                clientId,
                coachId,
                timeSlot,
                date,
            },
        });

        return 'Appointment successfully scheduled';
    }

    async cancelAppointment(appointmentId: string): Promise<string> {
        const appointment = await this.prisma.scheduling.findUnique({
            where: { id: appointmentId },
        });

        if (!appointment) {
            throw new NotFoundException('Appointment not found');
        }

        await this.prisma.scheduling.delete({
            where: { id: appointmentId },
        });

        return 'Appointment successfully canceled';
    }

    async modifyAppointment(appointmentId: string, data: { clientId?: string; coachId?: string; timeSlot?: string }) {
       
        const updatedAppointment = await this.prisma.scheduling.update({
            where: { id: appointmentId },
            data,
        });

        return updatedAppointment;
    }

    async getUserAppointments(userId: string) {
        return this.prisma.scheduling.findMany({
            where: { clientId: userId },
            include: { appointmentHolder: true }, // Include coach details
        });
    }
    async getCoachAppointments(coachId: string) {
        return this.prisma.scheduling.findMany({
            where: { coachId },
            include: { client: true }, // Include client details
        });
    }
    async getAllAppointments() {
        return this.prisma.scheduling.findMany({
            include: {
                client: true,         // Include client details
                appointmentHolder: true // Include coach details
            },
        });
    }
}