import baseApi from "./baseApi";


const paypalApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    paypal: build.mutation({
      query: (data: any) => ({
        url: "/paypal/pay",
        method: "POST",
        body: data,
      }),
    }),
    complete: build.mutation({
      query: (data) => ({
        url: `/paypal/complete-order?userId=${data.userId}&token=${data.token}&purpose=${data.purpose}`,
        method: "PATCH",
      }),
    }),

  }),
});

export const { usePaypalMutation,useCompleteMutation} = paypalApi
