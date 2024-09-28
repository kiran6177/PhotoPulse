"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import FullButton from "../common/FullButton";
import useFetch from "@/hooks/fetch";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCpassword] = useState("");
  const {data,error,loading,fetchData} = useFetch();
  const router = useRouter();

  useEffect(()=>{
    if(data?.success){
      router.replace("/login")
      return
    }
  },[data])

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    fetchData("/signup/api",JSON.stringify({name,email,mobile,password,cPassword}),"POST")
  };

  return (
    <div className="w-full flex justify-center ">
      {/* <Toaster position="top-right" containerStyle={{top:90,right:50}} /> */}
      <div className="w-[90%] sm:w-[75%] md:w-[65%] lg:w-[45%] xl:w-[35%] bg-gradient-to-br from-[#c14ac3] via-[#5010a2] to-[#2003b0] rounded-md p-[1.5px]">
        <form
          onSubmit={handleSignupSubmit}
          className=" rounded-md text-white p-10 w-full flex flex-col gap-5 bg-[rgb(16,6,24)]"
        >
          <div className="flex justify-center overflow-hidden"></div>
          <div className="flex flex-col  gap-1">
            <label className="text-xs"  htmlFor="#name">Name</label>
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
          <div className="flex flex-col  gap-1">
            <label className="text-xs" htmlFor="#password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="inp-type1"
            />
          </div>
          <div className="flex flex-col  gap-1">
            <label className="text-xs" htmlFor="#cpassword">Confirm Password</label>
            <input
              type="password"
              id="cpassword"
              value={cPassword}
              onChange={(e) => setCpassword(e.target.value)}
              className="inp-type1"
            />
          </div>
          <div className="">
          {error && <p className="text-xs text-red-700">{error}</p>}
          </div>
          <FullButton title={"SIGNUP"} type={"submit"} />
          <p className="text-[10px] mx-auto">
            Already Have An Account ?
            <span className="text-blue-600 mx-1 tracking-wider">              
              <Link href={"/login"}>Login</Link>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
