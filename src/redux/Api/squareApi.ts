import baseApi from "./baseApi";


const squereApi = baseApi.injectEndpoints({
  endpoints: (build) => {
    return ({
        square: build.mutation({
          query: ({data}) => ({
            url: `square/pay/event/${data.id}`,
            method: "POST",
            body: data,
          }),
        }),
        squareDoante: build.mutation({
          query: ({data}) => ({
            url: `square/pay`,
            method: "POST",
            body: data,
          }),
        }),
    
      })
  },

});

export const { useSquareMutation,useSquareDoanteMutation} = squereApi
