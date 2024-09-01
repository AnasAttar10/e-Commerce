import { createSlice } from '@reduxjs/toolkit';
import { authApi } from './authApi';
export type TAuthSlice = {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  token: string;
};
const { signIn } = authApi.endpoints;

const initialState = {
  user: {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
  },
  token: '',
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    Logout: (state) => {
      state.user.id = '';
      state.user.firstName = '';
      state.user.lastName = '';
      state.user.email = '';
      state.token = '';
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(signIn.matchFulfilled, (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.accessToken;
    });
  },
});
export const { Logout } = authSlice.actions;
export default authSlice.reducer;
