import React, { useState } from 'react';
// Importamos las imágenes
import avionImage from '../assets/AVION.jpg';
import trenImage from '../assets/TREN.jpg';
import autobusImage from '../assets/AUTOBUS.jpg';
import cruceroImage from '../assets/CRUCERO.jpg';
import logoImage from '../assets/LOGO.png';

const menuItems = [
  { 
    id: 1, 
    name: 'Vuelos', 
    icon: '✈️', 
    route: '/boletos', 
    image: avionImage,
    description: {
      title: 'Viaja por los cielos',
      text: 'Descubre la libertad de volar  '
    }
  },
  { 
    id: 2, 
    name: 'Trenes', 
    icon: '🚂', 
    route: '/boletos', 
    image: trenImage,
    description: {
      title: 'Aventura sobre rieles',
      text: 'Explora paisajes increíbles a través de rutas ferroviarias legendarias con todo el confort'
    }
  },
  { 
    id: 3, 
    name: 'Autobuses', 
    icon: '🚌', 
    route: '/boletos', 
    image: autobusImage,
    description: {
      title: 'Viajes por tierra',
      text: 'Conecta con los mejores destinos nacionales de forma económica y flexible'
    }
  },
 
];

const SideMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(null);
  const [activeDescription, setActiveDescription] = useState(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isMenuOpen) {
      hideImage();
    }
  };

  const showImage = (item) => {
    if (item && item.image) {
      setActiveImage(item.image);
      setActiveDescription(item.description);
    }
  };

  const hideImage = () => {
    setActiveImage(null);
    setActiveDescription(null);
  };

  // Generar burbujas
  const bubbles = Array.from({ length: 20 }, (_, i) => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    width: `${Math.random() * 20 + 10}px`,
    height: `${Math.random() * 20 + 10}px`,
    animationDelay: `${Math.random() * 5}s`,
    animationDuration: `${Math.random() * 10 + 10}s`
  }));

  return (
    <nav>
      {/* Overlay con imagen y descripción */}
      <div
        className={`fixed inset-0 z-[100] transition-all duration-700 ease-in-out ${
          activeImage && isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0F1C]/90 via-[#0F172A]/80 to-[#1E293B]/90 backdrop-blur-sm"></div>
        
        {/* Burbujas */}
        <div className="absolute inset-0 overflow-hidden">
          {bubbles.map((style, i) => (
            <div
              key={i}
              className="bubble absolute rounded-full bg-[#38BDF8]/10"
              style={style}
            />
          ))}
        </div>
        
        {activeImage && (
          <img
            src={activeImage}
            className={`absolute inset-0 w-[calc(100%-320px)] h-full object-cover transform transition-all duration-700 ease-in-out ${
              isMenuOpen ? 'scale-100 translate-x-0 opacity-60' : 'scale-105 -translate-x-4 opacity-0'
            }`}
            alt="Background"
          />
        )}
        
        {activeDescription && (
          <div className="absolute top-1/2 left-[10%] transform -translate-y-1/2 max-w-lg z-[101] bg-gradient-to-r from-[#0A0F1C]/40 to-[#1E293B]/40 backdrop-blur-md p-8 rounded-2xl border border-[#38BDF8]/20 shadow-[0_0_30px_rgba(56,189,248,0.1)]">
            <h2 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] to-[#2DD4BF]">
              {activeDescription.title}
            </h2>
            <p className="text-xl text-[#E2E8F0]">
              {activeDescription.text}
            </p>
          </div>
        )}
      </div>

      {/* Botón de menú */}
      <button 
        onClick={toggleMenu}
        className="fixed top-4 right-4 z-[101] p-3 bg-gradient-to-r from-[#0A0F1C]/40 to-[#1E293B]/40 backdrop-blur-md rounded-full border border-[#38BDF8]/20 shadow-[0_0_20px_rgba(56,189,248,0.1)] hover:scale-105 transition-all duration-300 group"
      >
        <div className={`w-6 h-5 flex flex-col justify-between ${isMenuOpen ? 'menu-open' : ''}`}>
          <span className="w-full h-0.5 bg-gradient-to-r from-[#38BDF8] to-[#2DD4BF] rounded-full transform transition-all duration-300"></span>
          <span className="w-full h-0.5 bg-gradient-to-r from-[#38BDF8] to-[#2DD4BF] rounded-full transform transition-all duration-300"></span>
          <span className="w-full h-0.5 bg-gradient-to-r from-[#38BDF8] to-[#2DD4BF] rounded-full transform transition-all duration-300"></span>
        </div>
      </button>

      {/* Menú lateral */}
      <div 
        className={`fixed top-0 right-0 h-full w-80 bg-gradient-to-br from-[#0A0F1C] via-[#0F172A] to-[#1E293B] shadow-[0_0_50px_rgba(56,189,248,0.15)] z-[100] transform transition-transform duration-500 ease-in-out border-l border-[#38BDF8]/20 flex flex-col ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <button 
          onClick={toggleMenu}
          className="absolute top-4 right-4 p-2 rounded-full bg-gradient-to-r from-[#0A0F1C]/40 to-[#1E293B]/40 backdrop-blur-md border border-[#38BDF8]/20 hover:bg-[#38BDF8]/20 transition-all duration-300 group"
        >
          <svg 
            className="w-6 h-6 text-[#38BDF8] transform transition-transform duration-300 group-hover:rotate-90"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="pt-16 px-8">
          <div className="flex items-center space-x-4 bg-gradient-to-r from-[#0A0F1C]/40 to-[#1E293B]/40 backdrop-blur-md p-4 rounded-2xl border border-[#38BDF8]/20">
            <div className="bg-gradient-to-r from-[#38BDF8]/20 to-[#2DD4BF]/20 rounded-full p-3 shadow-[0_0_20px_rgba(56,189,248,0.1)]">
              <span className="text-3xl">🏝️</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] to-[#2DD4BF] drop-shadow-md tracking-wide">
                Aqua Escape
              </h1>
              <p className="text-sm text-[#38BDF8]/80 font-medium italic">
                Donde tus sueños cobran vida
              </p>
            </div>
          </div>
        </div>

        <div className="px-4 py-6 space-y-4">
          {menuItems.map((item) => (
            <a 
              key={item.id}
              href={item.route}
              className="group flex items-center space-x-4 p-4 rounded-xl bg-gradient-to-r from-[#0A0F1C]/40 to-[#1E293B]/40 backdrop-blur-md border border-[#38BDF8]/20 hover:bg-[#38BDF8]/10 transition-all duration-300 relative overflow-hidden"
              onMouseEnter={() => showImage(item)}
            >
              <div className="bg-gradient-to-r from-[#38BDF8]/20 to-[#2DD4BF]/20 rounded-full p-3 group-hover:scale-110 transition-transform duration-300">
                <span className="text-xl block">
                  {item.icon}
                </span>
              </div>
              <span className="text-[#E2E8F0] font-semibold group-hover:text-[#38BDF8] transition-colors duration-300">
                {item.name}
              </span>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-[#38BDF8] to-[#2DD4BF] group-hover:w-4/5 transition-all duration-500"></div>
            </a>
          ))}
        </div>

        {/* Logo en la parte inferior */}
        <div className="mt-auto p-6 flex justify-center items-center">
          <img 
            src={logoImage} 
            alt="Aqua Escape Logo" 
            className="w-32 h-32 object-contain filter drop-shadow-[0_0_15px_rgba(56,189,248,0.3)] hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Elementos decorativos acuáticos */}
        <div className="absolute top-20 right-12 text-[#38BDF8]/40 text-sm animate-float">🐠</div>
        <div className="absolute bottom-20 left-8 text-[#2DD4BF]/30 text-xs animate-float-delay">🐡</div>
        <div className="absolute bottom-12 right-12 text-[#38BDF8]/50 text-xs animate-float">🐋</div>
      </div>
    </nav>
  );
};

export default SideMenu; 