import sequelize from '../config/db.js';
import Product from '../models/mongodb/product.js';
import Order from '../models/mysql/order.js';

export const getReports = async (req, res) => {
  try {
    // Top 5 spenders
    const spenders = await Order.findAll({
      attributes: ['userId', [sequelize.fn('SUM', sequelize.col('total')), 'totalSpent']],
      include: [{ model: User, attributes: ['name'] }],
      group: ['userId', 'User.id'],
      order: [[sequelize.fn('SUM', sequelize.col('total')), 'DESC']],
      limit: 5,
    });

    const salesByCategory = await Product.aggregate([
      {
        $lookup: {
          from: 'orderitems',
          localField: '_id',
          foreignField: 'productId',
          as: 'orderItems',
        },
      },
      { $unwind: '$orderItems' },
      {
        $group: {
          _id: '$category',
          totalSales: { $sum: { $multiply: ['$orderItems.quantity', '$orderItems.price'] } },
        },
      },
      { $sort: { totalSales: -1 } },
    ]);

    res.json({ spenders, salesByCategory });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const getTopSpenders = async (req, res) => {
  try {
    const [results] = await sequelize.query(`
      SELECT users.id, users.name, SUM(orders.total) AS total_spent
      FROM users
      JOIN orders ON users.id = orders.userId
      GROUP BY users.id
      ORDER BY total_spent DESC
      LIMIT 3;
    `);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
