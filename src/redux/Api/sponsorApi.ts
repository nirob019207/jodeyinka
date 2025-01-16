import baseApi from "./baseApi";


const eventApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    sponsorReq: build.query({
      query: () => ({
        url: `/users/sponsorship-requests`,
        method: "GET",

      }),
      providesTags:['User']

    }),
 

  }),
});

export const { useSponsorReqQuery} = eventApi
