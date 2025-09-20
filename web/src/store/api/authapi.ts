import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { clearUser } from "../slices/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000",
  credentials: "include",
});

const baseQueryWithRefresh: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    const refreshResult = await baseQuery(
      { url: "/api/v1/auth/refresh", method: "POST" },
      api,
      extraOptions
    );

    if (refreshResult?.error) {
      console.log(refreshResult.data, refreshResult.error, result);
      api.dispatch(clearUser());
      return result;
    }

    result = await baseQuery(args, api, extraOptions);
  }

  return result;
};

export const authApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithRefresh,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/api/v1/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),

    register: builder.mutation({
      query: (credentials) => ({
        url: "/api/v1/auth/register",
        method: "POST",
        body: credentials,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/api/v1/auth/logout",
        method: "POST",
      }),
    }),

    me: builder.query({
      query: () => ({
        url: "/api/v1/auth/me",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useMeQuery,
} = authApi;
