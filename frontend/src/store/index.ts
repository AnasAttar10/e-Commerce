import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { categoriesApi } from './Category/categoriesApi';
import { productsApi } from './Product/productsApi';
import cart from './cart/cartSlice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { cartApi } from './cart/cartApi';
import { wishlistApi } from './wishlist/wishlishApi';
import { authApi } from './auth/authApi';
import authSlice from './auth/authSlice';
import { orderApi } from './order/orderApi';

const rootConfigReducer = {
  key: 'root',
  storage,
  whitelist: ['cart', 'auth'],
};
const authConfigReducer = {
  key: 'auth',
  storage,
  whitelist: ['user', 'token'],
};
const cartConfigReducer = {
  key: 'cart',
  storage,
  whitelist: ['items'],
};
const rootReducer = combineReducers({
  auth: persistReducer(authConfigReducer, authSlice),
  cart: persistReducer(cartConfigReducer, cart),
  [cartApi.reducerPath]: cartApi.reducer,
  [categoriesApi.reducerPath]: categoriesApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [productsApi.reducerPath]: productsApi.reducer,
  [wishlistApi.reducerPath]: wishlistApi.reducer,
  [orderApi.reducerPath]: orderApi.reducer,
});
const persistedReducer = persistReducer(rootConfigReducer, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      categoriesApi.middleware,
      productsApi.middleware,
      cartApi.middleware,
      wishlistApi.middleware,
      authApi.middleware,
      orderApi.middleware
    ),
});
export const persistor = persistStore(store);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);
