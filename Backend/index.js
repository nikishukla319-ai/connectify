import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import userRoute from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import dns from "dns"; 
dns.setServers(["1.1.1.1","8.8.8.8"]);
dotenv.config({});

const app= express();

const port= process.env.port || 5000;

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
const corsOption={
    origin:'http://localhost:3000',
    credentials:true
};

app.use(cors(corsOption));

app.use("/api/v1/user",userRoute);
app.use("/api/v1/message",messageRoute);

app.listen(port,()=>{
    connectDB();
    console.log(`Server listen at port ${port}`);
})




