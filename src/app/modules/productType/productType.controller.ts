import { NextFunction, Request, Response } from "express";

const createProductType = async(req:Request,res:Response,next:NextFunction)=>{
    try {
        // const {...postBody} = req.body
        // const { name } = req.body;
        console.log(req.files,req.body.data); // Form fields
        // console.log(req?.file); // Uploaded file details
        res.send({data:req.body})
        
    } catch (error) {
        
    }
}

export const productTypeController ={
    createProductType
}