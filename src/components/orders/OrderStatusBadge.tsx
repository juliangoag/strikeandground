import { CheckCircle, Clock, XCircle } from 'lucide-react';
import type { OrderStatus } from '../../lib/checkout/types';

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

const statusConfig: Record<OrderStatus, { label: string; color: string; icon: typeof CheckCircle }> = {
  completed: {
    label: 'Completada',
    color: 'bg-green-500',
    icon: CheckCircle,
  },
  pending: {
    label: 'Pendiente',
    color: 'bg-yellow-500',
    icon: Clock,
  },
  failed: {
    label: 'Fallida',
    color: 'bg-red-600',
    icon: XCircle,
  },
  cancelled: {
    label: 'Cancelada',
    color: 'bg-red-500',
    icon: XCircle,
  },
};

/**
 * Badge que muestra el estado de una orden con color e icono
 */
export const OrderStatusBadge = ({ status }: OrderStatusBadgeProps) => {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium text-white ${config.color}`}
    >
      <Icon className="w-4 h-4" />
      {config.label}
    </span>
  );
};

