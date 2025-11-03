import express from "express";
import { addItem, clearCart, getCart, removeOneItem, updateItem } from "../controllers/CartController.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

router.get('/', verifyToken, getCart);
router.post('/add', verifyToken, addItem);
router.put('/update', verifyToken, updateItem);
router.delete('/remove/:productId', verifyToken, removeOneItem);
router.delete('/clear', verifyToken, clearCart); // to clear the cart after order is placed

export default router;