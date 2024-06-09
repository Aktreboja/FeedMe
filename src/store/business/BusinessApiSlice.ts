import { ApiResponse } from '@/index';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Business } from '@/business';
import { MongoBusiness } from '@/mongodb';

export const businessApi = createApi({
  reducerPath: 'businessApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1/' }),
  tagTypes: ['businesses'],
  endpoints: (builder) => ({
    fetchBusiness: builder.query<ApiResponse<Business>, string>({
      query: (id) => `business/${id}`,
    }),
    fetchUserBusinesses: builder.query<ApiResponse<MongoBusiness[]>, string>({
      query: (userId) => `businesses/${userId}`,
      providesTags: ['businesses'],
    }),
    deleteBusiness: builder.mutation({
      query: (id) => {
        return {
          url: `business/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['businesses'],
    }),
  }),
});

export const {
  useFetchBusinessQuery,
  useFetchUserBusinessesQuery,
  useDeleteBusinessMutation,
} = businessApi;
