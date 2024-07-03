import { StoreModel } from "./stores.model";

const createStore=async(postBody:any)=>{

    const result = await StoreModel.create(postBody);
    return result;
}

export const storeService ={
    createStore
}