const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'email-ssl.com.br',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  }
});

const sendEmail = (mailOptions) => {
  return transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
