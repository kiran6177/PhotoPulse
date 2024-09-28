import { GALLERY_BASE_URL } from "@/config";
import { NextResponse } from "next/server";

export async function GET(request) {
    const { searchParams } = request.nextUrl;
    const page  = searchParams.get("page");
    console.log("p",page);
    
    const token = request.cookies.get("token");
    const cookieHeader = request.headers.get("cookie");
  
    const response = await fetch(GALLERY_BASE_URL + "/home?page="+page, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token?.value || null}`,
        Cookie: cookieHeader,
      }
    });
    const resultData = await response.json();
    
    const nextResponse = NextResponse.json(resultData, {
      status: response.status,
    });
  
    const setCookieHeader = response.headers.get("set-cookie");
    if (setCookieHeader) {
      nextResponse.headers.set("Set-Cookie", setCookieHeader);
    }
  
    return nextResponse;
  }