import React, { useState } from 'react';
import { Lock, X } from 'lucide-react';

export default function PaymentModal({
  isOpen,
  onClose,
  destinoSeleccionado,
  form,
  selectedHotel,
  nights,
  calculateTotalPrice
}) {
  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });

  if (!isOpen) return null;

  const handleInputChange = (field, value) => {
    let formattedValue = value;
    if (field === 'number') {
      formattedValue = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
      formattedValue = formattedValue.substring(0, 19);
    }
    if (field === 'expiry') {
      formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2').substring(0, 5);
    }
    if (field === 'cvv') {
      formattedValue = value.replace(/\D/g, '').substring(0, 3);
    }
    setCardData(prev => ({ ...prev, [field]: formattedValue }));
  };

  const getCardType = (number) => {
    const cleanNumber = number.replace(/\s/g, '');
    if (cleanNumber.startsWith('4')) return 'visa';
    if (cleanNumber.startsWith('5') || cleanNumber.startsWith('2')) return 'mastercard';
    if (cleanNumber.startsWith('3')) return 'amex';
    return 'generic';
  };

  const showToast = () => {
    // Crear elemento de notificación personalizada
    const toast = document.createElement('div');
    toast.innerHTML = `
      <div style="
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #10B981, #059669);
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3);
        z-index: 9999;
        font-family: system-ui;
        font-weight: 600;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        border: 1px solid rgba(255, 255, 255, 0.2);
      ">
        ✅ ¡Pago procesado exitosamente!
      </div>
    `;
    
    document.body.appendChild(toast);
    
    // Animar entrada
    setTimeout(() => {
      toast.firstElementChild.style.transform = 'translateX(0)';
    }, 100);
    
    // Animar salida y remover
    setTimeout(() => {
      toast.firstElementChild.style.transform = 'translateX(100%)';
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, 2500);
  };

  const handleSubmit = () => {
    showToast();
    setTimeout(() => {
      window.location.reload();
    }, 3000); 
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A0F1C]/90 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-[#0A0F1C] via-[#0F172A] to-[#1E293B] rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden border-2 border-[#38BDF8]">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#38BDF8] to-[#2DD4BF] text-white p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Pago Seguro</h2>
            <p className="text-white/80">Completa tu transacción</p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/10 p-2 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        {/* Contenido principal scrollable */}
        <div className="p-8 overflow-y-auto" style={{ maxHeight: '70vh' }}>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Lado izquierdo - Tarjeta */}
            <div className="space-y-6">
              <div className="text-center md:text-left">
                <h3 className="text-lg font-semibold mb-2 text-[#38BDF8]">Vista previa de tu tarjeta</h3>
                <p className="text-[#2DD4BF]">Los datos se mostrarán en tiempo real</p>
              </div>
              {/* Tarjeta 3D */}
              <div className="relative">
                <div className="w-full max-w-sm mx-auto">
                  <div className="bg-gradient-to-br from-[#1E293B] via-[#0F172A] to-[#0A0F1C] rounded-2xl p-6 text-white shadow-2xl border border-[#38BDF8]">
                    {/* Chip y logo */}
                    <div className="flex justify-between items-start mb-8">
                      <div className="w-12 h-9 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-md flex items-center justify-center">
                        <div className="w-8 h-6 bg-yellow-500 rounded-sm"></div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-[#38BDF8]">
                          {getCardType(cardData.number) === 'visa' && 'VISA'}
                          {getCardType(cardData.number) === 'mastercard' && 'MASTERCARD'}
                          {getCardType(cardData.number) === 'amex' && 'AMEX'}
                          {getCardType(cardData.number) === 'generic' && 'CARD'}
                        </div>
                      </div>
                    </div>
                    {/* Número de tarjeta */}
                    <div className="mb-6">
                      <p className="text-xl font-mono tracking-wider text-[#2DD4BF]">
                        {cardData.number || '•••• •••• •••• ••••'}
                      </p>
                    </div>
                    {/* Nombre y fecha */}
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-xs text-[#38BDF8] mb-1">TITULAR</p>
                        <p className="font-semibold text-sm text-white">
                          {cardData.name || 'NOMBRE COMPLETO'}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-[#38BDF8] mb-1">VENCE</p>
                        <p className="font-semibold text-sm text-white">
                          {cardData.expiry || 'MM/AA'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Información de seguridad */}
              <div className="bg-[#2DD4BF]/10 border border-[#2DD4BF] rounded-lg p-4">
                <div className="flex items-center gap-2 text-[#2DD4BF]">
                  <Lock size={16} />
                  <span className="text-sm font-medium">Transacción segura</span>
                </div>
                <p className="text-[#2DD4BF] text-xs mt-1">
                  Tus datos están protegidos con encriptación SSL de 256 bits
                </p>
              </div>
              {/* Resumen de costos */}
              <div className="mt-4 p-4 rounded-xl border border-[#38BDF8] bg-gradient-to-br from-[#0A0F1C]/80 via-[#0F172A]/80 to-[#1E293B]/80">
                <h3 className="text-lg font-bold text-[#38BDF8] mb-2">Resumen de costos</h3>
                <div className="space-y-1 text-white/90">
                  {destinoSeleccionado && form?.clase && (
                    <p>
                      Transporte: <span className="text-[#2DD4BF] font-semibold">${destinoSeleccionado.precio[form.clase]}</span> x {form.adultos} adultos + {form.menores} menores
                    </p>
                  )}
                  {selectedHotel && (
                    <p>
                      Hotel: <span className="text-[#2DD4BF] font-semibold">${selectedHotel.precioNoche}</span> x {nights} noches
                    </p>
                  )}
                  <p className="text-base font-bold text-[#38BDF8] mt-2">
                    Total: ${calculateTotalPrice && calculateTotalPrice()}
                  </p>
                </div>
              </div>
            </div>
            {/* Lado derecho - Formulario */}
            <div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-[#38BDF8]">Información de la tarjeta</h3>
                </div>
                {/* Número de tarjeta */}
                <div>
                  <label className="block text-sm font-medium text-[#38BDF8] mb-2">
                    Número de tarjeta
                  </label>
                  <input
                    type="text"
                    value={cardData.number}
                    onChange={(e) => handleInputChange('number', e.target.value)}
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-4 py-3 border border-[#38BDF8] rounded-lg bg-[#0A0F1C]/70 text-white focus:ring-2 focus:ring-[#38BDF8] focus:border-transparent transition-colors"
                    required
                  />
                </div>
                {/* Nombre del titular */}
                <div>
                  <label className="block text-sm font-medium text-[#38BDF8] mb-2">
                    Nombre del titular
                  </label>
                  <input
                    type="text"
                    value={cardData.name}
                    onChange={(e) => handleInputChange('name', e.target.value.toUpperCase())}
                    placeholder="JUAN PÉREZ"
                    className="w-full px-4 py-3 border border-[#38BDF8] rounded-lg bg-[#0A0F1C]/70 text-white focus:ring-2 focus:ring-[#38BDF8] focus:border-transparent transition-colors"
                    required
                  />
                </div>
                {/* Fecha y CVV */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#38BDF8] mb-2">
                      Fecha de expiración
                    </label>
                    <input
                      type="text"
                      value={cardData.expiry}
                      onChange={(e) => handleInputChange('expiry', e.target.value)}
                      placeholder="MM/AA"
                      className="w-full px-4 py-3 border border-[#38BDF8] rounded-lg bg-[#0A0F1C]/70 text-white focus:ring-2 focus:ring-[#38BDF8] focus:border-transparent transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#38BDF8] mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      value={cardData.cvv}
                      onChange={(e) => handleInputChange('cvv', e.target.value)}
                      placeholder="123"
                      className="w-full px-4 py-3 border border-[#38BDF8] rounded-lg bg-[#0A0F1C]/70 text-white focus:ring-2 focus:ring-[#38BDF8] focus:border-transparent transition-colors"
                      required
                    />
                  </div>
                </div>
                {/* Botones */}
                <div className="flex gap-4 mt-6">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-6 py-3 border border-[#38BDF8] text-[#38BDF8] rounded-lg bg-white/10 hover:bg-[#38BDF8]/10 transition-colors font-semibold"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-[#38BDF8] to-[#2DD4BF] text-white rounded-lg hover:from-[#2DD4BF] hover:to-[#38BDF8] transition-colors font-bold"
                  >
                    {`Pagar $${calculateTotalPrice ? calculateTotalPrice() : '0.00'}`}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}