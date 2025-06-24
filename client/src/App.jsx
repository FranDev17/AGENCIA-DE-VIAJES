import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import CardCarousel from './components/CardCarousel';
import TravelInfoSection from './components/TravelInfoSection';
import SideMenu from './components/SideMenu';
import BottomMenu from './components/BottomMenu';
import BoletosPage from './pages/boletos/BoletosPage';
import Footer from './components/Footer';
import AuthForm from './pages/Login/AuthForm';
import Nosotros from './pages/Nosotros/Nosotros';
import './App.css';

function App() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <SideMenu />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <TravelInfoSection />
              <CardCarousel />
              <Footer />
            </>
          }
        />
        <Route path="/boletos" element={<BoletosPage />} />
        <Route path="/login" element={<AuthForm />} />
        <Route path="/nosotros" element={<Nosotros />} />
        {/* Puedes agregar más rutas aquí */}
      </Routes>
      <BottomMenu />
    </div>
  );
}

export default App;
