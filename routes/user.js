import express from 'express'
import { getUser, postUser } from '../controllers/user.js'

const userRouter = express.Router()

userRouter.get('/', getUser)
userRouter.post('/', postUser)

export default userRouter