import * as nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', // establemcemos el tipo de envio
  port: 587,
  secure: false,
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_EMAIL_PASSWORD,
  },
});

// eslint-disable-next-line import/prefer-default-export
export const send_email = (
  email: string,
  html: string,
  subject: string
): void => {
  const mailDetails = {
    from: `Airbnb <${process.env.NODEMAILER_EMAIL}>`, // El mombre
    to: email, // El correro destinatario
    subject, // Titulo del email
    html,
  };

  // Enviamos el email
  // eslint-disable-next-line no-unused-vars
  transporter.sendMail(mailDetails, (err, data) => {
    if (err) console.log('Nodemailer Error!');
    else
      console.log(
        `Email sent successfully.\n\tSubject: ${subject}\n\tTo: ${email}`
      );
  });
};
