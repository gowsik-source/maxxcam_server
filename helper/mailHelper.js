const nodeMailer = require('nodemailer');
const { Resend } = require('resend');
const mailHelper = new Object();
require('dotenv').config();

const companyName = process.env.company_name;
const senderEmailAddress = process.env.sender_email_address;
const senderAppPassword = process.env.sender_app_password;
const resendApiKey = process.env.resend_api_key;

mailHelper.nodeMailer = async (receiverEmail, subjectOfEmail, forgotPasswordTemplate) => {
    try {
        let config = {
            service: 'gmail',
            auth: {
                user: senderEmailAddress,
                pass: senderAppPassword
            }
        };
        let transporter = nodeMailer.createTransport(config); // call createTransport from nodeMailer

        let message = {
            from: {
                name: companyName,
                address: senderEmailAddress,
            },
            to: `${receiverEmail}`,
            subject: `${subjectOfEmail}`,
            html: `${forgotPasswordTemplate}`
        }
        let result = await transporter.sendMail(message);
        console.log('result',result);
        if (result.accepted.length > 0) {
            return { status: true, data: result, message: 'Email sent successfully' };
        }
    } catch (error) {
        console.log("Mail Helper Error:", error);
        return { status: false, data: {}, message: error.message };
    }
    // transporter.sendMail(message)
    // .then(()=>{console.log("Mail Send")})
    // .catch(err =>{console.log("failed",err)})

    // try {
    //     transporter.sendMail(message);
    // } catch (error) {
    //     console.log("failed",error)
    // }
}

mailHelper.resend = async (receiverEmail, subjectOfEmail, forgotPasswordTemplate) => {
    try {
        const resend = new Resend(resendApiKey);
        const result = await resend.emails.send({
            from: `${companyName} <onboarding@resend.dev>`,
            to: `${receiverEmail}`,
            subject: `${subjectOfEmail}`,
            html: `${forgotPasswordTemplate}`
        });
        console.log('result',result);
        return { status: true, data: result, message: 'Email sent successfully' };
    } catch (error) {
        console.log("Mail Helper Error:", error);
        return { status: false, data: {}, message: error.message };
    }
};

module.exports = mailHelper;