import express from 'express';
import mongoose from 'mongoose';
import productRoute from './router/product.js';
import bodyParser from 'body-parser';
import *  as dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoute from './router/auth.js';
import orderRoute from './router/order.js';

dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT  || 5000;

app.use(bodyParser.json({ limit: "50mb", strict: false }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

app.use(cors({ origin: "*", methods: ["GET", "POST", "PUT","DELETE"], credentials: true }));
app.use(cookieParser());

app.use("/store", productRoute);
app.use("/user" , authRoute);
app.use("/order",orderRoute);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
