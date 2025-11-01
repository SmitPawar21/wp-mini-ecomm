import express from "express";

const router = express.Router();

router.get('/', getCart);
router.post('/add', addItem);
router.put('/update', updateItem);
router.delete('/remove/:productId', removeOneItem);
router.delete('/clear', clearCart); // to clear the cart after order is placed

export default router;