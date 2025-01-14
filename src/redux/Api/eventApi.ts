import baseApi from "./baseApi";


const eventApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    event: build.query({
      query: ({limit}) => ({
        url: `/events/upcoming?limit=${limit}`,
        method: "GET",

      }),
      providesTags:['Events']

    }),
    eventDetails: build.query({
      query: ({id}) => ({
        url: `/events/${id}`,
        method: "GET",
    
      }),
      providesTags:['Events']
    }),

  }),
});

export const { useEventQuery,useEventDetailsQuery} = eventApi
