import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '@util/constatns';

export type TSignUpData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};
export type TSignInData = {
  email: string;
  password: string;
};
export type TSignInResponse = {
  accessToken: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
};
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    signUp: builder.mutation<void, TSignUpData>({
      query: ({ firstName, lastName, email, password }) => ({
        url: '/register',
        method: 'post',
        body: { firstName, lastName, email, password },
      }),
    }),
    signIn: builder.mutation<TSignInResponse, TSignInData>({
      query: (body) => ({
        url: '/login',
        method: 'post',
        body,
      }),
    }),
  }),
});

export const { useSignUpMutation, useSignInMutation } = authApi;
