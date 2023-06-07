import { Router } from "express";
import {
  cancelOrder,
  captureOrder,
  createOrder,
} from "../controllers/payment.controller.js";

const paymentRouter = Router();

paymentRouter.get("/create-order", createOrder);

paymentRouter.get("/capture-order", captureOrder);

paymentRouter.get("/cancel-order", cancelOrder);

export default paymentRouter;
