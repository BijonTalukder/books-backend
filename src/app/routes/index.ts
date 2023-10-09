import express from 'express'
import { BooksRoute } from '../modules/books/books.routes'
import { UserRoute } from '../modules/users/users.routes'
const router = express.Router()
router.use('/books',BooksRoute)
router.use('/user',UserRoute)

export default router