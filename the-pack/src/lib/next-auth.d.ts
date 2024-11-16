import NextAuth from "next-auth";

declare module "next-auth"{
    
    interface Session{
        user: {
            id: number;
            email: string;
            name: string;
        };

        backendTokens: {
            accessTokens: string;
            refreshTokens: string;
        };
    }
}

import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt"{
    interface JWT {
        user: {
            id: number;
            email: string;
            name: string;
        };

        backendTokens: {
            accessTokens: string;
            refreshTokens: string;
        };
    }
}