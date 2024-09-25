import { AUTH_BASE_URL, emailRegex, JSON_CONTENT_TYPE, mobileRegex, passwordRegex } from "@/config";
import { NextResponse } from "next/server";


export async function POST(request) {
    const data = await request.json();
    console.log(data);
    
    if(data?.name?.trim() === "" && data?.email?.trim() === "" && data?.mobile?.trim() === "" &&   data?.password?.trim() === "" && data?.cPassword?.trim() === ""){
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

    if(data?.cPassword?.trim() === ""){
        return new NextResponse(JSON.stringify({error:"Please Confirm your password!!"}),{
            status : 400,
            headers:{
                "Content-Type": JSON_CONTENT_TYPE
            }
        })
    }

    if(data?.password?.trim() !== data?.cPassword?.trim()){
        return new NextResponse(JSON.stringify({error:"Password Mismatch!!"}),{
            status : 400,
            headers:{
                "Content-Type": JSON_CONTENT_TYPE
            }
        })
    }

    const response = await fetch(AUTH_BASE_URL+'/signup',{
        method:"POST",
        headers:{
            "Content-Type": JSON_CONTENT_TYPE
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