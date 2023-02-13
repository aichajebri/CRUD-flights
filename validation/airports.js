const Joi = require("joi");

const airportSchema = Joi.object({
  code: Joi.string().required(),
  city: Joi.string().required(),
});

module.exports = airportSchema;
