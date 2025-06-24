import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const tiposViaje = [
  { key: 'avion', label: 'Avión', icon: '✈️' },
  { key: 'autobus', label: 'Autobús', icon: '🚌' },
  { key: 'ferry', label: 'Ferry', icon: '⛴️' },
];

const destinosMock = {
  avion: [
    { 
      id: 1, 
      origen: 'Ciudad de México', 
      destino: 'Cancún', 
      horarios: ['08:00', '14:00', '20:00'], 
      precio: {
        'Primera Clase': 8500,
        'Business': 6500,
        'Económica': 4500,
      },
      duracion: '2h 15min'
    },
    { 
      id: 2, 
      origen: 'Ciudad de México', 
      destino: 'Los Cabos', 
      horarios: ['09:30', '16:00'], 
      precio: {
        'Primera Clase': 9500,
        'Business': 7500,
        'Económica': 5500,
      },
      duracion: '2h 45min'
    },
  ],
  autobus: [
    { 
      id: 3, 
      origen: 'Ciudad de México', 
      destino: 'Cancún', 
      horarios: ['10:00', '16:00', '22:00'], 
      precio: {
        'Premium': 2800,
        'Estándar': 1800,
      },
      duracion: '24h'
    },
    { 
      id: 4, 
      origen: 'Ciudad de México', 
      destino: 'Los Cabos',
      escala: true,
      horarios: ['08:00', '14:00'],
      precio: {
        'Premium': 3500,
        'Estándar': 2500,
      },
      duracion: '36h',
      infoEscala: 'Transbordo en Guadalajara'
    },
    { 
      id: 5, 
      origen: 'Ciudad de México', 
      destino: 'La Paz',
      escala: true,
      horarios: ['07:00', '13:00'],
      precio: {
        'Premium': 3800,
        'Estándar': 2800,
      },
      duracion: '38h',
      infoEscala: 'Transbordo en Guadalajara y Mazatlán'
    },  
  ],
  ferry: [
    { 
      id: 6, 
      origen: 'La Paz', 
      destino: 'Los Cabos', 
      horarios: ['09:00', '15:00'], 
      precio: {
        'Premium': 1200,
        'Comfort': 1000,
        'Estándar': 800,
      },
      duracion: '3h',
      requiereConexion: true,
      infoConexion: 'Necesitas llegar primero a La Paz desde Ciudad de México'
    }
  ],
};

const hoteles = {
  'Cancún': [
    {
      nombre: 'Grand Luxe Resort',
      categoria: 'Gran Turismo',
      precioNoche: 5500,
      amenidades: ['Playa privada', 'Spa', 'Golf', 'All Inclusive'],
    },
    {
      nombre: 'Boutique Maya',
      categoria: 'Boutique',
      precioNoche: 4500,
      amenidades: ['Diseño único', 'Servicio personalizado', 'Restaurant gourmet'],
    },
    {
      nombre: 'Ocean View Palace',
      categoria: '5 estrellas',
      precioNoche: 3800,
      amenidades: ['Vista al mar', 'Piscinas', 'Restaurantes'],
    },
    {
      nombre: 'Caribe Resort',
      categoria: '4 estrellas',
      precioNoche: 2500,
      amenidades: ['Piscina', 'Restaurante', 'Bar'],
    },
    {
      nombre: 'Hotel Tropical',
      categoria: '3 estrellas',
      precioNoche: 1800,
      amenidades: ['Desayuno incluido', 'WiFi', 'A/C'],
    },
  ],
  'Los Cabos': [
    {
      nombre: 'Pacific Grand Resort',
      categoria: 'Gran Turismo',
      precioNoche: 6000,
      amenidades: ['Playa privada', 'Spa', 'Golf', 'All Inclusive'],
    },
    {
      nombre: 'Cabo Boutique',
      categoria: 'Boutique',
      precioNoche: 4800,
      amenidades: ['Diseño único', 'Servicio personalizado', 'Restaurant gourmet'],
    },
    {
      nombre: 'Sunset Palace',
      categoria: '5 estrellas',
      precioNoche: 4000,
      amenidades: ['Vista al mar', 'Piscinas', 'Restaurantes'],
    },
    {
      nombre: 'Baja Resort',
      categoria: '4 estrellas',
      precioNoche: 2800,
      amenidades: ['Piscina', 'Restaurante', 'Bar'],
    },
    {
      nombre: 'Hotel del Mar',
      categoria: '3 estrellas',
      precioNoche: 2000,
      amenidades: ['Desayuno incluido', 'WiFi', 'A/C'],
    },
  ],
};

// Definir las filas para cada clase
const CLASES_AVION = [
  { nombre: 'Primera Clase', filas: [0, 1] }, // filas 1 y 2
  { nombre: 'Business', filas: [2, 3] },     // filas 3 y 4
  { nombre: 'Económica', filas: [4, 5, 6, 7, 8, 9] }, // filas 5 a 10
];

const clasesPorTipo = {
  avion: ['Económica', 'Business', 'Primera Clase'],
  tren: ['Turista', 'Preferente', 'Cama', 'Premium'],
  autobus: ['Estándar', 'Premium'],
  crucero: ['Interior', 'Exterior', 'Suite', 'Balcón'],
  ferry: ['Estándar', 'Comfort', 'Premium'],
};

const ASIENTOS_POR_FILA = 6;
const FILAS = 8;
const TOTAL_ASIENTOS = ASIENTOS_POR_FILA * FILAS;
const asientosIniciales = Array.from({ length: TOTAL_ASIENTOS }, (_, i) => ({
  numero: i + 1,
  ocupado: false,
  seleccionado: false,
}));


const FILAS_AVION = 10;
const ASIENTOS_IZQ = 3;
const ASIENTOS_DER = 3;
const asientosAvion = Array.from({ length: FILAS_AVION }, (_, fila) =>
  [0, 1, 2, 'pasillo', 3, 4, 5].map((col, idx) =>
    col === 'pasillo'
      ? null
      : {
          id: fila * 6 + (col < 3 ? col : col - 1),
          numero: `${fila + 1}${String.fromCharCode(65 + (col < 3 ? col : col - 1))}`,
          fila,
          col,
          ocupado: false,
          seleccionado: false,
          tipo: col === 0 || col === 5 ? 'ventana' : col === 1 || col === 4 ? 'centro' : 'pasillo',
          clase: CLASES_AVION.find(c => c.filas.includes(fila))?.nombre || 'Económica',
        }
  )
);

// Definir las filas para cada clase en el tren
const CLASES_TREN = [
  { nombre: 'Premium', filas: [0], numeroVagon: 1 }, // Vagón 1
  { nombre: 'Preferente', filas: [1, 2], numeroVagon: 2 }, // Vagón 2
  { nombre: 'Turista', filas: [3, 4, 5, 6, 7, 8, 9], numeroVagon: 3 }, // Vagón 3
];

const FILAS_TREN = 10; 
const ASIENTOS_TREN = 4; // 2-2 con pasillo central
const asientosTren = Array.from({ length: FILAS_TREN }, (_, fila) =>
  [0, 1, 'pasillo', 2, 3].map((col, idx) =>
    col === 'pasillo'
      ? null
      : {
          id: fila * 4 + (col < 2 ? col : col - 1),
          numero: `${fila + 1}${String.fromCharCode(65 + (col < 2 ? col : col - 1))}`,
          fila,
          col,
          ocupado: false,
          seleccionado: false,
          tipo: col === 0 || col === 3 ? 'ventana' : 'pasillo',
          clase: CLASES_TREN.find(c => c.filas.includes(fila))?.nombre || 'Turista',
          numeroVagon: CLASES_TREN.find(c => c.filas.includes(fila))?.numeroVagon || 3,
        }
  )
);

//  Asientos para el autobús
const FILAS_BUS = 12; // Número de filas en el autobús
const ASIENTOS_BUS = 4; // 2-2 con pasillo central
const asientosBus = Array.from({ length: FILAS_BUS }, (_, fila) =>
  [0, 1, 'pasillo', 2, 3].map((col, idx) =>
    col === 'pasillo'
      ? null
      : {
          id: fila * 4 + (col < 2 ? col : col - 1),
          numero: `${fila + 1}${String.fromCharCode(65 + (col < 2 ? col : col - 1))}`,
          fila,
          col,
          ocupado: false,
          seleccionado: false,
          tipo: col === 0 || col === 3 ? 'ventana' : 'pasillo',
        }
  )
);

const BoletosPage = () => {
  const [tipo, setTipo] = useState('avion');
  const [destinoSeleccionado, setDestinoSeleccionado] = useState(null);
  const [horarioSeleccionado, setHorarioSeleccionado] = useState('');
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    telefono: '',
    adultos: 1,
    menores: 0,
    clase: '',
    nombresAdultos: [''],
    nombresMenores: [''],
  });
  const [compraExitosa, setCompraExitosa] = useState(false);
  const [mostrarSeleccionAsientos, setMostrarSeleccionAsientos] = useState(false);
  const [asientos, setAsientos] = useState(asientosAvion);
  const [asientosSeleccionados, setAsientosSeleccionados] = useState([]);
  const [asientosTrenState, setAsientosTrenState] = useState(asientosTren);
  const [asientosTrenSeleccionados, setAsientosTrenSeleccionados] = useState([]);
  const [mostrarSeleccionAsientosTren, setMostrarSeleccionAsientosTren] = useState(false);
  const [asientosBusState, setAsientosBusState] = useState(asientosBus);
  const [asientosBusSeleccionados, setAsientosBusSeleccionados] = useState([]);
  const [mostrarSeleccionAsientosBus, setMostrarSeleccionAsientosBus] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [nights, setNights] = useState(1);

  const destinos = destinosMock[tipo];

  const totalPasajeros = Number(form.adultos) + Number(form.menores);

  // Actualizar nombres de adultos/menores cuando cambian las cantidades
  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      nombresAdultos: Array.from({ length: Number(prev.adultos) || 0 }, (_, i) => prev.nombresAdultos[i] || ''),
      nombresMenores: Array.from({ length: Number(prev.menores) || 0 }, (_, i) => prev.nombresMenores[i] || ''),
    }));
  }, [form.adultos, form.menores]);

  const handleComprar = (destino, horario) => {
    if (tipo === 'ferry' && destino.origen === 'La Paz') {
      // Verificar si ya tienen un boleto para llegar a La Paz
      const rutaLaPaz = destinosMock.autobus.find(d => d.destino === 'La Paz');
      if (!rutaLaPaz) {
        toast.error('Primero necesitas seleccionar cómo llegar a La Paz');
        return;
      }
    }
    setDestinoSeleccionado(destino);
    setHorarioSeleccionado(horario);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleNombrePasajero = (type, idx, value) => {
    setForm((prev) => ({
      ...prev,
      [type]: prev[type].map((n, i) => (i === idx ? value : n)),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!destinoSeleccionado || !horarioSeleccionado) {
      toast.error('Por favor, selecciona un destino y un horario');
      return;
    }

    if (tipo === 'ferry') {
      // Verificar si ya seleccionó transporte a La Paz
      const rutaLaPaz = destinosMock.autobus.find(d => d.destino === 'La Paz');
      if (!form.clase) {
        toast.error('Por favor, selecciona una clase');
        return;
      }
      setCompraExitosa(true);
      setTimeout(() => {
        setCompraExitosa(false);
        setDestinoSeleccionado(null);
        setHorarioSeleccionado('');
        setForm({
          nombre: '',
          email: '',
          telefono: '',
          adultos: 1,
          menores: 0,
          clase: '',
          nombresAdultos: [''],
          nombresMenores: [''],
        });
      }, 3500);
    } else if (tipo === 'avion') {
      setMostrarSeleccionAsientos(true);
    } else if (tipo === 'autobus') {
      setMostrarSeleccionAsientosBus(true);
    }
  };

  const seleccionarAsiento = (fila, col) => {
    const asiento = asientos[fila][col];
    if (!asiento || asiento.ocupado) return;
    // Solo permitir seleccionar asientos de la clase elegida
    if (tipo === 'avion' && form.clase && asiento.clase !== form.clase) return;
    let nuevosSeleccionados = [...asientosSeleccionados];
    const id = asiento.id;
    if (asiento.seleccionado) {
      nuevosSeleccionados = nuevosSeleccionados.filter(i => i !== id);
    } else {
      if (asientosSeleccionados.length >= totalPasajeros) return;
      nuevosSeleccionados.push(id);
    }
    setAsientosSeleccionados(nuevosSeleccionados);
    setAsientos(asientos.map((filaArr, fIdx) =>
      filaArr.map((a, cIdx) =>
        a && a.id === id ? { ...a, seleccionado: !a.seleccionado } : a
      )
    ));
  };

  const seleccionarAsientoTren = (fila, col) => {
    const asiento = asientosTrenState[fila][col];
    if (!asiento || asiento.ocupado) return;
    if (tipo === 'tren' && form.clase && asiento.clase !== form.clase) return;
    let nuevosSeleccionados = [...asientosTrenSeleccionados];
    const id = asiento.id;
    if (asiento.seleccionado) {
      nuevosSeleccionados = nuevosSeleccionados.filter(i => i !== id);
    } else {
      if (asientosTrenSeleccionados.length >= totalPasajeros) return;
      nuevosSeleccionados.push(id);
    }
    setAsientosTrenSeleccionados(nuevosSeleccionados);
    setAsientosTrenState(asientosTrenState.map((filaArr, fIdx) =>
      filaArr.map((a, cIdx) =>
        a && a.id === id ? { ...a, seleccionado: !a.seleccionado } : a
      )
    ));
  };

  const seleccionarAsientoBus = (fila, col) => {
    const asiento = asientosBusState[fila][col];
    if (!asiento || asiento.ocupado) return;
    let nuevosSeleccionados = [...asientosBusSeleccionados];
    const id = asiento.id;
    if (asiento.seleccionado) {
      nuevosSeleccionados = nuevosSeleccionados.filter(i => i !== id);
    } else {
      if (asientosBusSeleccionados.length >= totalPasajeros) return;
      nuevosSeleccionados.push(id);
    }
    setAsientosBusSeleccionados(nuevosSeleccionados);
    setAsientosBusState(asientosBusState.map((filaArr, fIdx) =>
      filaArr.map((a, cIdx) =>
        a && a.id === id ? { ...a, seleccionado: !a.seleccionado } : a
      )
    ));
  };

  const confirmarAsientos = () => {
    setCompraExitosa(true);
    setMostrarSeleccionAsientos(false);
    setTimeout(() => {
      setCompraExitosa(false);
      setDestinoSeleccionado(null);
      setHorarioSeleccionado('');
      setForm({
        nombre: '',
        email: '',
        telefono: '',
        adultos: 1,
        menores: 0,
        clase: '',
        nombresAdultos: [''],
        nombresMenores: [''],
      });
      setAsientos(asientosAvion);
      setAsientosSeleccionados([]);
    }, 3500);
  };

  const confirmarAsientosTren = () => {
    setCompraExitosa(true);
    setMostrarSeleccionAsientosTren(false);
    setTimeout(() => {
      setCompraExitosa(false);
      setDestinoSeleccionado(null);
      setHorarioSeleccionado('');
      setForm({
        nombre: '',
        email: '',
        telefono: '',
        adultos: 1,
        menores: 0,
        clase: '',
        nombresAdultos: [''],
        nombresMenores: [''],
      });
      setAsientosTrenState(asientosTren);
      setAsientosTrenSeleccionados([]);
    }, 3500);
  };

  const confirmarAsientosBus = () => {
    setCompraExitosa(true);
    setMostrarSeleccionAsientosBus(false);
    setTimeout(() => {
      setCompraExitosa(false);
      setDestinoSeleccionado(null);
      setHorarioSeleccionado('');
      setForm({
        nombre: '',
        email: '',
        telefono: '',
        adultos: 1,
        menores: 0,
        clase: '',
        nombresAdultos: [''],
        nombresMenores: [''],
      });
      setAsientosBusState(asientosBus);
      setAsientosBusSeleccionados([]);
    }, 3500);
  };

  const getVagonAsignado = (clase) => {
    const claseInfo = CLASES_TREN.find(c => c.nombre === clase);
    return claseInfo ? claseInfo.numeroVagon : 3; // Por defecto, Vagón 3 (Turista)
  };

  // Calcular precio total
  const calculateTotalPrice = () => {
    if (!destinoSeleccionado || !form.clase) return 0;
    
    const transportPrice = destinoSeleccionado.precio[form.clase];
    const hotelPrice = selectedHotel ? selectedHotel.precioNoche * nights : 0;
    
    const totalTransporte = transportPrice * (
      Number(form.adultos) + (Number(form.menores) * 0.8)
    );
    
    return totalTransporte + hotelPrice;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0F1C] via-[#0F172A] to-[#1E293B] py-12 px-4">
      <div className="max-w-5xl mx-auto bg-white/5 rounded-2xl shadow-2xl p-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] to-[#2DD4BF]">Compra de Boletos</h1>
        <div className="flex justify-center gap-6 mb-10 flex-wrap">
          {tiposViaje.map((t) => (
            <button
              key={t.key}
              onClick={() => setTipo(t.key)}
              className={`px-6 py-2 rounded-full font-semibold flex items-center gap-2 transition-all duration-300 border-2 ${tipo === t.key ? 'bg-gradient-to-r from-[#38BDF8] to-[#2DD4BF] text-white border-transparent scale-105' : 'bg-white/10 text-[#38BDF8] border-[#38BDF8] hover:bg-[#38BDF8]/10'}`}
            >
              <span className="text-2xl">{t.icon}</span> {t.label}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Listado de destinos y horarios */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-[#38BDF8]">Destinos disponibles</h2>
            <div className="space-y-6">
              {destinos.map((dest) => (
                <div key={dest.id} className="bg-white/10 rounded-xl p-5 shadow flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <div className="font-bold text-lg text-white">{dest.origen} → {dest.destino}</div>
                    <div className="text-[#38BDF8] font-medium">
                      Desde $ {Math.min(...Object.values(dest.precio))}
                    </div>
                    {dest.escala && (
                      <div className="text-yellow-400 text-sm mt-1">
                        Nota: {dest.infoEscala}
                      </div>
                    )}
                    {dest.requiereConexion && (
                      <div className="text-yellow-400 text-sm mt-1">
                        Nota: {dest.infoConexion}
                      </div>
                    )}
                    <div className="text-white/60 text-sm mt-1">
                      Duración: {dest.duracion}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 items-center">
                    {dest.horarios.map((h) => (
                      <button
                        key={h}
                        onClick={() => handleComprar(dest, h)}
                        className="px-4 py-1 rounded-full bg-gradient-to-r from-[#38BDF8] to-[#2DD4BF] text-white font-semibold hover:scale-105 transition-all"
                      >
                        {h}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Formulario de compra */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-[#38BDF8]">Reserva tu boleto</h2>
            {destinoSeleccionado && horarioSeleccionado ? (
              <form onSubmit={handleSubmit} className="space-y-4 bg-white/10 p-6 rounded-xl shadow">
                <div className="text-white font-semibold">
                  <span className="text-[#2DD4BF]">Trayecto:</span> {destinoSeleccionado.origen} → {destinoSeleccionado.destino} <br />
                  <span className="text-[#2DD4BF]">Horario:</span> {horarioSeleccionado} <br />
                  <span className="text-[#2DD4BF]">Precios:</span>
                  <ul className="mt-1 space-y-1">
                    {Object.entries(destinoSeleccionado.precio).map(([clase, precio]) => (
                      <li key={clase} className="text-sm">
                        {clase}: ${precio}
                      </li>
                    ))}
                  </ul>
                </div>
                <input
                  type="text"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleFormChange}
                  required
                  placeholder="Tu nombre completo"
                  className="w-full px-4 py-2 rounded-lg border border-[#38BDF8] bg-white/80 text-[#0A0F1C] focus:outline-none focus:ring-2 focus:ring-[#38BDF8]"
                />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleFormChange}
                  required
                  placeholder="Correo electrónico"
                  className="w-full px-4 py-2 rounded-lg border border-[#38BDF8] bg-white/80 text-[#0A0F1C] focus:outline-none focus:ring-2 focus:ring-[#38BDF8]"
                />
                <input
                  type="tel"
                  name="telefono"
                  value={form.telefono}
                  onChange={handleFormChange}
                  required
                  placeholder="Número de teléfono"
                  className="w-full px-4 py-2 rounded-lg border border-[#38BDF8] bg-white/80 text-[#0A0F1C] focus:outline-none focus:ring-2 focus:ring-[#38BDF8]"
                />
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-xs text-white mb-1">Adultos</label>
                    <input
                      type="number"
                      name="adultos"
                      value={form.adultos}
                      onChange={handleFormChange}
                      min={1}
                      max={10}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-[#38BDF8] bg-white/80 text-[#0A0F1C] focus:outline-none focus:ring-2 focus:ring-[#38BDF8]"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs text-white mb-1">Menores</label>
                    <input
                      type="number"
                      name="menores"
                      value={form.menores}
                      onChange={handleFormChange}
                      min={0}
                      max={10}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-[#38BDF8] bg-white/80 text-[#0A0F1C] focus:outline-none focus:ring-2 focus:ring-[#38BDF8]"
                    />
                  </div>
                </div>
                {/* Campos dinámicos para nombres de adultos */}
                {form.nombresAdultos.length > 0 && (
                  <div className="space-y-2">
                    {form.nombresAdultos.map((nombre, idx) => (
                      <input
                        key={idx}
                        type="text"
                        value={nombre}
                        onChange={e => handleNombrePasajero('nombresAdultos', idx, e.target.value)}
                        required
                        placeholder={`Nombre del adulto ${idx + 1}`}
                        className="w-full px-4 py-2 rounded-lg border border-[#38BDF8] bg-white/80 text-[#0A0F1C] focus:outline-none focus:ring-2 focus:ring-[#38BDF8]"
                      />
                    ))}
                  </div>
                )}
                {/* Campos dinámicos para nombres de menores */}
                {form.nombresMenores.length > 0 && form.menores > 0 && (
                  <div className="space-y-2">
                    {form.nombresMenores.map((nombre, idx) => (
                      <input
                        key={idx}
                        type="text"
                        value={nombre}
                        onChange={e => handleNombrePasajero('nombresMenores', idx, e.target.value)}
                        required
                        placeholder={`Nombre del menor ${idx + 1}`}
                        className="w-full px-4 py-2 rounded-lg border border-[#38BDF8] bg-white/80 text-[#0A0F1C] focus:outline-none focus:ring-2 focus:ring-[#38BDF8]"
                      />
                    ))}
                  </div>
                )}
                {(tipo === 'avion' || tipo === 'tren' || tipo === 'autobus' || tipo === 'crucero' || tipo === 'ferry') && (
                  <div>
                    <label className="block text-xs text-white mb-1">
                      {tipo === 'crucero' ? 'Tipo de camarote' : 
                       tipo === 'autobus' ? 'Tipo de servicio' : 
                       tipo === 'ferry' ? 'Tipo de clase' :
                       'Tipo de clase'}
                    </label>
                    <select
                      name="clase"
                      value={form.clase}
                      onChange={handleFormChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-[#38BDF8] bg-white/80 text-[#0A0F1C] focus:outline-none focus:ring-2 focus:ring-[#38BDF8]"
                    >
                      <option value="">
                        {tipo === 'crucero' ? 'Selecciona un tipo de camarote' : 
                         tipo === 'autobus' ? 'Selecciona tipo de servicio' :
                         tipo === 'ferry' ? 'Selecciona una clase' :
                         'Selecciona una clase'}
                      </option>
                      {clasesPorTipo[tipo].map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                <button
                  type="submit"
                  className="w-full py-2 rounded-lg bg-gradient-to-r from-[#38BDF8] to-[#2DD4BF] text-white font-bold text-lg hover:scale-105 transition-all"
                >
                  Confirmar compra
                </button>
              </form>
            ) : (
              <div className="text-white/70 italic">Selecciona un destino y horario para reservar tu boleto.</div>
            )}
            {compraExitosa && (
              <div className="mt-6 p-4 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-xl text-center font-bold shadow-lg animate-bounce-in">
                ¡Compra realizada con éxito! Revisa tu correo para más detalles.
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Selección de asientos para avión */}
      {mostrarSeleccionAsientos && tipo === 'avion' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full relative flex flex-col items-center">
            {/* Leyenda de colores */}
            <div className="flex gap-4 mb-4">
              <div className="flex items-center gap-1"><span className="inline-block w-5 h-5 rounded bg-white border-2 border-[#38BDF8]"></span><span className="text-xs text-[#38BDF8]">Ventana</span></div>
              <div className="flex items-center gap-1"><span className="inline-block w-5 h-5 rounded bg-white border-2 border-[#0A0F1C]"></span><span className="text-xs text-[#0A0F1C]">Centro</span></div>
              <div className="flex items-center gap-1"><span className="inline-block w-5 h-5 rounded bg-white border-2 border-[#2DD4BF]"></span><span className="text-xs text-[#2DD4BF]">Pasillo</span></div>
              <div className="flex items-center gap-1"><span className="inline-block w-5 h-5 rounded bg-gradient-to-br from-[#38BDF8] to-[#2DD4BF]"></span><span className="text-xs text-[#38BDF8]">Seleccionado</span></div>
              <div className="flex items-center gap-1"><span className="inline-block w-5 h-5 rounded bg-gray-400 border-2 border-gray-400"></span><span className="text-xs text-gray-500">Ocupado</span></div>
            </div>
            {/* Nariz del avión */}
            <div className="w-24 h-8 bg-gradient-to-b from-[#38BDF8] to-[#2DD4BF] rounded-t-full mb-2"></div>
            <h2 className="text-2xl font-bold text-center mb-4 text-[#38BDF8]">Selecciona tus asientos</h2>
            <div className="flex flex-col items-center">
              {asientos.map((filaArr, filaIdx) => (
                <div key={filaIdx} className="flex items-center mb-1">
                  {filaArr.map((asiento, colIdx) =>
                    asiento === null ? (
                      <div key={colIdx} className="w-6"></div>
                    ) : (
                      <button
                        key={colIdx}
                        type="button"
                        className={`w-9 h-9 rounded flex items-center justify-center font-bold border text-xs mx-0.5 transition-all duration-200
                          ${asiento.ocupado ? 'bg-gray-400 border-gray-400 cursor-not-allowed text-white' :
                            asiento.seleccionado ? 'bg-gradient-to-br from-[#38BDF8] to-[#2DD4BF] border-[#38BDF8] text-white scale-110' :
                            (form.clase && asiento.clase !== form.clase) ? 'bg-gray-200 border-gray-300 text-gray-400 cursor-not-allowed' :
                            asiento.tipo === 'ventana' ? 'bg-white border-[#38BDF8] text-[#38BDF8] hover:bg-[#38BDF8]/10 hover:scale-105' :
                            asiento.tipo === 'pasillo' ? 'bg-white border-[#2DD4BF] text-[#2DD4BF] hover:bg-[#2DD4BF]/10 hover:scale-105' :
                            'bg-white border-[#0A0F1C] text-[#0A0F1C] hover:bg-[#0A0F1C]/10 hover:scale-105'}
                        `}
                        onClick={() => seleccionarAsiento(filaIdx, colIdx)}
                        disabled={asiento.ocupado || (form.clase && asiento.clase !== form.clase)}
                        title={`Asiento ${asiento.numero} (${asiento.clase})`}
                      >
                        {asiento.numero}
                      </button>
                    )
                  )}
                </div>
              ))}
            </div>
            {/* Cola del avión */}
            <div className="w-12 h-6 bg-gradient-to-t from-[#38BDF8] to-[#2DD4BF] rounded-b-full mt-2"></div>
            <div className="text-center mb-4 text-[#0A0F1C] font-medium mt-4">
              Seleccionados: {asientosSeleccionados.length} / {totalPasajeros}
            </div>
            <button
              className="w-full py-2 rounded-lg bg-gradient-to-r from-[#38BDF8] to-[#2DD4BF] text-white font-bold text-lg hover:scale-105 transition-all disabled:opacity-50"
              onClick={confirmarAsientos}
              disabled={asientosSeleccionados.length !== totalPasajeros}
            >
              Confirmar asientos
            </button>
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-[#38BDF8] text-xl"
              onClick={() => setMostrarSeleccionAsientos(false)}
            >
              ×
            </button>
          </div>
        </div>
      )}
      {mostrarSeleccionAsientosTren && tipo === 'tren' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full relative flex flex-col items-center">
            {/* Leyenda de colores */}
            <div className="flex gap-4 mb-4">
              <div className="flex items-center gap-1"><span className="inline-block w-5 h-5 rounded bg-white border-2 border-[#38BDF8]"></span><span className="text-xs text-[#38BDF8]">Ventana</span></div>
              <div className="flex items-center gap-1"><span className="inline-block w-5 h-5 rounded bg-white border-2 border-[#2DD4BF]"></span><span className="text-xs text-[#2DD4BF]">Pasillo</span></div>
              <div className="flex items-center gap-1"><span className="inline-block w-5 h-5 rounded bg-gradient-to-br from-[#38BDF8] to-[#2DD4BF]"></span><span className="text-xs text-[#38BDF8]">Seleccionado</span></div>
              <div className="flex items-center gap-1"><span className="inline-block w-5 h-5 rounded bg-gray-400 border-2 border-gray-400"></span><span className="text-xs text-gray-500">Ocupado</span></div>
            </div>
            {/* Cabecera del vagón asignado */}
            <div className="w-full text-center mb-4">
              <h2 className="text-2xl font-bold text-[#38BDF8]">Selecciona tus asientos</h2>
              <p className="text-lg font-medium text-[#0A0F1C]">Vagón {getVagonAsignado(form.clase)} – {form.clase}</p>
            </div>
            {/* Locomotora del tren */}
            <div className="w-20 h-6 bg-gradient-to-b from-[#38BDF8] to-[#2DD4BF] rounded-t-2xl mb-2"></div>
            <div className="flex flex-col items-center">
              {asientosTrenState
                .filter((filaArr) => filaArr.some((asiento) => asiento && asiento.numeroVagon === getVagonAsignado(form.clase)))
                .map((filaArr, filaIdx) => (
                  <div key={filaIdx} className="flex items-center mb-1">
                    {filaArr.map((asiento, colIdx) =>
                      asiento === null ? (
                        <div key={colIdx} className="w-6"></div>
                      ) : (
                        <button
                          key={colIdx}
                          type="button"
                          className={`w-10 h-10 rounded flex items-center justify-center font-bold border text-xs mx-0.5 transition-all duration-200
                            ${asiento.ocupado ? 'bg-gray-400 border-gray-400 cursor-not-allowed text-white' :
                              asiento.seleccionado ? 'bg-gradient-to-br from-[#38BDF8] to-[#2DD4BF] border-[#38BDF8] text-white scale-110' :
                              (form.clase && asiento.clase !== form.clase) ? 'bg-gray-200 border-gray-300 text-gray-400 cursor-not-allowed' :
                              asiento.tipo === 'ventana' ? 'bg-white border-[#38BDF8] text-[#38BDF8] hover:bg-[#38BDF8]/10 hover:scale-105' :
                              'bg-white border-[#2DD4BF] text-[#2DD4BF] hover:bg-[#2DD4BF]/10 hover:scale-105'}
                          `}
                          onClick={() => seleccionarAsientoTren(filaIdx, colIdx)}
                          disabled={asiento.ocupado || (form.clase && asiento.clase !== form.clase)}
                          title={`Asiento ${asiento.numero} (${asiento.clase})`}
                        >
                          {asiento.numero}
                        </button>
                      )
                    )}
                  </div>
                ))}
            </div>
            {/* Cola del tren */}
            <div className="w-10 h-4 bg-gradient-to-t from-[#38BDF8] to-[#2DD4BF] rounded-b-2xl mt-2"></div>
            <div className="text-center mb-4 text-[#0A0F1C] font-medium mt-4">
              Seleccionados: {asientosTrenSeleccionados.length} / {totalPasajeros}
            </div>
            <button
              className="w-full py-2 rounded-lg bg-gradient-to-r from-[#38BDF8] to-[#2DD4BF] text-white font-bold text-lg hover:scale-105 transition-all disabled:opacity-50"
              onClick={confirmarAsientosTren}
              disabled={asientosTrenSeleccionados.length !== totalPasajeros}
            >
              Confirmar asientos
            </button>
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-[#38BDF8] text-xl"
              onClick={() => setMostrarSeleccionAsientosTren(false)}
            >
              ×
            </button>
          </div>
        </div>
      )}
      {mostrarSeleccionAsientosBus && tipo === 'autobus' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full relative flex flex-col items-center">
            {/* Leyenda de colores */}
            <div className="flex gap-4 mb-4">
              <div className="flex items-center gap-1"><span className="inline-block w-5 h-5 rounded bg-white border-2 border-[#38BDF8]"></span><span className="text-xs text-[#38BDF8]">Ventana</span></div>
              <div className="flex items-center gap-1"><span className="inline-block w-5 h-5 rounded bg-white border-2 border-[#2DD4BF]"></span><span className="text-xs text-[#2DD4BF]">Pasillo</span></div>
              <div className="flex items-center gap-1"><span className="inline-block w-5 h-5 rounded bg-gradient-to-br from-[#38BDF8] to-[#2DD4BF]"></span><span className="text-xs text-[#38BDF8]">Seleccionado</span></div>
              <div className="flex items-center gap-1"><span className="inline-block w-5 h-5 rounded bg-gray-400 border-2 border-gray-400"></span><span className="text-xs text-gray-500">Ocupado</span></div>
            </div>
            {/* Cabecera del autobús */}
            <div className="w-full text-center mb-4">
              <h2 className="text-2xl font-bold text-[#38BDF8]">Selecciona tus asientos</h2>
            </div>
            {/* Volante del autobús */}
            <div className="w-20 h-6 bg-gradient-to-b from-[#38BDF8] to-[#2DD4BF] rounded-t-2xl mb-2"></div>
            <div className="flex flex-col items-center">
              {asientosBusState.map((filaArr, filaIdx) => (
                <div key={filaIdx} className="flex items-center mb-1">
                  {filaArr.map((asiento, colIdx) =>
                    asiento === null ? (
                      <div key={colIdx} className="w-6"></div>
                    ) : (
                      <button
                        key={colIdx}
                        type="button"
                        className={`w-10 h-10 rounded flex items-center justify-center font-bold border text-xs mx-0.5 transition-all duration-200
                          ${asiento.ocupado ? 'bg-gray-400 border-gray-400 cursor-not-allowed text-white' :
                            asiento.seleccionado ? 'bg-gradient-to-br from-[#38BDF8] to-[#2DD4BF] border-[#38BDF8] text-white scale-110' :
                            asiento.tipo === 'ventana' ? 'bg-white border-[#38BDF8] text-[#38BDF8] hover:bg-[#38BDF8]/10 hover:scale-105' :
                            'bg-white border-[#2DD4BF] text-[#2DD4BF] hover:bg-[#2DD4BF]/10 hover:scale-105'}
                        `}
                        onClick={() => seleccionarAsientoBus(filaIdx, colIdx)}
                        disabled={asiento.ocupado}
                        title={`Asiento ${asiento.numero}`}
                      >
                        {asiento.numero}
                      </button>
                    )
                  )}
                </div>
              ))}
            </div>
            {/* Parte trasera del autobús */}
            <div className="w-10 h-4 bg-gradient-to-t from-[#38BDF8] to-[#2DD4BF] rounded-b-2xl mt-2"></div>
            <div className="text-center mb-4 text-[#0A0F1C] font-medium mt-4">
              Seleccionados: {asientosBusSeleccionados.length} / {totalPasajeros}
            </div>
            <button
              className="w-full py-2 rounded-lg bg-gradient-to-r from-[#38BDF8] to-[#2DD4BF] text-white font-bold text-lg hover:scale-105 transition-all disabled:opacity-50"
              onClick={confirmarAsientosBus}
              disabled={asientosBusSeleccionados.length !== totalPasajeros}
            >
              Confirmar asientos
            </button>
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-[#38BDF8] text-xl"
              onClick={() => setMostrarSeleccionAsientosBus(false)}
            >
              ×
            </button>
          </div>
        </div>
      )}
      
      {/* Agregar sección de hoteles después del formulario de transporte */}
      {destinoSeleccionado && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4 text-[#38BDF8]">Selecciona tu hotel</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hoteles[destinoSeleccionado.destino].map((hotel) => (
              <div
                key={hotel.nombre}
                className={`bg-white/10 rounded-xl p-6 cursor-pointer transition-all duration-300 ${
                  selectedHotel?.nombre === hotel.nombre ? 'ring-2 ring-[#38BDF8] scale-105' : 'hover:bg-white/20'
                }`}
                onClick={() => setSelectedHotel(hotel)}
              >
                <h3 className="text-xl font-bold text-white mb-2">{hotel.nombre}</h3>
                <p className="text-[#38BDF8] font-medium mb-2">Categoría: {hotel.categoria}</p>
                <p className="text-white/80 mb-4">Precio por noche: ${hotel.precioNoche}</p>
                <div className="space-y-1">
                  {hotel.amenidades.map((amenidad, index) => (
                    <p key={index} className="text-sm text-white/60">• {amenidad}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          {selectedHotel && (
            <div className="mt-6">
              <label className="block text-white mb-2">Número de noches:</label>
              <input
                type="number"
                min="1"
                value={nights}
                onChange={(e) => setNights(Number(e.target.value))}
                className="w-32 px-4 py-2 rounded-lg border border-[#38BDF8] bg-white/80 text-[#0A0F1C]"
              />
            </div>
          )}

          <div className="mt-6 p-4 bg-white/10 rounded-xl">
            <h3 className="text-xl font-bold text-white mb-4">Resumen de costos</h3>
            <div className="space-y-2 text-white/80">
              <p>Transporte: ${destinoSeleccionado.precio[form.clase]} x {form.adultos} adultos + {form.menores} menores</p>
              {selectedHotel && (
                <p>Hotel: ${selectedHotel.precioNoche} x {nights} noches</p>
              )}
              <p className="text-xl font-bold text-[#38BDF8]">Total: ${calculateTotalPrice()}</p>
            </div>
          </div>
        </div>
      )}
      
      <style>{`
        @keyframes bounce-in {
          0% { transform: scale(0.8); opacity: 0; }
          60% { transform: scale(1.05); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-bounce-in {
          animation: bounce-in 0.7s cubic-bezier(.68,-0.55,.27,1.55);
        }
      `}</style>
    </div>
  );
};

export default BoletosPage;