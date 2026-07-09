import React, { useEffect } from 'react';
import SendInput from './SendInput';
import Messages from './Messages';
import { useDispatch, useSelector } from "react-redux";
import {setSelectedUser} from '../redux/userSlice';
import { BiArrowBack } from "react-icons/bi";


const MessageContainer = () =>{
    const {selectedUser,authUser,onlineUsers}= useSelector(store=>store.user);
    const dispatch=useDispatch();

    const isOnline = onlineUsers?.includes(selectedUser?._id) || false;

    const backHandler = () => {
        dispatch(setSelectedUser(null));
    }
    
    return(
        <>
        {
          selectedUser !== null ? (
            <div className='w-full md:min-w-[550px] flex flex-col h-full overflow-hidden'>
            <div className='shrink-0 flex gap-2 items-center bg-zinc-800 text-white px-4 py-2 mb-2'>
                <button onClick={backHandler} className='md:hidden text-white mr-1'>
                  <BiArrowBack className="w-6 h-6" />
                </button>
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
            <div className='shrink-0'>
              <SendInput/>
            </div>
        </div>

          ) :(
            <div className='hidden md:flex w-full md:min-w-[550px] flex-col justify-center items-center h-full'>
            <h1 className='text-4xl  text-white font-bold'>Hi,{authUser?.fullName}</h1>
            <h1 className='text-2xl text-white'>Let's start conversation</h1>
            </div>
          )
        }
        </>
    
       

    
    )
}

export default MessageContainer
