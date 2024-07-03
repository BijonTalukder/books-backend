import { NextFunction, Request, Response } from "express";
import { storeService } from "./stores.service";
import httpsStatus from 'http-status-codes'
import { fileUploadHelper } from "../../../helpers/fileUploadHelper";
import { ICloudinaryResponse, IUploadFile } from "../../interface/file";
const createStore = async(  req: Request,
    res: Response,
    next: NextFunction)=>{
       console.log(req.body);
       const data = JSON.parse(req.body.data);
       const ImgUrl:ICloudinaryResponse = await fileUploadHelper.uploadToCloudinary(req.file as IUploadFile);
       console.log(ImgUrl,"imageUrl");
       const finalData = { ...data, imgUrl: ImgUrl.url };

        const result = await storeService.createStore(finalData);
       
       
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