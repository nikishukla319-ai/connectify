import React from 'react';
import OtherUser from './OtherUser';
import useGetOtherUsers from '../hooks/useGetOtherUsers';
import { useSelector } from 'react-redux';


const OtherUsers = () => {
     useGetOtherUsers();
     const {OtherUsers}= useSelector(store=>store.user);
     if(!OtherUsers) return;
    
    return (
        <div className="h-full overflow-y-auto flex-1">
            {
                OtherUsers?.map((user)=>{
                    return (
                        <OtherUser key={user.id} user={user}/>

                    )
                })
            }
            
            
            




            

        </div>
    )
}
export default OtherUsers