import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) {}

    async login(data: LoginDto){

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


}

    
