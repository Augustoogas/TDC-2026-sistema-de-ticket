import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import ScrollTop from './components/ScrollTop';
import Home from './pages/Home';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import About from './pages/About';
import Help from './pages/Help';
import Login from './pages/Login';
import Checkout from './pages/Checkout';
import AdminPanel from './pages/AdminPanel';

function App() {
  return (
    <Router>
      <ScrollTop />
      <Routes>
        {/* Página sin layout (login) */}
        <Route path="/login" element={<Login />} />

        {/* Páginas con layout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/event/:id" element={<EventDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/help" element={<Help />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/create-event" element={<AdminPanel />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
