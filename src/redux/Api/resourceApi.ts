import baseApi from "./baseApi";


const resourceApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getResource: build.query({
      query: ({ type}: { type: string; [key: string]: any }) => ({
        url: `resource/type/${type}`,
        method: "GET",

      }),
    }),

  }),
});

export const { useGetResourceQuery} = resourceApi
