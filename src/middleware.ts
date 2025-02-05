import { jwtDecode } from "jwt-decode";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

interface Member {
  role: string;
  sponsorStatus?: string;
}

export function middleware(request: NextRequest) {
  const homeRoute = `${request.nextUrl.origin}/login`;

  // Routes allowed for MEMBERS and SPONSORS
  const userRoutes = [
    "/about-us",
    "/career",
    "/media",
    "/media-details/:path*",
    "/event-details/:path*",
    "/event",
    "/resources",
    "/contact",
    "/donate",
  ];

  // Routes specifically for USERS
  const userSpecificRoutes = ["/membership", "/donate"];

  const currentPath = request.nextUrl.pathname;

  // Token Retrieval
  const token = request.cookies.get("token")?.value;

  if (!token) {
    console.warn("Token is missing. Redirecting to login.");
    return NextResponse.redirect(new URL(homeRoute, request.url));
  }


  let userInfo: Member;
  try {
    userInfo = jwtDecode<Member>(token);
    console.warn(userInfo);
  } catch {
    return NextResponse.redirect(new URL("/login", request.url));
  }


  if (userInfo.role === "USER" && userInfo.sponsorStatus === "PENDING") {
    console.warn(`Sponsorship status is pending. Redirecting to home with message.`);
    return NextResponse.redirect(new URL(`/?message=Sponsorship pending`, request.url));
  }
  

 
  if (userInfo.role === "USER") {
    if (!userSpecificRoutes.some((route) => currentPath.startsWith(route))) {
      console.warn(`User role can only access /membership and /donate. Redirecting to /membership.`);
      return NextResponse.redirect(new URL("/membership", request.url));
    }
    return NextResponse.next(); 
  }


  if (userInfo.role === "MEMBER" && userRoutes.some((route) => currentPath.startsWith(route))) {
    return NextResponse.next(); 
  }

 
  if (userInfo.role === "SPONSOR" && !userRoutes.some((route) => currentPath.startsWith(route))) {
    console.warn(`Sponsor role is not allowed on ${currentPath}. Redirecting to home.`);
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/about-us",
    "/career",
    "/media",
    "/media-details/:path*",
    "/resources",
    "/contact",
    "/event",
    "/event-details/:path*",
    "/membership",
    "/donate",
  ],
};




// function jwtDecode<T>(token: string): Member {
//   throw new Error("Function not implemented.");
// }
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { jwtDecode } from "jwt-decode";

// interface Member {
//   role: string;
// }

// export function middleware(request: NextRequest) {
//   const homeRoute = `${request.nextUrl.origin}/login`;
//   const unauthorizedRoute = `${request.nextUrl.origin}/login`;




//   const userRoutes = [
//     '/about-us',
//     '/career',
//     '/media',
//     '/resources',
//     '/contact'
         
   
  
    
//   ];

//   const token = request.cookies.get("token")?.value;

//   if (!token) {
//     return NextResponse.redirect(new URL(homeRoute, request.url));
//   }

//   let userInfo: Member;
//   try {
//     userInfo = jwtDecode<Member>(token as string);
//   } catch (error) {
//     return NextResponse.redirect(new URL(homeRoute, request.url));
//   }

//   const currentPath = request.nextUrl.pathname;

  






//   if (userRoutes.some((route) => currentPath.startsWith(route))) {
//     if ( userInfo?.role !=="MEMBER") {
      
//       return NextResponse.redirect(new URL(unauthorizedRoute, request.url));
//     }
//     console.log("User is a USER, access granted.");
//   }

//   console.log("Request passed middleware checks.");
//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     '/about-us',
//     '/career',
//     '/media',
//     '/resources',
//     '/contact',
//     '/event'
   
//   ],
// };
