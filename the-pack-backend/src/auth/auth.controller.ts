import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { CoachService } from 'src/coach/coach.service';
import { RefreshJwtGaurd } from './guards/refresh.gaurd';
import { request } from 'http';
    
@Controller('auth')
export class AuthController {
    constructor (private userService: UserService, private coachService: CoachService, private authService: AuthService ){}
   


    @Post('userRegister')
    async userRegister(@Body() createUserDto: Prisma.UserCreateInput){
          return this.userService.create(createUserDto)
    }

    @Post('coachRegister')
    async coachRegister(@Body() createUserDto: Prisma.UserCreateInput){
          return this.coachService.create(createUserDto)
    }

    @Post('userLogin')
    async userLogin(@Body() data: LoginDto){
        return await this.authService.userLogin(data);
    }

    @UseGuards(RefreshJwtGaurd)
    @Post('userRefresh')
    async userRefreshToken(@Request() req){

        return await this.authService.userRefreshToken(req)

    }

    //this is where coach starts
    /*
    @Post('coachRegister')
    async coachRegister(@Body() createCoachDto: Prisma.UserCreateInput){
          return this.coachService.create(createCoachDto)
    }

    @Post('coachLogin')
    async coachLogin(@Body() data: LoginDto){
        return await this.authService.coachLogin(data);
    }

    @UseGuards(RefreshJwtGaurd)
    @Post('coachRefresh')
    async coachRefreshToken(@Request() req){

        return await this.authService.coachRefreshToken(req)

    }
    */

}
