import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import carsReducer from './slices/carsSlice';
import bookingReducer from './slices/bookingSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cars: carsReducer,
    booking: bookingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AuthState = ReturnType<typeof authReducer>;
export type CarsState = ReturnType<typeof carsReducer>;
export type BookingState = ReturnType<typeof bookingReducer>;