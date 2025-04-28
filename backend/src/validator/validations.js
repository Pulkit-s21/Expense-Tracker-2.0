import Joi from "joi"

export const signUpValidation = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
}).options({ abortEarly: false })

export const loginValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
}).options({ abortEarly: false })

export const transactionValidation = Joi.object({
  title: Joi.string().required(),
  userId: Joi.number().required(),
  date: Joi.date().iso().required(),
  amount: Joi.number().required(),
}).options({ abortEarly: false })

export const incomeValidation = Joi.object({
  title: Joi.string().required(),
  userId: Joi.number().required(),
  date: Joi.date().iso().required(),
  amount: Joi.number().required(),
}).options({ abortEarly: false })
