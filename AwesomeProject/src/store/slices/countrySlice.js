import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//const BASE_URL = 'http://localhost:5000/api/countries';
const BASE_URL = 'http://192.168.191.235:5000/api/countries';


export const fetchCountries = createAsyncThunk('country/fetchCountries', async (name) => {
  const res = await axios.get(`${BASE_URL}?name=${name}`);
  return res.data;
});

export const fetchCountryDetail = createAsyncThunk('country/fetchCountryDetail', async (code) => {
  const res = await axios.get(`${BASE_URL}/${code}`);
  return res.data;
});

const countrySlice = createSlice({
  name: 'country',
  initialState: {
    countries: [],
    selectedCountry: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.loading = false;
        state.countries = action.payload;
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchCountryDetail.fulfilled, (state, action) => {
        state.selectedCountry = action.payload;
      });
  },
});

export default countrySlice.reducer;
