import mongoose, { Mongoose, Schema, model } from "mongoose";
import { IStore } from "./stores.interface";


const storeSchema = new Schema<IStore>({
    storeName:{
        type:String
    },
    imgUrl:{
        type:String
    },
    pointLocation:{
        storeAddress:{
            type:String
        },
        type: {
            type: String,
            enum: ["Point"],
            // required: true,
            default: "Point",
          },
        coordinates:{
            type:[
                Number
            ]
        }
    },
    status:{
        type:String,
        enum:["active","inactive","pending","deleted"]
    },
    userId:{
        type:Schema.Types.ObjectId,
        required:true,
        unique:true,
        ref:'users'

    }
})
storeSchema.index({ pointLocation: "2dsphere" });
export const StoreModel = model<IStore>('Store', storeSchema);