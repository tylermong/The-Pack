import { BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import {DatabaseService} from '../database/database.service';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService){}

  async create(createUserDto: Prisma.UserCreateInput) {
    return this.databaseService.user.create({
      data: createUserDto
    })
  }

  async findAll(role?: 'CLIENT' | 'COACH' | 'ADMIN') {
    return this.databaseService.user.findMany({
      where: {
        role,
      }
    })
    return this.databaseService.user.findMany()
  }

  async findOne(id: number) {
    return this.databaseService.user.findUnique({
      where: {
        id,
      }
    })
  }

  async update(id: number, updateUserDto: Prisma.UserUpdateInput) {
    return this.databaseService.user.update({
      where: {
      id,
      },
      data: updateUserDto,
    })
  }

  async  remove(id: number) {
    return this.databaseService.user.delete({
      where: {
        id,
      }
    })
  }
  /**
   * This methods counts the number of users (clients) enrolled in a class taught by
   * specific coach(coachId)
   * @param coachId: ID of a specific coach 
   */
  async countUserInClass(coachId:number){
    return this.databaseService.coachesClassroom.count({
      where:{
        coachId,
      }
    })
  }

  /**
   * This methods checks whether the number of client in a class reached the limit
   * of 8
   * @param coachId: ID of a specific coach 
   * @returns: if the userCount is greater than equal to the classLimit(which is 8)
   */
  async isClassFull(coachId: number){
    const classLimit = 8;
    const userCount = await this.countUserInClass(coachId);
    return userCount >= classLimit;
  }

  /**
   * This methods checks whether a coach is assigned to the class. Since a class can't be run
   * without a coach 
   * @param coachId: ID of a specific coach 
   * @returns: Checks if there is one client assigned to the class indicating the coach is 
   * assigned to this class.
   */
  async isCoachedAssignedToClass(coachId:number){
    const userCount = await this.countUserInClass(coachId);
    return userCount > 0;
  }

  /**
   * Handles the scheduling between the client and the coach. 
   * @param clientId: ID of a specific client 
   * @param coachId: ID of a specific coach 
   * @returns: A successful message indicating the client has been schedule 
   */
  async scheduleClientInClass(clientId: number, coachId: number){

    const coachAssigned = await this.isCoachedAssignedToClass(coachId);

    if(!coachAssigned){
      throw new BadRequestException('The coach must be assigned to a class to schedule clients.');
    }

    const isFull = await this.isClassFull(coachId);

    if(isFull){

      const alternativeClasses = await this.databaseService.coachesClassroom.findMany({
        where:{
          coachId,
        },
        include:{
          user: true,
        }
      })
      const availableClass = alternativeClasses.find(cls => !cls.user);

      if(availableClass){
        await this.databaseService.coachesClassroom.create({
          data: {
            userId: clientId,
            coachId: availableClass.coachId,
          }
        })
        return 'Client scheduled in another class with coach ID: ${availableClass.coachId}'
      } else{
        throw new NotFoundException("No alternative classes with available spots.");
      }
    } else {
      await this.databaseService.coachesClassroom.create({
        data:{
          userId: clientId,
          coachId,
        }
      })
      return "Client scheduled in class with coach ID: ${coachId}";
    }
  }
}