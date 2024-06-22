import { Schema, model } from "mongoose";
import { IProductType, IProductTypeModel } from "./productType.interface";

const productTypeSchema = new Schema<IProductType>(
    {
        productTypeName:{
            type:String
        }

    },
    {
        timestamps:true
    }
)
export const productTypeModel = model<IProductType,IProductTypeModel>("productTypes",productTypeSchema)