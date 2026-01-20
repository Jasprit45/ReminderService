const cron = require('node-cron');
const emailService = require('../services/email-service');
const sender  = require('../config/email-config');

const setupJobs = () => {
    cron.schedule('* * * * *', async() => {
        const response = await emailService.fetchPendingEmails();
        // console.log(response);
        response.forEach((email)=> {
            sender.sendMail({
                from:"ReminderService@airline.com",
                to: email.recepientEmail,
                subject:email.subject,
                text:email.content
            }, async (err,data) => {
                if(err) console.log(err);
                else {
                    console.log(data);
                    await emailService.updateTicket(email.id,{status:"SUCCESS"})
                }
            })

        });
    });
}


module.exports = setupJobs;