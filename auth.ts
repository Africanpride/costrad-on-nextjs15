import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Apple from "next-auth/providers/apple";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/auth/login",
    // signOut: "/auth/signout",
    // error: "/auth/error",
    // verifyRequest: "/auth/verify",
    // newUser: "/auth/newuser",
  },

  providers: [
    GitHub,
    Google({
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          redirect_uri: "http://localhost:3000/api/auth/callback/google",
        },
      },
    }),
  ],
  callbacks: {
    authorized: async ({ auth }) => {
      console.log("authorized", auth);
      return !!auth;
    },
  },
  debug: process.env.NODE_ENV !== "production",
});
