import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private userService: UserService) {}

    async login(data: LoginDto){

        const user = await this.validateUser(data)

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

    
