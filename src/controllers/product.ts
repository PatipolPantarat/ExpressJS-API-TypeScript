import Product from "../models/product.model";
export const allProducts = async (req: any, res: any) => {
  const { search } = req.query;
  const regex = new RegExp(search, "i");
  const products = await Product.find(regex ? { name: regex } : {});
  res.send({ message: `All products : ${products.length}`, products });
};

export const oneProduct = async (req: any, res: any) => {
  const product = await Product.findById(req.params.id);
  console.log("one product ID : ", req.params.id);
  res.send({ message: "One product", product });
};

export const createProduct = async (req: any, res: any) => {
  const product = new Product(req.body);
  await product.save();
  res.send({ message: "Product created", product });
};

export const updateProduct = async (req: any, res: any) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.send({ message: "Product updated", product });
};

export const deleteProduct = async (req: any, res: any) => {
  await Product.findByIdAndDelete(req.params.id);
  res.send({ message: "Product deleted" });
};
