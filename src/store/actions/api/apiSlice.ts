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
          url: "/api/v1/store-details",
          method: "GET",
        }),
      }),
    }),
  });
  
  export const { useLoadUserQuery } = apiSlice;
  