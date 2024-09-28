import { GALLERY_BASE_URL } from "@/config";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = params;
  const { searchParams } = request.nextUrl;
  const page = searchParams.get("page");
  const token = request.cookies.get("token");
  const cookieHeader = request.headers.get("cookie");
  const response = await fetch(
    GALLERY_BASE_URL + "/category/" + id + "?page=" + page,
    {
      headers: {
        authorization: `Bearer ${token || null}`,
        Cookie: cookieHeader,
      },
    }
  );
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
