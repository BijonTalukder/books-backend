import ApiError from "../../errors/ApiError";
import { UserModel } from "../users/users.model";
import { ILogInUser } from "./auth.interface";
import httpsStatus from "http-status-codes"
import jwt from "jsonwebtoken"
const LogIn = async (payload:ILogInUser)=>{
    const {email,password} = payload

    const isEmailExist =await UserModel.exists({email})
    const isPasswordExist =await UserModel.exists({password})
    if(!isEmailExist){
        throw new ApiError(httpsStatus.NOT_FOUND,"email not found")
    }
    if(!isPasswordExist){
        throw new ApiError(httpsStatus.NOT_FOUND,"password not found")
    }
    const userExist = await UserModel.findOne({
        email:email,
        password:password
    })
    if(userExist){
        const payload ={}
        const jwtToken = jwt.sign(payload,'very-secret',{expiresIn:'365d'})
        return jwtToken

    }

}
export const AuthService = {LogIn}