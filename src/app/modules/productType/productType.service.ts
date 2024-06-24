import { IProductType } from "./productType.interface";
import { productTypeModel } from "./productType.model"

const createProductType = async(postData)=>{
    console.log(postData);

    const result = await productTypeModel.create(postData)
    return result;
}
const getProductType = async()=>{
    const result = await productTypeModel.find({});
    return result
}
export const productTypeService={
    createProductType,
    getProductType
}