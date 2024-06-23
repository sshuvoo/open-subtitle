export const getOTP = (digit: number = 5): string => {
   let otp = ''
   for (let i = 0; i < digit; i++) {
      otp += Math.trunc(Math.random() * 10)
   }
   return otp
}
