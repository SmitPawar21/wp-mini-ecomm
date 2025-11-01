import express from "express";
import { getAllProducts, getOneProductDetails } from "../controllers/ProductController.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/all", getAllProducts);
router.get("/:id", verifyToken, getOneProductDetails);

export default router;