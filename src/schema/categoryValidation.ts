import Joi from "joi";

const categoryJoiSchema = Joi.object({
  name: Joi.string().required(),
  status: Joi.string().valid("active", "inactive").default("active"),
  createdBy: Joi.string().optional(),
});

export { categoryJoiSchema };
