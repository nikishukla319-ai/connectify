import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import userRoute from "./routes/userRoute.js";
import cookieParser from "cookie-parser";
import dns from "dns"; 
dns.setServers(["1.1.1.1","8.8.8.8"]);
dotenv.config({});

const app= express();

const port= process.env.port || 5000;

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/user",userRoute);

app.listen(port,()=>{
    connectDB();
    console.log(`Server listen at port ${port}`);
})




