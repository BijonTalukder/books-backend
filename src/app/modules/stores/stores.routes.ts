
import express from 'express'
import { storeController } from './stores.controller'
import { fileUploadHelper } from '../../../helpers/fileUploadHelper'
const router = express.Router()

router.post("/create",fileUploadHelper.upload.single('file'),storeController.createStore)
router.get("/",storeController.getStore)
export const storeRouter = router