const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport(
    {
        service: 'Gmail',
        auth: {
            user: process.env.gmail, // generated ethereal user
            pass: process.env.gmailPass // generated ethereal password
        }     
    }
)

exports.sendActivationLink = (user) => {
    const options = {
        from: '"Perritos 👻" <roloortizgarcia@gmail.com>', // sender address
        to: user.email, // list of receivers
        subject: 'Bienvenido ✔', // Subject line
        html: "<h2>Activa tu cuenta: <a href='http://localhost:3000/activation/?user=" +user._id+"> Click aqui </a></h2>", // plain text body
        //html: '<b>Hello world?</b>' // html body
    };
    transporter.sendMail(options, (err,info)=>{
        console.log(err)
        console.log(info)
    });

}