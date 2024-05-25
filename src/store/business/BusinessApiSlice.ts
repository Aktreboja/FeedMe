import { ApiResponse } from '@/index';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Business } from '@/business';
import { MongoBusiness } from '@/mongodb';

export const businessApi = createApi({
  reducerPath: 'businessApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1/' }),
  endpoints: (builder) => ({
    fetchBusiness: builder.query<ApiResponse<Business>, string>({
      query: (id) => `business/${id}`,
    }),
    fetchUserBusinesses: builder.query<ApiResponse<MongoBusiness[]>, string>({
      query: (userId) => `businesses/${userId}`,
    }),
  }),
});

export const { useFetchBusinessQuery, useFetchUserBusinessesQuery } =
  businessApi;
