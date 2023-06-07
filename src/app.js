import express from "express";
import morgan from "morgan";
import paymentRouter from "./routes/payment.routes.js";
import path from "path";

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(paymentRouter);
app.use(express.static(path.resolve("src/public")));

app.get("/healthcheck", (req, res) => {
  res.sendStatus(200);
});

export default app;
