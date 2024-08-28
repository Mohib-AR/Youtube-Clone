import { createSlice } from "@reduxjs/toolkit";
export const appSlice = createSlice({
  name: "app",
  initialState: {
    open: false,
    category: "All",
    click: true,
  },
  reducers: {
    toggleSidebar: (state) => {
      state.open = !state.open;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setClick: (state) => {
      state.click = !state.click;
    },
  },
});

export const { toggleSidebar, setCategory, setClick } = appSlice.actions;
export default appSlice.reducer;
