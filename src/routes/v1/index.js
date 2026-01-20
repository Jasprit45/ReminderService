const express = require('express');
const EmailController = require('../../controller/email-controller')

const router = express();

router.post('/tickets',EmailController.create);


module.exports = router;