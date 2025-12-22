import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Trash2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { ticketTypeLabels } from '../../data/checkout-mocks';
import { Overlay } from '../ui/Overlay';
import type { CheckoutItem } from '../../types/checkout';

/**
 * Dropdown del carrito de compras
 * Muestra los items agregados y permite ir al checkout
 */
export function CartDropdown() {
  const { items, itemCount, subtotal, removeItem } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const toggleCart = () => setIsOpen(!isOpen);
  const closeCart = () => setIsOpen(false);

  return (
    <div className="relative">
      {/* Botón del carrito */}
      <button
        type="button"
        onClick={toggleCart}
        className="relative p-2 text-gray-300 hover:text-white transition-colors"
        aria-label="Carrito de compras"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <ShoppingCart className="w-6 h-6" />
        {itemCount > 0 && (
          <span 
            className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center"
            aria-label={`${itemCount} artículos en el carrito`}
          >
            {itemCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <>
          <Overlay onClick={closeCart} />
          <div className="absolute right-0 mt-2 w-96 bg-gray-900 border border-gray-800 rounded-lg shadow-xl z-50 max-h-[500px] overflow-hidden flex flex-col">
            {/* Header del carrito */}
            <div className="p-4 border-b border-gray-800">
              <h3 className="text-white font-bold text-lg">Mi Carrito</h3>
              <p className="text-gray-400 text-sm">{itemCount} artículo(s)</p>
            </div>

            {/* Contenido del carrito */}
            {items.length === 0 ? (
              <EmptyCartMessage />
            ) : (
              <>
                <CartItems items={items} onRemoveItem={removeItem} />
                <CartFooter subtotal={subtotal} onClose={closeCart} />
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}

/** Mensaje cuando el carrito está vacío */
function EmptyCartMessage() {
  return (
    <div className="p-8 text-center">
      <ShoppingCart className="w-12 h-12 text-gray-600 mx-auto mb-3" />
      <p className="text-gray-400">Tu carrito está vacío</p>
    </div>
  );
}

/** Lista de items en el carrito */
function CartItems({ 
  items, 
  onRemoveItem 
}: { 
  items: CheckoutItem[]; 
  onRemoveItem: (id: string) => void;
}) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-3">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex gap-3 p-3 bg-black/50 rounded-lg border border-gray-800"
        >
          <img
            src={item.event.imageUrl}
            alt={item.event.title}
            className="w-16 h-16 object-cover rounded"
          />
          <div className="flex-1 min-w-0">
            <h4 className="text-white font-semibold text-sm truncate">
              {item.event.title}
            </h4>
            <p className="text-gray-400 text-xs">
              {ticketTypeLabels[item.ticketType]} × {item.quantity}
            </p>
            <p className="text-red-500 font-bold text-sm">
              {(item.pricePerTicket * item.quantity).toFixed(2)}€
            </p>
          </div>
          <button
            type="button"
            onClick={() => onRemoveItem(item.id)}
            className="text-gray-400 hover:text-red-500 transition-colors"
            aria-label={`Eliminar ${item.event.title}`}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}

/** Footer con total y botón de checkout */
function CartFooter({ 
  subtotal, 
  onClose 
}: { 
  subtotal: number; 
  onClose: () => void;
}) {
  return (
    <div className="p-4 border-t border-gray-800 bg-gray-900/50">
      <div className="flex justify-between mb-4">
        <span className="text-gray-400">Subtotal</span>
        <span className="text-white font-bold text-lg">
          {subtotal.toFixed(2)}€
        </span>
      </div>
      <Link
        to="/checkout"
        onClick={onClose}
        className="block w-full bg-red-600 hover:bg-red-700 text-white text-center py-3 rounded-lg transition-colors font-semibold"
      >
        Ir al Checkout
      </Link>
    </div>
  );
}

