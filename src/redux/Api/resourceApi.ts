import baseApi from "./baseApi";


const resourceApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getResource: build.query({
      query: ({ type}: { type: string } & Record<string, unknown>) => ({
        url: `resource/type/${type}`,
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

  }),
});

export const { useGetResourceQuery,useGetResourceSingleQuery,useAddComentMutation} = resourceApi
