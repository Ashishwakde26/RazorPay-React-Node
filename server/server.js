import express from "express";
import { config } from 'dotenv';
import Razorpay from 'razorpay';
import cors from 'cors';
import paymentRoute from "./routes/paymentRoute.js";
import { connectDB } from './config/database.js';

config({ path: './config/config.env'})

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use("/api", paymentRoute);


app.get("/api/getkey", (req, res) => {
    res.status(200).json({
        key: process.env.RAZORPAY_API_KEY
    })
})


export const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET,
  });


app.listen(process.env.PORT, 
    ()=> console.log(`Server is running on ${process.env.PORT}`))