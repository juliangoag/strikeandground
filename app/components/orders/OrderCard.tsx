import { Calendar, MapPin, Ticket } from 'lucide-react';
import type { Order } from '../../lib/checkout/types';
import { OrderStatusBadge } from './OrderStatusBadge';

interface OrderCardProps {
  order: Order;
  onViewDetails: () => void;
}

/**
 * Card que muestra información resumida de una orden
 * Click en "Ver Detalles" abre el modal completo
 */
export const OrderCard = ({ order, onViewDetails }: OrderCardProps) => {
  // Calcular cantidad total de entradas
  const totalTickets = order.items.reduce((sum, item) => sum + item.quantity, 0);

  // Formatear fecha
  const orderDate = new Date(order.createdAt).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 hover:border-red-500 transition-colors">
      {/* Header con número y estado */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm text-gray-400">Orden #{order.id.slice(-8).toUpperCase()}</p>
          <p className="text-white font-semibold mt-1">{orderDate}</p>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      {/* Eventos comprados */}
      <div className="space-y-3 mb-4">
        {order.items.map((item, index) => (
          <div key={index} className="flex items-start gap-3">
            <img
              src={item.event.imageUrl}
              alt={item.event.title}
              className="w-16 h-16 object-cover rounded"
            />
            <div className="flex-1 min-w-0">
              <h4 className="text-white font-medium truncate">{item.event.title}</h4>
              <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>{new Date(item.event.date).toLocaleDateString('es-ES')}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <MapPin className="w-3.5 h-3.5" />
                <span className="truncate">{item.event.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer con total y acciones */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-800">
        <div>
          <p className="text-sm text-gray-400">Total Pagado</p>
          <p className="text-2xl font-bold text-white">{order.total.toFixed(2)}€</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-1.5 text-sm text-gray-400">
            <Ticket className="w-4 h-4" />
            <span>{totalTickets} {totalTickets === 1 ? 'entrada' : 'entradas'}</span>
          </div>
          <button
            type="button"
            onClick={onViewDetails}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors"
            aria-label={`Ver detalles de la orden ${order.id}`}
          >
            Ver Detalles
          </button>
        </div>
      </div>
    </div>
  );
};

