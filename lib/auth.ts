import GoogleProvider from "next-auth/providers/google";
// import EmailProvider from "next-auth/providers/email";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/lib/mongodb";
import User from "@/lib/models/User";
import bcrypt from "bcryptjs";
import { signIn } from "next-auth/react";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        // EmailProvider({ ... }), // for OTP links if needed
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                await connectDB();
                const user = await User.findOne({ email: credentials.email });
                if (!user|| !user.verified) throw new Error("User not found or not verified");

                const valid = await bcrypt.compare(credentials.password, user.password);
                if (!valid) throw new Error("Invalid password");

                return user;
            }
        })
    ],
    session: { strategy: "jwt" },
    callbacks: {
        async jwt({ token, user}){
            if(user) 
                token.id=user._id;
            return token;
        },
        async session({ session, token }){
            session.user.id =token.id;
            return session;
        },
    },
    pages:{
        signIn:"/auth /login",
        errir:"/auth/error",
    },
};