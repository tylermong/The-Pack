import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Role } from '@prisma/client';
import { InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class AuthService {
    constructor(private userService: UserService,  private jwtService: JwtService) {}

    async userLogin(data: LoginDto){

        try {
            const user = await this.validateUser(data);
    
            const payload = {
                username: user.email,
                sub: {
                    id: user.id,
                    role: user.role
                }
            };
    
            return {
                user,
                backendTokens: {
                    accessToken: await this.jwtService.signAsync(payload, {
                        expiresIn: '1h',
                        secret: process.env.jwtSecretKey,
                    }),
    
                    refreshToken: await this.jwtService.signAsync(payload, {
                        expiresIn: '7d',
                        secret: process.env.jwtRefreshTokenKey,
                    })
                }
            };
        } catch (error) {
            console.error('Error during login:', error);
            throw new InternalServerErrorException('Login failed due to server error');
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
            sub:{
                id:user.id,
                role:user.role
            }
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

    /*
    //this is where coach starts
    async coachLogin(data: LoginDto){

        const user = await this.validateUser(data)

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

    */

}

    
