import { Trash2 } from 'lucide-react';
import { CheckoutItem } from '../types/checkout';
import { ticketTypeLabels } from '../data/checkout-mocks';

interface OrderSummaryProps {
  items: CheckoutItem[];
  subtotal: number;
  discount?: number;
  total: number;
  onRemoveItem?: (itemId: string) => void;
  promoCode?: string;
}

export function OrderSummary({
  items,
  subtotal,
  discount = 0,
  total,
  onRemoveItem,
  promoCode,
}: OrderSummaryProps) {
  const discountAmount = (subtotal * discount) / 100;

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black rounded-xl p-6 border border-gray-800">
      <h2 className="text-2xl font-bold text-white mb-6">Resumen del Pedido</h2>

      {/* Items */}
      <div className="space-y-4 mb-6">
        {items.length === 0 ? (
          <p className="text-gray-400 text-center py-8">Tu carrito está vacío</p>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 p-4 bg-black/50 rounded-lg border border-gray-800"
            >
              {/* Imagen */}
              <img
                src={item.eventImage}
                alt={item.eventTitle}
                className="w-20 h-20 object-cover rounded-lg"
              />

              {/* Info */}
              <div className="flex-1">
                <h3 className="text-white font-semibold text-sm mb-1">
                  {item.eventTitle}
                </h3>
                <p className="text-gray-400 text-xs mb-2">
                  {ticketTypeLabels[item.ticketType]} × {item.quantity}
                </p>
                <p className="text-red-500 font-bold text-sm">
                  {item.totalPrice}€
                </p>
              </div>

              {/* Botón eliminar */}
              {onRemoveItem && (
                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors p-2"
                  title="Eliminar"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
            </div>
          ))
        )}
      </div>

      {/* Totales */}
      {items.length > 0 && (
        <div className="space-y-3 border-t border-gray-800 pt-4">
          <div className="flex justify-between text-gray-300">
            <span>Subtotal</span>
            <span>{subtotal.toFixed(2)}€</span>
          </div>

          {discount > 0 && (
            <div className="flex justify-between text-green-500">
              <span>
                Descuento {promoCode && `(${promoCode})`} - {discount}%
              </span>
              <span>-{discountAmount.toFixed(2)}€</span>
            </div>
          )}

          <div className="flex justify-between text-xl font-bold text-white pt-3 border-t border-gray-700">
            <span>Total</span>
            <span className="text-red-500">{total.toFixed(2)}€</span>
          </div>
        </div>
      )}

      {/* Info adicional */}
      <div className="mt-6 pt-6 border-t border-gray-800">
        <p className="text-gray-400 text-xs text-center">
          Las entradas serán enviadas a tu email después de completar la compra
        </p>
      </div>
    </div>
  );
}

