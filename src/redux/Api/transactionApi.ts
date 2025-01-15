import baseApi from "./baseApi";


const eventApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    myTransactions: build.query({
      query: () => ({
        url: `/transaction/my-transactions`,
        method: "GET",

      }),
      providesTags:['Transaction']

    }),
 

  }),
});

export const { useMyTransactionsQuery} = eventApi
