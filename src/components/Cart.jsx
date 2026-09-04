import { X, Trash2 } from 'lucide-react';

export default function Cart({ isOpen, onClose, cart, removeFromCart, onProceedToPay }) {
  if (!isOpen) return null;

  const total = cart.reduce((sum, item) => sum + item.precio, 0);

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex justify-end">
      <div className="w-full md:w-96 bg-tarjeta h-full p-5 flex flex-col border-l border-fuego-rojo/30 shadow-2xl">
        
        <div className="flex justify-between items-center border-b border-gray-800 pb-4">
          <h2 className="text-2xl font-bold text-fuego-amarillo">Tu Pedido</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X size={28} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 flex flex-col gap-3">
          {cart.length === 0 ? (
            <p className="text-gray-400 text-center mt-10">Tu carrito está vacío 🍔</p>
          ) : (
            cart.map((item, index) => (
              <div key={index} className="flex justify-between items-center bg-fondo p-3 rounded-lg border border-gray-800">
                <div>
                  <h3 className="font-semibold text-gray-100">{item.nombre}</h3>
                  <p className="text-fuego-naranja">${item.precio.toLocaleString('es-CO')}</p>
                </div>
                <button 
                  onClick={() => removeFromCart(index)}
                  className="text-gray-500 hover:text-fuego-rojo transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))
          )}
        </div>

        <div className="border-t border-gray-800 pt-4 mt-auto">
          <div className="flex justify-between items-center mb-4 text-xl">
            <span className="font-bold text-white">Total:</span>
            <span className="font-bold text-fuego-naranja">${total.toLocaleString('es-CO')}</span>
          </div>
          <button 
            onClick={onProceedToPay}
            disabled={cart.length === 0}
            className="w-full bg-fuego-rojo hover:bg-red-700 disabled:bg-gray-700 disabled:text-gray-400 text-white font-bold py-3 rounded-lg transition-colors"
          >
            Proceder al Pago
          </button>
        </div>

      </div>
    </div>
  );
}