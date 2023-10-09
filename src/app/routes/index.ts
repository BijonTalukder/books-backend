import express from 'express'
import { BooksRoute } from '../modules/books/books.routes'
import { UserRoute } from '../modules/users/users.routes'
import { AuthRouter } from '../modules/auth/auth.routes'
const router = express.Router()
router.use('/books',BooksRoute)
router.use('/user',UserRoute)
router.use('/auth',AuthRouter)

export default router