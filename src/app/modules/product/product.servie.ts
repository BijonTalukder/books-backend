import { IProduct } from "./product.interface"
import { productModel } from "./product.model"

const createProduct =async(postBody:IProduct)=>{
    const result = await productModel.create(postBody);
    return result;

}
const getProduct = async()=>{
    const result = await productModel.find({});
}
export const productServiece={createProduct,getProduct}
