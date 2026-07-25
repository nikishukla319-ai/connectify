import{User} from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
 
export const register = async(req,res)=>{
    try{
        const {fullName,username,password,confirmPassword,gender}=req.body;
        if(!fullName||!username||!password||!confirmPassword||!gender){
            return res.status(400).json({message:"All fields are required"});
        }
        if(password != confirmPassword){
            return res.status(400).json({message:"Password do not match"});
 
        }
        const user = await User.findOne({username});
        if(user){
            return res.status(400).json({message:"Username already exit try different"});
        }
        const  hashedPassword=await bcrypt.hash(password,10);
        const maleProfilePhoto =`https://randomuser.me/api/portraits/men/${Math.floor(Math.random()*100)}.jpg`;
        const femaleProfilePhoto=`https://randomuser.me/api/portraits/women/${Math.floor(Math.random()*100)}.jpg`;
 
        await User.create({
            fullName,
            username,
            password:hashedPassword,
            profilePhoto:gender==="male"?maleProfilePhoto:femaleProfilePhoto,
            gender
        });
        return res.status(201).json({
            message:"Account created successfully.",
            success:true
 
        })
    } catch (error){
        console.log(error);
         return res.status(500).json({message:"Internal server error"});
 
    }
};
export const login = async(req,res)=>{
    try{
        const{username,password}=req.body;
        if(!username||!password){
            return res.status(400).json({message:"All fields are required"});
        };
        const user=await User.findOne({username});
        if(!user){
            return res.status(400).json({
                message:"Incorrect username or password",
                success:false
            })
        };
        const isPasswordMatch= await bcrypt.compare(password,user.password);
        if(!isPasswordMatch){
            return res.status(400).json({
                message:"Incorrect username or password",
                success:false
            })
       };
       const tokenData={
        userId:user._id
       };
       const token=await jwt.sign(tokenData,process.env.JWT_SECRET_KEY,{expiresIn:'1d'});
       return res.status(200).cookie("token",token,{maxAge:1*24*60*60*1000,httpOnly:true,sameSite:'none',secure:true}).json({
        _id:user._id,
        username:user.username,
        fullName:user.fullName,
        profilePhoto:user.profilePhoto
       });
 
    } catch(error){
        console.log(error);
        return res.status(500).json({message:"Internal server error"});
    }
};
 
    export const logout=(req,res)=>{
        try{
            return res.status(200).cookie("token","",{maxAge:0,httpOnly:true,sameSite:'none',secure:true}).json({
                message:"logged out successfully."
            })
 
        }catch(error){
            console.log(error);
            return res.status(500).json({message:"Internal server error"});
        }
    }
    export const getOtherUsers=async(req,res)=>{
        try{
            const loggedInUserId=req.id;
            const me = await User.findById(loggedInUserId);
            const otherUsers = await User.find({_id:{$ne:loggedInUserId}}).select("-password");
 
           
            const usersWithStatus = otherUsers.map((u)=>{
                let connectionStatus="none";
                if(me.connections.includes(u._id)){
                    connectionStatus="accepted";
                } else if(me.pendingRequests.includes(u._id)){
                    connectionStatus="pending_received";
                } else if(u.pendingRequests.includes(loggedInUserId)){
                    connectionStatus="pending_sent";
                }
                const userObj = u.toObject();
                delete userObj.pendingRequests; // kisi aur ki request list expose nahi karni
                delete userObj.connections;
                return {...userObj, connectionStatus};
            });
 
            return res.status(200).json(usersWithStatus);
 
        }catch(error){
            console.log(error);
            return res.status(500).json({message:"Internal server error"});
        }
 
    }
 
   
    export const connectRequest = async(req,res)=>{
        try{
            const myId = req.id;
            const targetId = req.params.id;
            if(myId===targetId){
                return res.status(400).json({message:"Khud ko request nahi bhej sakte"});
            }
            const target = await User.findById(targetId);
            if(!target){
                return res.status(404).json({message:"User not found"});
            }
            if(!target.pendingRequests.includes(myId) && !target.connections.includes(myId)){
                target.pendingRequests.push(myId);
                await target.save();
            }
            return res.status(200).json({message:"Request bhej di"});
        }catch(error){
            console.log(error);
            return res.status(500).json({message:"Internal server error"});
        }
    }
 
    
    export const acceptRequest = async(req,res)=>{
        try{
            const myId = req.id;
            const requesterId = req.params.id;
            const me = await User.findById(myId);
 
            if(!me.pendingRequests.includes(requesterId)){
                return res.status(400).json({message:"Aisi koi request nahi hai"});
            }
 
            me.pendingRequests = me.pendingRequests.filter((id)=>id.toString()!==requesterId);
            me.connections.push(requesterId);
            await me.save();
 
            await User.findByIdAndUpdate(requesterId, {$addToSet:{connections:myId}});
 
            return res.status(200).json({message:"Connected!"});
        }catch(error){
            console.log(error);
            return res.status(500).json({message:"Internal server error"});
        }
    }
 
