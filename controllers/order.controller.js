import Cart from '../models/mongodb/cart.js';
import Order from '../models/mysql/order.js';
import OrderItem from '../models/mysql/orderItem.js';
import Product from '../models/mongodb/product.js';

export const placeOrder = async (req, res) => {
  try {
    const { items } = req.body;
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'No order items provided' });
    }

    const total = items.reduce((sum, item) => sum + item.quantity * item.price, 0);

    const order = await Order.create({
      userId: req.user.id,
      total,
    });

    const orderItems = items.map((item) => ({
      orderId: order.id,
      productName: item.name,
      quantity: item.quantity,
      price: item.price,
    }));

    await OrderItem.bulkCreate(orderItems);

    res.status(201).json({ message: 'Order placed successfully', orderId: order.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const checkout = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({ userId });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // Get product info
    const productIds = cart.items.map((item) => item.productId);
    const products = await Product.find({ _id: { $in: productIds } });

    let totalAmount = 0;
    const orderItems = [];

    for (let item of cart.items) {
      const product = products.find((p) => p._id.equals(item.productId));
      if (!product) continue;

      const subtotal = product.price * item.quantity;
      totalAmount += subtotal;

      orderItems.push({
        productName: product.name,
        quantity: item.quantity,
        price: product.price,
      });
    }

    // Create order in SQL
    const newOrder = await Order.create({ userId, total : totalAmount });

    // Create order items
    for (let item of orderItems) {
      await OrderItem.create({
        orderId: newOrder.id,
        ...item,
      });
    }

    // Clear cart
    await Cart.deleteOne({ userId });

    res.status(201).json({ message: 'Checkout successful', orderId: newOrder.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Checkout failed' });
  }
};

