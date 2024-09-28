"use client"
import { mate } from '@/fonts'
import React, { useEffect, useState } from 'react'
import CategoryBox from '../gallery/CategoryBox'
import GalleryGrid from '../gallery/GalleryGrid'
import useFetch from '@/hooks/fetch'

function Home() {
    const [categoryData,setCategoryData] = useState([]);
    const {data,error,loading,fetchData} = useFetch();

    useEffect(()=>{
        fetchData("/category/api")
    },[])

    useEffect(()=>{
      if(data?.categoryData){
        setCategoryData(data?.categoryData)
      }        
    },[data])

  return (
    <>
    <div className="flex gap-3 overflow-x-scroll scrollgallery">
        {
          categoryData?.length > 0 && categoryData?.map(cat=>{
            return <CategoryBox key={cat?._id} category={cat} />
          })
        }
      </div>
      <div className="flex flex-col my-6 items-center">
        <h1
          className={`${mate.className} antialiased text-white text-2xl sm:text-3xl lg:text-[2.5rem]  my-5 tracking-wider`}
        >
          Explore the Images
        </h1>
        <GalleryGrid api={"/api"} />
      </div>
    </>
  )
}

export default Home
