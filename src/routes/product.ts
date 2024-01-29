import { Router } from "express";
const router = Router();

import {
  allProducts,
  oneProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product";

// get all products
router.get("/", allProducts);

// get one product
router.get("/:id", oneProduct);

// create new product
router.post("/", createProduct);

// update product
router.put("/:id", updateProduct);

// delete product
router.delete("/:id", deleteProduct);

export default router;
