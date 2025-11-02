import express from "express";
import { addItem, clearCart, getCart, removeOneItem, updateItem } from "../controllers/CartController.js";

const router = express.Router();

router.get('/', getCart);
router.post('/add', addItem);
router.put('/update', updateItem);
router.delete('/remove/:productId', removeOneItem);
router.delete('/clear', clearCart); // to clear the cart after order is placed

export default router;