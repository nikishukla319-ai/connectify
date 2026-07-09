import React from 'react';
import Sidebar from './Sidebar'
import MessageContainer from './MessageContainer'
import { useSelector } from 'react-redux';

const HomePage = () =>{
    const {selectedUser} = useSelector(store=>store.user);
    return(
    <div className='flex flex-col md:flex-row w-full h-full sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
        <div className={`${selectedUser ? 'hidden' : 'flex'} md:flex flex-col w-full md:w-auto h-full`}>
          <Sidebar/>
        </div>
        <div className={`${selectedUser ? 'flex' : 'hidden'} md:flex flex-col w-full h-full`}>
          <MessageContainer/>
        </div>
    </div>
    )
}

export default HomePage
