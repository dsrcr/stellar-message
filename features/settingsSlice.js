import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  settings: "default",
};

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
