const Joi = require('joi');



const flightSchema = Joi.object({
    origin_id: Joi.number()
        .required(),
    destination_id: Joi.number()
        .required(),
    duration : Joi.number().required()
})
    
module.exports = flightSchema