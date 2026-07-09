import React from 'react'
import Message from './Message'
import useGetMessages from '../hooks/useGetMessages'
import { useSelector } from "react-redux";
import useGetRealTimeMessage from '../hooks/useGetRealTimeMessage'

const Messages = () => {
    useGetRealTimeMessage();
    useGetMessages();
    const {messages}=useSelector(store=>store.message);
    
    return (
       <div className='px-4 flex-1 overflow-y-auto min-h-0'>
            {
                messages && messages?.map((message)=>{
                    return (
                        <Message key={message._id} message={message}/>
                    )
                })
            }
       

        </div>
    )
}

export default Messages
