import Signup from './components/Signup';
import './App.css';
import { createBrowserRouter,RouterProvider,Navigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import Login from './components/Login';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { setOnlineUsers } from './redux/userSlice';
import { setSocket } from './redux/socketSlice';
import { BASE_URL } from './config';

const ProtectedRoute = ({children}) => {
  const {authUser} = useSelector(store=>store.user);
  if(!authUser){
    return <Navigate to="/login" replace/>;
  }
  return children;
};

const PublicRoute = ({children}) => {
  const {authUser} = useSelector(store=>store.user);
  if(authUser){
    return <Navigate to="/" replace/>;
  }
  return children;
};

const router = createBrowserRouter([
  {
    path:"/",
    element:<ProtectedRoute><HomePage/></ProtectedRoute>
  },
  {
    path:"/register",
    element:<PublicRoute><Signup/></PublicRoute>
  },
  {
    path:"/login",
    element:<PublicRoute><Login/></PublicRoute>
  },
])


function App() {
  
  const {authUser}= useSelector(store=>store.user);
  const {socket}= useSelector(store=>store.socket);
  const dispatch = useDispatch();
  useEffect(()=>{
    
     if(authUser){
      const socket = io(BASE_URL,{
        query:{
          userId:authUser._id
        }
        
     });
      
       dispatch(setSocket(socket));
       socket.on('getOnlineUsers',(onlineUsers)=>{
        dispatch(setOnlineUsers(onlineUsers))
       });
       return ()=>socket.close();
     }else{
      if(socket){
        socket.close();
        dispatch(setSocket(null));
      }
     }
  },[authUser]);
  return (
    <div className="w-full max-w-full overflow-x-hidden h-screen flex items-stretch sm:items-center justify-center sm:p-4">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
