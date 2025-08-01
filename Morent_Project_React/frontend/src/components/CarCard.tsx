import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { Car } from '../store/slices/carsSlice';

interface CarCardProps {
  car: Car;
}

const CarCard = ({ car }: CarCardProps) => {
  const { t } = useTranslation();

  return (
    <div className="car-card">
      <div className="car-header">
        <div className="car-title">
          <h4 className="car-name">{car.brand} {car.model}</h4>
          <p className="car-type">{car.fuel}</p>
        </div>
        <button className="favorite-btn">♡</button>
      </div>
      
      <div className="car-rating">
        <div className="stars">
          <span className={`star ${1 <= car.rating ? 'filled' : ''}`}>★</span>
          <span className={`star ${2 <= car.rating ? 'filled' : ''}`}>★</span>
          <span className={`star ${3 <= car.rating ? 'filled' : ''}`}>★</span>
          <span className={`star ${4 <= car.rating ? 'filled' : ''}`}>★</span>
          <span className={`star ${5 <= car.rating ? 'filled' : ''}`}>★</span>
        </div>
        <span className="rating-value">{car.rating.toFixed(1)}</span>
      </div>
       
       <div className="car-specs">
        <div className="spec">
          <span className="icon">⛽</span>
          <span>{car.fuel}</span>
        </div>
        <div className="spec">
          <span className="icon">⚙️</span>
          <span>{car.transmission}</span>
        </div>
        <div className="spec">
          <span className="icon">👥</span>
          <span>{car.seats} People</span>
        </div>
      </div>
      
      <div className="car-footer">
        <div className="price">
          <span className="amount">${car.price}.00</span>
          <span className="period">{t('cars.perDay')}</span>
        </div>
        <Link to={`/cars/${car.id}`} className="rent-btn">
          {t('cars.rentNow')}
        </Link>
      </div>
    </div>
  );
};

export default CarCard;