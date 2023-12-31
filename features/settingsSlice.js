import { createSlice } from '@reduxjs/toolkit';

/**
 * Settings Slice and Reducer
 *
 * This module defines a Redux slice and reducer for managing application settings.
 * It allows you to update and retrieve the current settings, such as theme or other
 * configuration options.
 *
 * @exports {object} settingsSlice.reducer - The Redux reducer for settings.
 * @exports {function} setSettings - An action creator function to set new settings.
 *
 * @example
 * // Import and use the settings slice and action in your Redux store setup:
 * import { configureStore } from "@reduxjs/toolkit";
 * import { settingsSlice, setSettings } from "./settingsSlice";
 *
 * const store = configureStore({
 *   reducer: {
 *     settings: settingsSlice.reducer,
 *     // Add other reducers as needed
 *   },
 * });
 *
 * // Dispatch the setSettings action to update the application settings:
 * store.dispatch(setSettings({ theme: "dark" }));
 */

const initialState = {
  settings: 'default',
  language: 'en',
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setSettings: (state, action) => {
      state.settings = action.payload;
    },
    setLanguage: (state, action) => {
      if (action.payload === false) {
        state.language = 'en';
      } else {
        state.language = 'pl';
      }
    },
  },
});

export default settingsSlice.reducer;
export const { setSettings, setLanguage } = settingsSlice.actions;
export const getLanguage = (state) => state.settings.language;
