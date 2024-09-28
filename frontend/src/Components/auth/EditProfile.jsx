"use client"
import useFetch from "@/hooks/fetch";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import FullButton from "../common/FullButton";
import { toast, Toaster } from "sonner";
import Link from "next/link";

function EditProfile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  const { data, loading, error, fetchData } = useFetch();

const {user,setUser} = useAuth();

useEffect(()=>{
    if(user){
        setName(user?.name)
        setEmail(user?.email)
        setMobile(user?.mobile?.toString())
    }
},[user])

useEffect(()=>{
  if(data?.success){
    setUser(data.success);
    toast.success("Profile Updated Successfully.",{duration:1000});
  }
},[data])

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    fetchData("/profile/api",JSON.stringify({name,email,mobile}),"PUT")
  };

  return (
    <div className="w-full flex justify-center ">
      <Toaster richColors />
      <div className="w-[90%] sm:w-[75%] md:w-[65%] lg:w-[45%] xl:w-[35%] bg-gradient-to-br from-[#c14ac3] via-[#5010a2] to-[#2003b0] p-[1.5px] rounded-md">

      <form
        onSubmit={handleUpdateSubmit}
        className=" rounded-md  p-10 w-full flex flex-col gap-5 bg-[rgb(16,6,24)] text-white"
      >
        <div className="flex justify-between">
        <h1>EDIT PROFILE</h1>
        <Link className="text-xs tracking-widest" href={"/changepassword"} >CHANGE PASSWORD</Link>
        </div>
        <div className="flex flex-col  gap-1">
          <label className="text-xs" htmlFor="#name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="inp-type1"
          />
        </div>
        <div className="flex flex-col  gap-1">
          <label className="text-xs" htmlFor="#email">Email</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="inp-type1"
          />
        </div>
        <div className="flex flex-col  gap-1">
            <label className="text-xs" htmlFor="#mobile">Mobile</label>
            <input
              type="number"
              id="mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="inp-type1"
            />
          </div>
        <div className="">
          {error && <p className="text-xs text-red-700">{error}</p>}
        </div>
        <FullButton
          disabled={loading ? true : false}
          title={loading ? "UPDATING..." : "UPDATE"}
          type={"submit"}
          styles={"tracking-widest"}
        />
      </form>
      </div>
    </div>
  );
}

export default EditProfile;
