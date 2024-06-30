import { MongoDBAdapter } from '@auth/mongodb-adapter'
import { compare } from 'bcryptjs'
import NextAuth, { DefaultSession } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'
import clientPromise from './lib/db'
import { dbConnect } from './lib/db-connect'
import { User } from './models/user'
import { User_Populate, WatchList } from './types/user'

declare module 'next-auth' {
   interface Session {
      user: {
         id: string
         watch_list?: WatchList[]
      } & DefaultSession['user']
   }
   interface User {
      watch_list?: WatchList[]
   }
}

declare module '@auth/core/jwt' {
   interface JWT {
      id?: string
      watch_list?: WatchList[]
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
            let user: User_Populate | null = null
            await dbConnect()
            // logic to verify if user exists
            user = await User.findOne({ email: credentials.email })
               .populate('watch_list', 'title_long imdb_code')
               .lean()
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
            const { _id, ...rest } = user
            return {
               id: _id.toString(),
               ...rest,
            }
         },
      }),
   ],
   callbacks: {
      jwt: async ({ token, user }) => {
         if (user) {
            token.id = user.id
            token.watch_list = user.watch_list
         }
         return token
      },
      session: async ({ session, token }) => {
         if (token.id) {
            session.user.id = token.id as string
         }
         const updateUser: User_Populate | null = await User.findById(token.id)
            .populate('watch_list', 'title_long imdb_code')
            .lean()
         if (updateUser?.watch_list) {
            session.user.watch_list = updateUser.watch_list
         }
         return session
      },
   },
})
