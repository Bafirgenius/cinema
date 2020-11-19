var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'bafirgenius@gmail.com',
        pass: ''
    }
});

var mailOptions = {
    from: 'bafirgenius@gmail.com',
    to: 'bayu21firnanda@gmail.com',
    subject: 'Sending Email using Nodejs',
    text: 'That was easy!'
};

transporter.sendMail(mailOptions, (err, info) => {
    if (err) throw err;
    console.log('Email sent: ' + info.response);
});