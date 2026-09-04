import { ShoppingCart } from 'lucide-react';

export default function Header({ cartCount, onOpenCart }) {
  return (
    <header className="bg-fondo sticky top-0 z-40 border-b border-fuego-rojo/30 p-4 shadow-md shadow-fuego-rojo/10">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-bold text-fuego-naranja">
          🔥 El Negro Fast Food
        </h1>
        <button 
          onClick={onOpenCart}
          className="relative p-2 bg-tarjeta rounded-full text-fuego-amarillo hover:bg-fuego-naranja hover:text-white transition-colors"
        >
          <ShoppingCart size={24} />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-fuego-rojo text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full animate-bounce">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}