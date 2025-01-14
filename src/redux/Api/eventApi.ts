import baseApi from "./baseApi";


const eventApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    event: build.query({
      query: ({limit}) => ({
        url: `/events/upcoming?limit=${limit}`,
        method: "GET",

      }),
    }),
    eventDetails: build.query({
      query: ({id}) => ({
        url: `/events/${id}`,
        method: "GET",
    
      }),
    }),

  }),
});

export const { useEventQuery,useEventDetailsQuery} = eventApi
