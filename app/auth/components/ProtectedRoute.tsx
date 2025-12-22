// Componente para proteger rutas que requieren autenticación
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader, Lock, LogIn, UserPlus } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, setAuthModalOpen, setAuthModalMode } = useAuth();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-red-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          {/* Icono de bloqueo */}
          <div className="mb-6 flex justify-center">
            <div className="bg-red-500/10 p-6 rounded-full border border-red-500/30">
              <Lock className="w-16 h-16 text-red-500" />
            </div>
          </div>

          {/* Mensaje principal */}
          <h1 className="text-3xl font-bold text-white mb-4">
            Autenticación Requerida
          </h1>
          <p className="text-gray-400 mb-8">
            Necesitas iniciar sesión para acceder a esta página. 
            Por favor, inicia sesión o crea una cuenta para continuar.
          </p>

          {/* Botones de acción */}
          <div className="space-y-3">
            <button
              onClick={() => {
                setAuthModalMode('login');
                setAuthModalOpen(true);
              }}
              className="w-full bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors font-semibold flex items-center justify-center gap-2"
            >
              <LogIn className="w-5 h-5" />
              Iniciar Sesión
            </button>

            <button
              onClick={() => {
                setAuthModalMode('register');
                setAuthModalOpen(true);
              }}
              className="w-full bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors font-semibold flex items-center justify-center gap-2"
            >
              <UserPlus className="w-5 h-5" />
              Crear Cuenta
            </button>

            <button
              onClick={() => navigate('/')}
              className="w-full text-gray-400 hover:text-white px-6 py-3 transition-colors"
            >
              Volver al Inicio
            </button>
          </div>

          {/* Información adicional */}
          <div className="mt-8 p-4 bg-gray-900 border border-gray-800 rounded-lg">
            <p className="text-sm text-gray-400">
              ¿No tienes cuenta? Regístrate gratis y accede a todas las funcionalidades 
              de Strike & Ground.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

