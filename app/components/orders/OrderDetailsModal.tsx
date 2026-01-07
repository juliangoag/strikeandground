import { X, User, Mail, Phone, CreditCard, Tag, Ticket } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Order } from '../../lib/checkout/types';
import { OrderStatusBadge } from './OrderStatusBadge';

interface OrderDetailsModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Modal que muestra todos los detalles completos de una orden
 */
export const OrderDetailsModal = ({ order, isOpen, onClose }: OrderDetailsModalProps) => {
  if (!isOpen || !order) return null;

  const totalTickets = order.items.reduce((sum, item) => sum + item.quantity, 0);

  // Etiquetas de tipos de entrada
  const ticketTypeLabels: Record<string, string> = {
    general: 'General',
    vip: 'VIP',
    ringside: 'Ringside',
  };

  // Etiquetas de métodos de pago
  const paymentMethodLabels: Record<string, string> = {
    card: 'Tarjeta de Crédito/Débito',
    paypal: 'PayPal',
    bizum: 'Bizum',
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-gray-900 border border-gray-800 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">Detalles de la Orden</h2>
              <p className="text-sm text-gray-400 mt-1">
                #{order.id.slice(-12).toUpperCase()}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              aria-label="Cerrar modal"
            >
              <X className="w-6 h-6 text-gray-400" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Estado */}
            <div>
              <h3 className="text-sm font-semibold text-gray-400 mb-2">Estado</h3>
              <OrderStatusBadge status={order.status} />
            </div>

            {/* Items de la orden */}
            <div>
              <h3 className="text-sm font-semibold text-gray-400 mb-3">Entradas Compradas</h3>
              <div className="space-y-3">
                {order.items.map((item, index) => (
                  <div 
                    key={index}
                    className="bg-gray-800/50 border border-gray-700 rounded-lg p-4"
                  >
                    <div className="flex gap-4">
                      <img
                        src={item.event.imageUrl}
                        alt={item.event.title}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="text-white font-semibold">{item.event.title}</h4>
                        <p className="text-sm text-gray-400 mt-1">
                          {new Date(item.event.date).toLocaleDateString('es-ES', {
                            weekday: 'long',
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })}
                        </p>
                        <p className="text-sm text-gray-400">{item.event.location}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-sm text-white">
                            <span className="text-gray-400">Tipo:</span> {ticketTypeLabels[item.ticketType]}
                          </span>
                          <span className="text-sm text-white">
                            <span className="text-gray-400">Cantidad:</span> {item.quantity}
                          </span>
                          <span className="text-sm text-white">
                            <span className="text-gray-400">Precio:</span> {(item.pricePerTicket * item.quantity).toFixed(2)}€
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Información de contacto */}
            <div>
              <h3 className="text-sm font-semibold text-gray-400 mb-3">Información de Contacto</h3>
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 space-y-2">
                <div className="flex items-center gap-2 text-white">
                  <User className="w-4 h-4 text-gray-400" />
                  <span>{order.shippingInfo.fullName}</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span>{order.shippingInfo.email}</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span>{order.shippingInfo.phone}</span>
                </div>
                {order.shippingInfo.address && (
                  <div className="flex items-center gap-2 text-white">
                    <span className="text-gray-400">Dirección:</span>
                    <span>{order.shippingInfo.address}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Método de pago */}
            <div>
              <h3 className="text-sm font-semibold text-gray-400 mb-3">Método de Pago</h3>
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                <div className="flex items-center gap-2 text-white">
                  <CreditCard className="w-4 h-4 text-gray-400" />
                  <span>{paymentMethodLabels[order.paymentMethod.type]}</span>
                  {order.paymentMethod.lastFourDigits && (
                    <span className="text-gray-400">
                      •••• {order.paymentMethod.lastFourDigits}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Resumen de precios */}
            <div>
              <h3 className="text-sm font-semibold text-gray-400 mb-3">Resumen de Pago</h3>
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 space-y-2">
                <div className="flex justify-between text-white">
                  <span>Subtotal</span>
                  <span>{order.subtotal.toFixed(2)}€</span>
                </div>
                {order.discount > 0 && (
                  <>
                    <div className="flex justify-between text-green-500">
                      <span className="flex items-center gap-2">
                        <Tag className="w-4 h-4" />
                        Descuento {order.promoCode && `(${order.promoCode})`}
                      </span>
                      <span>-{order.discount.toFixed(2)}€</span>
                    </div>
                  </>
                )}
                <div className="border-t border-gray-700 pt-2 flex justify-between text-xl font-bold text-white">
                  <span>Total</span>
                  <span>{order.total.toFixed(2)}€</span>
                </div>
              </div>
            </div>

            {/* Botón ver entradas */}
            {order.status === 'completed' && (
              <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Ticket className="w-6 h-6 text-red-500" />
                    <div>
                      <h4 className="text-white font-semibold">Tus Entradas Están Listas</h4>
                      <p className="text-sm text-gray-400">
                        {totalTickets} {totalTickets === 1 ? 'entrada disponible' : 'entradas disponibles'}
                      </p>
                    </div>
                  </div>
                  <Link
                    to={`/tickets/${order.id}`}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
                  >
                    Ver Entradas
                  </Link>
                </div>
              </div>
            )}

            {/* Fecha de compra */}
            <div className="text-center text-sm text-gray-400 pt-4 border-t border-gray-800">
              Comprado el {new Date(order.createdAt).toLocaleDateString('es-ES', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

