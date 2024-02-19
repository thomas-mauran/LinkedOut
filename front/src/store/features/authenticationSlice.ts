import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import * as SecureStore from 'expo-secure-store';
import { JwtPayload, jwtDecode } from 'jwt-decode';

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
  isAdmin: boolean;
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
 * The role name for an admin.
 */
const ADMIN_ROLE = 'client_admin';

/**
 * The contents of the JWT token.
 */
type TokenContent = {
  /**
   * The roles of the user.
   */
  platform_roles: string[];
};

/**
 * Updates the state with the token.
 */
const updateStateWithToken = (
  state: AuthenticatedSliceState,
  token: string,
) => {
  const decodedToken = jwtDecode<TokenContent & JwtPayload>(token);

  state.token = token;
  state.isAdmin = decodedToken.platform_roles.includes(ADMIN_ROLE);
};

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
        updateStateWithToken(state, token);
      }
    },
    login: (state, action: PayloadAction<string>) => {
      state.state = 'authenticated';

      if (state.state === 'authenticated') {
        updateStateWithToken(state, action.payload);
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
