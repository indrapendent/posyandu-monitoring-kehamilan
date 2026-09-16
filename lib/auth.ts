import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "select_account",
        },
      },
    }),
    
  ],
  callbacks: {
  async signIn({ user }) {
    const allowedEmails = [
      "indrapper11@gmail.com",
      "dunniel21@gmail.com",
      "nuja88ninu@gmail.com",
      "ersaputrim25@gmail.com",
      "lutfi.mla@gmail.com",
    ];

    return allowedEmails.includes(user.email ?? "");
  },
},
  secret: process.env.AUTH_SECRET,
};