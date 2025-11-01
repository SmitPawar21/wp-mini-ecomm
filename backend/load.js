import User from "./models/User.js";
import Product from "./models/Product.js";
import products from "./products.js";
import Order from "./models/Order.js";
import Cart from "./models/Cart.js";

const loadData = async () => {
    const user = {
        _id: "69060a2d74bf915b7bfff110",
        name: "Smit",
        email: "abc@gmail.com",
        password: "12345",
        role: "user"
    };

    const savedUser = await User.create(user);
    console.log(savedUser);

    // const order = {
    //     userId: "69060a2d74bf915b7bfff110",
    //     items: [
    //         {
    //             productId: "690621abd60ddfea18016f23",
    //             quantity: 1,
    //         },
    //     ],
    //     totalAmount: 4499,
    //     paymentMethod: "COD",
    //     paymentStatus: "Pending",
    //     orderStatus: "Pending"
    // }

    // const savedOrder = await Order.create(order);
    // console.log(savedOrder);

    // const item = {
    //     userId: "69060a2d74bf915b7bfff110",
    //     items: [
    //         {
    //             productId: "690621abd60ddfea18016f23",
    //             quantity: 1,
    //         },
    //     ],
    // }

    // const savedCart = await Cart.create(item);
    // console.log(savedCart);
}

export default loadData;