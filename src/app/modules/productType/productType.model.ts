import { Schema, model } from "mongoose";
import { IProductType, IProductTypeModel } from "./productType.interface";

const productTypeSchema = new Schema<IProductType>(
    {
        productTypeName:{
            type:String
        },
        ImgUrl:{
            type:String
        }
        ,
        createdAt:{
            type:Date,
            default:Date.now()
        }
       

    },
    {
        timestamps:true
    }
)
export const productTypeModel = model<IProductType,IProductTypeModel>("productTypes",productTypeSchema)