import  express  from "express"
import { productTypeController } from "./productType.controller";
import multer from 'multer'
import { fileUploadHelper } from "../../../helpers/fileUploadHelper";

const router = express.Router();
router.post("/create",fileUploadHelper.upload.single('file'),productTypeController.createProductType)
router.get("/",productTypeController.getProductType)
// const upload = multer({ dest: 'uploads/' });
// router.post("/create",fileUploadHelper.upload.single('file'),async(req,res)=>{
//     fileUploadHelper.uploadToCloudinary()
//     console.log(req.file,req.body.data);


    
//     res.send({data:"data"})
// })

export const productTypeRouter = router