import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setCars, setFilters, applyFilters } from '../store/slices/carsSlice';
import type { Car } from '../store/slices/carsSlice';
import type { RootState } from '../store';
import CarCard from '../components/CarCard';
import { cars } from '../data/cars';

const Cars: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  
  const filteredCars = useAppSelector((state: RootState) => state.cars.filteredCars);
  const filters = useAppSelector((state: RootState) => state.cars.filters);

  useEffect(() => {
    dispatch(setCars(cars));
  }, [dispatch]);

  const handleFilterChange = (filterType: string, value: string | number | number[]) => {
    dispatch(setFilters({ [filterType]: value }));
    dispatch(applyFilters());
  };

  const clearFilters = () => {
    dispatch(setFilters({
      brand: '',
      transmission: '',
      fuel: '',
      priceRange: [0, 1000]
    }));
    dispatch(applyFilters());
  };

  return (
    <div className="cars-page">
      <div className="cars-container">
        <div className="filters">
          <div className="filters-header">
            <h3>{t('filters')}</h3>
          </div>
          
          <div className="filter-group">
            <label>{t('brand')}</label>
            <select 
              value={filters.brand} 
              onChange={(e) => handleFilterChange('brand', e.target.value)}
            >
              <option value="">{t('allBrands')}</option>
              <option value="Koenigsegg">Koenigsegg</option>
              <option value="Nissan">Nissan</option>
              <option value="Rolls-Royce">Rolls-Royce</option>
              <option value="All New Rush">All New Rush</option>
              <option value="CR-V">CR-V</option>
              <option value="MG ZX">MG ZX</option>
              <option value="New MG ZS">New MG ZS</option>
            </select>
          </div>

          <div className="filter-group">
            <label>{t('cars.filters.transmission')}</label>
            <select 
              value={filters.transmission} 
              onChange={(e) => handleFilterChange('transmission', e.target.value)}
            >
              <option value="">{t('allTypes')}</option>
              <option value="Manual">Manual</option>
              <option value="Automatic">Automatic</option>
            </select>
          </div>

          <div className="filter-group">
            <label>{t('cars.filters.fuel')}</label>
            <select 
              value={filters.fuel} 
              onChange={(e) => handleFilterChange('fuel', e.target.value)}
            >
              <option value="">All Fuel Types</option>
              <option value="Petrol">Petrol</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          <div className="filter-group">
            <label>{t('priceRange')}</label>
            <div className="price-range">
              <input
                type="range"
                min="0"
                max="200"
                value={filters.priceRange[1]}
                onChange={(e) => handleFilterChange('priceRange', [0, parseInt(e.target.value)])}
              />
              <span>$0 - ${filters.priceRange[1]}/day</span>
            </div>
          </div>

          <div className="filter-actions">
            <button className="clear-btn" onClick={clearFilters}>
              {t('clearFilters')}
            </button>
          </div>
        </div>

        <div className="cars-main">
          <div className="cars-grid">
            {filteredCars.length > 0 ? (
              filteredCars.map((car: Car) => (
                <CarCard key={car.id} car={car} />
              ))
            ) : (
              <div className="no-cars">
                <h3>{t('noCarsFound')}</h3>
                <p>{t('tryAdjustingFilters')}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cars;