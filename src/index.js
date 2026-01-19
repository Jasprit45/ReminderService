const express = require('express');
const bodyParser = require('body-parser');

const {PORT} = require('./config/serverconfig');

const {sendBasicEmail,check} = require('./services/email-service')

const setupAndStartServer = async() => {

    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));


    app.listen(PORT,async () => {
        console.log(`Server started at ${PORT}`);
        // const connect = await sender.verify();
        // console.log("Server is ready to take our messages");
        check();

        sendBasicEmail(
            'support@admin.com',
            'sardarjasprit3118@gmail.com',
            'This is a testing email',
            'Hey, how are you'
        );

    })
    
}

setupAndStartServer();