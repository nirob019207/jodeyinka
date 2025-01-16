import baseApi from "./baseApi";


const eventApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    dashobard: build.query({
      query: () => ({
        url: `/transaction/amount-aggregate`,
        method: "GET",

      }),
      providesTags:['Transaction']

    }),
    allTransDash: build.query({
        query: () => ({
          url: `/transaction`,
          method: "GET",
  
        }),
        providesTags:['Transaction']
  
      }),
 

  }),
});

export const { useDashobardQuery,useAllTransDashQuery} = eventApi
