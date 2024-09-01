import { ICategory } from '@types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '@util/constatns';

export const categoriesApi = createApi({
  reducerPath: 'categoriesapi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['getCategories'],
  endpoints: (builder) => ({
    getCatgeories: builder.query<ICategory[], void>({
      query: () => 'categories',
      providesTags: ['getCategories'],
    }),
  }),
});

export const { useGetCatgeoriesQuery } = categoriesApi;
