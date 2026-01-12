import { useEffect, useState } from 'react';
import { Search, Shield, User as UserIcon, Package, DollarSign, Calendar } from 'lucide-react';
import { AdminLayout } from '../../../components/admin/AdminLayout';
import { mockAdminService } from '../../../lib/admin/services/mockAdminService';
import { UserWithStats } from '../../../lib/admin/types';

export const AdminUsersPage = () => {
  const [users, setUsers] = useState<UserWithStats[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserWithStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'admin' | 'user'>('all');
  const [isChangingRole, setIsChangingRole] = useState<string | null>(null);

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [users, searchTerm, roleFilter]);

  const loadUsers = async () => {
    try {
      const usersData = await mockAdminService.getAllUsersWithStats();
      setUsers(usersData);
      setFilteredUsers(usersData);
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterUsers = () => {
    let filtered = [...users];

    // Filtro por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtro por rol
    if (roleFilter !== 'all') {
      filtered = filtered.filter((user) => user.role === roleFilter);
    }

    setFilteredUsers(filtered);
  };

  const handleChangeRole = async (userId: string, currentRole: 'user' | 'admin') => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    
    if (!window.confirm(`¿Cambiar rol de este usuario a ${newRole === 'admin' ? 'Administrador' : 'Usuario'}?`)) {
      return;
    }

    setIsChangingRole(userId);
    try {
      await mockAdminService.changeUserRole(userId, newRole);
      // Recargar usuarios
      await loadUsers();
    } catch (error) {
      console.error('Error changing user role:', error);
      alert('Error al cambiar el rol del usuario');
    } finally {
      setIsChangingRole(null);
    }
  };

  if (isLoading) {
    return (
      <AdminLayout title="Gestión de Usuarios" description="Administrar usuarios y roles">
        <div className="text-white">Cargando...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Gestión de Usuarios" description="Administrar usuarios y roles del sistema">
      {/* Filtros */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        {/* Búsqueda */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por nombre o email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500"
          />
        </div>

        {/* Filtro de rol */}
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value as 'all' | 'admin' | 'user')}
          className="px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white focus:outline-none focus:border-red-500"
        >
          <option value="all">Todos los roles</option>
          <option value="admin">Administradores</option>
          <option value="user">Usuarios</option>
        </select>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-white">{users.length}</p>
              <p className="text-sm text-gray-400">Total Usuarios</p>
            </div>
            <UserIcon className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-white">
                {users.filter((u) => u.role === 'admin').length}
              </p>
              <p className="text-sm text-gray-400">Administradores</p>
            </div>
            <Shield className="w-8 h-8 text-red-500" />
          </div>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-white">
                {users.filter((u) => u.role === 'user').length}
              </p>
              <p className="text-sm text-gray-400">Usuarios Normales</p>
            </div>
            <UserIcon className="w-8 h-8 text-green-500" />
          </div>
        </div>
      </div>

      {/* Tabla de usuarios */}
      {filteredUsers.length === 0 ? (
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 text-center">
          <UserIcon className="w-12 h-12 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-400">No se encontraron usuarios</p>
        </div>
      ) : (
        <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-950 border-b border-gray-800">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase">Usuario</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase">Email</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase">Rol</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase">Órdenes</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase">Total Gastado</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase">Registro</th>
                  <th className="text-center px-6 py-3 text-xs font-medium text-gray-400 uppercase">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-800 transition-colors">
                    {/* Usuario */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={user.avatar_url}
                          alt={user.name}
                          className="w-10 h-10 rounded-full bg-gray-800"
                        />
                        <div>
                          <p className="text-sm font-medium text-white">{user.name}</p>
                          <p className="text-xs text-gray-400">
                            {user.totalTickets} {user.totalTickets === 1 ? 'ticket' : 'tickets'}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="px-6 py-4 text-sm text-gray-300">{user.email}</td>

                    {/* Rol */}
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                          user.role === 'admin'
                            ? 'bg-red-500/20 text-red-400'
                            : 'bg-blue-500/20 text-blue-400'
                        }`}
                      >
                        {user.role === 'admin' ? (
                          <Shield className="w-3 h-3" />
                        ) : (
                          <UserIcon className="w-3 h-3" />
                        )}
                        {user.role === 'admin' ? 'Admin' : 'Usuario'}
                      </span>
                    </td>

                    {/* Órdenes */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <Package className="w-4 h-4 text-gray-400" />
                        {user.totalOrders}
                      </div>
                    </td>

                    {/* Total Gastado */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm font-semibold text-white">
                        <DollarSign className="w-4 h-4 text-green-400" />
                        {user.totalSpent.toFixed(2)}€
                      </div>
                    </td>

                    {/* Fecha Registro */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Calendar className="w-4 h-4" />
                        {new Date(user.created_at).toLocaleDateString('es-ES')}
                      </div>
                    </td>

                    {/* Acciones */}
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleChangeRole(user.id, user.role)}
                          disabled={isChangingRole === user.id}
                          className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                            user.role === 'admin'
                              ? 'bg-blue-600 hover:bg-blue-700 text-white'
                              : 'bg-red-600 hover:bg-red-700 text-white'
                          } disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                          {isChangingRole === user.id ? (
                            'Cambiando...'
                          ) : user.role === 'admin' ? (
                            'Hacer Usuario'
                          ) : (
                            'Hacer Admin'
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
