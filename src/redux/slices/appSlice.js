import { createSlice } from "@reduxjs/toolkit";
export const appSlice = createSlice({
  name: "app",
  initialState: {
    open: true,
    category: "All",
  },
  reducers: {
    toggleSidebar: (state) => {
      state.open = !state.open;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
  },
});

export const { toggleSidebar, setCategory } = appSlice.actions;
export default appSlice.reducer;
