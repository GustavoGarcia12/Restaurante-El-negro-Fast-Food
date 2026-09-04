import { useState } from 'react';
import { X } from 'lucide-react';

export default function Checkout({ isOpen, onClose, cart, total }) {
  const [formData, setFormData] = useState({
    nombre: '',
    direccion: '',
    metodoPago: 'Efectivo',
    notas: ''
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const confirmarPedido = () => {
    // 1. Número de WhatsApp de "Donde El Negro Fast Food"
    const numeroRestaurante = "573332318097"; // Importante: incluir el código de país (57 para Colombia)
    
    // 2. Construir la lista de productos
    const listaProductos = cart.map(item => `▪️ ${item.nombre} - $${item.precio.toLocaleString('es-CO')}`).join('\n');
    
    // 3. Crear el mensaje completo
    const mensaje = `🔥 *NUEVO PEDIDO - EL NEGRO FAST FOOD* 🔥\n\n` +
      `*Cliente:* ${formData.nombre}\n` +
      `*Dirección:* ${formData.direccion}\n` +
      `*Método de Pago:* ${formData.metodoPago}\n\n` +
      `*🛒 DETALLE DEL PEDIDO:*\n${listaProductos}\n\n` +
      `*💰 TOTAL A PAGAR:* $${total.toLocaleString('es-CO')}\n` +
      `${formData.notas ? `\n*📝 Notas:* ${formData.notas}` : ''}`;

    // 4. Codificar el mensaje para la URL y redirigir
    const url = `https://wa.me/${numeroRestaurante}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 bg-black/90 z-[60] flex items-center justify-center p-4">
      <div className="bg-tarjeta w-full max-w-md rounded-2xl p-6 border border-fuego-rojo/30 shadow-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
          <X size={24} />
        </button>
        
        <h2 className="text-2xl font-bold text-fuego-amarillo mb-6">Detalles del Envío</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-gray-300 text-sm mb-1">Nombre Completo *</label>
            <input 
              type="text" 
              name="nombre"
              required
              onChange={handleChange}
              className="w-full bg-fondo border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-fuego-naranja"
              placeholder="Ej. Juan Pérez"
            />
          </div>
          
          <div>
            <label className="block text-gray-300 text-sm mb-1">Dirección de Entrega *</label>
            <input 
              type="text" 
              name="direccion"
              required
              onChange={handleChange}
              className="w-full bg-fondo border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-fuego-naranja"
              placeholder="Ej. Calle 45 # 12-34, Apto 201"
            />
          </div>
          
          <div>
            <label className="block text-gray-300 text-sm mb-1">Método de Pago *</label>
            <select 
              name="metodoPago"
              onChange={handleChange}
              className="w-full bg-fondo border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-fuego-naranja"
            >
              <option value="Efectivo">Efectivo</option>
              <option value="Transferencia">Transferencia (Nequi/Daviplata)</option>
            </select>
          </div>
          
          <div>
            <label className="block text-gray-300 text-sm mb-1">Notas al restaurante (Opcional)</label>
            <textarea 
              name="notas"
              onChange={handleChange}
              className="w-full bg-fondo border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-fuego-naranja resize-none"
              placeholder="Ej. Sin cebolla, salsas aparte..."
              rows="2"
            ></textarea>
          </div>
        </div>

        <button 
          onClick={confirmarPedido}
          disabled={!formData.nombre || !formData.direccion}
          className="w-full mt-6 bg-green-600 hover:bg-green-500 disabled:bg-gray-700 disabled:text-gray-400 text-white font-bold py-3 rounded-lg transition-colors flex justify-center items-center gap-2"
        >
          Enviar a WhatsApp
        </button>
      </div>
    </div>
  );
}