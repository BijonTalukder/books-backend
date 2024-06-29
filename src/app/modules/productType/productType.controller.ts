import { NextFunction, Request, RequestHandler, Response } from "express";
import { fileUploadHelper } from "../../../helpers/fileUploadHelper";
import { productTypeService } from "./productType.service";
import httpsStatus from "http-status-codes"

const createProductType: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { ...postBody } = req.body;
    const data = JSON.parse(postBody.data);
    const ImgUrl = await fileUploadHelper.uploadToCloudinary(req.file);

    const finalData = { ...data, ImgUrl: ImgUrl.url };
    const result = await productTypeService.createProductType(finalData);
    res.status(200).json({
      statusCode: httpsStatus.OK,
      success: true,
      message: "book created successfully!",
      data: result,
    });
  } catch (error) {}
};
const getProductType: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await productTypeService.getProductType();
    res.status(200).json({
      statusCode: httpsStatus.OK,
      success: true,
      message: "get product type successfully!",
      data: result,
    });
  } catch (error) {}
};
const getSingleProdutType:RequestHandler = async(req: Request,
  res: Response,
  next: NextFunction)=>{
    try {
      const result = await productTypeService.getSingleProductType(req.params.id);
      res.status(200).json({
        statusCode: httpsStatus.OK,
        success: true,
        message: "get product type successfully!",
        data: result,
      });
      
    } catch (error) {
      
    }

}
export const productTypeController ={
    createProductType,
    getProductType,
    getSingleProdutType
}