import React from 'react';
import sublogoImage from '../assets/SUBLOGO.png';
import headerImage from '../assets/HEADER.jpg';
import { useEffect, useState } from 'react';

const Header = () => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.name) {
      setUserName(user.name);
    }
  }, []);
  return (
    <header 
      className="relative h-screen w-full overflow-hidden"
      style={{ zIndex: 40 }}
    >
      {/* Imagen de fondo */}
      <div className="absolute inset-0">
        <img
          src={headerImage}
          alt="Header background"
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
        {/* Overlay para mejorar la visibilidad del texto */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Resto del contenido del header */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-white px-4">
        {/* Logo */}
        <div className="absolute top-8 left-8">
          <h1 className="text-3xl font-bold">Aqua Scape</h1>
        </div>
        <div className="absolute top-8 left-13">
          <h1 className="text-3xl font-bold">{userName}</h1>
        </div>
        {/* Contenido principal */}
        <div className="text-center relative">
          <div className="relative inline-block">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
              <span className="text-yellow-400">Descubre</span> el Mundo
            </h2>
            <img 
              src={sublogoImage} 
              alt="SubLogo" 
              className="absolute left-1/2 -top-16 w-28 h-28 object-contain transform -translate-x-1/2"
              style={{
                filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.6))',
                transform: 'translateX(-50%) rotate(-5deg)'
              }}
            />
          </div>
          <p className="text-xl md:text-2xl mb-8 text-white/90">
            Vive experiencias inolvidables con nosotros
          </p>
          <button onClick={() => window.location.href = "/boletos"} className="bg-yellow-400 text-black px-8 py-3 rounded-full font-semibold hover:bg-yellow-300 transition-colors">
            Explorar Destinos
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
