import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../store/hooks';
import { loginSuccess } from '../../store/slices/authSlice';

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');


    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }


    const mockUser = {
      id: '1',
      email: formData.email,
      name: formData.email.split('@')[0]
    };

    dispatch(loginSuccess(mockUser));
    localStorage.setItem('authToken', 'mock-token');
    localStorage.setItem('user', JSON.stringify(mockUser));
    navigate('/');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{t('auth.loginTitle')}</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">{t('auth.email')}</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">{t('auth.password')}</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          
          <button type="submit" className="auth-btn">
            {t('auth.login')}
          </button>
        </form>
        
        <p className="auth-link">
          {t('auth.noAccount')} <Link to="/register">{t('auth.registerLink')}</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;