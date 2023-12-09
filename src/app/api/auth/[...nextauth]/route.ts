import NextAuth, { NextAuthOptions } from 'next-auth';
import Google from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
  secret: 'process.env.NEXTAUTH_SECRET',
  providers: [
    Google({
      clientId: '619312822879-ena4eoidapg6c0m4unqfuop0smml1rqq.apps.googleusercontent.com',
      clientSecret: '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',
      authorization: {
        params: {
          scope:
            'https://www.googleapis.com/auth/spreadsheets.readonly openid https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
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

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
