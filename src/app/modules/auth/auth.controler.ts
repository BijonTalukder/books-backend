import { NextFunction, Request, Response } from "express";

const LogInUser = async (req:Request,res:Response,next:NextFunction) =>{
    try{

        const {...LogInData} = req.body;
        const result = await 
    }
    catch(e){

    }

}
export const AuthController ={
    LogInUser
}