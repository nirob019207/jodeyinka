import baseApi from "./baseApi";


const eventApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    sponsorReq: build.query({
      query: () => ({
        url: `/users/sponsorship-requests`,
        method: "GET",

      }),
      providesTags:['Sponsor']

    }),
 

  }),
});

export const { useSponsorReqQuery} = eventApi
