import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaPlane, 
  FaHeart, 
  FaUserFriends, 
  FaGlobe, 
  FaAward, 
  FaClock, 
  FaHandshake, 
  FaLeaf, 
  FaPhone, 
  FaEnvelope 
} from 'react-icons/fa';
import TeamMember1 from '../../assets/image1.jpg';
import TeamMember2 from '../../assets/image2.jpg';
import TeamMember3 from '../../assets/image3.jpg';
import TeamMember4 from '../../assets/image4.jpg';
import OfficeImage1 from '../../assets/image5.jpg';
import OfficeImage2 from '../../assets/nosotros.jpg';

const Nosotros = () => {
  const [activeTab, setActiveTab] = useState('historia');

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  

  const servicios = [
    {
      icono: <FaPlane className="text-4xl" />,
      titulo: "Viajes Personalizados",
      descripcion: "Diseñamos cada viaje según tus preferencias y necesidades específicas."
    },
    {
      icono: <FaHeart className="text-4xl" />,
      titulo: "Atención Premium",
      descripcion: "Servicio 24/7 para asegurarnos de que tu viaje sea perfecto."
    },
    {
      icono: <FaGlobe className="text-4xl" />,
      titulo: "Destinos Únicos",
      descripcion: "Acceso a lugares exclusivos y experiencias extraordinarias."
    },
    {
      icono: <FaLeaf className="text-4xl" />,
      titulo: "Turismo Sostenible",
      descripcion: "Comprometidos con el medio ambiente y las comunidades locales."
    }
  ];

  const valores = [
    {
      icon: <FaUserFriends className="text-4xl" />,
      titulo: "Compromiso",
      descripcion: "Dedicación total a la satisfacción de nuestros clientes."
    },
    {
      icon: <FaAward className="text-4xl" />,
      titulo: "Excelencia",
      descripcion: "Buscamos la perfección en cada detalle."
    },
    {
      icon: <FaClock className="text-4xl" />,
      titulo: "Puntualidad",
      descripcion: "Respetamos el tiempo de nuestros clientes."
    },
    {
      icon: <FaHandshake className="text-4xl" />,
      titulo: "Confianza",
      descripcion: "Construimos relaciones duraderas."
    }
  ];

  const estadisticas = [
    { numero: "50K+", texto: "Clientes Satisfechos" },
    { numero: "100+", texto: "Destinos Únicos" },
    { numero: "15+", texto: "Años de Experiencia" },
    { numero: "24/7", texto: "Soporte Premium" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0F1C] via-[#0F172A] to-[#1E293B] text-white">
      {/* Hero Section */}
      <div className="relative h-[40vh] md:h-[60vh] overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        </div>
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-4xl"
          >
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] to-[#2DD4BF]">
                Creando Experiencias Inolvidables
              </span>
            </h1>
            <p className="text-base md:text-xl text-[#E2E8F0] max-w-2xl mx-auto">
              Más de una década transformando sueños en realidad
            </p>
          </motion.div>
        </div>
      </div>

      {/* Navegación  */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 md:mb-12">
          {['historia', 'valores', 'contacto', 'servicios'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 md:px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap
                ${activeTab === tab 
                  ? 'bg-gradient-to-r from-[#38BDF8] to-[#2DD4BF] text-white' 
                  : 'text-[#E2E8F0] hover:bg-white/10'}`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

    
        <div className="mt-8 md:mt-12">
          {/* Historia */}
          {activeTab === 'historia' && (
            <motion.div {...fadeIn} className="grid md:grid-cols-2 gap-8 md:gap-12">
              <div className="order-2 md:order-1">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] to-[#2DD4BF]">
                    Nuestra Historia
                  </span>
                </h2>
                <div className="space-y-4 text-[#E2E8F0] text-sm md:text-base">
                  <p>
                    Fundada en 2010, nuestra agencia nació con la visión de revolucionar 
                    la forma en que las personas exploran el mundo.
                  </p>
                  <p>
                    Comenzamos como una pequeña oficina en el centro de la ciudad, y hoy 
                    nos enorgullece ser una de las agencias de viajes más reconocidas del país.
                  </p>
                  <p>
                    A lo largo de los años, hemos ayudado a más de 50,000 viajeros a 
                    descubrir nuevos horizontes y crear recuerdos inolvidables.
                  </p>
                </div>
                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-[#38BDF8] font-bold">2010</h4>
                    <p className="text-sm">Fundación de la empresa</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-[#38BDF8] font-bold">2015</h4>
                    <p className="text-sm">Expansión nacional</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-[#38BDF8] font-bold">2020</h4>
                    <p className="text-sm">Digitalización completa</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-[#38BDF8] font-bold">2024</h4>
                    <p className="text-sm">Expansión internacional</p>
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2 relative">
                <img 
                  src={OfficeImage2} 
                  alt="Nuestra oficina" 
                  className="rounded-3xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-[#38BDF8] to-[#2DD4BF] p-4 rounded-lg">
                  <p className="text-2xl font-bold">15+</p>
                  <p className="text-sm">años de experiencia</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Valores */}
          {activeTab === 'valores' && (
            <motion.div {...fadeIn}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                {valores.map((valor, index) => (
                  <div key={index} className="p-4 md:p-8">
                    <div
                      className="bg-gradient-to-r from-[#0A0F1C]/40 to-[#1E293B]/40 
                                  backdrop-blur-sm border border-[#38BDF8]/20 rounded-2xl p-8 
                                  hover:border-[#38BDF8]/40 transition-all duration-300 group"
                    >
                      <div className="bg-gradient-to-r from-[#38BDF8]/20 to-[#2DD4BF]/20 
                                    w-16 h-16 rounded-full flex items-center justify-center 
                                    mb-6 group-hover:scale-110 transition-transform duration-300"
                      >
                        {valor.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-4 text-transparent 
                                   bg-clip-text bg-gradient-to-r from-[#38BDF8] to-[#2DD4BF]"
                      >
                        {valor.titulo}
                      </h3>
                      <p className="text-[#E2E8F0]">{valor.descripcion}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Contacto */}
          {activeTab === 'contacto' && (
            <motion.div {...fadeIn}>
              <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                {/* Formulario */}
                <div className="bg-gradient-to-r from-[#0A0F1C]/40 to-[#1E293B]/40 backdrop-blur-sm border border-[#38BDF8]/20 rounded-2xl p-4 md:p-8">
                  <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] to-[#2DD4BF]">
                    Envíanos un mensaje
                  </h3>
                  <form className="space-y-4 md:space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-[#E2E8F0] mb-2">
                        Nombre completo
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 rounded-lg bg-[#1E293B]/50 border border-[#38BDF8]/20 
                                 focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8] 
                                 text-white placeholder-gray-400 outline-none transition-all"
                        placeholder="Tu nombre"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#E2E8F0] mb-2">
                        Correo electrónico
                      </label>
                      <input
                        type="email"
                        className="w-full px-4 py-3 rounded-lg bg-[#1E293B]/50 border border-[#38BDF8]/20 
                                 focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8] 
                                 text-white placeholder-gray-400 outline-none transition-all"
                        placeholder="tu@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#E2E8F0] mb-2">
                        Asunto
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 rounded-lg bg-[#1E293B]/50 border border-[#38BDF8]/20 
                                 focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8] 
                                 text-white placeholder-gray-400 outline-none transition-all"
                        placeholder="Asunto del mensaje"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#E2E8F0] mb-2">
                        Mensaje
                      </label>
                      <textarea
                        rows="4"
                        className="w-full px-4 py-3 rounded-lg bg-[#1E293B]/50 border border-[#38BDF8]/20 
                                 focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8] 
                                 text-white placeholder-gray-400 outline-none transition-all"
                        placeholder="Escribe tu mensaje aquí..."
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-[#38BDF8] to-[#2DD4BF] 
                               text-white font-medium hover:opacity-90 transition-opacity"
                    >
                      Enviar mensaje
                    </button>
                  </form>
                </div>

                {/* Info de contacto */}
                <div className="space-y-4 md:space-y-8">
                  <div className="bg-gradient-to-r from-[#0A0F1C]/40 to-[#1E293B]/40 backdrop-blur-sm border border-[#38BDF8]/20 rounded-2xl p-4 md:p-8">
                    <h3 className="text-2xl font-bold mb-6 text-transparent 
                                 bg-clip-text bg-gradient-to-r from-[#38BDF8] to-[#2DD4BF]">
                      Información de contacto
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-4">
                        <div className="bg-gradient-to-r from-[#38BDF8]/20 to-[#2DD4BF]/20 
                                        w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                          <FaGlobe className="text-2xl text-[#38BDF8]" />
                        </div>
                        <div>
                          <h4 className="font-medium text-[#38BDF8]">Dirección</h4>
                          <p className="text-[#E2E8F0]">Av. Principal 123, Ciudad</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <div className="bg-gradient-to-r from-[#38BDF8]/20 to-[#2DD4BF]/20 
                                        w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                          <FaPhone className="text-2xl text-[#38BDF8]" />
                        </div>
                        <div>
                          <h4 className="font-medium text-[#38BDF8]">Teléfono</h4>
                          <p className="text-[#E2E8F0]">+1 234 567 890</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <div className="bg-gradient-to-r from-[#38BDF8]/20 to-[#2DD4BF]/20 
                                        w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                          <FaEnvelope className="text-2xl text-[#38BDF8]" />
                        </div>
                        <div>
                          <h4 className="font-medium text-[#38BDF8]">Email</h4>
                          <p className="text-[#E2E8F0]">info@tuagencia.com</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-[#0A0F1C]/40 to-[#1E293B]/40 
                                backdrop-blur-sm border border-[#38BDF8]/20 rounded-2xl p-4 md:p-8">
                    <h3 className="text-2xl font-bold mb-6 text-transparent 
                                 bg-clip-text bg-gradient-to-r from-[#38BDF8] to-[#2DD4BF]">
                      Horario de atención
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-[#E2E8F0]">Lunes - Viernes</span>
                        <span className="text-[#38BDF8]">9:00 AM - 6:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#E2E8F0]">Sábado</span>
                        <span className="text-[#38BDF8]">10:00 AM - 2:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#E2E8F0]">Domingo</span>
                        <span className="text-[#38BDF8]">Cerrado</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Servicios */}
          {activeTab === 'servicios' && (
            <motion.div {...fadeIn}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
                {servicios.map((servicio, index) => (
                  <div key={index} className="p-4 md:p-8">
                    <div
                      className="bg-gradient-to-r from-[#0A0F1C]/40 to-[#1E293B]/40 
                                  backdrop-blur-sm border border-[#38BDF8]/20 rounded-2xl 
                                  p-8 hover:border-[#38BDF8]/40 transition-all duration-300 
                                  flex items-start space-x-6"
                    >
                      <div className="bg-gradient-to-r from-[#38BDF8]/20 to-[#2DD4BF]/20 
                                    w-16 h-16 rounded-full flex items-center justify-center 
                                    flex-shrink-0"
                      >
                        {servicio.icono}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-4 text-transparent 
                                     bg-clip-text bg-gradient-to-r from-[#38BDF8] to-[#2DD4BF]"
                        >
                          {servicio.titulo}
                        </h3>
                        <p className="text-[#E2E8F0]">{servicio.descripcion}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Estadísticas */}
      <div className="bg-gradient-to-r from-[#0A0F1C] to-[#1E293B] py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {estadisticas.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="p-4 md:p-6"
              >
                <div
                  className="bg-gradient-to-r from-[#0A0F1C]/40 to-[#1E293B]/40 
                              backdrop-blur-sm border border-[#38BDF8]/20 rounded-2xl 
                              p-6 hover:border-[#38BDF8]/40 transition-all duration-300"
                >
                  <h4 className="text-4xl font-bold text-transparent bg-clip-text 
                               bg-gradient-to-r from-[#38BDF8] to-[#2DD4BF] mb-2"
                  >
                    {stat.numero}
                  </h4>
                  <p className="text-[#E2E8F0]">{stat.texto}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nosotros;