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
  createCategories,
} from "../controllers/categoryController";

const router = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// get all products
router.get("/", allProducts);

// get one product
router.get("/id/:id", oneProduct);

// create new product
// router.post("/", createProduct);
router.post("/add", upload.single("thumbnail"), createProduct);

// update product
router.put("/update/:id", updateProduct);

// delete product
router.delete("/del/:id", deleteProduct);

// get all categories
router.get("/categories", allCategories);

// create new category
router.post("/categories/add", createCategories);

export default router;
