import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  ShoppingBag, 
  DollarSign, 
  Users, 
  Ticket, 
  CheckCircle,
  Clock,
  Plus,
  QrCode
} from 'lucide-react';
import { AdminLayout } from '../../../components/admin/AdminLayout';
import { StatCard } from '../../../components/admin/StatCard';
import { mockAdminService } from '../../../lib/admin/services/mockAdminService';
import { AdminStatistics } from '../../../lib/admin/types';
import { Order } from '../../../lib/checkout/types';

export const AdminDashboard = () => {
  const [stats, setStats] = useState<AdminStatistics | null>(null);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [statistics, orders] = await Promise.all([
          mockAdminService.getStatistics(),
          mockAdminService.getRecentOrders(5),
        ]);
        setStats(statistics);
        setRecentOrders(orders);
      } catch (error) {
        console.error('Error loading admin dashboard:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  if (isLoading) {
    return (
      <AdminLayout title="Dashboard" description="Resumen general del sistema">
        <div className="text-white">Cargando...</div>
      </AdminLayout>
    );
  }

  if (!stats) {
    return (
      <AdminLayout title="Dashboard" description="Resumen general del sistema">
        <div className="text-red-500">Error al cargar estadísticas</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Dashboard" description="Resumen general del sistema">
      {/* Estadísticas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={Calendar}
          label="Total Eventos"
          value={stats.totalEvents}
          color="red"
        />
        <StatCard
          icon={ShoppingBag}
          label="Órdenes Completadas"
          value={stats.completedOrders}
          subtitle={`${stats.pendingOrders} pendientes`}
          color="green"
        />
        <StatCard
          icon={DollarSign}
          label="Ingresos Totales"
          value={`${stats.totalRevenue.toFixed(2)}€`}
          color="yellow"
        />
        <StatCard
          icon={Users}
          label="Usuarios Registrados"
          value={stats.totalUsers}
          color="blue"
        />
      </div>

      {/* Estadísticas secundarias */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <StatCard
          icon={Ticket}
          label="Tickets Generados"
          value={stats.totalTickets}
          color="purple"
        />
        <StatCard
          icon={CheckCircle}
          label="Tickets Validados"
          value={stats.validatedTickets}
          subtitle={`${stats.totalTickets - stats.validatedTickets} pendientes`}
          color="green"
        />
      </div>

      {/* Accesos rápidos */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">Accesos Rápidos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <QuickAccessCard
            to="/admin/events"
            icon={Plus}
            title="Gestionar Eventos"
            description="Ver y editar eventos"
            color="red"
          />
          <QuickAccessCard
            to="/admin/users"
            icon={Users}
            title="Gestionar Usuarios"
            description="Ver usuarios y cambiar roles"
            color="blue"
          />
          <QuickAccessCard
            to="/admin/scan"
            icon={QrCode}
            title="Validar Tickets"
            description="Escanear códigos QR"
            color="green"
          />
        </div>
      </div>

      {/* Órdenes recientes */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white">Órdenes Recientes</h2>
          <Link 
            to="/profile/orders" 
            className="text-red-500 hover:text-red-400 text-sm font-medium"
          >
            Ver todas
          </Link>
        </div>
        
        {recentOrders.length === 0 ? (
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 text-center">
            <Clock className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400">No hay órdenes recientes</p>
          </div>
        ) : (
          <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-950 border-b border-gray-800">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase">ID</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase">Usuario</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase">Total</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase">Estado</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase">Fecha</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-800 transition-colors">
                    <td className="px-6 py-4 text-sm text-white font-mono">{order.id.slice(0, 8)}...</td>
                    <td className="px-6 py-4 text-sm text-gray-300">{order.customerName}</td>
                    <td className="px-6 py-4 text-sm text-white font-semibold">{order.total.toFixed(2)}€</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        order.status === 'completed' 
                          ? 'bg-green-500/20 text-green-400' 
                          : order.status === 'pending'
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}>
                        {order.status === 'completed' ? 'Completada' : order.status === 'pending' ? 'Pendiente' : 'Fallida'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-400">
                      {new Date(order.createdAt).toLocaleDateString('es-ES')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

interface QuickAccessCardProps {
  to: string;
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
}

const QuickAccessCard = ({ to, icon: Icon, title, description, color }: QuickAccessCardProps) => {
  const colorClasses = {
    red: 'group-hover:border-red-500 text-red-500',
    green: 'group-hover:border-green-500 text-green-500',
    blue: 'group-hover:border-blue-500 text-blue-500',
    yellow: 'group-hover:border-yellow-500 text-yellow-500',
  };

  const borderColor = colorClasses[color as keyof typeof colorClasses] || colorClasses.red;

  return (
    <Link
      to={to}
      className={`group p-6 bg-gray-900 border border-gray-800 rounded-lg hover:border-opacity-100 transition-all ${borderColor}`}
    >
      <Icon className={`w-10 h-10 mb-3 ${borderColor.split(' ')[1]}`} />
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </Link>
  );
};
