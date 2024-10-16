import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchGerbangData = createAsyncThunk(
  'gerbang/fetchGerbangData',
  async () => {
    const response = await axios.get('http://localhost:8080/api/gerbangs');
    return response.data;
  }
);

export const deleteGerbang = createAsyncThunk(
  'gerbang/deleteGerbang',
  async ({ id, idCabang }) => {
    await axios.delete(`http://localhost:8080/api/gerbangs`, {
      data: { id, IdCabang: idCabang }
    });
    return id;
  }
);

export const updateGerbang = createAsyncThunk(
  'gerbang/updateGerbang',
  async (gerbang) => {
    const response = await axios.put(`http://localhost:8080/api/gerbangs/`, gerbang);
    return response.data;
  }
);

export const createGerbang = createAsyncThunk(
  'gerbang/createGerbang',
  async (gerbang) => {
    const response = await axios.post(`http://localhost:8080/api/gerbangs`, gerbang);
    return response.data;
  }
);

const gerbangSlice = createSlice({
  name: 'gerbang',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGerbangData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGerbangData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data.rows.rows;
      })
      .addCase(fetchGerbangData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteGerbang.fulfilled, (state, action) => {
        state.data = state.data.filter(item => item.id !== action.payload);
      })
      .addCase(createGerbang.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateGerbang.fulfilled, (state, action) => {
        const index = state.data.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      });
  },
});

export default gerbangSlice.reducer;
