import baseApi from "./baseApi";


const resourceApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getResource: build.query({
      query: ({ type,limit, page}: { type: string } & Record<string, unknown>) => ({
        url: `resource/type/${type}?limit=${limit}&page=${page}`,
        method: "GET",

      }),
      providesTags: ["Resource"],
    }),
    getResourceSingle: build.query({
      query: ({ id }: { id: string }) => ({
        url: `resource/${id}`,
        method: "GET",

      }),
      providesTags: ["Resource"],

    }),
    addComent: build.mutation({
      query: (data: { content: string, id: string }) => ({
        url: `resource/${data.id}/comment`,
        method: "POST",
        body: { content: data.content }

      }),
      invalidatesTags: ["Resource"],

    }),
    resourceCreate: build.mutation({
      query: (formDataToSend) => ({
        url: `/resource/type/RESOURCE`,
        method: "POST",
        body: formDataToSend

      }),
      invalidatesTags: ["Resource"],

    }),

    mediaCreate: build.mutation({
      query: (formDataToSend) => ({
        url: `/resource/type/MEDIA`,
        method: "POST",
        body: formDataToSend

      }),
      invalidatesTags: ["Resource"],

    }),

    blogCreate: build.mutation({
      query: (formDataToSend) => ({
        url: `/resource/type/BLOG`,
        method: "POST",
        body: formDataToSend

      }),
      invalidatesTags: ["Resource"],

    }),

  }),
});

export const { useGetResourceQuery,useGetResourceSingleQuery,useAddComentMutation,useResourceCreateMutation, useMediaCreateMutation, useBlogCreateMutation} = resourceApi
