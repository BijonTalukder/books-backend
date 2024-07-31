import { NextFunction, Request, Response } from "express"
import { productServiece } from "./product.servie"
import httpsStatus from 'http-status-codes'
const createProduct =async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const result = await productServiece.createProduct(req.body)

        res.status(200).json({
            statusCode: httpsStatus.OK,
            success: true,
            message: "get store successfully!",
            data: result,
          });
        
    } catch (error) {
        
    }

}
const getProduct = async(req:Request,res:Response,next:NextFunction)=>{
    const result = await productServiece.getProduct();
    
}
export const productController={createProduct,getProduct}
