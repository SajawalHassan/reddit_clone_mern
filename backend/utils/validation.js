const joi = require("joi");

module.exports.userValidation = (data) => {
  const schema = joi.object({
    username: joi.string().min(3).max(255),
    email: joi.string().min(3).max(255).email(),
    password: joi.string().min(8).max(255),
  });

  return schema.validate(data);
};
