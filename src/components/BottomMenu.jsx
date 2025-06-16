import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const menuItems = [
  {
    name: 'Inicio',
    route: '/',
    icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
  },
  {
    name: 'Nosotros',
    route: '/nosotros',
    icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z'
  },
  {
    name: 'Comprar Boletos',
    route: '/boletos',
    icon: 'M4 7h16M4 17h16M7 7v10m10-10v10M5 11h2m12 0h2M5 13h2m12 0h2',
  },
  {
    name: 'Iniciar Sesión',
    route: '/login',
    icon: 'M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z'
  }
];

const BottomMenu = () => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState('Inicio');

  useEffect(() => {
    // Actualizar el ítem activo basado en la ruta actual
    const currentPath = location.pathname;
    const currentItem = menuItems.find(item => item.route === currentPath);
    if (currentItem) {
      setActiveItem(currentItem.name);
    }
  }, [location]);

  const setActive = (name) => {
    setActiveItem(name);
  };

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 bg-transparent">
      <div className="flex justify-center items-end h-full">
        <div className="w-full max-w-4xl mx-auto">
          <div className="flex flex-wrap justify-between items-center px-4 sm:px-10 md:px-20 gap-y-2 sm:gap-y-0">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.route}
                onClick={() => setActive(item.name)}
                className={`flex-1 min-w-[20%] flex flex-col items-center relative group py-2`}
              >
                {/* Fondo activo */}
                <div
                  className={`absolute inset-x-0 top-0 bottom-0 transition-all duration-300 ${
                    location.pathname === item.route ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'
                  }`}
                >
                  <div className="h-full w-full backdrop-blur-sm rounded-t-xl glass-effect">
                    <div className="absolute top-0 left-4 right-4 h-[1px] rounded-full bg-gradient-to-r from-white/0 via-white/40 to-white/0"></div>
                  </div>
                </div>

                {/* Ícono y texto */}
                <div className="flex flex-col items-center gap-1 sm:gap-2 px-2 sm:px-4 relative z-10">
                  <svg
                    className={`w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300 ${
                      location.pathname === item.route
                        ? 'text-white scale-110'
                        : 'text-white/60 group-hover:text-white group-hover:scale-105'
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d={item.icon}
                    />
                  </svg>
                  <span
                    className={`text-[10px] sm:text-xs font-medium tracking-wide transition-all duration-300 ${
                      location.pathname === item.route
                        ? 'text-white'
                        : 'text-white/60 group-hover:text-white'
                    }`}
                  >
                    {item.name}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default BottomMenu;
