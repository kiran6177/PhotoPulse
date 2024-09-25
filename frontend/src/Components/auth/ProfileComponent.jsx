"use client";
import React, { useEffect, useState } from "react";
import EditProfile from "./EditProfile";
import FullButton from "../common/FullButton";
import useFetch from "@/hooks/fetch";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { redirect } from "next/navigation";

function ProfileComponent() {
    const [view,setView] = useState("PROFILE");
    const {data,error,loading,fetchData} = useFetch();
    const {setUser} = useAuth();

    useEffect(()=>{
        if(data?.success){
            toast.success("Logout Successfully.",{duration:1000})
            setTimeout(()=>{
                setUser(null);
                redirect("/login")
            },1000)
        }
    },[data])

    const handleLogout = ()=>{
        fetchData("/login/api")
    }

  return (
    <>
      <div className="self-start px-8 pt-[2rem] flex justify-between w-full">
      <div className="flex gap-7  ">
        <h1 onClick={()=>setView("PROFILE")} className={view === "PROFILE" ? " cursor-pointer bg-gradient-to-r from-[#c14ac3] via-[#5010a2] to-[#2003b0] bg-clip-text text-transparent tracking-widest" :"cursor-pointer text-white tracking-widest "}>PROFILE</h1>
        <h1 onClick={()=>setView("GALLERY")} className={view === "GALLERY"? " cursor-pointer bg-gradient-to-r from-[#c14ac3] via-[#5010a2] to-[#2003b0] bg-clip-text text-transparent tracking-widest" :"cursor-pointer text-white tracking-widest "}>GALLERY</h1>
      </div>
      <div className="w-[16%]">
        <FullButton title={"LOGOUT"} type={"button"} styles={"text-white"} clickHandler={handleLogout} />
      </div>
      </div>
      <div className="w-full flex items-center min-h-[70vh]">
        {
            view === "PROFILE" && <EditProfile/> 
        }
      </div>
    </>
  );
}

export default ProfileComponent;
