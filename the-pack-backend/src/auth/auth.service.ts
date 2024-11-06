import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CoachService } from 'src/coach/coach.service';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private coachService: CoachService, private jwtService: JwtService) {}

    async userLogin(data: LoginDto){

        const user = await this.validateUser(data)

        const payload = {

            username: user.email,
            sub:{
                name:user.name,
            }
        }

        return {
            user,
            backendTokens:{
                accessToken: await this.jwtService.signAsync(payload,{
                    expiresIn: '1h',
                    secret: process.env.jwtSecretKey,
                }),

                refreshToken: await this.jwtService.signAsync(payload,{
                    expiresIn: '7d',
                    secret: process.env.jwtRefreshTokenKey,
                })
            }
        }

    }

    async validateUser(data: LoginDto){

        const user = await this.userService.findByEmail(data.username)

        if (user && (await compare(data.password, user.password)) ){
            const {password, ...result} = user;
            return result;
        }

        throw new UnauthorizedException();
    }

    async userRefreshToken(user:any){
        const payload = {

            username: user.username,
            sub: user.name
        };

        return {

            accessToken: await this.jwtService.signAsync(payload,{
                expiresIn: '1h',
                secret: process.env.jwtSecretKey,
            }),

            refreshToken: await this.jwtService.signAsync(payload,{
                expiresIn: '7d',
                secret: process.env.jwtRefreshTokenKey,
            })

        }

    }

    //this is where coach starts
    async coachLogin(data: LoginDto){

        const coach = await this.validateCoach(data)

        const payload = {

            username: coach.email,
            sub:{
                name:coach.name,
            }
        }

        return {
            coach,
            backendTokens:{
                accessToken: await this.jwtService.signAsync(payload,{
                    expiresIn: '1h',
                    secret: process.env.jwtSecretKey,
                }),

                refreshToken: await this.jwtService.signAsync(payload,{
                    expiresIn: '7d',
                    secret: process.env.jwtRefreshTokenKey,
                })
            }
        }

    }

    async validateCoach(data: LoginDto){

        const coach = await this.coachService.findByEmail(data.username)

        if (coach && (await compare(data.password, coach.password)) ){
            const {password, ...result} = coach;
            return result;
        }

        throw new UnauthorizedException();
    }

    async coachRefreshToken(coach:any){
        const payload = {

            username: coach.username,
            sub: coach.name
        };

        return {

            accessToken: await this.jwtService.signAsync(payload,{
                expiresIn: '1h',
                secret: process.env.jwtSecretKey,
            }),

            refreshToken: await this.jwtService.signAsync(payload,{
                expiresIn: '7d',
                secret: process.env.jwtRefreshTokenKey,
            })

        }

    }

}

    
