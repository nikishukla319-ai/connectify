import React, { useEffect } from 'react'
import axios from "axios";
import { BASE_URL } from "../config";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from '../redux/messageSlice';

const useGetMessages = ()=>{
    const {selectedUser}=useSelector(store=>store.user);
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchMessages = async(clearFirst)=>{
            
            if(clearFirst) dispatch(setMessages([]));
            try{
                axios.defaults.withCredentials=true;
                const res= await axios.get(`${BASE_URL}/api/v1/message/${selectedUser?._id}`);
                dispatch(setMessages(res.data))

            } catch(error){
                console.log(error);
                if(clearFirst) dispatch(setMessages([])); 
            }
        }
        if(selectedUser?._id){
            fetchMessages(true);

            
            const intervalId = setInterval(()=>fetchMessages(false), 3000);
            return ()=>clearInterval(intervalId);
        }

    },[selectedUser])

}
    
export default useGetMessages
