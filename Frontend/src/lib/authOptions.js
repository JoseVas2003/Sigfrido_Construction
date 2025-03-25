import axios from 'axios';
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
      CredentialsProvider({
          name: "credentials",
          credentials: {},

          async authorize(credentials){

             const {email, password} = credentials;
             const connection = `${process.env.NEXT_PUBLIC_API_URL}/api/users/`;
             const authenticationURL = connection + (email);

             try{
              const user = await axios.get(authenticationURL, {
                  headers: {
                    'Content-Type': 'application/json',
                  },
                });

              if(user.data == null)
              {
                  //No User Was Found In The Database
                  return null;
              }
              const passwordsMatch = await bcrypt.compare(password, user.data.password);

              if(!passwordsMatch)
              {
                  //Passwords Don't Match
                  return null;
              }

              return {email: user.data.email, name: user.data.firstName, admin: user.data.admin};

             }catch(error){
              const err = error;
              console.error("Error response:", err.response?.data || err.message);
             }
          },
      }),
  ],
  callbacks: {
      async jwt({ token, user }) {
          // When the user first signs in, user will be defined.
          if (user) {
              token.email = user.email;
              token.name = user.name;
              token.admin = user.admin;
          }
          return token;
      },
      async session({ session, token }) {
          // Copy the token properties into session.user so they're available on the client.
          session.user.email = token.email;
          session.user.name = token.name;
          session.user.admin = token.admin;

          return session;
          },
      },
    
  session: {
      strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages:{
      signIn: "/login",
      error: "/",
  },
};