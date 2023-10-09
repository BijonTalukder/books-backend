import express,{ Application, Request, Response } from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import router from "./app/routes"
// const express = require("express")
const app:Application = express()
const port = 3000
app.use(cookieParser())
app.use(cors())

//parser
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api/v1/',router)
app.get("/",(req:Request,res:Response)=>{
    res.send("server ok")
})

export default app