import credentials from 'next-auth/providers/credentials';
import NextAuth from 'next-auth';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/lib/db';
import User from '@/models/User';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    credentials({
      credentials: {
        email: { label: 'Email' },
        password: { label: 'Password', type: 'password' }
      },
      // @ts-ignore
      async authorize(credentials) {
        await connectDB();
        let user = null;
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please enter email and password');
        }
        user = await User.findOne({ email: credentials.email });
        if (!user) {
          throw new Error('Invalid email/password');
        }
        if (typeof credentials.password !== 'string') {
          throw new Error('Invalid password');
        }
        const isValid = await bcrypt.compare(
          credentials!.password,
          user.password
        );
        if (!isValid) {
          throw new Error('Incorrect email/password');
        }
        return user;
      }
    })
  ],
  pages: {
    signIn: '/auth/login'
  },
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    session({ session, token }) {
      session.user.role = token.role;
      return session;
    }
  }
});
