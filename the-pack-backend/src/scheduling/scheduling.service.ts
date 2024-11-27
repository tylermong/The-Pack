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
        include: { appointmentHolder: true, timeSlot: true }, // Include coach and time slot details
      });
    }
    async getCoachAppointments(coachId: string) {
        return this.prisma.scheduling.findMany({
            where: { coachId },
            include: { client: true, timeSlot: true }, // Include client details
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
      // Step 1: Retrieve the current appointment to get the old timeSlotId
      const currentAppointment = await this.prisma.scheduling.findUnique({
          where: { id: appointmentId },
          include: { timeSlot: true }, // Include the related timeSlot data to get the current timeSlotId
      });
  
      if (!currentAppointment) {
          throw new NotFoundException('Appointment not found');
      }
  
      const { clientId, coachId, timeSlotId } = updateAppointmentDto;
  
      // Step 2: If the timeSlotId is being updated, we need to mark the previous time slot as available
      if (currentAppointment.timeSlotId !== timeSlotId) {
          // Mark the previous time slot as available
          await this.prisma.timeSlot.update({
              where: { id: currentAppointment.timeSlotId },
              data: { isBooked: false },
          });
  
          // Mark the new time slot as booked
          const newTimeSlot = await this.prisma.timeSlot.findUnique({
              where: { id: timeSlotId },
          });
  
          if (!newTimeSlot) {
              throw new NotFoundException('New time slot not found');
          }
  
          if (newTimeSlot.isBooked) {
              throw new ConflictException('New time slot is already booked');
          }
  
          // Mark the new time slot as booked
          await this.prisma.timeSlot.update({
              where: { id: timeSlotId },
              data: { isBooked: true },
          });
      }
  
      // Step 3: Update the appointment with the new details
      const updatedAppointment = await this.prisma.scheduling.update({
          where: { id: appointmentId },
          data: {
              clientId: clientId ?? currentAppointment.clientId,
              coachId: coachId ?? currentAppointment.coachId,
              timeSlotId: timeSlotId ?? currentAppointment.timeSlotId, // Ensure that if no timeSlotId is provided, it remains the same
          },
      });
  
      return updatedAppointment;
  }  


}