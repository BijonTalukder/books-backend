import { NextFunction, Request, Response } from "express";
import { storeService } from "./stores.service";
import httpsStatus from 'http-status-codes'
const createStore = async(  req: Request,
    res: Response,
    next: NextFunction)=>{
       console.log(req.body);
       
        const result = await storeService.createStore(req.body);
       
       
        res.status(200).json({
            statusCode: httpsStatus.OK,
            success: true,
            message: "book created successfully!",
            data: result,
          });

    }

export const storeController ={
    createStore
}