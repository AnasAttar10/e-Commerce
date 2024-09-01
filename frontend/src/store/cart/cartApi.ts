import { IProduct } from '@types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '@util/constatns';

export const cartApi = createApi({
  reducerPath: 'cartapi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getProductsInfo: builder.query<IProduct[], string>({
      query: (concatenatedItemsId) => `/products${concatenatedItemsId}`,
    }),
  }),
});

export const { useGetProductsInfoQuery } = cartApi;
