import { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { UserRole } from '@prisma/client';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email și parola sunt obligatorii');
        }

        try {
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email.toLowerCase(),
            },
          });

          if (!user || !user.password) {
            throw new Error('Utilizatorul nu a fost găsit');
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordValid) {
            throw new Error('Parolă incorectă');
          }

          // Actualizează ultima conectare - doar dacă câmpul există în schema
          // await prisma.user.update({
          //   where: { id: user.id },
          //   data: { lastLoginAt: new Date() },
          // });

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            image: user.image,
          };
        } catch (error) {
          console.error('Auth error:', error);
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.role = user.role;
        token.userId = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && token.sub) {
        session.user.id = token.userId as string || token.sub;
        session.user.role = token.role as UserRole;
      }
      return session;
    },
    async signIn({ user, account, profile }) {
      // Verifică dacă utilizatorul există în baza de date
      if (user.id) {
        const dbUser = await prisma.user.findUnique({
          where: { id: user.id },
        });
        
        // Doar verificări de bază - isActive nu există în schema actuală
        if (!dbUser) {
          return false; // Blochează login-ul pentru utilizatori inexistenți
        }
      }
      return true;
    },
  },
  events: {
    async signIn(message) {
      console.log('User signed in:', message.user.email);
    },
    async signOut(message) {
      console.log('User signed out:', message.token?.email || 'Unknown');
    },
  },
  debug: process.env.NODE_ENV === 'development',
};
