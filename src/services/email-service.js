const sender = require('../config/email-config');
const TicketRepository = require('../repository/ticket-repository');


const ticketRepository = new TicketRepository();

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

const fetchPendingEmails = async (timeStamp) => {
    try {

        const response  =await ticketRepository.get({status: "PENDING"});
        return response;
    } catch (error) {
        console.log(error);
    }
}

const createNotification = async (data) => {
    try {
        const response  =await ticketRepository.create(data);
        return response;
    } catch (error) {
        console.log(error);
    }
}

const updateTicket = async(ticketId ,data) => {
    try {

        const response  =await ticketRepository.update(ticketId, data);
        return response;
    } catch (error) {
        console.log(error);
    }
}



module.exports = {
    sendBasicEmail,
    check,
    fetchPendingEmails,
    createNotification,
    updateTicket
}

