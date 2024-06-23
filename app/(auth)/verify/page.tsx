import OtpForm from './components/otp-form'

interface Props {
   searchParams: {
      email: string
      password: string
   }
}

export default function Verify({ searchParams }: Props) {
   return (
      <div>
         <div className="mx-auto mt-4 min-h-[calc(100vh-480px)] w-full max-w-md rounded-none bg-white p-4 shadow-input dark:bg-black md:mt-8 md:rounded-2xl md:p-8 lg:max-w-xl xl:mt-12">
            <h2 className="text-xl font-bold text-neutral-800 dark:text-primary">
               Verify Your Email
            </h2>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
               We have just sent you an email with a One-Time Password (OTP).
               Please enter the 5-digit OTP below to verify your email{' '}
               {searchParams.email}.
            </p>
            <h2 className="mt-10 text-xl font-bold text-neutral-800 dark:text-primary">
               Enter OTP
            </h2>
            <OtpForm searchParams={searchParams}/>
         </div>
      </div>
   )
}
