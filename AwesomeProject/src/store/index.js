import { configureStore } from '@reduxjs/toolkit';
import countryReducer from './slices/countrySlice';

export const store = configureStore({
  reducer: {
    country: countryReducer,
  },
   
});
