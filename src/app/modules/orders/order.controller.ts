import { IOrder, OrderStatus, PaymentStatus } from './order.interface';
import { NextFunction, Request, Response } from "express";
import { orderService } from "./order.service";
import httpsStatus from 'http-status-codes';
import { JwtHelper } from "../../../helpers/jwt/decodeJwt";
import { UserModel } from "../users/users.model";
import { StoreModel } from "../stores/stores.model";

// Create a new order
const createOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req?.headers.authorization;

        // Decode token to retrieve user information
        const decodedData = JwtHelper.decode(token as string, "very-secret");
        const userData = await UserModel.findOne({ email: decodedData?.email });

        if (!userData) {
            return res.status(httpsStatus.UNAUTHORIZED).json({
                statusCode: httpsStatus.UNAUTHORIZED,
                success: false,
                message: "User not authorized",
            });
        }

        const storeData = await StoreModel.findOne({ userId: userData._id });

        // Prepare order data
        const { items, deliveryAddress, paymentMethod } = req.body;
        const orderData = {
            userId:  userData._id,
            storeId: storeData?._id,
            items,
            deliveryAddress,
            paymentMethod,
            
          
            orderId:"sdfasd",  
            // customerId: userData._id,  
            orderStatus: OrderStatus.Pending,    
            paymentStatus: PaymentStatus.Pending, 
            subTotal:123,
            totalAmount:12,
            discount:12
            // createdAt: new Date(),
            // updatedAt: new Date(),
            // Add other fields as required by the IOrder interface
          };

        const result = await orderService.createOrder(orderData);

        res.status(httpsStatus.CREATED).json({
            statusCode: httpsStatus.CREATED,
            success: true,
            message: "Order created successfully!",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

// Get all orders
const getAllOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await orderService.getAllOrders();

        res.status(httpsStatus.OK).json({
            statusCode: httpsStatus.OK,
            success: true,
            message: "Orders retrieved successfully!",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

// Get orders by store
const getOrdersByStore = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const storeId = req.params.id;
        const result = await orderService.getOrdersByStore(storeId);

        res.status(httpsStatus.OK).json({
            statusCode: httpsStatus.OK,
            success: true,
            message: "Orders retrieved successfully for the store!",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const getOrderByUser = async(req: Request, res: Response, next: NextFunction)=>{
    try {
        const userId = req.params.id;
        const result = await orderService.getOrdersByUser(userId);

        res.status(httpsStatus.OK).json({
            statusCode: httpsStatus.OK,
            success: true,
            message: "Orders retrieved successfully for the user!",
            data: result,
        });
    } catch (error) {
        next(error);
    }
}
// Export the order controller
export const orderController = {
    createOrder,
    getAllOrders,
    getOrdersByStore,
    getOrderByUser
};
