import Joi from "joi";

const productJoiSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().allow("", null),
  price: Joi.number().positive().required(),
  category: Joi.string().required(),
  stock: Joi.number().positive().integer().min(0).default(0),
  thumbnail: Joi.string().required(),
  images: Joi.array().items(Joi.string()).default([]),
  status: Joi.string().valid("active", "disabled").default("active"),
  createdBy: Joi.string().optional(),
});

export { productJoiSchema };
