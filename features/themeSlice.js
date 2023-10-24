import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: 'dark',
};

/**
 * Theme Slice and Reducer
 *
 * This module defines a Redux slice and reducer for managing the application's theme.
 * It allows you to update and retrieve the current theme, such as "dark" or "light".
 *
 * @exports {object} themeSlice.reducer - The Redux reducer for managing the application's theme.
 * @exports {function} setTheme - An action creator function to set the application's theme.
 *
 * @example
 * // Import and use the theme slice and action in your Redux store setup:
 * import { configureStore } from "@reduxjs/toolkit";
 * import { themeSlice, setTheme } from "./themeSlice";
 *
 * const store = configureStore({
 *   reducer: {
 *     theme: themeSlice.reducer,
 *     // Add other reducers as needed
 *   },
 * });
 *
 * // Dispatch the setTheme action to update the application's theme:
 * store.dispatch(setTheme("dark"));
 */
export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export default themeSlice.reducer;
export const { setTheme } = themeSlice.actions;
