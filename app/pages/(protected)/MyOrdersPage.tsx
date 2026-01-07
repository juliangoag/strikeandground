import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ChevronRight, Loader2 } from 'lucide-react';
import { useAuth } from '../../providers/AuthProvider';
import { mockCheckoutService } from '../../lib/checkout/services/mockCheckoutService';
import type { Order } from '../../lib/checkout/types';
import { OrderCard } from '../../components/orders/OrderCard';
import { OrderDetailsModal } from '../../components/orders/OrderDetailsModal';
import { EmptyOrdersState } from '../../components/orders/EmptyOrdersState';

/**
 * Página de Mis Órdenes
 * Muestra todas las órdenes de compra del usuario con filtros y detalles
 */
export const MyOrdersPage = () => {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Cargar órdenes al montar el componente
  useEffect(() => {
    const loadOrders = async () => {
      if (!user) return;

      setIsLoading(true);
      try {
        const userOrders = await mockCheckoutService.getOrders(user.id);
        // Ordenar por fecha más reciente primero
        const sortedOrders = userOrders.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setOrders(sortedOrders);
      } catch (error) {
        console.error('Error al cargar órdenes:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadOrders();
  }, [user]);

  // Detectar query param "order" y abrir modal automáticamente
  useEffect(() => {
    const orderIdParam = searchParams.get('order');
    if (orderIdParam && orders.length > 0 && !isLoading) {
      const order = orders.find(o => o.id === orderIdParam);
      if (order) {
        setSelectedOrder(order);
        setIsModalOpen(true);
        // Limpiar query param de la URL
        setSearchParams({});
      }
    }
  }, [orders, searchParams, setSearchParams, isLoading]);

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedOrder(null), 300); // Delay para animación
  };

  // Calcular estadísticas
  const completedOrders = orders.filter(o => o.status === 'completed');
  const totalSpent = completedOrders.reduce((sum, o) => sum + o.total, 0);
  const totalTickets = completedOrders.reduce(
    (sum, o) => sum + o.items.reduce((s, item) => s + item.quantity, 0),
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
          <Link to="/" className="hover:text-white transition-colors">
            Inicio
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/profile" className="hover:text-white transition-colors">
            Perfil
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-white">Mis Órdenes</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Mis Órdenes</h1>
          <p className="text-gray-400">
            Gestiona y revisa todas tus compras de entradas
          </p>
        </div>

        {isLoading ? (
          // Loading state
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-red-500 animate-spin" />
          </div>
        ) : orders.length === 0 ? (
          // Estado vacío
          <EmptyOrdersState />
        ) : (
          <>
            {/* Estadísticas */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
                <p className="text-sm text-gray-400 mb-1">Total de Órdenes</p>
                <p className="text-3xl font-bold text-white">{orders.length}</p>
              </div>
              <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
                <p className="text-sm text-gray-400 mb-1">Total Gastado</p>
                <p className="text-3xl font-bold text-white">{totalSpent.toFixed(2)}€</p>
              </div>
              <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
                <p className="text-sm text-gray-400 mb-1">Entradas Compradas</p>
                <p className="text-3xl font-bold text-white">{totalTickets}</p>
              </div>
            </div>

            {/* Lista de órdenes */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {orders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  onViewDetails={() => handleViewDetails(order)}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Modal de detalles */}
      <OrderDetailsModal
        order={selectedOrder}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

