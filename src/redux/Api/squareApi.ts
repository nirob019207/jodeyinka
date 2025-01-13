import baseApi from "./baseApi";


const squereApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    square: build.mutation({
      query: ({id: any,data}) => ({
        url: `square/pay/event/${id}`,
        method: "POST",
        body: data,
      }),
    }),

  }),
});

export const { useSquareMutation} = squereApi
