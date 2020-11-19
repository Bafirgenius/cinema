var nodemailer = require('nodemailer');

function sendEmail(email, message) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'cinemaproject70@gmail.com',
            pass: 'cinemaproject'
        }
    });

    var mailOptions = {
        from: 'cinemaproject70@gmail.com',
        to: email,
        subject: 'Movie Ticket Confirmation',
        text: message
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) throw err;
        console.log('Email sent: ' + info.response);
    });
}

module.exports = sendEmail;