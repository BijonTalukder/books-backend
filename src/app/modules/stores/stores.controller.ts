import { NextFunction, Request, Response } from "express";
import { storeService } from "./stores.service";
import httpsStatus from 'http-status-codes'
import { fileUploadHelper } from "../../../helpers/fileUploadHelper";
import { ICloudinaryResponse, IUploadFile } from "../../interface/file";
import { JwtHelper } from "../../../helpers/jwt/decodeJwt";
import { UserModel } from "../users/users.model";
import mongoose from "mongoose";
import pick from "../../../shared/pick";
const createStore = async (req: Request,
  res: Response,
  next: NextFunction) => {
  const token = req?.headers.authorization
  const ReqData = JwtHelper.decode(token as string, "very-secret");
  console.log(req?.header, ReqData);


  const userData = await UserModel.findOne({ email: ReqData?.email })

  const data = JSON.parse(req?.body?.data);
  const ImgUrl: ICloudinaryResponse = await fileUploadHelper.uploadToCloudinary(req.file as IUploadFile);
  console.log(ImgUrl, "imageUrl");
  const finalData = { ...data, imgUrl: ImgUrl.url, userId: userData?._id };

  const result = await storeService.createStore(finalData);


  res.status(200).json({
    statusCode: httpsStatus.OK,
    success: true,
    message: "book created successfully!",
    data: result,
  });

}

const getStore = async (
  req: Request,
  res: Response,
  next: NextFunction) => {
  console.log(req.query.lat);


  const filter = pick(req.query, ['priceRange', 'deliveryTime', 'category', 'cuisines', 'lat', 'lng'])
  console.log(filter);

  let query = [];
  if (filter.priceRange) {
    query.push({
      $lte: parseInt(filter?.priceRange as string)
    })

  }
  if (filter.deliveryTime) {
    query.push({
      $lte: parseInt(filter?.deliveryTime as string)
    })

  }
  if(filter.lat && filter.lng)
  {
    query.push({
      $geoNear: {
        near: {
          type: "Point",
          coordinates: [
           parseFloat(filter.lng as string),
           parseFloat(filter.lon as string),
          ],
        },
        distanceField: "distance",
        maxDistance: 10 * 1000,
        spherical: true,
      },
    })
  }







  const result = await storeService.getStore(query);

  res.status(200).json({
    statusCode: httpsStatus.OK,
    success: true,
    message: "get store successfully!",
    data: result,
  });
}

const getSingleStore = async (req: Request, res: Response, next: NextFunction) => {

  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(httpsStatus.BAD_REQUEST).json({
      statusCode: httpsStatus.BAD_REQUEST,
      success: false,
      message: "Invalid store ID",
    });
  }

  const result = await storeService.getSingleStore(id);
  res.status(200).json({
    statusCode: httpsStatus.OK,
    success: true,
    message: "get store successfully!",
    data: result,
  });
}

const getProductByStore = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
}

export const storeController = {
  createStore,
  getStore,
  getSingleStore,
  getProductByStore
}