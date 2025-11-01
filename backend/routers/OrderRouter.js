import express from "express";
import verifyAdmin from "../middlewares/verifyAdmin.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

router.post('/', verifyToken, addOrder);
router.get('/my', verifyToken, myOrder);
router.get('/', verifyAdmin, getAllOrders);
router.put('/:id/status', verifyAdmin, updateOrder);
router.delete('/:id', verifyToken, cancelOrder);

export default router;