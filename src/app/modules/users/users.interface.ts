import { Model } from "mongoose"

export type IUser ={
    id:string,
    role:string,
    email:string,
    password:string

}

export type IUserModel = Model<IUser>