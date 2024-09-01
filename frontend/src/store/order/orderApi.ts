import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IOrderResponsve } from '../../types/order';
import { BASE_URL } from '@util/constatns';

export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getOrders: builder.query<IOrderResponsve[], string>({
      query: (id) => `/orders?userId=${id}`,
    }),
    addOrder: builder.mutation<void, IOrderResponsve>({
      query: (body) => ({
        url: '/orders',
        method: 'post',
        body,
      }),
    }),
  }),
});

export const { useGetOrdersQuery, useAddOrderMutation } = orderApi;
