import { GALLERY_BASE_URL, JSON_CONTENT_TYPE } from "@/config";
import { NextResponse } from "next/server";

export async function POST(request) {
    const data = await request.formData();
    console.log("WORKED",data);
    const token = request.cookies.get("token");
    const cookieHeader = request.headers.get("cookie");

    const title = data.get("title")?.trim();
    const category = data.get("category")?.trim();


    if (title.trim() === ""){
        return new NextResponse(JSON.stringify({error:"Please fill title!!"}),{
            status : 400,
            headers:{
                "Content-Type": JSON_CONTENT_TYPE
            }   
        })
    } 
    if (!category.trim()){
        return new NextResponse(JSON.stringify({error:"Please fill category!!"}),{
            status : 400,
            headers:{
                "Content-Type": JSON_CONTENT_TYPE
            }   
        })
    }
    let imageCount = 0;
    let titleCount = 0;
    for (let single of data) {
      if(single[0]?.startsWith("imageTitle_")){
        imageCount++;
      }else if(single[0]?.startsWith("image_")){
        titleCount++;
      }
    }
    console.log(imageCount,titleCount);
    if(imageCount !== titleCount){
        return new NextResponse(JSON.stringify({error:"Missing Title Found!!"}),{
            status : 400,
            headers:{
                "Content-Type": JSON_CONTENT_TYPE
            }   
        })
    }


    const response = await fetch(GALLERY_BASE_URL+'/add',{
        method:"POST",
        headers:{
            authorization : `Bearer ${token?.value || null}`,
            Cookie : cookieHeader
        },
        body:data
    })
    const resultData = await response.json();
    

    const nextResponse = NextResponse.json(resultData, {
        status: response.status,
    });

    const setCookieHeader = response.headers.get('set-cookie');
    if (setCookieHeader) {
        nextResponse.headers.set('Set-Cookie', setCookieHeader);
    }

    return nextResponse;
} 