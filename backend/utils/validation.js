const joi = require("joi");

module.exports.registerValidation = (data) => {
  const schema = joi.object({
    username: joi.string().min(3).max(255).required(),
    email: joi.string().min(3).max(255).email().required(),
    password: joi.string().min(8).max(255).required(),
  });

  return schema.validate(data);
};
