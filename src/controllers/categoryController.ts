import { idText } from "typescript";
import Category from "../models/categoryModel";
import { categoryJoiSchema } from "../schema/categoryValidation";

export const allCategories = async (req: any, res: any) => {
  try {
    const { search } = req.query;
    const regex = new RegExp(search, "i");
    const categories = await Category.find(regex ? { name: regex } : {});
    res.send({ message: `All categories: ${categories.length}`, categories });
  } catch (error) {
    console.log("allCategories error : ", error);
  }
};

export const createCategory = async (req: any, res: any) => {
  console.log("req.body : ", req.body);
  try {
    const { error, value } = categoryJoiSchema.validate(req.body);
    if (error) {
      console.log("validate error : ", error);
      return res.status(400).send({ message: error.details[0].message });
    }
    const newCategory = new Category(value);
    await newCategory.save();
    res.status(201).send({ message: "Category created", newCategory });
  } catch (error) {
    console.log("createCategory error : ", error);
  }
};

export const updateCategory = async (req: any, res: any) => {
  const newReqBody = { name: req.body.name, status: req.body.status };
  try {
    const { error, value } = categoryJoiSchema.validate(newReqBody);
    if (error) {
      console.log("validate error : ", error);
      return res.status(400).send({ message: error.details[0].message });
    }
    const updateCategory = await Category.findByIdAndUpdate(
      req.params.id,
      value,
      {
        new: true,
      }
    );
    res.status(200).send({ message: "updateCategory", updateCategory });
  } catch (error) {
    console.log("updateCategory error : ", error);
  }
};

export const deleteCategory = async (req: any, res: any) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.send({ message: `Category ID : ${req.params.id} has deleted` });
  } catch (error) {
    console.log("deleteCategory error : ", error);
  }
};
