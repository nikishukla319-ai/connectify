import {Conversation} from "../models/conversationModel.js";
import { Message } from "../models/messageModel.js";
import {User} from "../models/userModel.js";
import {getReceiverSocketId,io} from "../socket/socket.js"
 
 
export const sendMessage= async(req,res)=>{
    try{
        const senderId = req.id;;
        const receiverId = req.params.id;
 
        const {message}=req.body;
 
        const sender = await User.findById(senderId);
        if(!sender.connections.includes(receiverId)){
            return res.status(403).json({message:"Pehle connect karo, tabhi chat kar sakte ho."});
        }
 
        
        let gotConversation = await Conversation.findOne({
            participants:{$all :[senderId,receiverId]},
        });
        if(!gotConversation){
 
             console.log("Creating conversation...");
            gotConversation = await Conversation.create({
                participants:[senderId,receiverId]
            })
        };
       
        const newMessage = await Message.create({
            senderId,
            receiverId,
            message
        });
        if(newMessage){
            gotConversation.messages.push(newMessage._id);
        };
        
        await Promise.all([gotConversation.save(),newMessage.save()]);
        const receiverSocketId = getReceiverSocketId( receiverId);
         if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage",newMessage);
         }
        return res.status(201).json({
            newMessage
        })
 
    } catch(error){
        console.log(error);
        return res.status(500).json({message:"Internal server error"});
    }
}
export const getMessage = async(req,res)=>{
    try{
        const receiverId = req.params.id;
        const senderId = req.id;
 
        const sender = await User.findById(senderId);
        if(!sender.connections.includes(receiverId)){
            return res.status(403).json({message:"Pehle connect karo, tabhi chat kar sakte ho."});
        }
 
 
        const conversation = await Conversation.findOne({
            participants:{$all :[senderId,receiverId]}
       }).populate("messages");
       return  res.status(200).json(conversation?.messages);
       
 
    }catch(error){
        console.log(error);
        return res.status(500).json({message:"Internal server error"});
    }
}
