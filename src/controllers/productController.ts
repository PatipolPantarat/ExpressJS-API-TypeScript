import Product from "../models/productModel";
import { productJoiSchema } from "../schema/productValidation";
import s3 from "../config/aws-config";

export const allProducts = async (req: any, res: any) => {
  let query = {};
  try {
    const { search } = req.query;
    if (search) {
      const regex = new RegExp(search, "i");
      query = {
        $or: [{ name: regex }, { category: regex }],
      };
    }
    const products = await Product.find(query);
    res.send({ message: `All products : ${products.length}`, products });
  } catch (error) {
    console.log("allProducts error : ", error);
    res.status(500).send({ message: "Internal server error" });
  }
};

export const oneProduct = async (req: any, res: any) => {
  try {
    const product = await Product.findById(req.params.id);
    res.send({ message: "One product", product });
  } catch (error) {
    console.log("oneProduct error : ", error);
    res.status(404).send({ message: "Product not found" });
  }
};

export const createProduct = async (req: any, res: any) => {
  if (!req.file) {
    return res.status(400).send({ message: "Image is required" });
  }
  const thumbnail = req.file;
  console.log("created product req.body : ", req.body);
  console.log("created product req.file : ", thumbnail);

  // Setting up s3 upload
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: thumbnail.originalname + "_" + Date.now(),
    Body: req.file.buffer,
    contentType: thumbnail.mimetype,
  };

  // Upload the file to s3
  const url = await s3
    .upload(params)
    .promise()
    .then((data) => {
      return data.Location;
    });
  const reqBody = { ...req.body, thumbnail: url };
  console.log("reqBody : ", reqBody);

  // Validate
  const { error, value } = productJoiSchema.validate(reqBody);
  if (error) {
    console.log("validate error : ", error);
    return res.status(400).send({ message: error.details[0].message });
  }

  // Save product
  try {
    const newProduct = new Product(value);
    await newProduct.save();
    console.log("newProduct : ", newProduct);
    res.json({ message: "Product created", newProduct });
  } catch (error) {
    console.log("createProduct error : ", error);
    res.status(500).send({ message: "Internal server error" });
  }
};

export const updateProduct = async (req: any, res: any) => {
  try {
    const updateProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.send({ message: "Product updated", updateProduct });
  } catch (error) {
    console.log("updateProduct error : ", error);
    res.status(500).send({ message: "Internal server error" });
  }
};

export const deleteProduct = async (req: any, res: any) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.send({ message: "Product deleted" });
  } catch (error) {
    console.log("deleteProduct error : ", error);
    res.status(500).send({ message: "Internal server error" });
  }
};
