import express from "express";
import { orderController } from "./order.controller";

const router = express.Router();
router.post("/create", orderController.createOrder)
router.get("/", orderController.getAllOrders);
router.get("/get-order-by-store/:id", orderController.getOrdersByStore)
router.get("/user/:id", orderController.getOrderByUser)

export const orderRouter = router 