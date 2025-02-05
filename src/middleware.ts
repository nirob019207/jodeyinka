import { jwtDecode } from "jwt-decode";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

interface Member {
  role: string;
}

export function middleware(request: NextRequest) {
  const homeRoute = `${request.nextUrl.origin}/login`;

  const userRoutes = [
    "/about-us",
    "/career",
    "/media",
    "/media-details/:path*",
    "/event-details/:path*",
    "/event",
    "/resources",
    "/contact",
    "/donate"
  ];

  const allowedRolesForUserRoutes = ["MEMBER"];
  const allowedRolesForSponsorRoutes = ["SPONSOR"];
  
  

  // Special routes for User role
  const userSpecificRoutes = ["/membership", "/donate"];

  // Log the requested URL
  const currentPath = request.nextUrl.pathname;

  // Token Retrieval
  const token = request.cookies.get("token")?.value;

  // If token is missing, redirect to login
  if (!token) {
    console.warn("Token is missing. Redirecting to login.");
    return NextResponse.redirect(new URL(homeRoute, request.url));
  }

  // Decode the token
  let userInfo: Member;
  try {
    userInfo = jwtDecode<Member>(token);
    console.warn(userInfo)
  } catch {
    return NextResponse.redirect(new URL('/membership', request.url));
  }

  // If the user's role is "User", allow only /membership and /donate routes
  if (userInfo.role === "USER" && !userSpecificRoutes.some((route) => currentPath.startsWith(route))) {
    console.warn(`User role is User but attempting to access restricted route: ${currentPath}. Redirecting to unauthorized.`);
    return NextResponse.redirect(new URL("/membership", request.url));
  }
 
  

  // Route Matching for other roles
  if (userRoutes.some((route) => currentPath.startsWith(route))) {
    if (!allowedRolesForUserRoutes.includes(userInfo.role)) {
      console.warn(`User role ${userInfo.role} is not allowed. Redirecting to unauthorized.`);
      return NextResponse.redirect(new URL('/membership', request.url));
      
    }
    
  }
  
  // Route Matching for other roles
  if (userRoutes.some((route) => currentPath.startsWith(route))) {
    if (!allowedRolesForSponsorRoutes.includes(userInfo.role)) {
      console.warn(`User role ${userInfo.role} is not allowed. Redirecting to unauthorized.`);
      return NextResponse.redirect(new URL('/', request.url));
      
    }
    
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
