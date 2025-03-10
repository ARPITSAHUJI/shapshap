import { apiSlice } from "@/store/actions/api/apiSlice";


export const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: ({ offset = 1, limit = 20 , sort_by="desc", key="id"}) => ({
        url: "/api/v1/customer/order/list",
        method: "GET",
        params: {
          offset,
          limit,
          sort_by,
          key
        },
      }),
    }),
    getOrder: builder.query({
      query: ({ id}) => ({
        url: `api/v1/customer/order/details`,
        method: "GET",
        params: {
          order_id:id
        },
      }),
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useGetOrderQuery
} = orderApi;