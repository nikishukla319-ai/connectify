import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from '../redux/userSlice';
const OtherUser = ({user}) =>{
    const dispatch = useDispatch();
    const {selectedUser,onlineUsers} = useSelector(store=>store.user);
    const isOnline = onlineUsers?.includes(user._id) || false;
    
 
    const selectedUserHandler = (user)=>{
        
        dispatch(setSelectedUser(user));

    }



    return(
        <>
            <div  onClick={()=>selectedUserHandler(user)} className={` ${selectedUser?._id===user?._id? 'bg-zinc-200 text-black':'text-white'} flex gap-2 hover:text-black items-center  hover:bg-zinc-200 rounded p-2 cursor-pointer`}>
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
                 <div className='flex justify-between  gap-2 '>
                    <p>{user?.fullName}</p>

                 </div>

                </div>
                
            </div>
<hr className="border-t border-gray-500 my-2" />
        </>
    )
}
export default OtherUser