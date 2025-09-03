import React, { useContext,useEffect } from 'react';
import { useNavigate, useRoutes } from 'react-router-dom';
import { AuthContext } from './authContext';
import App from "./App"
import Login from "./Login.jsx";   
import Signup from './signup.jsx';


function Routes() {
    const {currUser,setCurrUser}=useContext(AuthContext);
    const navigate=useNavigate();

    useEffect(()=>{
        const token=localStorage.getItem("token");
        const userId=localStorage.getItem("userId");

        if(userId && !currUser){
            setCurrUser(userId);
            navigate("/")
        }
        if(!userId && !["/login","/signup"].includes(window.location.pathname)){
            navigate("/login")
        }
        if (userId && window.location.pathname === "/login") {
            navigate("/");
        }
    },[currUser,setCurrUser,navigate])

    const element=useRoutes([
        {
            path:"/",
            element:<App/>
        },
        {
            path:'/signup',
            element:<Signup/>
        },
        {
            path:"/login",
            element:<Login/>
        }
    ])
    return element;
}

export default Routes;