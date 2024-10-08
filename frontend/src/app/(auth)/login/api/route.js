import { AUTH_BASE_URL, emailRegex, JSON_CONTENT_TYPE, passwordRegex } from "@/config";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request) {
    const data = await request.json();
    console.log(data);
    if(data?.email?.trim() === "" && data?.password?.trim() === ""){
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

    if(data?.password?.trim() === ""){
        return new NextResponse(JSON.stringify({error:"Please enter a password!!"}),{
            status : 400,
            headers:{
                "Content-Type": JSON_CONTENT_TYPE 
            }
        })
    }

    if(data?.password?.trim().length < 8){
        return new NextResponse(JSON.stringify({error:"Password should contain minimum 8 digits!!"}),{
            status : 400,
            headers:{
                "Content-Type": JSON_CONTENT_TYPE 
            }
        })
    }

    if(!passwordRegex.test(data.password)){
        return new NextResponse(JSON.stringify({error:"Password should contain alphabets and digits!!"}),{
            status : 400,
            headers:{
                "Content-Type": JSON_CONTENT_TYPE 
            }
        })
    }

    const response = await fetch(AUTH_BASE_URL+'/login',{
        method:"POST",
        headers:{
            "Content-Type": JSON_CONTENT_TYPE
        },
        credentials:"include",
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



export async function GET(request) {
    const token = request.cookies.get('token');
    const refresh = request.cookies.get('refresh');
    const cookieHeader = request.headers.get("cookie");

    const response = await fetch(AUTH_BASE_URL+'/logout',{
        method:"GET",
        headers:{
            "Content-Type": JSON_CONTENT_TYPE,
            authorization: `Bearer ${token?.value || null}`,
            Cookie: cookieHeader, 
        },
        credentials:"include",
    })
    const resultData = await response.json();
    
    const nextResponse = NextResponse.json(resultData, {
        status: response.status,
    });

    cookies().delete('token');
    cookies().delete('refresh');

    const setCookieHeader = response.headers.get('set-cookie');
    if (setCookieHeader) {
        nextResponse.headers.set('Set-Cookie', setCookieHeader);
    }

    return nextResponse;
}
