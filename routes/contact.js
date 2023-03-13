const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser')

var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/', function (req, res) {
    res.render("site/contact")
})

router.post('/email', urlencodedParser, function (req, res) {
    const outputHtml = `
    <h2>Mail Details</h2>
    <ul>
        <li>Name: ${req.body.name}</li>
        <li>Email: ${req.body.email}</li>
        <li>Phone: ${req.body.phone}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
    `;
    "use strict";
    const nodemailer = require("nodemailer");
    // async..await is not allowed in global scope, must use a wrapper
    async function main() {
        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        let testAccount = await nodemailer.createTestAccount();

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "ada3ce44d56c24",
                pass: "de7ff8b3acb2bb"
            }
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"Node.js Project Contact 👻" <ada3ce44d56c24>', // sender address
            to: "kralcs@gmail.com, cemal.my@gmail.com", // list of receivers
            subject: "Node.js Project", // Subject line
            text: "Hello world? ✔", // plain text body
            html: outputHtml, // html body
        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

        req.session.flash = {
            type: "alert alert-success",
            message: "Mailiniz başarılı bir şekilde gönderildi.",
        }
        req.session.save(function (err) {
            if (err) {
                console.log(err)
            }
        })
        res.redirect('/contact');
    }

    main().catch(console.error);
})

module.exports = router;