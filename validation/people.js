const Joi = require("joi");

const peopleSchema = Joi.object({
  first: Joi.string().required(),
  last: Joi.string().required(),
});

module.exports = peopleSchema;
