import React from 'react';
import SendInput from './SendInput';
import Messages from './Messages';

const MessageContainer= () =>{
    return(
    
       <div className='md:min-w-[550px] flex flex-col'>
            <div className='flex gap-2 items-center bg-zinc-800 text-white px-4 py-2 mb-2'>
                <div className='flex items-center gap-3 '>
                    <div className="relative w-12 h-12">
  <img
    src="https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg"
    alt="user-profile"
    className="w-12 h-12 rounded-full object-cover"
  />

  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
</div>

                </div>
                <div className='flex flex-col flex-1'>
                 <div className='flex justify-between  gap-2 '>
                    <p>Nikita Shukla</p>

                 </div>

                </div>

                
            </div>
            <Messages/>
            <SendInput/>
        </div>

    
    )
}

export default MessageContainer