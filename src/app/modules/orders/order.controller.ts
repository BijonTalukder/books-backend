import { IOrder, OrderStatus, PaymentStatus } from './order.interface';
import { NextFunction, Request, Response } from "express";
import { orderService } from "./order.service";
import httpsStatus from 'http-status-codes';
import { JwtHelper } from "../../../helpers/jwt/decodeJwt";
import { UserModel } from "../users/users.model";
import { StoreModel } from "../stores/stores.model";
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import ApiError from '../../errors/ApiError';
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

        const store_id = 'bijon66efc7e8a6d5e';
        const store_password = 'bijon66efc7e8a6d5e@ssl';
        const is_live = false;
        const tran_id = uuidv4();
    
        const orderData = {
            userId:  userData._id,
            storeId: storeData?._id,
            items,
            deliveryAddress,
            paymentMethod,
            
          
            orderId: new mongoose.Types.ObjectId().toString(),  
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

        if(paymentMethod=="ssl")
            {
                const data = {
                    total_amount: price,
                    currency: 'BDT',
                    tran_id: tran_id, // unique tran_id for each API call
                    success_url: `${dotenvHelper.backend_url}/api/v1/success?transactionId=${tran_id}`,
                    fail_url: `${dotenvHelper.backend_url}/api/v1/fail?transactionId=${tran_id}`,
                    cancel_url: `${dotenvHelper.backend_url}/api/v1/cancel?transactionId=${tran_id}`,
                    ipn_url: `${dotenvHelper.backend_url}/api/v1/cancel?transactionId=${tran_id}`,
                    shipping_method: 'Courier',
                    product_name: productName,
                    product_category: 'software',
                    product_profile: 'non-physical-goods',
                    cus_name: name,
                    cus_email: email,
                    cus_add1: address,
                    cus_phone: phone,
                    ship_name: name,
                    ship_add1: address,
                    ship_city: address,
                    ship_postcode: 1000,
                    ship_country: 'Bangladesh',
                };
            
                // Initialize SSLCommerz
                const sslcz = new SSLCommerzPayment(store_id, store_password, is_live);
            
                // Call SSLCommerz API and handle response
                sslcz.init(data)
                .then(apiResponse => {
                    console.log('SSLCommerz Response:', apiResponse); // Log response
                    let GatewayPageURL = apiResponse.GatewayPageURL;
                    if (GatewayPageURL) {
                        res.status(httpsStatus.OK).json({
                            success: true,
                            message: 'Payment gateway initialized successfully',
                            GatewayPageURL: GatewayPageURL
                        });
                    } else {
                        throw new ApiError(httpsStatus.BAD_REQUEST, 'Unable to initiate payment');
                    }
                })
                .catch(err => {
                    console.error('SSLCommerz Error:', err); // Log detailed error
                    next(new ApiError(httpsStatus.INTERNAL_SERVER_ERROR, `Payment initialization failed${err}`));
                });
            
    
            }

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
