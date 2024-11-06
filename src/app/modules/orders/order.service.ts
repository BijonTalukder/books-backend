import mongoose from "mongoose";
import OrderModel from "./order.model";
import { IOrder } from "./order.interface";

// Create a new order
const createOrder = async (orderData:any) => {
  const result = await OrderModel.create(orderData);
  return result;
};

// Get all orders
const getAllOrders = async () => {
  const result = await OrderModel.find({});
  return result;
};

// Get orders by store ID
const getOrdersByStore = async (storeId: string) => {
  const objectId = new mongoose.Types.ObjectId(storeId);

  const result = await OrderModel.aggregate([
    {
      $match: {
        storeId: objectId,
      },
    },
  ]);
  return result;
};

const getOrdersByUser= async (userId: string) => {
    const objectId = new mongoose.Types.ObjectId(userId);
  
    const result = await OrderModel.aggregate([
      {
        $match: {
            userId: objectId,
        },
      },
    ]);
    return result;
  };
// Export the order service
export const orderService = {
  createOrder,
  getAllOrders,
  getOrdersByStore,
  getOrdersByUser
};
