import React, { useState } from 'react'
import avionImage from '../assets/AVION.jpg'
import trenImage from '../assets/TREN.jpg'
import autobusImage from '../assets/AUTOBUS.jpg'
import cruceroImage from '../assets/CRUCERO.jpg'
import TravelInfoModal from './modals/TravelInfoModal'
import toast, { Toaster } from 'react-hot-toast'

const travelInfo = [
  {
    id: 1,
    tipo: 'Vuelos',
    icon: '✈️',
    imagen: avionImage,
    titulo: 'Viaja por los cielos',
    descripcion: 'Descubre la libertad de volar a más de 500 destinos internacionales con las mejores aerolíneas del mundo.',
    caracteristicas: [
      'Vuelos directos y con escalas',
      'Clase económica y primera clase',
      'Programa de millas',
      'Servicio de catering a bordo',
      'Entretenimiento en vuelo'
    ]
  },
  {
    id: 2,
    tipo: 'Trenes',
    icon: '🚂',
    imagen: trenImage,
    titulo: 'Aventura sobre rieles',
    descripcion: 'Explora paisajes increíbles a través de rutas ferroviarias legendarias con todo el confort.',
    caracteristicas: [
      'Trenes de alta velocidad',
      'Vagones de primera clase',
      'Rutas panorámicas',
      'Servicio de restaurante',
      'WiFi gratuito'
    ]
  },
  {
    id: 3,
    tipo: 'Autobuses',
    icon: '🚌',
    imagen: autobusImage,
    titulo: 'Viajes por tierra',
    descripcion: 'Conecta con los mejores destinos nacionales de forma económica y flexible.',
    caracteristicas: [
      'Rutas nacionales e internacionales',
      'Asientos reclinables',
      'Aire acondicionado',
      'Paradas estratégicas',
      'Servicio de equipaje'
    ]
  },
  {
    id: 4,
    tipo: 'Cruceros',
    icon: '🚢',
    imagen: cruceroImage,
    titulo: 'Navega por el mundo',
    descripcion: 'Vive la experiencia única de recorrer los mares más hermosos en hoteles flotantes de lujo.',
    caracteristicas: [
      'Cruceros por el Mediterráneo',
      'Rutas por el Caribe',
      'Todo incluido',
      'Entretenimiento a bordo',
      'Excursiones en puerto'
    ]
  }
]

const TravelInfoSection = () => {
  const [modalAbierto, setModalAbierto] = useState(false)
  const [tipoSeleccionado, setTipoSeleccionado] = useState(null)

  const abrirModal = (tipo) => {
    setTipoSeleccionado(tipo)
    setModalAbierto(true)
  }

  const cerrarModal = () => {
    setModalAbierto(false)
    setTipoSeleccionado(null)
  }

  const handleSubmit = (formData) => {
    
    console.log('Datos del formulario:', formData);
    cerrarModal();
    toast.success('¡Solicitud enviada! Pronto nos pondremos en contacto contigo.', {
      duration: 4000,
      position: 'top-center',
      style: {
        background: '#fff',
        color: '#222',
        borderRadius: '12px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
        fontWeight: 'bold',
        fontSize: '1rem',
        padding: '1.2rem 1.5rem',
      },
      iconTheme: {
        primary: '#38BDF8',
        secondary: '#fff',
      },
      icon: '✈️',
    });
  }

  return (
    <section className="py-20 bg-gradient-to-br from-[#0A0F1C] via-[#0F172A] to-[#1E293B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-4">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] to-[#2DD4BF]">
            Nuestros Servicios de Viaje
          </span>
        </h2>
        <p className="text-[#E2E8F0] text-center mb-12 text-lg">
          Descubre todas las opciones que tenemos para hacer tu viaje inolvidable
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {travelInfo.map((info) => (
            <div
              key={info.id}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0A0F1C]/40 to-[#1E293B]/40 backdrop-blur-sm border border-[#38BDF8]/20 hover:border-[#38BDF8]/40 transition-all duration-300"
            >
             
              <div className="absolute inset-0">
                <img
                  src={info.imagen}
                  alt={info.tipo}
                  className="w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#0A0F1C]/90 via-[#0F172A]/80 to-[#1E293B]/90"></div>
              </div>

              {/* Contenido */}
              <div className="relative p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-gradient-to-r from-[#38BDF8]/20 to-[#2DD4BF]/20 rounded-full p-4">
                    <span className="text-3xl">{info.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] to-[#2DD4BF]">
                      {info.titulo}
                    </h3>
                    <p className="text-[#38BDF8]/80 text-sm font-medium">
                      {info.tipo}
                    </p>
                  </div>
                </div>

                <p className="text-[#E2E8F0] mb-6">
                  {info.descripcion}
                </p>

                <ul className="space-y-3">
                  {info.caracteristicas.map((caracteristica, index) => (
                    <li key={index} className="flex items-center gap-3 text-[#E2E8F0]">
                      <svg
                        className="w-5 h-5 text-[#38BDF8]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {caracteristica}
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={() => abrirModal(info.tipo)}
                  className="mt-6 px-6 py-2 bg-gradient-to-r from-[#38BDF8] to-[#2DD4BF] text-white rounded-lg hover:from-[#38BDF8]/90 hover:to-[#2DD4BF]/90 transition-all duration-300 transform hover:scale-105"
                >
                  Ver más detalles
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <TravelInfoModal
        isOpen={modalAbierto}
        onClose={cerrarModal}
        tipoSeleccionado={tipoSeleccionado}
        onSubmit={handleSubmit}
      />
      <Toaster />
    </section>
  )
}

export default TravelInfoSection 