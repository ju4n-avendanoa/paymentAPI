import { Router } from "express";
import {
  cancelOrder,
  captureOrder,
  createOrder,
} from "../controllers/payment.controller.js";

const paymentRouter = Router();

// Route for creating a new payment order
paymentRouter.get("/create-order", createOrder);

// Route for capturing a payment order
paymentRouter.get("/capture-order", captureOrder);

// Route for canceling a payment order
paymentRouter.get("/cancel-order", cancelOrder);

export default paymentRouter;
