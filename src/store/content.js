import { createSlice } from '@reduxjs/toolkit';

const contentSlice = createSlice({
  name: 'content',
  initialState: {
    activeContent: 'dashboard',
  },
  reducers: {
    setActiveContent(state, action) {
      state.activeContent = action.payload;
    },
  },
});

export const { setActiveContent } = contentSlice.actions;
export default contentSlice.reducer;
