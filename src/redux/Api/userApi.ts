import baseApi from "./baseApi";

interface LoginCredentials {
  email: string;
  password: string;
}

const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    loginUser: build.mutation({
      query: (data: LoginCredentials) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"], 
    }),

    registerUser: build.mutation({
      query: (data: any) => {
          return {
              url: "/users/register",
              method: "POST",
              body: data
          }
      },
      invalidatesTags: ["User"], 



  }),

  forgotUser: build.mutation({
      query: (data: any) => {
          return {
              url: "/auth/forgot-password",
              method: "POST",
              body: data
          }
      },
      invalidatesTags: ["User"], // Helps refresh cached user data after login


  }),
  otpUser: build.mutation({
      query: (data: any) => {
          return {
              url: "/auth/enter-otp",
              method: "POST",
              body: data
          }
      },

  }),
  resetPass: build.mutation({
      query: (data: any) => {
          return {
              url: "/auth/reset-password",
              method: "POST",
              body: data
          }
      },
      invalidatesTags: ["User"], 


  }),
  contact: build.mutation({
    query: (data: any) => {
        return {
            url: "/contact",
            method: "POST",
            body: data
        }
    },

    }),
  getMe: build.query({
    query: () => ({
      url: "/users/me",
      method: "GET",
    }),
    providesTags:["User"]
  }),
  }),
});

export const { useLoginUserMutation,useRegisterUserMutation,useForgotUserMutation,useOtpUserMutation,useResetPassMutation,useContactMutation, useGetMeQuery} = userApi
