import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setCars } from '../store/slices/carsSlice';
import { cars } from '../data/cars';
import CarCard from '../components/CarCard.tsx';
import type { RootState } from '../store';
import type { Car } from '../store/slices/carsSlice';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Home = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const carsData = useAppSelector((state: RootState) => (state.cars as { cars: Car[] }).cars);

  const slides = [
    {
      title: "The Best Platform for Car Rental",
      subtitle: "Ease of doing a car rental safely and reliably. Of course at a low price.",
      color: "#3b82f6"
    },
    {
      title: "Luxury Cars for Special Occasions",
      subtitle: "Experience premium comfort and style with our luxury vehicle collection.",
      color: "#1f2937"
    },
    {
      title: "Eco-Friendly Electric Vehicles",
      subtitle: "Go green with our modern electric car fleet. Clean, quiet, and efficient.",
      color: "#10b981"
    }
  ];

  useEffect(() => {
    dispatch(setCars(cars));
  }, [dispatch]);

  const popularCars = carsData.slice(0, 4);

  return (
    <div className="home">

      <section className="hero-slider">
        <div id="heroCarousel" className="carousel slide" data-bs-ride="carousel" data-bs-interval="5000">
          <div className="carousel-indicators">
            {slides.map((_, index) => (
              <button
                key={index}
                type="button"
                data-bs-target="#heroCarousel"
                data-bs-slide-to={index}
                className={index === 0 ? "active" : ""}
                aria-current={index === 0 ? "true" : "false"}
                aria-label={`Slide ${index + 1}`}
              />
            ))}
          </div>
          
          <div className="carousel-inner">
            {slides.map((slide, index) => (
              <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                <div className="slide" style={{ backgroundColor: slide.color, height: '400px' }}>
                  <div className="slide-content d-flex align-items-center justify-content-between h-100 px-5">
                    <div className="slide-text text-white">
                      <h1 className="display-4 fw-bold mb-3">{slide.title}</h1>
                      <p className="lead mb-4">{slide.subtitle}</p>
                      <Link to="/cars" className="btn btn-light btn-lg">Book Your Car</Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </section>


      <section className="booking-form">
        <h3>Book Your Car</h3>
        <div className="booking-card">
          <div className="booking-option">
            <div className="radio-group">
              <input type="radio" id="pickup" name="booking-type" defaultChecked />
              <label htmlFor="pickup">Pick - Up</label>
            </div>
            <div className="booking-fields">
              <div className="field">
                <label>Locations</label>
                <select>
                  <option>Select your city</option>
                </select>
              </div>
              <div className="field">
                <label>Date</label>
                <input type="date" />
              </div>
              <div className="field">
                <label>Time</label>
                <input type="time" />
              </div>
            </div>
          </div>
          
          <button className="swap-btn">⇄</button>
          
          <div className="booking-option">
            <div className="radio-group">
              <input type="radio" id="dropoff" name="booking-type" />
              <label htmlFor="dropoff">Drop - Off</label>
            </div>
            <div className="booking-fields">
              <div className="field">
                <label>Locations</label>
                <select>
                  <option>Select your city</option>
                </select>
              </div>
              <div className="field">
                <label>Date</label>
                <input type="date" />
              </div>
              <div className="field">
                <label>Time</label>
                <input type="time" />
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="popular-cars with-padding">
        <div className="section-header">
          <h3>{t('home.popularCars')}</h3>
          <Link to="/cars" className="view-all">{t('home.viewAll')}</Link>
        </div>
        
        <div className="cars-grid">
          {popularCars.map((car: Car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;