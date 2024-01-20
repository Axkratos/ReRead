import express, { urlencoded } from 'express'
import cookieParser from 'cookie-parser'
import userRouter from './routes/user.route.js'
import bookRouter from './routes/book.route.js'

import cors from 'cors'

const app = express()
//k ra kasto access dini
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }),
)

app.use(
  express.json({
    limit: '16kb',
  }),
)
app.use(
  urlencoded({
    limit: '16kb',
    extended: true,
  }),
)
app.use(express.static('public'))
app.use(cookieParser())
//routes haru

//related functionality ko lagi routes dini
app.use('/api/v1/user', userRouter)
app.use('/api/v1/book', bookRouter)

export { app }
