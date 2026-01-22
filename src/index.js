const express = require('express');
const bodyParser = require('body-parser');
const {PORT} = require('./config/serverconfig');
const cron = require('node-cron');
const {sendBasicEmail,check} = require('./services/email-service');
const jobs = require('./utils/job');


const {REMINDER_BINDING_KEY} = require('./config/serverconfig');
const {subscribeMessage ,createChannel}  =require('./utils/messageQueue')
// const  TicketController = require('./controller/email-controller');
const EmailService = require('./services/email-service');
const apiRoutes = require('./routes/index');

const setupAndStartServer = async() => {

    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    app.use('/api',apiRoutes);

    // app.post('/api/v1/tickets', TicketController.create);

    const channel = await createChannel();
    subscribeMessage(channel,EmailService.subscribeEvents,REMINDER_BINDING_KEY);

    app.listen(PORT,async () => {
        console.log(`Server started at ${PORT}`);

        check(); //for checking the smtp server

        // jobs();

    })
    
}

setupAndStartServer();