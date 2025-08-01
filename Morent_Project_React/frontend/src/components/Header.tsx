import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { logout } from '../store/slices/authSlice';
import type { RootState } from '../store';
import { useState, useEffect } from 'react';

const Header = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.auth.user);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    let shouldUseDark = false;
    
    if (savedTheme === 'dark') {
      shouldUseDark = true;
    } else if (!savedTheme && prefersDark) {
      shouldUseDark = true;
    }
    
    setIsDarkMode(shouldUseDark);
    document.documentElement.classList.toggle('dark', shouldUseDark);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('authToken');
    navigate('/login');
  };



  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    document.documentElement.classList.toggle('dark', newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          <h2>MORENT</h2>
        </Link>
        
        <div className="search-bar">
          <input 
            type="text" 
            placeholder="Search something here" 
            className="search-input"
          />
          <button className="search-btn">🔍</button>
        </div>

        <nav className="nav">
          <Link to="/" className="nav-link">{t('nav.home')}</Link>
          <Link to="/cars" className="nav-link">{t('nav.cars')}</Link>
          
          <div className="header-controls">

            <button onClick={toggleTheme} className="theme-toggle">
              {isDarkMode ? '☀️' : '🌙'}
            </button>

            <div className="language-switcher">
              <button 
                onClick={() => changeLanguage('en')} 
                className={i18n.language === 'en' ? 'active' : ''}
              >
                EN
              </button>
              <button 
                onClick={() => changeLanguage('ru')} 
                className={i18n.language === 'ru' ? 'active' : ''}
              >
                RU
              </button>
            </div>
            {user ? (
              <div className="user-menu">
                <span className="user-name">{user.name}</span>
                <Link to="/profile" className="nav-link">{t('nav.profile')}</Link>
                <button onClick={handleLogout} className="logout-btn">
                  {t('nav.logout')}
                </button>
              </div>
            ) : (
              <Link to="/login" className="login-btn">
                {t('nav.login')}
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;