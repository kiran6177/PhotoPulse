"use client";
import React, { useEffect, useState } from "react";
import useFetch from "@/hooks/fetch";
import FullButton from "../common/FullButton";
import { toast, Toaster } from "sonner";
import { passwordRegex } from "@/config";
import { useRouter } from "next/navigation";

function Password() {
  const [oPassword, setOPassword] = useState("");
  const [newPass, setNewPass] = useState("");
  const {data,loading,error,fetchData} = useFetch();
  const router = useRouter();

  const handleChangePassword = (e)=>{
    e.preventDefault();
    if(oPassword.trim() === "" || newPass.trim() === ""){
        toast.error("Please fill the fields!!")
        return
    }
    if(!passwordRegex.test(newPass)){
        toast.error("Invalid Password!!")
        return
    }
    fetchData("/changepassword/api",JSON.stringify({oPassword,newPass}),"PUT")
  }

  useEffect(()=>{
    if(error){
        toast.error(error)
        return
    }
    if(data?.success){
        toast.success("Password Updated Successfully.",{duration:1000});
        setTimeout(()=>{
            router.push("/profile")
        },1000)
        return
    }
  },[data,error])


  return (
    <div className="w-screen h-full flex justify-center ">
        <Toaster richColors />
      <div className="w-[90%] sm:w-[75%] md:w-[65%] lg:w-[45%] xl:w-[35%] bg-gradient-to-br from-[#c14ac3] via-[#5010a2] to-[#2003b0] p-[1.5px] rounded-md">
      <form onSubmit={handleChangePassword} className="w-full  rounded-md p-10 flex flex-col gap-4 bg-[rgb(16,6,24)] text-white">
        <h1 className="text-sm">CHANGE PASSWORD</h1>
        <div className="flex flex-col  gap-1">
          <label className="text-xs" htmlFor="#opassword">Old Password</label>
          <input
            type="password"
            id="opassword"
            value={oPassword}
            onChange={(e) => setOPassword(e.target.value)}
            className="inp-type1"
          />
        </div>
        <div className="flex flex-col  gap-1">
          <label className="text-xs" htmlFor="#newpassword">New Password</label>
          <input
            type="password"
            id="newpassword"
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
            className="inp-type1"
          />
        </div>
          <FullButton title={"CHANGE"} type={"submit"} />
      </form>
      </div>
    </div>
  );
}

export default Password;
