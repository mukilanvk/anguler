import express from 'express';
import { ProductController } from "../controller/productController.js";
import { isAdmin, verifyToken } from '../auth/jwtMidleware.js';
import { uploadMultiple } from '../auth/uploads.js';

const productRoute= express.Router();
const controller = new ProductController();

productRoute.get("/",verifyToken, controller.productIndex);
productRoute.post("/",verifyToken,isAdmin, uploadMultiple,controller.productStore);
productRoute.put("/:id",verifyToken,isAdmin,uploadMultiple,controller.productEdit);
productRoute.delete("/:id",verifyToken,isAdmin, controller.productDelete);

export default productRoute;
