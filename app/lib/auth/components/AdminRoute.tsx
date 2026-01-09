import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Lock } from 'lucide-react';
import { useAuth } from '../../../providers/AuthProvider';

interface AdminRouteProps {
  children: ReactNode;
}

/**
 * Componente que protege rutas administrativas
 * Solo permite acceso a usuarios con rol 'admin'
 */
export const AdminRoute = ({ children }: AdminRouteProps) => {
  const { user, isLoading } = useAuth();

  // Mientras carga, mostrar spinner
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  // Si no está autenticado, mostrar página de login requerido
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-gray-900 border border-gray-800 rounded-xl p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500/20 rounded-full mb-6">
            <Lock className="w-8 h-8 text-red-500" />
          </div>

          <h2 className="text-2xl font-bold text-white mb-4">
            Autenticación Requerida
          </h2>

          <p className="text-gray-400 mb-6">
            Debes iniciar sesión para acceder al panel de administración.
          </p>

          <div className="flex flex-col gap-3">
            <Link
              to="/"
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
            >
              Iniciar Sesión
            </Link>
            <Link
              to="/"
              className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors"
            >
              Volver al Inicio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Si no es admin, mostrar página de acceso denegado
  if (user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-gray-900 border border-gray-800 rounded-xl p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-500/20 rounded-full mb-6">
            <Shield className="w-8 h-8 text-yellow-500" />
          </div>

          <h2 className="text-2xl font-bold text-white mb-4">
            Acceso Denegado
          </h2>

          <p className="text-gray-400 mb-2">
            No tienes permisos para acceder al panel de administración.
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Esta área está restringida solo para administradores.
          </p>

          <div className="flex flex-col gap-3">
            <Link
              to="/profile"
              className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors"
            >
              Ir a Mi Perfil
            </Link>
            <Link
              to="/"
              className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors"
            >
              Volver al Inicio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Usuario es admin, permitir acceso
  return <>{children}</>;
};
