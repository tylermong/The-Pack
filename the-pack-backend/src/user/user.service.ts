import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash } from 'bcrypt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor (private prismaSerivce: PrismaService) {}

  async create(createUserDto: Prisma.UserCreateInput ) {
    return this.prismaSerivce.user.create({
      data: {
        ...createUserDto,
        password: await hash(createUserDto.password, 10)
      }
    });
  }

  async findAll(role?: 'CLIENT' | 'COACH' | 'ADMIN') {
    if (role) return this.prismaSerivce.user.findMany({
      where: {
        role,
      },
      include: {
        nutritionEntries: true,
        programEntries: true,
      }
    })
    return this.prismaSerivce.user.findMany()
  }

  async findOne(id: string) {
    const user = await this.prismaSerivce.user.findUnique({
        where: {
            id: id
        },
        // Optionally include relationships if needed
        include: {
            coach: true,
            clients: true
        }
    });

    if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
}

  async update(id: string, updateUserDto: Prisma.UserUpdateInput) {
    return this.prismaSerivce.user.update({
      where: {
        id,
      },
      data: updateUserDto,
    })
  }

  async remove(id: string) {
    return this.prismaSerivce.user.delete({
      where:{
        id,
      }
    });
  }

  async findByEmail(email: string){
    return await this.prismaSerivce.user.findUnique({
      where: {
        email: email,
      },
    });
  }
  async assignCoachToClient(clientId: string, coachId: string) {
    return await this.prismaSerivce.user.update({
      where: { id: clientId },
      data: { coach: { connect: { id: coachId } } },
    });
  }

  // Update password
  async updatePassword(userId: string, newPassword: string) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    return this.prismaSerivce.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });
  }

  // Get client by name
  async getClientByName(name: string) {
    return this.prismaSerivce.user.findMany({
        where: {
            name: {
                contains: name
            }
        }
    });
  }

  //Add class to user
  async addClassToUser(userId: string, classId: string) {
    try {
        // First verify both user and class exist
        const [user, classEntity] = await Promise.all([
            this.prismaSerivce.user.findUnique({
                where: { id: userId }
            }),
            this.prismaSerivce.class.findUnique({
                where: { id: classId }
            })
        ]);

        if (!user) {
            throw new NotFoundException(`User with ID ${userId} not found`);
        }

        if (!classEntity) {
            throw new NotFoundException(`Class with ID ${classId} not found`);
        }

        // Update user with class connection
        return await this.prismaSerivce.user.update({
            where: { id: userId },
            data: {
                classJoined: {  // Make sure this matches your Prisma schema relation name
                    create: {
                        classId: classId
                    }
                }
            },
            include: {
                classJoined: true
            }
        });
    } catch (error) {
        console.error('Error adding class to user:', error);
        throw error;
    }
}

//Remove class from user
async removeClassFromUser(userId: string, classId: string) {
  try {
      // Verify entities exist
      const [user, classEntity] = await Promise.all([
          this.prismaSerivce.user.findUnique({
              where: { id: userId },
              include: { classJoined: true }
          }),
          this.prismaSerivce.class.findUnique({
              where: { id: classId }
          })
      ]);

      if (!user) {
          throw new NotFoundException(`User with ID ${userId} not found`);
      }

      if (!classEntity) {
          throw new NotFoundException(`Class with ID ${classId} not found`);
      }

      // Delete the connection in the join table
      return await this.prismaSerivce.user.update({
          where: { id: userId },
          data: {
              classJoined: {
                  deleteMany: {
                      classId: classId
                  }
              }
          },
          include: {
              classJoined: true
          }
      });
  } catch (error) {
      console.error('Error removing class from user:', error);
      throw error;
  }
}

//Get client by their coach
async getClientsByCoach(coachId: string) {
  return this.prismaSerivce.user.findMany({
      where: {
          coachId: coachId
      }
  });
}
  
}