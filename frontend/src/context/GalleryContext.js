"use client"
import React, { useContext, useEffect, useState } from "react";

const Context = React.createContext(null);

export const GalleryProvider = ({children})=>{
    const [allGallery,setAllGallery] = useState([]);
    const [myGallery,setMyGallery] = useState([]);
    const [existCategory,setExistCategory] = useState([]);
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
        if(localStorage.getItem("allgallery")){
            setAllGallery(JSON.parse(localStorage.getItem("allgallery")))
        }
        if(localStorage.getItem("mygallery")){
            setMyGallery(JSON.parse(localStorage.getItem("mygallery")))
        }
        if(localStorage.getItem("existcategories")){
            setExistCategory(JSON.parse(localStorage.getItem("existcategories")))
        }
        setLoading(false)
    },[])

    useEffect(()=>{
        if(!loading){
            localStorage.setItem("mygallery",JSON.stringify(myGallery))
        }
    },[myGallery])


    return (
        <Context.Provider value={{allGallery,myGallery,existCategory,loading,setAllGallery,setMyGallery,setExistCategory}}>
            {children}
        </Context.Provider>
    )
}

export const useGallery = () => useContext(Context); 