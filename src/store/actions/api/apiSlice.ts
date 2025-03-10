"use client"
  import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
  import { RootState } from "../../Store";
  import { setLoading, userLoggedIn } from "@/store/slices/user/authSlice";
  
  const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_SERVER_URI,
    credentials: "same-origin", // Changed from "omit" to "same-origin" to avoid including cookies
    
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  });
  
  export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery,
    endpoints: (builder) => ({
      loadUser: builder.query({
        query: () => ({
          url: "api/v1/merchants/profile",
          method: "GET",
        }),
        async onQueryStarted(arg, { queryFulfilled, dispatch }) {
          try {
            // Set loading state to true when request starts
            dispatch(setLoading({state:true}));
      
            const result = await queryFulfilled;
      
            dispatch(
              userLoggedIn({
                accessToken: result.data.accessToken,
                user: result.data.merchant,
              })
            );
          } catch (error) {
            dispatch(setLoading({state:false}));
          } finally {
            dispatch(setLoading({state:false}));
          }
        },
      }),
    }),
  });
  
  export const { useLoadUserQuery } = apiSlice;
  