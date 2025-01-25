import { jwtDecode } from "jwt-decode";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

interface Member {
  role: string;
}

export function middleware(request: NextRequest) {
  const homeRoute = `${request.nextUrl.origin}/login`;
  const unauthorizedRoute = `${request.nextUrl.origin}/unauthorized`;


  const userRoutes = ["/about-us", "/career" ,"/media", "/media-details/:path*", "/event-details/:path*","/event" ,"/resources", "/contact"];

  const allowedRolesForUserRoutes = ["MEMBER","SPONSOR"];

  // Log the requested URL
  const currentPath = request.nextUrl.pathname;
 

  // Token Retrieval
  const token = request.cookies.get("token")?.value;
 

  // If token is missing, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL(homeRoute, request.url));
  }

  // Decode the token
  let userInfo: Member;
  try {
    userInfo = jwtDecode<Member>(token);
 
  } catch (error) {
 
    return NextResponse.redirect(new URL(homeRoute, request.url));
  }


  // Route Matching for User
  if (userRoutes.some((route) => currentPath.startsWith(route))) {
    if (!allowedRolesForUserRoutes.includes(userInfo.role)) {
      console.warn(`User role ${userInfo.role} is not allowed. Redirecting to unauthorized.`);
      return NextResponse.redirect(new URL(unauthorizedRoute, request.url));
    }
  
  }

  // Default case if all checks pass
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
