const Joi = require("joi");

module.exports.userSchema = Joi.object({
  username: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

module.exports.taskSchema = Joi.object({
  title: Joi.string().min(3).required(),
  description: Joi.string().allow("").optional(),
  dueDate: Joi.date().min("now").required(),
  priority: Joi.string().valid("low", "medium", "high").default("medium").required(),
  status: Joi.string().valid("pending", "completed").default("pending"),
});