import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

interface Member {
  role: string;
}

export function middleware(request: NextRequest) {
  const homeRoute = `${request.nextUrl.origin}/login`;
  const unauthorizedRoute = `${request.nextUrl.origin}/unauthorized`;




  const userRoutes = [
    '/about_us',
    '/career',
    '/media',
    '/resources',
    '/contact'
         
   
  
    
  ];

  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL(homeRoute, request.url));
  }

  let userInfo: Member;
  try {
    userInfo = jwtDecode<Member>(token as string);
  } catch (error) {
    return NextResponse.redirect(new URL(homeRoute, request.url));
  }

  const currentPath = request.nextUrl.pathname;

  






  if (userRoutes.some((route) => currentPath.startsWith(route))) {
    if ( userInfo?.role !=="MEMBER") {
      
      return NextResponse.redirect(new URL(unauthorizedRoute, request.url));
    }
    console.log("User is a USER, access granted.");
  }

  console.log("Request passed middleware checks.");
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/about-us',
    '/career',
    '/media',
    '/resources',
    '/contact',
    '/event'
   
  ],
};
