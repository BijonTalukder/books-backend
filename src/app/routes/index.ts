import express from 'express'
import { BooksRoute } from '../modules/books/books.routes'
import { UserRoute } from '../modules/users/users.routes'
import { AuthRouter } from '../modules/auth/auth.routes'
import { productTypeRouter } from '../modules/productType/productType.routes'
const router = express.Router()
router.use('/books',BooksRoute)
router.use('/user',UserRoute)
router.use('/auth',AuthRouter)
router.use('/productType',productTypeRouter)

export default router