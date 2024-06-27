'use server'

import { signIn } from '@/auth'

interface Props {
   email: string
   password: string
}

export const loginWithCredential = async ({ email, password }: Props) => {
   await signIn('credentials', {
      email,
      password,
      redirect: false,
   })
}
