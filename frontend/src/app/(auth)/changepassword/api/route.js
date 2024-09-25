import { AUTH_BASE_URL, JSON_CONTENT_TYPE, passwordRegex } from "@/config";
import { NextResponse } from "next/server";


export async function PUT(request) {
    const data = await request.json();
    const token = request.cookies.get("token");
    const cookieHeader = request.headers.get("cookie");
    
    if(data?.oPassword.trim() === "" || data?.newPass.trim() === ""){
        return new NextResponse(JSON.stringify({error:"Please fill up the fields!!"}),{
            status : 400,
            headers:{
                "Content-Type": JSON_CONTENT_TYPE 
            }   
        })
    }
    if(!passwordRegex.test(data?.newPass)){
        return new NextResponse(JSON.stringify({error:"Invalid Password!!"}),{
            status : 400,
            headers:{
                "Content-Type": JSON_CONTENT_TYPE 
            }   
        })
    }


    const response = await fetch(AUTH_BASE_URL+'/changepass',{
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