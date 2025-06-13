import express from "express"
import cors from 'cors'
import cookieParser from 'cookie-parser'

//cors is used for cross origin resource sharing
//app.use is used for middle ware or configuration setting
const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true 
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended:true,limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


// routes import
import userRouter from "./routes/user.routes.js";

// routes decleration
// ab router ko lane ke lite middleware lama padega

app.get("/api/v2/users",userRouter)
// app.get("/users",userRouter)

// contol pass ho gaya user.routes.js ko
//  http://localhost:800/api/v2/users/register

export {app}