import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
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
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        // Add your authentication logic here
        const user = await authenticateUser(
          credentials.email as string,
          credentials.password as string
        );

        if (user) {
          return user;
        } else {
          return null;
        }
      }
    })
  ],
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth;
    },
    // Optional: Add session customization
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      return session;
    },
  },
  debug: process.env.NODE_ENV !== "production",
});

// Mock authentication function - replace with your actual DB logic
async function authenticateUser(email: string, password: string) {
  // Replace this with your database lookup and password validation
  const mockUser = {
    id: "1",
    email: "user@example.com",
    password: "securepassword", // In real app, store hashed passwords
    name: "Test User"
  };

  if (email === mockUser.email && password === mockUser.password) {
    return {
      id: mockUser.id,
      email: mockUser.email,
      name: mockUser.name
    };
  }
  return null;
}