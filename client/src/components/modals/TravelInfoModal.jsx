import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'

const TravelInfoModal = ({ isOpen, onClose, tipoSeleccionado, onSubmit }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    origen: '',
    destino: '',
    fecha: '',
    pasajeros: '',
    mensaje: '',
    clase: '',
    tipoTren: '',
    ruta: '',
    tipoBus: '',
    rutaBus: '',
    tipoCrucero: '',
    duracion: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [notification, setNotification] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const camposRelevantes = {
        ...formData,
        tipoViaje: tipoSeleccionado,
        ...(tipoSeleccionado === 'Vuelos' && {
          clase: formData.clase
        }),
        ...(tipoSeleccionado === 'Trenes' && {
          tipoTren: formData.tipoTren,
          ruta: formData.ruta
        }),
        ...(tipoSeleccionado === 'Autobuses' && {
          tipoBus: formData.tipoBus,
          rutaBus: formData.rutaBus
        }),
        ...(tipoSeleccionado === 'Cruceros' && {
          tipoCrucero: formData.tipoCrucero,
          duracion: formData.duracion
        })
      }
      
      onSubmit(camposRelevantes)
      
      showNotification(
        'success',
        `Hemos recibido tu solicitud de ${infoEspecifica[tipoSeleccionado].titulo.toLowerCase()}. Nos pondremos en contacto contigo pronto.`
      )

      setTimeout(() => {
        onClose()
      }, 2000)
    } catch (error) {
      showNotification(
        'error',
        'Hubo un problema al procesar tu solicitud. Por favor, intenta nuevamente.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderLoadingAnimation = () => {
    switch (tipoSeleccionado) {
      case 'Vuelos':
        return (
          <div className="relative w-full h-32">
            {/* Nubes de fondo */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-4 left-0 w-8 h-4 bg-white/20 rounded-full blur-sm animate-[cloud_3s_linear_infinite]"></div>
              <div className="absolute top-8 right-1/4 w-12 h-5 bg-white/20 rounded-full blur-sm animate-[cloud_4s_linear_infinite]"></div>
              <div className="absolute top-2 right-0 w-10 h-4 bg-white/20 rounded-full blur-sm animate-[cloud_5s_linear_infinite]"></div>
            </div>
            
            {/* Avión */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 relative">
                <svg className="w-full h-full text-[#38BDF8] animate-[fly_3s_ease-in-out_infinite]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5l-2 2M12 19l-2-2" />
                </svg>
                {/* Estela del avión */}
                <div className="absolute -left-4 top-1/2 w-8 h-0.5 bg-gradient-to-r from-transparent via-[#38BDF8]/30 to-transparent animate-[trail_1s_linear_infinite]"></div>
              </div>
            </div>
          </div>
        )
      case 'Trenes':
        return (
          <div className="relative w-full h-32">
            {/* Vías del tren */}
            <div className="absolute bottom-8 left-0 right-0 h-1 bg-gray-600/30">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gray-400/20"></div>
              <div className="absolute top-2 left-0 right-0 h-0.5 bg-gray-400/20"></div>
            </div>
            
            {/* Tren */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-16 relative">
                <svg className="w-full h-full text-[#38BDF8] animate-[train_3s_linear_infinite]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12h18M3 12v6h18v-6M3 12l3-6h12l3 6" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18v-2M12 18v-2M18 18v-2" />
                </svg>
                {/* Humo del tren */}
                <div className="absolute -left-2 top-0">
                  <div className="w-4 h-4 bg-[#38BDF8]/20 rounded-full blur-sm animate-[smoke_2s_ease-out_infinite]"></div>
                  <div className="w-3 h-3 bg-[#38BDF8]/20 rounded-full blur-sm animate-[smoke_2s_ease-out_infinite_0.5s] absolute -left-1 -top-1"></div>
                  <div className="w-2 h-2 bg-[#38BDF8]/20 rounded-full blur-sm animate-[smoke_2s_ease-out_infinite_1s] absolute -left-2 -top-2"></div>
                </div>
              </div>
            </div>
          </div>
        )
      case 'Autobuses':
        return (
          <div className="relative w-full h-32">
            {/* Carretera */}
            <div className="absolute bottom-8 left-0 right-0 h-2 bg-gray-600/30">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-white/20 animate-[roadLine_1s_linear_infinite]"></div>
            </div>
            
            {/* Autobús */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-16 relative">
                <svg className="w-full h-full text-[#38BDF8] animate-[bus_3s_ease-in-out_infinite]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12M8 7v10h12V7M8 7l-2-4h16l-2 4" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 17v2M20 17v2" />
                </svg>
                {/* Ventanas iluminadas */}
                <div className="absolute top-2 left-4 w-2 h-2 bg-[#38BDF8]/40 rounded-sm animate-[windowLight_1s_ease-in-out_infinite]"></div>
                <div className="absolute top-2 left-8 w-2 h-2 bg-[#38BDF8]/40 rounded-sm animate-[windowLight_1s_ease-in-out_infinite_0.3s]"></div>
                <div className="absolute top-2 left-12 w-2 h-2 bg-[#38BDF8]/40 rounded-sm animate-[windowLight_1s_ease-in-out_infinite_0.6s]"></div>
              </div>
            </div>
          </div>
        )
      case 'Cruceros':
        return (
          <div className="relative w-full h-32">
            {/* Olas del mar */}
            <div className="absolute bottom-8 left-0 right-0 h-4 overflow-hidden">
              <div className="absolute bottom-0 left-0 right-0 h-2 bg-[#38BDF8]/20 rounded-full animate-[wave_2s_ease-in-out_infinite]"></div>
              <div className="absolute bottom-1 left-0 right-0 h-2 bg-[#38BDF8]/20 rounded-full animate-[wave_2s_ease-in-out_infinite_0.5s]"></div>
            </div>
            
            {/* Barco */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-16 relative">
                <svg className="w-full h-full text-[#38BDF8] animate-[ship_3s_ease-in-out_infinite]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12h18M3 12v6h18v-6M3 12l3-6h12l3 6" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l-2 4h22l-2-4" />
                </svg>
                {/* Estela del barco */}
                <div className="absolute -left-4 top-1/2 w-8 h-1 bg-gradient-to-r from-transparent via-[#38BDF8]/30 to-transparent animate-[waterTrail_2s_linear_infinite]"></div>
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  if (!isOpen || !tipoSeleccionado) return null

  const infoEspecifica = {
    Vuelos: {
      titulo: 'Vuelo',
      descripcion: 'Reserva tu vuelo con las mejores tarifas y servicios',
      camposAdicionales: [
        {
          id: 'clase',
          nombre: 'Clase de Vuelo',
          tipo: 'select',
          requerido: true,
          opciones: ['Económica', 'Business', 'Primera Clase']
        }
      ]
    },
    Trenes: {
      titulo: 'Tren',
      descripcion: 'Viaja en tren con confort y puntualidad',
      camposAdicionales: [
        {
          id: 'tipoTren',
          nombre: 'Tipo de Tren',
          tipo: 'select',
          requerido: true,
          opciones: ['Turista', 'Preferente','Premium']
        },
        {
          id: 'ruta',
          nombre: 'Ruta Preferida',
          tipo: 'text',
          requerido: false,
          placeholder: 'Ej: Madrid-Barcelona'
        }
      ]
    },
    Autobuses: {
      titulo: 'Autobús',
      descripcion: 'Viajes en autobús con las mejores rutas',
      camposAdicionales: [
        {
          id: 'tipoBus',
          nombre: 'Tipo de Servicio',
          tipo: 'select',
          requerido: true,
          opciones: ['Regular', 'Premium']
        },
        {
          id: 'rutaBus',
          nombre: 'Ruta Preferida',
          tipo: 'text',
          requerido: false,
          placeholder: 'Ej: Madrid-Valencia'
        }
      ]
    },
    Cruceros: {
      titulo: 'Crucero',
      descripcion: 'Descubre destinos increíbles en crucero',
      camposAdicionales: [
        {
          id: 'tipoCrucero',
          nombre: 'Tipo de Camarotes',
          tipo: 'select',
          requerido: true,
          opciones: ['Interior', 'Vista al mar', 'Balcón', 'Suite']
        },
        {
          id: 'duracion',
          nombre: 'Duración Preferida',
          tipo: 'select',
          requerido: true,
          opciones: ['3-5 días', '6-8 días', ]
        }
      ]
    }
  }

  const infoTipo = infoEspecifica[tipoSeleccionado]

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          className: '',
          style: {
            background: 'transparent',
            boxShadow: 'none',
            padding: '0',
            margin: '0',
          },
          containerStyle: {
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
          },
          duration: 4000,
        }}
      />
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Overlay */}
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        ></div>

        {/* Notificación */}
        {notification && (
          <div className={`fixed top-4 right-4 z-[101] transform transition-all duration-500 ${
            notification.type === 'success' ? 'bg-gradient-to-r from-green-500 to-emerald-600' : 'bg-gradient-to-r from-red-500 to-rose-600'
          } text-white p-4 rounded-xl shadow-lg max-w-sm animate-[slideIn_0.5s_ease-out]`}>
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full ${
                notification.type === 'success' ? 'bg-green-400/20' : 'bg-red-400/20'
              }`}>
                {notification.type === 'success' ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </div>
              <div>
                <h3 className="font-bold text-lg">{notification.title}</h3>
                <p className="text-sm opacity-90">{notification.message}</p>
              </div>
            </div>
          </div>
        )}

        {/* Modal Content */}
        <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-2xl max-w-sm w-full p-6 border border-gray-700/50">
          {/* Botón cerrar */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Título */}
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold bg-gradient-to-r from-[#38BDF8] to-[#2DD4BF] bg-clip-text text-transparent">
              Solicitud de {infoTipo.titulo}
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              {infoTipo.descripcion}
            </p>
          </div>

          {isSubmitting ? (
            <div className="py-8">
              {renderLoadingAnimation()}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">
                    Origen
                  </label>
                  <input
                    type="text"
                    name="origen"
                    value={formData.origen}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-1.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8] transition-colors"
                    placeholder="Ciudad de origen"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">
                    Destino
                  </label>
                  <input
                    type="text"
                    name="destino"
                    value={formData.destino}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-1.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8] transition-colors"
                    placeholder="Ciudad de destino"
                  />
                </div>
              </div>

              {infoTipo.camposAdicionales?.map((campo) => (
                <div key={campo.id}>
                  <label className="block text-xs font-medium text-gray-400 mb-1">
                    {campo.nombre}
                    {campo.requerido && <span className="text-[#38BDF8]">*</span>}
                  </label>
                  {campo.tipo === 'select' ? (
                    <select
                      name={campo.id}
                      value={formData[campo.id]}
                      onChange={handleChange}
                      required={campo.requerido}
                      className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-1.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8] transition-colors"
                    >
                      <option value="">Seleccione una opción</option>
                      {campo.opciones.map((opcion) => (
                        <option key={opcion} value={opcion}>{opcion}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      name={campo.id}
                      value={formData[campo.id]}
                      onChange={handleChange}
                      required={campo.requerido}
                      className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-1.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8] transition-colors"
                      placeholder={campo.placeholder}
                    />
                  )}
                </div>
              ))}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-1.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8] transition-colors"
                    placeholder="Tu nombre completo"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-1.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8] transition-colors"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-1.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8] transition-colors"
                    placeholder="+34 XXX XXX XXX"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">
                    Fecha de Viaje
                  </label>
                  <input
                    type="date"
                    name="fecha"
                    value={formData.fecha}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-1.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">
                    Número de Pasajeros
                  </label>
                  <input
                    type="number"
                    name="pasajeros"
                    value={formData.pasajeros}
                    onChange={handleChange}
                    required
                    min="1"
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-1.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8] transition-colors"
                    placeholder="1"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">
                    Mensaje Adicional
                  </label>
                  <textarea
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    rows="2"
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-1.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8] transition-colors resize-none"
                    placeholder="Información adicional o requisitos especiales..."
                  ></textarea>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#38BDF8] to-[#2DD4BF] text-white font-medium py-2 px-4 rounded-lg hover:shadow-lg hover:shadow-[#38BDF8]/20 transform hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Componente de notificación personalizado */}
      {isSubmitting && (
        <div className="fixed inset-0 z-[102] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full mx-4 transform transition-all">
            <div className="flex flex-col items-center">
              {renderLoadingAnimation()}
              <p className="mt-4 text-gray-600 text-center">
                Procesando tu solicitud...
              </p>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes fly {
          0% { transform: translateX(-100%) translateY(0) rotate(0deg); }
          25% { transform: translateX(-50%) translateY(-10px) rotate(5deg); }
          50% { transform: translateX(0%) translateY(0) rotate(0deg); }
          75% { transform: translateX(50%) translateY(-10px) rotate(-5deg); }
          100% { transform: translateX(100%) translateY(0) rotate(0deg); }
        }
        @keyframes train {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes bus {
          0% { transform: translateX(-100%) translateY(0); }
          25% { transform: translateX(-50%) translateY(-2px); }
          50% { transform: translateX(0%) translateY(0); }
          75% { transform: translateX(50%) translateY(-2px); }
          100% { transform: translateX(100%) translateY(0); }
        }
        @keyframes ship {
          0% { transform: translateX(-100%) translateY(0); }
          25% { transform: translateX(-50%) translateY(-3px); }
          50% { transform: translateX(0%) translateY(0); }
          75% { transform: translateX(50%) translateY(-3px); }
          100% { transform: translateX(100%) translateY(0); }
        }
        @keyframes cloud {
          0% { transform: translateX(100%); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateX(-100%); opacity: 0; }
        }
        @keyframes smoke {
          0% { transform: translateY(0) scale(1); opacity: 0.8; }
          100% { transform: translateY(-20px) scale(2); opacity: 0; }
        }
        @keyframes windowLight {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
        @keyframes wave {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(-10px); }
        }
        @keyframes trail {
          0% { transform: scaleX(0); opacity: 0; }
          50% { transform: scaleX(1); opacity: 0.5; }
          100% { transform: scaleX(0); opacity: 0; }
        }
        @keyframes waterTrail {
          0% { transform: scaleX(0) translateY(0); opacity: 0; }
          50% { transform: scaleX(1) translateY(2px); opacity: 0.5; }
          100% { transform: scaleX(0) translateY(0); opacity: 0; }
        }
        @keyframes roadLine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes enter {
          0% { transform: scale(0.9); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes leave {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(0.9); opacity: 0; }
        }
        .animate-enter {
          animation: enter 0.2s ease-out;
        }
        .animate-leave {
          animation: leave 0.15s ease-in forwards;
        }
      `}</style>
    </>
  )
}

// Componente de notificación personalizado
const CustomToast = ({ type, message, onClose }) => (
  <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
    <div className="p-4 flex items-start space-x-3">
      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
        type === 'success' 
          ? 'bg-gradient-to-r from-green-400 to-emerald-500' 
          : 'bg-gradient-to-r from-red-400 to-rose-500'
      }`}>
        {type === 'success' ? (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        )}
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900">
          {type === 'success' ? '¡Solicitud Enviada con Éxito!' : 'Error al Enviar la Solicitud'}
        </p>
        <p className="mt-1 text-sm text-gray-500">
          {message}
        </p>
      </div>
      <button
        onClick={onClose}
        className="flex-shrink-0 text-gray-400 hover:text-gray-500"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </div>
)

// Función para mostrar notificaciones personalizadas
const showNotification = (type, message) => {
  toast.custom(
    (t) => (
      <div
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } max-w-md w-full mx-4`}
      >
        <CustomToast
          type={type}
          message={message}
          onClose={() => toast.dismiss(t.id)}
        />
      </div>
    ),
    {
      duration: 4000,
      position: 'top-center',
    }
  )
}

export default TravelInfoModal 