"use client"
import React, { useEffect, useState } from 'react'

function useWindowSize() {
    const [width,setWidth] = useState(0);

    useEffect(()=>{
        function calculateWidth(){
            setWidth(window.innerWidth)
        }
        window.addEventListener("resize",calculateWidth)

        return ()=> window.removeEventListener("resize",calculateWidth)
    },[])

    return {width}
}

export default useWindowSize