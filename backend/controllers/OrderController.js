import Order from '../models/Order.js';
import Product from '../models/Product.js';

export const addOrder = async (req, res) => {
  try {
    const { items, paymentMethod } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Order must contain at least one item" });
    }

    let totalAmount = 0;
    const validatedItems = [];

    for (const item of items) {
      const product = await Product.findById(item.productId);
      
      if (!product) {
        return res.status(404).json({ message: `Product with ID ${item.productId} not found` });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({ 
          message: `Insufficient stock for ${product.name}. Available: ${product.stock}, Requested: ${item.quantity}` 
        });
      }

      totalAmount += (product.price * item.quantity);
      validatedItems.push({
        productId: item.productId,
        quantity: item.quantity
      });
    }

    const order = new Order({
      userId: req.user.id,
      items: validatedItems,
      totalAmount,
      paymentMethod: paymentMethod || "COD",
      paymentStatus: paymentMethod === "Online" ? "Paid" : "Pending"
    });

    await order.save();

    for (const item of validatedItems) {
      await Product.findByIdAndUpdate(
        item.productId,
        { $inc: { stock: -item.quantity } }
      );
    }

    await order.populate('items.productId', 'name price image');

    res.status(201).json({ 
      message: "Order placed successfully", 
      order 
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const myOrder = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id })
      .populate('items.productId', 'name price image')
      .sort({ createdAt: -1 });

    res.status(200).json({ orders });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('userId', 'name email')
      .populate('items.productId', 'name price image')
      .sort({ createdAt: -1 });

    res.status(200).json({ orders });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus, paymentStatus } = req.body;

    const validOrderStatuses = ["Pending", "Shipped", "Delivered"];
    const validPaymentStatuses = ["Pending", "Paid"];

    if (orderStatus && !validOrderStatuses.includes(orderStatus)) {
      return res.status(400).json({ 
        message: "Invalid order status. Must be: Pending, Shipped, or Delivered" 
      });
    }

    if (paymentStatus && !validPaymentStatuses.includes(paymentStatus)) {
      return res.status(400).json({ 
        message: "Invalid payment status. Must be: Pending or Paid" 
      });
    }

    const updateData = {};
    if (orderStatus) updateData.orderStatus = orderStatus;
    if (paymentStatus) updateData.paymentStatus = paymentStatus;

    const order = await Order.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    ).populate('items.productId', 'name price image');

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ 
      message: "Order updated successfully", 
      order 
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.userId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: "You are not authorized to cancel this order" });
    }

    if (order.orderStatus === "Shipped" || order.orderStatus === "Delivered") {
      return res.status(400).json({ 
        message: `Cannot cancel order. Order is already ${order.orderStatus.toLowerCase()}` 
      });
    }

    for (const item of order.items) {
      await Product.findByIdAndUpdate(
        item.productId,
        { $inc: { stock: item.quantity } }
      );
    }

    await Order.findByIdAndDelete(id);

    res.status(200).json({ message: "Order cancelled successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};