import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '@util/constatns';

export interface IWishlist {
  userId: string;
  productId: string;
}
export interface ILikeToggle {
  isLiked: boolean;
  userId: string;
  productId: string;
}
export const wishlistApi = createApi({
  reducerPath: 'wishlistapi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['wishlist'],
  endpoints: (builder) => ({
    getWishlistItems: builder.query<IWishlist[], string>({
      query: (id) => `/wishlist?userId=${id}`,
      providesTags: ['wishlist'],
    }),
    likeToggle: builder.mutation({
      query: ({ isLiked, userId, productId }: ILikeToggle) => ({
        url: isLiked ? `/wishlist/${userId}${productId}` : `/wishlist`,
        method: isLiked ? 'delete' : 'post',
        body: isLiked
          ? undefined
          : { id: `${userId}${productId}`, userId, productId },
      }),
      invalidatesTags: ['wishlist'],
    }),
  }),
});

export const { useGetWishlistItemsQuery, useLikeToggleMutation } = wishlistApi;
