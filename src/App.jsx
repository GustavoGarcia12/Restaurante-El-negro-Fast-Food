import { useState } from 'react';
import Header from './components/Header';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import { menuData, categorias } from './data/menu';

function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const addToCart = (producto) => {
    setCart([...cart, producto]);
  };

  const removeFromCart = (indexToRemove) => {
    setCart(cart.filter((_, index) => index !== indexToRemove));
  };

  const handleProceedToPay = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const totalCart = cart.reduce((sum, item) => sum + item.precio, 0);

  return (
    <div className="min-h-screen bg-fondo text-white font-sans pb-20 relative">
      <Header cartCount={cart.length} onOpenCart={() => setIsCartOpen(true)} />
      
      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cart={cart} 
        removeFromCart={removeFromCart}
        onProceedToPay={handleProceedToPay}
      />

      <Checkout 
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        total={totalCart}
      />
      
      <main className="max-w-4xl mx-auto p-4 mt-4">
        {categorias.map((categoria) => {
          const productos = menuData.filter(item => item.categoria === categoria);
          if (productos.length === 0) return null;

          return (
            <section key={categoria} className="mb-8">
              <h2 className="text-2xl font-bold text-fuego-amarillo mb-4 border-b border-fuego-amarillo/30 pb-2">
                {categoria}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {productos.map(producto => (
                  <div key={producto.id} className="bg-tarjeta p-4 rounded-xl border border-gray-800 flex justify-between items-center shadow-sm">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-100">{producto.nombre}</h3>
                      <p className="text-fuego-naranja font-bold mt-1">
                        ${producto.precio.toLocaleString('es-CO')}
                      </p>
                    </div>
                    <button 
                      onClick={() => addToCart(producto)}
                      className="bg-fuego-rojo hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors active:scale-95"
                    >
                      Agregar
                    </button>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </main>
    </div>
  );
}

export default App;