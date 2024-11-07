import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "@prisma/client";
import { ROLES_KEY } from "../decorators/roles.decorator";

@Injectable()
export class RolesGaurd implements CanActivate {

    constructor(private reflector: Reflector){}

    canActivate(context: ExecutionContext): boolean {

        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(), 
            context.getClass(),
        ]);
        
        const user = context.switchToHttp().getRequest().user.sub;
        return requiredRoles.some(role => user.roles===role);

    }

}
