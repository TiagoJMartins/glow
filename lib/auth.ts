'server only';

import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { track } from '@vercel/analytics/server';
import type { NextAuthOptions } from 'next-auth';
import { getServerSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import prisma from './prisma';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'testuser' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize() {
        return await prisma.user.findUnique({
          where: { email: 'hello@glow.as' },
        });
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt', maxAge: 24 * 60 * 60 },
  pages: {
    signIn: '/',
  },
  callbacks: {
    signIn: async () => {
      return true;
    },
    session: async ({ session, token }) => {
      if (!session.user) return session;

      session.user.id = token.uid;

      return session;
    },
    jwt: async (params) => {
      const { user, token, trigger } = params;

      if (trigger === 'signUp' && user) {
        await track('signUp', {
          userId: user.id,
          provider: params.account?.provider ?? 'unknown',
        });
      }

      if (trigger === 'signIn' && user) {
        await track('signIn', {
          userId: user.id,
          provider: params.account?.provider ?? 'unknown',
        });
      }

      if (user) {
        token.uid = user.id;
      }

      return token;
    },
  },
};

export const getUser = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return null;
  }

  return session.user;
};
