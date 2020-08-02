const nodemailer = require('nodemailer');
const cron = require('node-schedule');
const TempArticle = require('./temp-article');


const User = require('./user');
async function registerEmailSendingJob() {
  const listUser = await User.findAllUsers();
  var job = cron.scheduleJob('3 3 8 * * *', async function(){
    const listTempArticle = await TempArticle.findAllArticles();
    console.log(listTempArticle.length);
    var contentEmail ='';
    //Tao content gom cac title ve covid-19
    if(listTempArticle.length > 0){
      listTempArticle.forEach(t =>{
      contentEmail += t.title + '\n' +  t.content + '\n' + t.link + '\n\n';
      TempArticle.deleteTempArticle(t.id);
    });
    }
    try{
      if(contentEmail.length > 1){
        console.log('sending email');
        listUser.forEach(u => {
            send(u.email,'Thông báo về Covid-19',`${contentEmail}`);
        });
      }
    }
    catch(err){
      console.log(err);
    }
});
}
async function send(to, subject, content){

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          // user: process.env.EMAIL_USERNAME,
          // pass: process.env.EMAIL_PASSWORD,
         user: 'helloweb2byhoang@gmail.com',
        pass: 'minhhoang121',
        }
      });
      
      transporter.sendMail({
        from: 'helloweb2byhoang@gmail.com',
        to,
        subject,
        text: content,
      });
}
// /registerEmailSendingJob
module.exports = {send,registerEmailSendingJob};