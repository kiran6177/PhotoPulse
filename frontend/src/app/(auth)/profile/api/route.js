import { AUTH_BASE_URL, emailRegex, JSON_CONTENT_TYPE, mobileRegex } from "@/config";
import { NextResponse } from "next/server";


export async function PUT(request) {
    const data = await request.json();
    const token = request.cookies.get("token");
    const cookieHeader = request.headers.get("cookie");
    
    if(data?.name?.trim() === "" && data?.email?.trim() === "" && data?.designation?.trim() === "" ){
        return new NextResponse(JSON.stringify({error:"Please fill up the fields!!"}),{
            status : 400,
            headers:{
                "Content-Type": JSON_CONTENT_TYPE 
            }   
        })
    }

    if(data?.email?.trim() === ""){
        return new NextResponse(JSON.stringify({error:"Please enter a email!!"}),{
            status : 400,
            headers:{
                "Content-Type": JSON_CONTENT_TYPE 
            }
        })
    }
    

    if(!emailRegex.test(data.email)){
        return new NextResponse(JSON.stringify({error:"Please enter a valid email!!"}),{
            status : 400,
            headers:{
                "Content-Type": JSON_CONTENT_TYPE 
            }
        })
    }

    if(data?.mobile?.trim() === ""){
        return new NextResponse(JSON.stringify({error:"Please enter mobile number!!"}),{
            status : 400,
            headers:{
                "Content-Type": JSON_CONTENT_TYPE
            }
        })
    }

    if(data?.mobile?.length !== 10){
        return new NextResponse(JSON.stringify({error:"Please enter 10 digit mobile number!!"}),{
            status : 400,
            headers:{
                "Content-Type": JSON_CONTENT_TYPE
            }
        })
    }

    if(!mobileRegex.test(data?.mobile)){
        return new NextResponse(JSON.stringify({error:"Please enter a valid mobile number!!"}),{
            status : 400,
            headers:{
                "Content-Type": JSON_CONTENT_TYPE
            }
        })
    }

    const response = await fetch(AUTH_BASE_URL+'/profile',{
        method:"PUT",
        headers:{
            "Content-Type": JSON_CONTENT_TYPE ,
            authorization: `Bearer ${token?.value || null}`,
            Cookie: cookieHeader,
        },
        body:JSON.stringify(data)
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