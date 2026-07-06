import React from 'react';
const OtherUser = (props) =>{
    const user = props.user;
 console.log("USER DATA:", user); 

    return(
        <div>
            <div className='flex gap-2 items-center text-white hover:text-zinc-900 hover:bg-zinc-200 rounded-sm p-2 cursor-pointer'>
                <div className='flex items-center gap-3 '>
                    <div className="relative w-12 h-12">
  <img
    src={user?.profilePhoto}
    alt="user-profile"
    className="w-12 h-12 rounded-full object-cover"
  />

  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
</div>

                </div>
                <div className='flex flex-col flex-1'>
                 <div className='flex justify-between  gap-2 '>
                    <p>{user?.fullName}</p>

                 </div>

                </div>
                
            </div>
<hr className="border-t border-gray-500 my-2" />
        </div>
    )
}
export default OtherUser