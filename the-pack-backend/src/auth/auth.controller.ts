import { Body, Controller, Param, Post, Request, UseGuards, Get, Req, Res, HttpException, HttpStatus } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { CoachService } from 'src/coach/coach.service';
import { RefreshJwtGaurd } from './guards/refresh.gaurd';
import { request } from 'http';
import { JwtGuard } from './guards/jwt.guard';
    
@Controller('auth')
export class AuthController {
    constructor (private userService: UserService, private coachService: CoachService, private authService: AuthService ){}
   
    @Post('userRegister')
    async userRegister(@Body() createUserDto: Prisma.UserCreateInput){
          return this.userService.create(createUserDto)
    }

    @Post('coachRegister')
    async coachRegister(@Body('id') id: string, @Body() createUserDto: Prisma.UserCreateInput){
          return this.coachService.createCoachWKey(id, createUserDto)
    }

    @Post('userLogin')
    async userLogin(@Body() data: LoginDto){
        return await this.authService.userLogin(data);
    }

    @UseGuards(JwtGuard)
    @Post('Logout')
    userLogout(@Request() req) {
        this.authService.userLogout(req.user);
    }

    @UseGuards(RefreshJwtGaurd)
    @Post('userRefresh')
    async userRefreshToken(@Request() req){

        return await this.authService.userRefreshToken(req)

    }

    @Get('session')
    getSession(@Req() req, @Res() res) {
        // Check if the user is authenticated via session
        if (req.session.user) {
        return res.json({
            user: req.session.user,  // Return session user data
        });
        } else {
        return res.status(401).json({ message: 'Not authenticated' });
        }
    }


    @Post('verifyPassword')
    async verifyPassword(
        @Body('password') password: string,
        @Body('storedHash') storedHash: string,
    ) {
        if (!password || !storedHash) {
            throw new HttpException('Password and hash are required', HttpStatus.BAD_REQUEST);
        }
        return await this.authService.verifyPassword(password, storedHash);
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
