import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SidebarState {
  isCollapsed: boolean;
  activeItem: string;
}

const initialState: SidebarState = {
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
    setSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.isCollapsed = action.payload;
    },
    setActiveItem: (state, action: PayloadAction<string>) => {
      state.activeItem = action.payload;
    },
  },
});

export const { toggleSidebar, setSidebarCollapsed, setActiveItem } = sidebarSlice.actions;
export default sidebarSlice.reducer;
