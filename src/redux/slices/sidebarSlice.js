import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isCollapsed: false,
  activeItem: 'dashboard',
};

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isCollapsed = !state.isCollapsed;
    },
    setSidebarCollapsed: (state, action) => {
      state.isCollapsed = action.payload;
    },
    setActiveItem: (state, action) => {
      state.activeItem = action.payload;
    },
  },
});

export const { toggleSidebar, setSidebarCollapsed, setActiveItem } = sidebarSlice.actions;
export default sidebarSlice.reducer;
