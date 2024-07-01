import mongoose, { Model } from "mongoose";

 export enum StoreStatus {
    Active = 'active',
    Inactive = 'inactive',
    Pending = 'pending',
    Deleted = 'deleted'
}
export interface IStore extends mongoose.Document {
    storeName: string;
    userId: mongoose.Types.ObjectId; // Use mongoose.Types.ObjectId for userId
    imgUrl: string;
    status: StoreStatus;
    pointLocation: {
        storeAddress: string;
        coordinates: number[];     
    };
}
 export const IStoreModel= Model<IStore>