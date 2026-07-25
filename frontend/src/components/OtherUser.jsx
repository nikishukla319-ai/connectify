import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from '../redux/userSlice';
import axios from "axios";
import { BASE_URL } from "../config";

const OtherUser = ({user}) =>{
    const dispatch = useDispatch();
    const {selectedUser,onlineUsers} = useSelector(store=>store.user);
    const isOnline = onlineUsers?.includes(user._id) || false;


    const selectedUserHandler = (user)=>{
       
        if(user.connectionStatus==="accepted"){
            dispatch(setSelectedUser(user));
        }
    }


    const connectHandler = async(e)=>{
        e.stopPropagation();
        axios.defaults.withCredentials = true;
        await axios.post(`${BASE_URL}/api/v1/user/connect/${user._id}`);
        window.location.reload(); 
    }

   
    const acceptHandler = async(e)=>{
        e.stopPropagation();
        axios.defaults.withCredentials = true;
        await axios.post(`${BASE_URL}/api/v1/user/accept/${user._id}`);
        window.location.reload();
    }

    return(
        <>
            <div  onClick={()=>selectedUserHandler(user)} className={` ${selectedUser?._id===user?._id? 'bg-zinc-200 text-black':'text-white'} flex gap-2 hover:text-black items-center  hover:bg-zinc-200 rounded p-2 ${user.connectionStatus==="accepted" ? "cursor-pointer" : ""}`}>
                <div className={`flex items-center gap-3 ${isOnline ?'online':''}` }>
                    <div className="relative w-12 h-12">
  <img
    src={user?.profilePhoto}
    alt="user-profile"
    className="w-12 h-12 rounded-full object-cover"
  />

  {isOnline && (
  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
)}
</div>

                </div>
                <div className='flex flex-col flex-1'>
                 <div className='flex justify-between items-center gap-2 '>
                    <p>{user?.fullName}</p>

                    {/* Yahi 3 lines asli "privacy" feature hain */}
                    {user.connectionStatus==="none" && (
                        <button onClick={connectHandler} className="btn btn-xs">Connect</button>
                    )}
                    {user.connectionStatus==="pending_sent" && (
                        <span className="text-xs text-gray-400">Pending</span>
                    )}
                    {user.connectionStatus==="pending_received" && (
                        <button onClick={acceptHandler} className="btn btn-xs btn-success">Accept</button>
                    )}
                 </div>

                </div>
                
            </div>
<hr className="border-t border-gray-500 my-2" />
        </>
    )
}
export default OtherUser
