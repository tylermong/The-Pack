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
  
}