import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setSelectedCar, setCars } from '../store/slices/carsSlice';
import { setCurrentBooking } from '../store/slices/bookingSlice';
import { cars as carsData } from '../data/cars';
import type { RootState } from '../store';

const CarDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const selectedCar = useAppSelector((state: RootState) => state.cars.selectedCar);

  useEffect(() => {
    dispatch(setCars(carsData));
    if (id) {
      let car = null;
      for (let i = 0; i < carsData.length; i++) {
        if (carsData[i].id === id) {
          car = carsData[i];
          break;
        }
      }
      if (car) {
        dispatch(setSelectedCar(car));
      }
    }
  }, [dispatch, id, carsData]);

  const handleBookNow = () => {
    if (selectedCar) {
      dispatch(setCurrentBooking({
        carId: selectedCar.id,
        car: selectedCar
      }));
    }
  };

  if (!selectedCar) {
    return (
      <div className="loading">
        <p>Loading car details...</p>
      </div>
    );
  }

  return (
    <div className="car-detail">
      <div className="car-detail-container">
        <div className="car-info">
          <div className="car-header">
            <h1>{selectedCar.brand} {selectedCar.model}</h1>
            <div className="car-rating">
              <div className="stars">
                <span className={`star ${1 <= selectedCar.rating ? 'filled' : ''}`}>★</span>
                <span className={`star ${2 <= selectedCar.rating ? 'filled' : ''}`}>★</span>
                <span className={`star ${3 <= selectedCar.rating ? 'filled' : ''}`}>★</span>
                <span className={`star ${4 <= selectedCar.rating ? 'filled' : ''}`}>★</span>
                <span className={`star ${5 <= selectedCar.rating ? 'filled' : ''}`}>★</span>
              </div>
              <span className="rating-value">{selectedCar.rating.toFixed(1)}</span>
              <span className="rating-text">(440+ Reviews)</span>
            </div>
          </div>

          <p className="car-description">
            NISMO has become the embodiment of Nissan's outstanding performance, 
            inspired by the most unforgiving proving ground, the "race track".
          </p>

          <div className="car-specs">
            <h3>{t('cars.details.specifications')}</h3>
            <div className="specs-grid">
              <div className="spec-item">
                <span className="spec-label">{t('cars.details.transmission')}</span>
                <span className="spec-value">{selectedCar.transmission}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">{t('cars.details.fuel')}</span>
                <span className="spec-value">{selectedCar.fuel}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">{t('cars.details.seats')}</span>
                <span className="spec-value">{selectedCar.seats} People</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">{t('cars.details.year')}</span>
                <span className="spec-value">{selectedCar.year}</span>
              </div>
            </div>
          </div>

          <div className="pricing">
            <div className="price">
              <span className="amount">${selectedCar.price}.00</span>
              <span className="period">{t('cars.perDay')}</span>
            </div>
            <Link to="/booking" onClick={handleBookNow} className="book-btn">
              {t('booking.bookNow')}
            </Link>
          </div>
        </div>
      </div>

      <div className="reviews-section">
        <h3>Reviews</h3>
        <div className="review-summary">
          <span className="review-count">13</span>
          <span className="review-text">Reviews</span>
        </div>
        
        <div className="reviews-list">
          <div className="review-item">
            <div className="reviewer">
              <div className="reviewer-info">
                <h4>Alex Stanton</h4>
                <p>CEO at Bukalapak</p>
              </div>
              <div className="review-meta">
                <span className="date">21 July 2022</span>
                <div className="stars">★★★★★</div>
              </div>
            </div>
            <p className="review-text">
              We are very happy with the service from the MORENT App. 
              Morent has a low price and also a large variety of cars with good and comfortable facilities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetail;