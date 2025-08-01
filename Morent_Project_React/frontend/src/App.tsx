import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import './App.css';

import Layout from './components/Layout';
import Home from './pages/Home';
import Cars from './pages/Cars';
import CarDetail from './pages/CarDetail';
import Booking from './pages/Booking';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Profile from './pages/Profile';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Layout />}>
            <Route index element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            } />
            <Route path="cars" element={
              <PrivateRoute>
                <Cars />
              </PrivateRoute>
            } />
            <Route path="cars/:id" element={
              <PrivateRoute>
                <CarDetail />
              </PrivateRoute>
            } />
            <Route path="booking" element={
              <PrivateRoute>
                <Booking />
              </PrivateRoute>
            } />
            <Route path="profile" element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            } />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
