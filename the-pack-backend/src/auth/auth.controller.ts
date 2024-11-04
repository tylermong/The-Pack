import { Body, Controller, Post } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { CoachService } from 'src/coach/coach.service';
    
@Controller('auth')
export class AuthController {
    constructor (private userService: UserService, private coachService: CoachService, private authService: AuthService ){}
   


    @Post('userRegister')
    async userRegister(@Body() createUserDto: Prisma.UserCreateInput){
          return this.userService.create(createUserDto)
    }

    @Post('userLogin')
    async userLogin(@Body() data: LoginDto){
        return await this.authService.userLogin(data);
    }



    @Post('coachRegister')
    async coachRegister(@Body() createCoachDto: Prisma.CoachCreateInput){
          return this.coachService.create(createCoachDto)
    }

    @Post('coachLogin')
    async coachLogin(@Body() data: LoginDto){
        return await this.authService.coachLogin(data);
    }

}
