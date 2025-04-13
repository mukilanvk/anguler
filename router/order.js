import express from 'express';
import { orderController } from '../controller/orderController.js';

const orderRoute = express.Router();
const controller = new orderController();

orderRoute.get('/', controller.orderIndex);
orderRoute.post('/', controller.orderStore);
orderRoute.put('/:id', controller.orderEdit);
orderRoute.delete('/:id', controller.orderDelete);

export default orderRoute;
