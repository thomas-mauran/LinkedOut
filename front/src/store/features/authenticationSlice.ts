import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import * as SecureStore from 'expo-secure-store';

/**
 * The key used to store the authentication state in the secure store.
 */
const SECURE_STORE_TOKEN_KEY = 'auth_token';

/**
 * The authentication slice state when not initialized.
 */
type UnknownSliceState = {
  state: 'unknown';
};

/**
 * The authentication slice state when authenticated.
 */
type AuthenticatedSliceState = {
  state: 'authenticated';
  token: string;
};

/**
 * The authentication slice state when unauthenticated.
 */
type UnauthenticatedSliceState = {
  state: 'unauthenticated';
};

/**
 * The authentication slice state.
 */
type SliceState =
  | UnknownSliceState
  | AuthenticatedSliceState
  | UnauthenticatedSliceState;

/**
 * The authentication slice that contains info about whether the user is authenticated.
 */
const slice = createSlice({
  name: 'auth',
  initialState: { state: 'unknown' } as SliceState,
  reducers: {
    init: (state) => {
      const token = SecureStore.getItem(SECURE_STORE_TOKEN_KEY);

      state.state = token ? 'authenticated' : 'unauthenticated';
      if (state.state === 'authenticated') {
        state.token = token;
      }
    },
    login: (state, action: PayloadAction<string>) => {
      state.state = 'authenticated';
      if (state.state === 'authenticated') {
        state.token = action.payload;
      }

      SecureStore.setItem(SECURE_STORE_TOKEN_KEY, action.payload);
    },
    logout: (state) => {
      state.state = 'unauthenticated';
      SecureStore.setItem(SECURE_STORE_TOKEN_KEY, '');
    },
  },
});

export default slice.reducer;

export const { init, login, logout } = slice.actions;
