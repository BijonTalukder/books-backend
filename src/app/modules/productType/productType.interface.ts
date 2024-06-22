import { Model } from "mongoose";

export type IProductType ={
    productTypeName:string;
    ImgUrl:string
    createdAt:Date

}
export type IProductTypeModel = Model<IProductType>