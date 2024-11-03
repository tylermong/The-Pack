import { Body, Controller, Post } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/auth.dto';
//import { CoachService } from 'src/coach/coach.service';

@Controller('auth')
export class AuthController {
    constructor (private userService: UserService/*, private coachService: CoachService*/ ){}
   


    @Post('register')
    async registerUser(@Body() createUserDto: Prisma.UserCreateInput/* | @Body() createCoachDto: Prisma.CoachCreateInput*/){
        if (createUserDto)
            return this.userService.create(createUserDto)
       // else if (createCoachDto)
            //return this.coachService.create(createCoachDto)
    }

    @Post('login')
    async login(@Body() dto: LoginDto){

    }

}
