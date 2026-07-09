import React, { useState } from 'react';
import { BiSearchAlt2 } from "react-icons/bi";
import OtherUsers from './OtherUsers';
import axios from "axios";
import { BASE_URL } from "../config";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { setAuthUser, setOtherUsers, setSelectedUser } from '../redux/userSlice';;


const Sidebar = () =>{
  const [search,setSearch]=useState("");
  const {OtherUsers: allUsers}=useSelector(store=>store.user);
  const dispatch= useDispatch();

  const navigate = useNavigate();
    const logoutHandler= async()=>{
      try{
        const res= await axios.get(`${BASE_URL}/api/v1/user/logout`);
        console.log(res);
        navigate("/login");
        toast.success(res.data.message);
        dispatch(setAuthUser(null));

      } catch(error){
        console.log(error);

      }
      
    }
    const  searchSubmitHandler=(e)=>{
      e.preventDefault();
     const conversationUser=allUsers?.find((user)=> user.fullName.toLowerCase().includes(search.toLowerCase()));
      if(conversationUser){
        dispatch(setSelectedUser(conversationUser));;
      }else{
          toast.error("User not found!");
      }
      
    
    }
    return(
    <div className="border-r border-slate-500 p-4 flex flex-col w-full md:w-80 h-full overflow-hidden">
        <form  onSubmit={searchSubmitHandler} action="" className='flex items-center gap-2'>
            <input
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
  className="input input-bordered rounded-md pl-4 w-full min-w-0"
  type="text"
  placeholder="Search..."
/>
            <button
  type="submit"
  className="btn bg-zinc-500 text-white hover:bg-zinc-700 transition-all duration-100 shrink-0"
>
  <BiSearchAlt2 className="w-6 h-6" />
</button>
        </form>
        <div className="divider px-3"></div>
        
        <OtherUsers />
      <div className='mt-2'>
        
    <button onClick={logoutHandler} className="bg-white text-black px-6 py-2 rounded-lg shadow hover:bg-gray-200 transition">
        Logout
    </button>
    </div>
    </div>


  
    
    )
}

export default Sidebar
