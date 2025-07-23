import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Car } from './carsSlice';

export interface Booking {
  id: string;
  carId: string;
  car: Car;
  userId: string;
  startDate: string;
  endDate: string;
  pickupLocation: string;
  dropoffLocation: string;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: string;
}

interface BookingState {
  bookings: Booking[];
  currentBooking: Partial<Booking> | null;
  loading: boolean;
}

const initialState: BookingState = {
  bookings: [],
  currentBooking: null,
  loading: false,
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setBookings: (state, action: PayloadAction<Booking[]>) => {
      state.bookings = action.payload;
    },
    addBooking: (state, action: PayloadAction<Booking>) => {
      state.bookings.push(action.payload);
    },
    setCurrentBooking: (state, action: PayloadAction<Partial<Booking> | null>) => {
      state.currentBooking = action.payload;
    },
    updateBookingStatus: (state, action: PayloadAction<{ id: string; status: Booking['status'] }>) => {
      const booking = state.bookings.find(b => b.id === action.payload.id);
      if (booking) {
        booking.status = action.payload.status;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    clearCurrentBooking: (state) => {
      state.currentBooking = null;
    },
  },
});

export const { 
  setBookings, 
  addBooking, 
  setCurrentBooking, 
  updateBookingStatus, 
  setLoading, 
  clearCurrentBooking 
} = bookingSlice.actions;
export default bookingSlice.reducer;