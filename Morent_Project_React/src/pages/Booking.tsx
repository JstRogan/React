import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addBooking, clearCurrentBooking } from '../store/slices/bookingSlice';
import type { Booking } from '../store/slices/bookingSlice';
import type { RootState } from '../store';

const BookingPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentBooking = useAppSelector((state: RootState) => state.booking.currentBooking);
  const user = useAppSelector((state: RootState) => state.auth.user);


  const getCurrentDateTime = () => {
    const now = new Date();
    const date = now.toISOString().split('T')[0];
    const time = now.toTimeString().slice(0, 5);
    return { date, time };
  };
  
  const [formData, setFormData] = useState({
    pickupLocation: '',
    dropoffLocation: '',
    startDate: '',
    endDate: '',
    startTime: '09:00',
    endTime: '18:00'
  });
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!currentBooking?.car || !user) {
      setError('Missing booking information. Please select a car first.');
      return;
    }
    
    if (!formData.pickupLocation || !formData.dropoffLocation || 
        !formData.startDate || !formData.endDate || 
        !formData.startTime || !formData.endTime) {
      setError('Please fill in all required fields including pickup and drop-off times');
      return;
    }
    
    const startDateTime = new Date(`${formData.startDate}T${formData.startTime}`);
    const endDateTime = new Date(`${formData.endDate}T${formData.endTime}`);
    

    if (isNaN(startDateTime.getTime()) || isNaN(endDateTime.getTime())) {
      setError('Please enter valid dates and times');
      return;
    }
    

    const now = new Date();
    if (startDateTime <= now) {
      setError('Pickup date and time must be in the future');
      return;
    }
    

    if (endDateTime <= startDateTime) {
      setError('Drop-off date and time must be after pickup date and time');
      return;
    }
    

    const durationHours = (endDateTime.getTime() - startDateTime.getTime()) / (1000 * 60 * 60);
    if (durationHours < 1) {
      setError('Minimum booking duration is 1 hour');
      return;
    }
    

    const durationDays = Math.ceil(durationHours / 24);
    const days = Math.max(1, durationDays);
    const totalPrice = days * currentBooking.car.price;
    
    const newBooking: Booking = {
      id: Date.now().toString(),
      carId: currentBooking.car.id,
      car: currentBooking.car,
      userId: user.id,
      startDate: `${formData.startDate}T${formData.startTime}`,
      endDate: `${formData.endDate}T${formData.endTime}`,
      pickupLocation: formData.pickupLocation,
      dropoffLocation: formData.dropoffLocation,
      totalPrice,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };
    
    dispatch(addBooking(newBooking));
    setSuccess(true);
    
    setTimeout(() => {
      dispatch(clearCurrentBooking());
      navigate('/profile');
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value
    });
    

    if (error) {
      setError('');
    }
    

    if (name === 'startDate' && formData.endDate && value > formData.endDate) {
      setFormData(prev => ({
        ...prev,
        [name]: value,
        endDate: value
      }));
    }
  };

  if (!currentBooking?.car) {
    return (
      <div className="booking-error">
        <h2>No car selected</h2>
        <p>Please select a car first.</p>
        <button onClick={() => navigate('/cars')} className="btn">
          Browse Cars
        </button>
      </div>
    );
  }

  if (success) {
    return (
      <div className="booking-success">
        <h2>{t('booking.success')}</h2>
        <p>Redirecting to your profile...</p>
      </div>
    );
  }

  const calculateTotal = () => {
    if (!formData.startDate || !formData.endDate || !formData.startTime || !formData.endTime || !currentBooking?.car) {
      return 0;
    }
    
    const startDateTime = new Date(`${formData.startDate}T${formData.startTime}`);
    const endDateTime = new Date(`${formData.endDate}T${formData.endTime}`);
    

    if (isNaN(startDateTime.getTime()) || isNaN(endDateTime.getTime())) {
      return 0;
    }
    

    if (endDateTime <= startDateTime) {
      return 0;
    }
    

    const durationHours = (endDateTime.getTime() - startDateTime.getTime()) / (1000 * 60 * 60);
    const days = Math.max(1, Math.ceil(durationHours / 24));
    
    return days * currentBooking.car.price;
  };

  return (
    <div className="booking-page">
      <div className="booking-container">
        <div className="booking-form-section">
          <h2>{t('booking.title')}</h2>
          
          {error && <div className="error-message">{error}</div>}
          
          <form onSubmit={handleSubmit} className="booking-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="pickupLocation">{t('booking.pickupLocation')}</label>
                <select
                  id="pickupLocation"
                  name="pickupLocation"
                  value={formData.pickupLocation}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select location</option>
                  <option value="New York">New York</option>
                  <option value="Los Angeles">Los Angeles</option>
                  <option value="Chicago">Chicago</option>
                  <option value="Miami">Miami</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="dropoffLocation">{t('booking.dropoffLocation')}</label>
                <select
                  id="dropoffLocation"
                  name="dropoffLocation"
                  value={formData.dropoffLocation}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select location</option>
                  <option value="New York">New York</option>
                  <option value="Los Angeles">Los Angeles</option>
                  <option value="Chicago">Chicago</option>
                  <option value="Miami">Miami</option>
                </select>
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="startDate">{t('booking.pickupDate')}</label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  min={getCurrentDateTime().date}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="startTime">Pickup Time</label>
                <input
                  type="time"
                  id="startTime"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="endDate">{t('booking.dropoffDate')}</label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  min={formData.startDate || getCurrentDateTime().date}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="endTime">Drop-off Time</label>
                <input
                  type="time"
                  id="endTime"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <button type="submit" className="book-btn">
              {t('booking.bookNow')}
            </button>
          </form>
        </div>
        
        <div className="booking-summary">
          <h3>Rental Summary</h3>
          
          <div className="car-summary">
            <img src={currentBooking.car.image} alt={`${currentBooking.car.brand} ${currentBooking.car.model}`} />
            <div className="car-info">
              <h4>{currentBooking.car.brand} {currentBooking.car.model}</h4>
              <div className="rating">★★★★★ 440+ Reviews</div>
            </div>
          </div>
          
          <div className="price-breakdown">
            <div className="price-item">
              <span>Subtotal</span>
              <span>${calculateTotal()}.00</span>
            </div>
            <div className="price-item">
              <span>Tax</span>
              <span>$0.00</span>
            </div>
            <div className="price-item total">
              <span>{t('booking.totalPrice')}</span>
              <span>${calculateTotal()}.00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;