import httpsStatus from 'http-status-codes'
import { NextFunction, Request, Response } from "express";
import { cartService } from "./cart.service";

const createCart = async(req:Request,res:Response,next:NextFunction)=>{
    const result = await cartService.createCart(req.body);
    res.status(200).json({
        statusCode: httpsStatus.OK,
        success: true,
        message: "get cart successfully!",
        data: result,
      });
    
}
export const cartController={
    createCart
}