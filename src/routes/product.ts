import { Router } from "express";
import multer, { memoryStorage } from "multer";
import {
  allProducts,
  oneProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController";
import {
  allCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController";

const router = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// get all products
router.get("/", allProducts);

// get one product
router.get("/id/:id", oneProduct);

// create new product
router.post("/add", upload.single("thumbnail"), createProduct);

// update product
router.put("/update/:id", updateProduct);

// delete product
router.delete("/delete/:id", deleteProduct);

// get all categories
router.get("/categories", allCategories);

// create new category
router.post("/categories/add", createCategory);

// update category
router.put("/categories/update/:id", updateCategory);

// delete category
router.delete("/categories/delete/:id", deleteCategory);

export default router;
