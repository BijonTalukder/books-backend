import { Model } from "mongoose"

export type IUser ={
    id:string,
    email:string,
    password:string

}

export type IUserModel = Model<IUser>