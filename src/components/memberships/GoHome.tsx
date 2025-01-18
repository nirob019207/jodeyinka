import { useRefreshTokenQuery } from '@/redux/Api/userApi'
import React from 'react'
import cookies from "js-cookie";
import { useRouter } from 'next/navigation';
import { setUser } from '@/redux/ReduxFunction';
import { useDispatch } from 'react-redux';
import {jwtDecode} from "jwt-decode"; // Import jwt-decode for token decoding

interface DecodedToken {
    role: string;
    email: string;
}

export default function GoHome() {
    
   const {data:refresh}=useRefreshTokenQuery({})
   const router=useRouter()
   const dispatch=useDispatch()
    const handleRefrshToken=()=>{
             const decoded: DecodedToken = jwtDecode(refresh?.data);
                const { role, email } = decoded;
               
                // Dispatch the user data to Redux
                dispatch(setUser({ role, token: refresh?.data, email }));
        cookies.set("token", refresh?.data, { expires: 7 }); // Set token in cookies
        router.push('/')


        
    }

  return (
    <div className='min-h-screen flex justify-center items-center'>
         <button
         onClick={handleRefrshToken}
            className="text-blue-600 hover:underline text-lg font-medium"
          >
            Back to Home
          </button>
    </div>
  )
}
