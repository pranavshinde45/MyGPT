import React from 'react';
import { useEffect,useState } from 'react';
import { createContext } from 'react';
import { useNavigate } from "react-router-dom"
import  {jwtDecode}  from "jwt-decode"

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate()
    const [currUser, setCurrUser] = useState(null);

    useEffect(() => {
        const checkAuth = () => {
            try {
                const token = localStorage.getItem("token");
                const userId = localStorage.getItem("userId");

                if (!token || !userId) return;

                const decoded = jwtDecode(token);
                const currTime = Date.now() / 1000;

                if (decoded.exp < currTime) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('userId');
                    setCurrUser(null);
                    navigate('/login');
                } else {
                    setCurrUser(userId)
                }
            } catch (err) {
                console.log(err);
                localStorage.removeItem("token");
                localStorage.removeItem("userId");
                setCurrUser(null);
                navigate("/login")
            }
        }
        checkAuth()
    }, [navigate])

    return(
        <AuthContext.Provider value={{currUser,setCurrUser}}>
            {children}
        </AuthContext.Provider>
    )
}