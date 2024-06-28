import { MongoDBAdapter } from '@auth/mongodb-adapter'
import NextAuth, { DefaultSession } from 'next-auth'
import Google from 'next-auth/providers/google'
import Credentials from 'next-auth/providers/credentials'
import clientPromise from './lib/db'
import { dbConnect } from './lib/db-connect'
import { User } from './models/user'
import { compare } from 'bcryptjs'
import { User_Mongo } from './types/user'
import { Schema } from 'mongoose'

declare module 'next-auth' {
   interface Session {
      user: {
         id: string
      } & DefaultSession['user']
   }
   interface User {
      _id: Schema.Types.ObjectId
   }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
   adapter: MongoDBAdapter(clientPromise, { databaseName: 'OpenSubtitle' }),
   session: { strategy: 'jwt' },
   providers: [
      Google,
      Credentials({
         credentials: {
            email: {},
            password: {},
         },
         authorize: async (credentials: any) => {
            let user: User_Mongo | null = null
            await dbConnect()
            // logic to verify if user exists
            user = await User.findOne({ email: credentials.email }).lean()
            if (!user) {
               throw new Error('User not found.')
            } else {
               const isValidPass = await compare(
                  credentials.password,
                  user.password
               )
               if (!isValidPass) {
                  throw new Error('Invalid Email or Password')
               }
            }
            return { ...user, id: user._id.toString() }
         },
      }),
   ],
   callbacks: {
      jwt: ({ token, user }) => {
         if (user) {
            token.id = user.id
         }
         return token
      },
      session: ({ session, token }) => {
         if (token.id) {
            session.user.id = token.id as string
         }
         return session
      },
   },
})
