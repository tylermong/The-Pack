import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { Backend_URL } from "@/lib/constants";


export const authOptions: NextAuthOptions = {

    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Username",
                    type: "text",
                    placeholder: "jsmith",
                },
                password: { label: "Password", type: "password"},
            },
            async authorize(credentials){
                if(!credentials?.username || !credentials?.password) return null;
                const { username, password } = credentials
                const res = await fetch(Backend_URL + "/auth/userLogin", {
                    method: "POST",
                    body: JSON.stringify({
                        username,
                        password,
                    }),
                    headers: {
                        "Content-type": "applications/json"
                    },
                });
                if(res.status == 401){
                    console.log(res.statusText);
                    return null;
                }
                const user = await res.json();
                return user;
            },
        }),
    ],
    callbacks: {
        async jwt({token, user}){
            console.log({token, user})
            if(user) return {...token, ...user};

            return token;
        },

        async session({token, session}) {
            session.user = token.user;
            session.backendTokens = token.backendTokens;

            return session;
        },
    },
};

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST};