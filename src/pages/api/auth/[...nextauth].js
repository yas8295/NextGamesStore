import MongoDB from "@/MongoDB/MongoDB";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const client = await MongoDB();

        const database = client.db("users");

        const users = database.collection("users");

        const user = await users.findOne({
          email: credentials.email,
        });

        if (!user) {
          await client.close();
          throw new Error("Email provided is incorrect");
        }

        const isValid = credentials.password === user.password;

        if (!isValid) {
          await client.close();
          throw new Error("Incorrect password");
        }

        await client.close();
        return { email: user.email, name: user.username };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
