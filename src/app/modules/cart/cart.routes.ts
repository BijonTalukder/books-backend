import expree from "express";
import { cartController } from "./cart.controller";

const router = expree.Router();
router.post("/create",cartController.createCart)


export const CartRouter = router 