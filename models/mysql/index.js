import Sequelize from 'sequelize';
import sequelize from '../../config/db.js';
import User from './user.js';
import Order from './order.js';
import OrderItem from './orderItem.js';

// Setup associations
User.hasMany(Order, { foreignKey: 'userId', as: 'orders' });
Order.belongsTo(User, { foreignKey: 'userId' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });


// Export all
const db = {
  sequelize,
  Sequelize,
  User,
  Order,
};

export default db;