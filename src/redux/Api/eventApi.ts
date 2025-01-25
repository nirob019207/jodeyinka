import baseApi from "./baseApi";


const eventApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    event: build.query({
      query: ({limit, page}) => ({
        url: `/events/upcoming?limit=${limit}&page=${page}`,
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

    createEvent: build.mutation({
      query: (data) => ({
        url: "/events",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ['Events']

    }), // Add a comma here

    registerForEvent: build.mutation({
      query: (id) => ({
        url: `/event-users/${id}`, 
        method: "POST",
      }),
      
      invalidatesTags: ['Events'],
    }),

  }),
});

export const { useEventQuery,useEventDetailsQuery,useCreateEventMutation, useRegisterForEventMutation} = eventApi
