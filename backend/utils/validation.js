const Joi = require("joi");

module.exports.registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(255),
    email: Joi.string().min(3).max(255).email(),
    password: Joi.string().min(8).max(255),
  });

  return schema.validate(data);
};
