"use client"
import React, { useContext, useEffect, useState } from "react";

const Context = React.createContext(null);

export const AuthProvider = ({children})=>{
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
        if(localStorage.getItem("user")){
            setUser(JSON.parse(localStorage.getItem("user")))
            setLoading(false)
            return
        }else{
            setLoading(false);
        }
    },[])

    useEffect(()=>{
        if(!loading){
        localStorage.setItem("user",JSON.stringify(user));
        }
    },[user])


    return (
        <Context.Provider value={{user,loading,setUser}}>
            {children}
        </Context.Provider>
    )
}

export const useAuth = () => useContext(Context); 