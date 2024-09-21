import { StoreModel } from "./stores.model";

const createStore=async(postBody:any)=>{

    const result = await StoreModel.create(postBody);
    return result;
}
const getStore = async()=>{
    const result = await StoreModel.find({})
    return result
}

export const storeService ={
    createStore,
    getStore
}