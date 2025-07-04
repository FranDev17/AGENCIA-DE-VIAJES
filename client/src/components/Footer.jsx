import React from 'react';

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-[#1E293B] via-[#0F172A] to-[#0A0F1C] text-white py-12 px-6 overflow-hidden">
      {/* Efectos de fondo animados */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-gradient-radial from-[#38BDF8]/30 to-transparent rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-gradient-radial from-[#2DD4BF]/20 to-transparent rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-radial from-[#38BDF8]/10 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Líneas decorativas animadas */}
      <div className="absolute top-0 left-0 w-full h-1">
        <div className="h-full bg-gradient-to-r from-transparent via-[#38BDF8] to-transparent animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start text-center md:text-left">
        {/* Marca */}
        <div className="group">
          <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] via-[#2DD4BF] to-[#38BDF8] bg-size-200 animate-gradient-x">
            Aqua xScape
          </h3>
          <p className="text-sm text-gray-400 mt-2 group-hover:text-gray-300 transition-colors duration-300">
            Inspira tu próxima aventura.
          </p>
          {/* Efecto de brillo sutil */}
          <div className="w-16 h-0.5 bg-gradient-to-r from-[#38BDF8] to-[#2DD4BF] mt-3 mx-auto md:mx-0 opacity-60"></div>
        </div>

        {/* Enlaces rápidos */}
        <div className="group">
          <h4 className="text-lg font-semibold mb-4 text-[#38BDF8] relative">
            Enlaces
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#38BDF8] to-[#2DD4BF] group-hover:w-full transition-all duration-500"></div>
          </h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <a href="/" className="relative hover:text-white transition-all duration-300 group/link">
                <span className="relative z-10">Inicio</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#38BDF8]/20 to-[#2DD4BF]/20 rounded px-2 py-1 -mx-2 -my-1 scale-0 group-hover/link:scale-100 transition-transform duration-300"></div>
              </a>
            </li>
            <li>
              <a href="/boletos" className="relative hover:text-white transition-all duration-300 group/link">
                <span className="relative z-10">Destinos</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#38BDF8]/20 to-[#2DD4BF]/20 rounded px-2 py-1 -mx-2 -my-1 scale-0 group-hover/link:scale-100 transition-transform duration-300"></div>
              </a>
            </li>
            <li>
              <a href="/nosotros" className="relative hover:text-white transition-all duration-300 group/link">
                <span className="relative z-10">Sobre Nosotros</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#38BDF8]/20 to-[#2DD4BF]/20 rounded px-2 py-1 -mx-2 -my-1 scale-0 group-hover/link:scale-100 transition-transform duration-300"></div>
              </a>
            </li>
          </ul>
        </div>

        {/* Redes sociales */}
        <div className="group">
          <h4 className="text-lg font-semibold mb-4 text-[#38BDF8] relative">
            Síguenos
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#38BDF8] to-[#2DD4BF] group-hover:w-full transition-all duration-500"></div>
          </h4>
          <div className="flex justify-center md:justify-start gap-4">
            <a href="#" className="group/social relative p-2 rounded-full bg-gradient-to-br from-[#1E293B] to-[#0F172A] border border-gray-700/50 hover:border-[#38BDF8]/50 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#38BDF8]/25">
              <svg className="w-5 h-5 fill-current text-gray-400 group-hover/social:text-[#2DD4BF] transition-colors duration-300" viewBox="0 0 24 24">
                <path d="M22 12c0-5.522-4.478-10-10-10S2 6.478 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54v-2.891h2.54V9.845c0-2.506 1.493-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.261c-1.243 0-1.63.771-1.63 1.562v1.876h2.773l-.443 2.891h-2.33V22C18.343 21.128 22 16.991 22 12z" />
              </svg>
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#38BDF8]/20 to-[#2DD4BF]/20 opacity-0 group-hover/social:opacity-100 transition-opacity duration-300"></div>
            </a>
            <a href="#" className="group/social relative p-2 rounded-full bg-gradient-to-br from-[#1E293B] to-[#0F172A] border border-gray-700/50 hover:border-[#38BDF8]/50 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#38BDF8]/25">
              <svg className="w-5 h-5 fill-current text-gray-400 group-hover/social:text-[#2DD4BF] transition-colors duration-300" viewBox="0 0 24 24">
                <path d="M24 4.557a9.93 9.93 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724 9.85 9.85 0 0 1-3.127 1.195 4.924 4.924 0 0 0-8.39 4.49A13.978 13.978 0 0 1 1.671 3.15a4.922 4.922 0 0 0 1.523 6.574 4.903 4.903 0 0 1-2.229-.616v.062a4.926 4.926 0 0 0 3.946 4.827 4.902 4.902 0 0 1-2.224.085 4.927 4.927 0 0 0 4.6 3.417A9.867 9.867 0 0 1 0 19.54a13.94 13.94 0 0 0 7.548 2.209c9.057 0 14.01-7.503 14.01-14.009 0-.213-.005-.426-.014-.637A10.012 10.012 0 0 0 24 4.557z" />
              </svg>
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#38BDF8]/20 to-[#2DD4BF]/20 opacity-0 group-hover/social:opacity-100 transition-opacity duration-300"></div>
            </a>
            <a href="#" className="group/social relative p-2 rounded-full bg-gradient-to-br from-[#1E293B] to-[#0F172A] border border-gray-700/50 hover:border-[#38BDF8]/50 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#38BDF8]/25">
              <svg className="w-5 h-5 fill-current text-gray-400 group-hover/social:text-[#2DD4BF] transition-colors duration-300" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.206.056 2.003.24 2.467.402a4.92 4.92 0 0 1 1.81 1.175 4.922 4.922 0 0 1 1.175 1.81c.162.464.346 1.26.402 2.467.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.056 1.206-.24 2.003-.402 2.467a4.932 4.932 0 0 1-1.175 1.81 4.932 4.932 0 0 1-1.81 1.175c-.464.162-1.26.346-2.467.402-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.206-.056-2.003-.24-2.467-.402a4.932 4.932 0 0 1-1.81-1.175 4.932 4.932 0 0 1-1.175-1.81c-.162-.464-.346-1.26-.402-2.467C2.175 15.747 2.163 15.367 2.163 12s.012-3.584.07-4.85c.056-1.206.24-2.003.402-2.467A4.92 4.92 0 0 1 3.81 3.873a4.92 4.92 0 0 1 1.81-1.175c.464-.162 1.26-.346 2.467-.402C8.416 2.175 8.796 2.163 12 2.163zm0 1.837a8 8 0 1 0 0 16.001 8 8 0 0 0 0-16.001zm0 3.837a4.162 4.162 0 1 1 0 8.324 4.162 4.162 0 0 1 0-8.324zm6.406-.406a.96.96 0 1 1-1.92 0 .96.96 0 0 1 1.92 0z" />
              </svg>
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#38BDF8]/20 to-[#2DD4BF]/20 opacity-0 group-hover/social:opacity-100 transition-opacity duration-300"></div>
            </a>
          </div>
        </div>
      </div>

      {/* Línea divisoria con efecto */}
      <div className="relative mt-10 pt-6">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-px bg-gradient-to-r from-[#38BDF8] to-[#2DD4BF] opacity-50"></div>
        
        <div className="text-center text-xs text-gray-500 relative">
          <span className="bg-gradient-to-b from-[#1E293B] to-[#0A0F1C] px-4">
            © 2025 AquaScape. Todos los derechos reservados.
          </span>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }
        
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }
        
        .bg-size-200 {
          background-size: 200% 200%;
        }
        
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
      `}</style>
    </footer>
  );
}