import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from  "./db.js";
import loadData from "./load.js";
import authRouter from "./routers/AuthRouter.js";
import productRouter from "./routers/ProductRouter.js";
import orderRouter from "./routers/OrderRouter.js";
import cartRouter from "./routers/CartRouter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(morgan('dev'));

connectDB();
// loadData();

app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.use("/api/cart", cartRouter);

app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
})