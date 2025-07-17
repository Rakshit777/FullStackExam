import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import connectMongoDB from './config/mongodb.js';
import userRouter from "./routes/auth.routes.js";
import productRouter from "./routes/product.routes.js";
import reportRouter from "./routes/report.routes.js";
import orderRouter from "./routes/order.routes.js";
import cartRouter from "./routes/cart.routes.js";
import db from "./models/mysql/index.js";
dotenv.config();

const app = express();

app.use(cors({
  origin: '*', // allow your Next.js frontend
}));
connectMongoDB();

app.use(express.json());

app.use('/users', userRouter);
app.use('/products', productRouter);
app.use('/reports', reportRouter);
app.use('/orders', orderRouter);
app.use('/cart', cartRouter);

app.listen(process.env.PORT, () => {
    
    db.sequelize.sync({
        alter: true
    });
    console.log(`App listening on port ${process.env.PORT}`)
})