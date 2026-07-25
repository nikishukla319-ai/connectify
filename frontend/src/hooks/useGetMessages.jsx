import React, { useEffect } from 'react'
import axios from "axios";
import { BASE_URL } from "../config";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from '../redux/messageSlice';

const useGetMessages = ()=>{
    const {selectedUser}=useSelector(store=>store.user);
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchMessages = async()=>{
            
            dispatch(setMessages([]));
            try{
                axios.defaults.withCredentials=true;
                const res= await axios.get(`${BASE_URL}/api/v1/message/${selectedUser?._id}`);
                console.log(res);
                dispatch(setMessages(res.data))

            } catch(error){
                console.log(error);
                dispatch(setMessages([])); // fetch fail hua (e.g. not connected) -> khaali rakho
            }
        }
        if(selectedUser?._id){
            fetchMessages();
        }

    },[selectedUser])

}
    
export default useGetMessages
