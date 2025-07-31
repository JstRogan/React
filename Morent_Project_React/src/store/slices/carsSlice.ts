import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  image: string;
  transmission: 'Manual' | 'Automatic';
  fuel: 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid';
  seats: number;
  available: boolean;
  location: string;
  rating: number;
}

interface CarsState {
  cars: Car[];
  filteredCars: Car[];
  loading: boolean;
  selectedCar: Car | null;
  filters: {
    brand: string;
    priceRange: [number, number];
    transmission: string;
    fuel: string;
  };
}

const initialState: CarsState = {
  cars: [],
  filteredCars: [],
  loading: false,
  selectedCar: null,
  filters: {
    brand: '',
    priceRange: [0, 1000],
    transmission: '',
    fuel: '',
  },
};

const carsSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    setCars: (state, action: PayloadAction<Car[]>) => {
      state.cars = action.payload;
      state.filteredCars = action.payload;
    },
    setSelectedCar: (state, action: PayloadAction<Car | null>) => {
      state.selectedCar = action.payload;
    },
    setFilters: (state, action: PayloadAction<Partial<CarsState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    applyFilters: (state) => {
      const filtered: Car[] = [];
      
      for (let i = 0; i < state.cars.length; i++) {
        const car = state.cars[i];
        let shouldInclude = true;
        
        if (state.filters.brand) {
          if (!car.brand.toLowerCase().includes(state.filters.brand.toLowerCase())) {
            shouldInclude = false;
          }
        }
        
        if (shouldInclude && state.filters.transmission) {
          if (car.transmission !== state.filters.transmission) {
            shouldInclude = false;
          }
        }
        
        if (shouldInclude && state.filters.fuel) {
          if (car.fuel !== state.filters.fuel) {
            shouldInclude = false;
          }
        }
        
        if (shouldInclude) {
          if (car.price < state.filters.priceRange[0] || car.price > state.filters.priceRange[1]) {
            shouldInclude = false;
          }
        }
        
        if (shouldInclude) {
          filtered.push(car);
        }
      }
      
      state.filteredCars = filtered;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setCars, setSelectedCar, setFilters, applyFilters, setLoading } = carsSlice.actions;
export default carsSlice.reducer;