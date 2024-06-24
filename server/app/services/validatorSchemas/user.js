const Joi = require("joi");

const schema = Joi.object({
  firstname: Joi.string().alphanum().min(3).max(30).required(),

  lastname: Joi.string().alphanum().min(3).max(30).required(),

  password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/),

  repeat_password: Joi.ref("password"),

  cv: Joi.string().alphanum(),

  address: Joi.string(),

  role: Joi.string().valid("candidate", "company"),

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net", "fr"] },
  }),
});

module.exports = schema;
