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

  }),
});

export const { usePaypalMutation} = paypalApi
