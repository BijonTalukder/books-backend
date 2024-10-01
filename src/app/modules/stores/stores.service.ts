import { StoreModel } from "./stores.model";

const createStore=async(postBody:any)=>{

    const result = await StoreModel.create(postBody);
    return result;
}
const getStore = async()=>{
    const result = await StoreModel.find({})
    return result
}
const getSingleStore= async(id:any)=>{
    const result = await StoreModel.aggregate([
        {
            $match:{
              _id:id
            }
        },
        {
            $lookup:{
                from:"users",
                localField:"userId",
                foreignField:"_id",
                as:"userDetails"
            }
        }

    ])
    return result;

}

export const storeService ={
    createStore,
    getStore,
    getSingleStore
}