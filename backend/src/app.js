import express, { urlencoded } from 'express'
import cookieParser from 'cookieParser'
const dotenv = require('dotenv')

const app=express();
//k ra kasto access dini
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json({
    limit:"16kb"
}))
app.use(urlencoded({
    limit:"16kb",
    extended:true
}))
app.use(express.static("public"))
app.use(cookieParser())
//routes haru
import userRouter from'./routes/user.route'


//related functionality ko lagi routes dini
app.use('./api/v1/user',userRouter)

export {app}