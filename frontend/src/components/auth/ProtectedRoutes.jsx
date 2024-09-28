"use client"
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react'
import Loading from '../common/Loading';

export default function ProtectedRoutes({children}) {
    const {user,loading} = useAuth();
    const router = useRouter();

    useEffect(()=>{
        if(!user && !loading){
            router.push('/login')
        }
    },[user,loading])

  return  user ? children : loading ? <Loading/>  :null
  
}

