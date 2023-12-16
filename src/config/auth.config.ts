import { NextAuthOptions } from 'next-auth';
import Google from 'next-auth/providers/google';

import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, NEXTAUTH_SECRET } from '@/config/env';

export const authOptions: NextAuthOptions = {
  secret: NEXTAUTH_SECRET,
  providers: [
    Google({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          scope: `https://www.googleapis.com/auth/spreadsheets.readonly openid https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/gmail.send`,
        },
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token.accessToken) {
        return {
          ...session,
          accessToken: token.accessToken,
        };
      }

      return session;
    },
    async jwt({ account, token }) {
      if (account?.access_token) {
        token.accessToken = account.access_token;
      }
      return token;
    },
  },
};
