import { Routes, Route } from 'react-router-dom';

import MainLayout from './layouts/MainLayout';
import ScrollTop from './components/ScrollTop';
import AdminRoute from './routes/AdminRoute';

import Home from './pages/Home';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import About from './pages/About';
import Help from './pages/Help';
import Login from './pages/Login';
import Checkout from './pages/Checkout';
import AdminPanel from './pages/AdminPanel';
import Profile from './pages/Profile';
import Unauthorized from './pages/Unauthorized';
import NotFound from './pages/NotFound';

function App() {
  return (
    <>
      <ScrollTop />

      <Routes>
        {/* Página sin layout */}
        <Route path="/login" element={<Login />} />
        <Route path="/403" element={<Unauthorized />} />

        {/* Páginas con layout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/event/:id" element={<EventDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/help" element={<Help />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/create-event"
            element={
              <AdminRoute>
                <AdminPanel />
              </AdminRoute>
            }
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
