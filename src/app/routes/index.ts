import express from 'express'
import { BooksRoute } from '../modules/books/books.routes'
import { UserRoute } from '../modules/users/users.routes'
import { AuthRouter } from '../modules/auth/auth.routes'
import { productTypeRouter } from '../modules/productType/productType.routes'
import { storeRouter } from '../modules/stores/stores.routes'
import { ProductRouter } from '../modules/product/product.routes'
const router = express.Router()
router.use('/books',BooksRoute)
router.use('/user',UserRoute)
router.use('/auth',AuthRouter)
router.use('/productType',productTypeRouter)
router.use('/stores',storeRouter)
router.use("/product",ProductRouter)

export default router