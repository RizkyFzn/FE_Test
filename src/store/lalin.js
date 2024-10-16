
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchLalinsData = createAsyncThunk(
  'lalins/fetchLalinsData',
  async () => {
    const response = await axios.get('http://localhost:8080/api/lalins');
    console.log('lalin', response.data.data);
    
    return response.data.data;
  }
);

const lalinSlice = createSlice({
  name: 'lalins',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLalinsData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLalinsData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchLalinsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default lalinSlice.reducer;
