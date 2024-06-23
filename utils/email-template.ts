interface Props {
   name: string
   otp: string
}

export const getOTPTemplate = ({ name, otp }: Props) => {
   const otpBox = otp
      .split('')
      .reduce((prev, curr) => prev + `<span>${curr}</span>`, '')

   return `
<!doctype html>
<html lang="en">
   <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Verification Code</title>
      <style>
         body {
            font-family: 'Arial', sans-serif;
            background-color: #000000;
            margin: 0;
            padding: 0;
            color: #03c988;
         }
         .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #18181b;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
            overflow: hidden;
         }
         .header {
            background-color: #03c988;
            color: #000000;
            padding: 6px;
            text-align: center;
         }
         .header h1 {
            margin: 0;
            font-size: 25px;
         }
         .content {
            padding: 20px;
         }
         .content h2 {
            color: #03c988;
            font-size: 22px;
            margin-bottom: 15px;
         }
         .content p {
            font-size: 16px;
            line-height: 1.6;
            margin: 10px 0;
            color: #ffffff;
         }
         .verification-code {
            display: flex;
            column-gap: 8px;
            margin: 20px auto;
            width: fit-content;
         }
         .verification-code span {
            font-size: 26px;
            font-weight: bold;
            color: #fff;
            background-color: #03c98710;
            padding: 6px 15px;
            border-radius: 5px;
            border: 1px solid #03c988;
            text-align: center;
         }
         .expiration {
            font-size: 16px;
            color: #ff0000;
            text-align: center;
            margin-bottom: 20px;
         }
         .footer {
            background-color: #18181b;
            text-align: center;
            padding: 10px;
            font-size: 14px;
            color: #999999;
         }
         .footer a {
            color: #03c988;
            text-decoration: none;
         }
         @media only screen and (max-width: 600px) {
            .header h1,
            .content h2,
            .verification-code {
               font-size: 24px;
            }
         }
      </style>
   </head>
   <body>
      <div class="email-container">
         <div class="header">
         </div>
         <div class="content">
            <h2>Hi ${name},</h2>
            <p>
               Thank you for registering with Open Subtitle. Please use the
               verification code below to complete your registration:
            </p>
            <div class="verification-code">
               ${otpBox}
            </div>
            <p class="expiration">This code will expire in 5 minutes.</p>
            <p>
               If you did not initiate this registration, please ignore this
               email or contact our support team.
            </p>
            <p>Best Regards,<br />Open Subtitle Team</p>
         </div>
         <div class="footer">
            <p>&copy; 2024 Open Subtitle. All rights reserved.</p>
         </div>
      </div>
   </body>
</html>`
}
