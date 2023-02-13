const Joi = require("joi");

const passengerSchema = Joi.object({
  person_id: Joi.number().required(),
  flight_id: Joi.number().required(),
});

module.exports = passengerSchema;
