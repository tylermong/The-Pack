import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor (private prismaSerivce: PrismaService) {}

  async create(createUserDto: Prisma.UserCreateInput ) {
    return this.prismaSerivce.user.create({
      data: createUserDto
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
    return this.prismaSerivce.user.findUnique({
      where:{
        id,
      }
    });
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


  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.prismaSerivce.user.findUnique({
        where: { email },
    });

    if (!user) {
        throw new UnauthorizedException('Invalid credentials');
    }

    // Check the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
    }

    // Optionally return user data (excluding password)
    const { password: _, ...result } = user; // Omit the password
    return result; // Return the user object or any relevant data
}

}