"use client"

import {  useState } from "react"
import Link from "next/link";
import FullButton from "../common/FullButton";
import useFetch from "@/hooks/fetch";

export default function LoginForm() {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const {data,error,loading,fetchData} = useFetch();

    const handleLoginSubmit = (e)=>{
        e.preventDefault();
        fetchData("/login/api",JSON.stringify({email,password}),"POST")
    }
   

  return (
    <div className="w-screen flex justify-center ">
      <div className="w-[90%] sm:w-[75%] md:w-[65%] lg:w-[45%] xl:w-[35%] bg-gradient-to-br from-[#c14ac3] via-[#5010a2] to-[#2003b0] p-[1.5px] rounded-md">
        <form onSubmit={handleLoginSubmit} className=" rounded-md  p-10 w-full flex flex-col gap-5 bg-[rgb(16,6,24)] text-white">
          <div className="flex flex-col  gap-1">
              <label className="text-xs" htmlFor="#email">Email</label>
              <input type="text" id="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="inp-type1" />
          </div>
          <div className="flex flex-col  gap-1">
              <label className="text-xs" htmlFor="#password">Password</label>
              <input type="password" id="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="inp-type1" />
          </div>
          <div className="">
              {error && <p className="text-xs text-red-700">{error}</p>}
              </div>
            <div className="">
              <FullButton title={"LOGIN"}  type={"submit"} />
            </div>
          <p className="text-xs mx-auto">Create New Account ? <span className="text-blue-600"> <Link href={"/signup"}>Signup</Link>  </span></p>
        </form>
      </div>
    </div>
  )
}

