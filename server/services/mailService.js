import nodemailer from 'nodemailer'

export async function mailService(req) {
  const { email, subject, text } = req

  // Send email notification
  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_ADDRESS, // your Gmail address
      pass: process.env.EMAIL_PASS, // your Gmail password
    },
  })
  let mailOptions = {
    from: process.env.EMAIL_ADDRESS,
    to: email,
    subject: subject || 'User Created',
    text: text || `Hey there, your account has been created`,
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log('error: ', error)
      throw error
    } else {
      console.log('info: ', info)
    }
  })
}
