import { IProduct } from '@types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '@util/constatns';

export const productsApi = createApi({
  reducerPath: 'productsapi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getProducts: builder.query<IProduct[], string>({
      query: (prefix: string) => `products?cat_prefix=${prefix}`,
    }),
  }),
});
export const { useGetProductsQuery } = productsApi;
