import Joi from "joi";

const categoryJoiSchema = Joi.object({
  name: Joi.string().required(),
  value: Joi.string().allow("", null),
  status: Joi.string().valid("active", "disabled").default("active"),
  createdBy: Joi.string().optional(),
});

export { categoryJoiSchema };
