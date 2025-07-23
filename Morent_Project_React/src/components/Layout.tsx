import { Outlet } from 'react-router-dom';
import Header from './Header.tsx';
import Footer from './Footer.tsx';

const Layout = () => {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;