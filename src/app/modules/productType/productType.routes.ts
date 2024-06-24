import  express  from "express"
import { productTypeController } from "./productType.controller";
import multer from 'multer'
import { fileUploadHelper } from "../../../helpers/fileUploadHelper";

const router = express.Router();
router.post("/create",fileUploadHelper.upload.single('file'),productTypeController.createProductType)
router.get("/", productTypeController.getProductType);


export const productTypeRouter = router