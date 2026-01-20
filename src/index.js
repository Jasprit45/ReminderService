const express = require('express');
const bodyParser = require('body-parser');
const {PORT} = require('./config/serverconfig');
const cron = require('node-cron');
const {sendBasicEmail,check} = require('./services/email-service');
const jobs = require('./utils/job');
const EmailController  =require('./controller/email-controller')

const setupAndStartServer = async() => {

    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    app.post('/api/v1/tickets',EmailController.create);

    app.listen(PORT,async () => {
        console.log(`Server started at ${PORT}`);

        check(); //for checking the smtp server

        // sendBasicEmail(
        //     'support@admin.com',
        //     'sardarjasprit3118@gmail.com',
        //     'This is a testing email',
        //     'Hey, how are you'
        // );

        // cron.schedule('*/2 * * * *', () => {
        //     console.log('running a task every two minute');
        // });
        jobs();

    })
    
}

setupAndStartServer();