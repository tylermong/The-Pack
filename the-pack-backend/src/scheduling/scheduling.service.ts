import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAppointmentDto } from './dtos/createAppointment.dto';



@Injectable()
export class schedulingService {
    constructor(private prisma: PrismaService) {}

    async scheduleAppointment(createAppointmentDto: CreateAppointmentDto) {
        const { clientId, coachId, timeSlotId } = createAppointmentDto;
      
        // Check if the time slot exists and is not booked
        const timeSlot = await this.prisma.timeSlot.findUnique({
          where: { id: timeSlotId },
        });
      
        if (!timeSlot) {
          throw new NotFoundException('Time slot not found');
        }
      
        if (timeSlot.isBooked) {
          throw new ConflictException('Time slot is already booked');
        }
      
        // Create the appointment
        await this.prisma.scheduling.create({
          data: {
            clientId,
            coachId,
            timeSlotId,  // Link to the TimeSlot model using timeSlotId
          },
        });
      
        // Mark the time slot as booked
        await this.prisma.timeSlot.update({
          where: { id: timeSlotId },
          data: { isBooked: true },
        });
      
        return 'Appointment successfully scheduled';
      }
      

      async cancelAppointment(appointmentId: string){
        const appointment = await this.prisma.scheduling.findUnique({
          where: { id: appointmentId },
        });
    
        if (!appointment) {
          throw new NotFoundException('Appointment not found');
        }
    
        // Mark the time slot as available again
        await this.prisma.timeSlot.update({
          where: { id: appointment.timeSlotId },
          data: { isBooked: false },
        });
    
        await this.prisma.scheduling.delete({
          where: { id: appointmentId },
        });
    
        return 'Appointment successfully canceled';
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

    async modifyAppointment(appointmentId: string, updateAppointmentDto: CreateAppointmentDto) {
        const updatedAppointment = await this.prisma.scheduling.update({
          where: { id: appointmentId },
          data: updateAppointmentDto,
        });
    
        return updatedAppointment;
      }
    
}