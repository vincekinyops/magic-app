import { createAction, createSlice } from '@reduxjs/toolkit';
import { secureStorage } from '../../services/storage';
import { RootState } from '../'

interface User {
    email: string;
}

interface AuthState {
    isLoggedIn: boolean | undefined;
    user?: User;
}

const initialState: AuthState = {
    isLoggedIn: undefined,
    user: undefined,
  };

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      loggedIn(state, action) {
        state.isLoggedIn = true;
        state.user = action.payload.user;
      },
      loggedOut(state) {
        state.isLoggedIn = false;
        secureStorage.deleteValueFor('jwt');
        secureStorage.deleteValueFor('user');
      },
      forceLogout(state) {
        state.isLoggedIn = false;
        secureStorage.deleteValueFor('jwt');
        secureStorage.deleteValueFor('user');
      },
    },
  });
  
  export const { loggedIn, loggedOut, forceLogout } = authSlice.actions;
  
  export const authSelectors = {
    isLoggedIn: (state: RootState) => state.auth.isLoggedIn,
    user: (state: RootState) => state.auth.user,
  };
  
  export const logoutAction = createAction('auth/loggedOut');
  
  export default authSlice.reducer;
  