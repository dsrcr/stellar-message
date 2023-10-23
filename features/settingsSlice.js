import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  settings: "default",
};
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
export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setSettings: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export default settingsSlice.reducer;
export const { setSettings } = settingsSlice.actions;
