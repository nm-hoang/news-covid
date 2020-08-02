const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: 'helloweb2byhoang@gmail.com',
    pass: 'minhhoang121'
  }
});

transporter.sendMail({
  from: '17Ck1 Web2 <helloweb2byhoang@gmail.com>',
  to: 'example <loxile9169@whowlft.com>',
  subject: 'Hello',
  text: 'Hello world?',
}).then(console.log).catch(console.error);