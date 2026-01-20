const TicketService = require('../services/email-service');

const create  = async (req,res) => {
    try {
        const response = await TicketService.createNotification(req.body);
        return res.status(201).json({
            success:true,
            data:response,
            message:"Successfully registered a notification",
            error:{}
        })
    } catch (error) {
            return res.status(201).json({
                success:false,
                data:{},
                message:"Unable to register a notification",
                error:{error}
        })
    }
}

module.exports = {
    create,
}