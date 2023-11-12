import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {},
};

/**
 * User Slice and Reducer
 *
 * This module defines a Redux slice and reducer for managing user information.
 * It allows you to update and retrieve the user data within the application.
 *
 * @exports {object} userSlice.reducer - The Redux reducer for managing user information.
 * @exports {function} setUserInfo - An action creator function to set user information.
 *
 * @example
 * // Import and use the user slice and action in your Redux store setup:
 * import { configureStore } from "@reduxjs/toolkit";
 * import { userSlice, setUserInfo } from "./userSlice";
 *
 * const store = configureStore({
 *   reducer: {
 *     user: userSlice.reducer,
 *     // Add other reducers as needed
 *   },
 * });
 */
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.user = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { setUserInfo } = userSlice.actions;
