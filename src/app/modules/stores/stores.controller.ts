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
  next: NextFunction
) => {
  try {
    const filter = pick(req.query, [
      'priceRange',
      'deliveryTime',
      'category',
      'cuisines',
      'lat',
      'lng'
    ]);
    console.log(filter);
const searchTerm =pick(req.query,["seachableFiled"]);
    let query: any[] = [];

    // Add $geoNear if lat and lng are provided
    if (filter.lat && filter.lng) {
      query.push({
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [
              parseFloat(filter.lng as string),
              parseFloat(filter.lat as string), // Corrected to use lat
            ],
          },
          distanceField: "distance",
          maxDistance: 10 * 1000, // 10 km
          spherical: true,
        },
      });
    }

    // Add $match for priceRange and deliveryTime
    const match: any = {};
    if (filter.priceRange) {
      match.price = { $lte: parseInt(filter.priceRange as string) };
    }
    if (filter.deliveryTime) {
      match.deliveryTime = { $lte: parseInt(filter.deliveryTime as string) };
    }

    // Push $match stage if there are filters
    if (Object.keys(match).length > 0) {
      query.push({ $match: match });
    }

    // Add additional filters if needed
    if (filter.category) {
      match.category = filter.category;
    }
    if (filter.cuisines) {
      match.cuisines = { $in: filter.cuisines.split(",") };
    }

    // Fetch data
    const result = await storeService.getStore(query);

    res.status(200).json({
      statusCode: httpsStatus.OK,
      success: true,
      message: "Get store successfully!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};


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