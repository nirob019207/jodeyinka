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
          body: data,
        };
      },
      invalidatesTags: ["User"],
    }),

    forgotUser: build.mutation({
      query: (data: any) => {
        return {
          url: "/auth/forgot-password",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["User"], 
    }),

    otpUser: build.mutation({
      query: (data: any) => {
        return {
          url: "/auth/enter-otp",
          method: "POST",
          body: data,
        };
      },
    }),

    resetPass: build.mutation({
      query: (data: any) => {
        return {
          url: "/auth/reset-password",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["User"],
    }),

    contact: build.mutation({
      query: (data: any) => {
        return {
          url: "/contact",
          method: "POST",
          body: data,
        };
      },
    }),

    getMe: build.query({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    updateProfile: build.mutation({
      query: (data: any) => ({
        url: "/users/update-profile",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    // New endpoint to change password
    changePassword: build.mutation({
      query: (data: any) => ({
        url: "/users/change-password",
        method: "PUT",
        body: data, 
      }),
      invalidatesTags: ["User"],
    }),
    requestVerify: build.query({
      query: (token) => ({
        url: `/users/verify-email/${token}`,
        method: "PATCH",
      }),
      providesTags:["User"]
    }),
    acceptSponsor: build.mutation({
      query: (id) => ({
        url: `users/approve-sponsor/${id}`,
        method: "PATCH",
      }),
      invalidatesTags:["User"]
    }),
    refreshToken: build.query({
      query: () => ({
        url: `/auth/refresh-token`,
        method: "GET",
      }),
      providesTags:["User"]
    }),
    getnotify: build.query({
      query: () => ({
        url: `/notification`,
        method: "GET",
      }),
      providesTags:["User"]
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useForgotUserMutation,
  useOtpUserMutation,
  useResetPassMutation,
  useContactMutation,
  useGetMeQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useRequestVerifyQuery,
  useAcceptSponsorMutation,
  useRefreshTokenQuery,
  useGetnotifyQuery
} = userApi;
