import express from 'express';
import { authController } from "../controller/authController.js";

const authRoute = express.Router();
const controller = new authController();

authRoute.post('/register', controller.register);
authRoute.post('/login', controller.login);

export default authRoute;
