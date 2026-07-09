import { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import { setMessages } from '../redux/messageSlice';
const useGetRealTimeMessage=()=>{
   const {socket} = useSelector(store=>store.socket);
   const {selectedUser} = useSelector(store=>store.user);
   const {messages}= useSelector(store=>store.message);
   const dispatch = useDispatch();
   useEffect(()=>{
    const messageHandler = (newMessage) => {
        if(newMessage.senderId === selectedUser?._id || newMessage.receiverId === selectedUser?._id){
            dispatch(setMessages([...(messages || []), newMessage]));
        }
    };
    socket?.on("newMessage", messageHandler);

    return () => {
        socket?.off("newMessage", messageHandler);
    };
   },[socket, messages, selectedUser]);
};
export default useGetRealTimeMessage;