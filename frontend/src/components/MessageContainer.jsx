import React, { useEffect } from 'react';
import SendInput from './SendInput';
import Messages from './Messages';
import { useDispatch, useSelector } from "react-redux";
import {setSelectedUser} from '../redux/userSlice';


const MessageContainer = () =>{
    const {selectedUser,authUser,onlineUsers}= useSelector(store=>store.user);
    const dispatch=useDispatch();

    const isOnline = onlineUsers?.includes(selectedUser?._id) || false;
    
    return(
        <>
        {
          selectedUser !== null ? (
            <div className='md:min-w-[550px] flex flex-col'>
            <div className='flex gap-2 items-center bg-zinc-800 text-white px-4 py-2 mb-2'>
                <div className={`flex items-center gap-3  ${isOnline?'online':''}` }>
                    <div className="relative w-12 h-12">
  <img
    src={selectedUser?.profilePhoto}
    alt="user-profile"
    className="w-12 h-12 rounded-full object-cover"
  />

  {isOnline && (
  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
)}
</div>

                </div>
                <div className='flex flex-col flex-1'>
                 <div className='flex justify-between  gap-2 '>
                    <p>{selectedUser?.fullName}</p>

                 </div>

                </div>

                
            </div>
            <Messages/>
            <SendInput/>
        </div>

          ) :(
            <div className='md:min-w-[550px] flex flex-col justify-center items-center'>
            <h1 className='text-4xl  text-white font-bold'>Hi,{authUser?.fullName}</h1>
            <h1 className='text-2xl text-white'>Let's start conversation</h1>
            </div>
          )
        }
        </>
    
       

    
    )
}

export default MessageContainer