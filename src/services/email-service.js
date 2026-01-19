const sender = require('../config/email-config');

const sendBasicEmail = async(mailFrom, mailTo, mailSubject, mailBody) => {

    const response = await sender.sendMail({
        from:mailFrom,
        to:mailTo,
        subject:mailSubject,
        text:mailBody
    });
    console.log(response);
}

const check = async()=> {
    try {
        console.log("Server is ready: ");
        const connect = await sender.verify();
        // console.log(connect);
        // console.log("Server is ready to take our messages");
        
    } catch (error) {
        console.log("Error in verify :");
        // console.log(error);
        throw error;
    }
}

module.exports = {
    sendBasicEmail,
    check,
}

