import { useTranslation } from 'react-i18next';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { logout } from '../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import type { RootState } from '../store';
import type { Booking } from '../store/slices/bookingSlice';

const Profile = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.auth.user);
  const bookings = useAppSelector((state: RootState) => state.booking.bookings);
  
  const userBookings = bookings.filter((booking: Booking) => booking.userId === user?.id);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  if (!user) {
    return (
      <div className="profile-error">
        <h2>{t('profile.pleaseLogin')}</h2>
        <button onClick={() => navigate('/login')} className="btn">
          {t('profile.goToLogin')}
        </button>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-info">
            <div className="profile-avatar">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="profile-details">
              <h2>{user.name}</h2>
              <p>{user.email}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="logout-btn">
            {t('auth.logout')}
          </button>
        </div>
        
        <div className="profile-content">
          <div className="bookings-section">
            <h3>{t('profile.myBookings')}</h3>
            
            {userBookings.length === 0 ? (
              <div className="no-bookings">
                <p>{t('profile.noBookings')}</p>
                <button onClick={() => navigate('/cars')} className="btn">
                  {t('profile.browseCars')}
                </button>
              </div>
            ) : (
              <div className="bookings-list">
                {userBookings.map((booking: Booking) => (
                  <div key={booking.id} className="booking-card">
                    <div className="booking-car">
                      <img src={booking.car.image} alt={`${booking.car.brand} ${booking.car.model}`} />
                      <div className="car-details">
                        <h4>{booking.car.brand} {booking.car.model}</h4>
                        <p>{booking.car.year}</p>
                      </div>
                    </div>
                    
                    <div className="booking-details">
                      <div className="booking-dates">
                        <div className="date-item">
                          <span className="label">{t('profile.pickup')}</span>
                          <span>{booking.startDate}</span>
                          <span className="location">{booking.pickupLocation}</span>
                        </div>
                        <div className="date-item">
                          <span className="label">{t('profile.dropoff')}</span>
                          <span>{booking.endDate}</span>
                          <span className="location">{booking.dropoffLocation}</span>
                        </div>
                      </div>
                      
                      <div className="booking-price">
                        <span className="total">${booking.totalPrice}</span>
                        <span className={`status ${booking.status}`}>{booking.status}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="profile-stats">
            <div className="stat-card">
              <h4>{t('profile.totalBookings')}</h4>
              <span className="stat-number">{userBookings.length}</span>
            </div>
            
            <div className="stat-card">
              <h4>{t('profile.totalSpent')}</h4>
              <span className="stat-number">
                ${userBookings.reduce((total: number, booking: Booking) => total + booking.totalPrice, 0)}
              </span>
            </div>
            
            <div className="stat-card">
              <h4>{t('profile.memberSince')}</h4>
              <span className="stat-number">2024</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;