import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, LogOut, Settings, ShoppingBag, ChevronDown } from 'lucide-react';
import { useAuth } from '../../../providers/AuthProvider';
import { Overlay } from '../../ui/Overlay';

const MENU_ITEMS = [
  { icon: User, label: 'Mi Perfil', path: '/profile' },
  { icon: ShoppingBag, label: 'Mis Órdenes', path: '/profile/orders' },
  { icon: Settings, label: 'Configuración', path: '/profile/settings' },
] as const;

/**
 * Menú desplegable del usuario autenticado
 * Muestra perfil, configuración y opción de cerrar sesión
 */
export function UserMenu() {
  const { user, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  if (!user) return null;

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const handleNavigation = (path: string) => {
    closeMenu();
    navigate(path);
  };

  const handleLogout = async () => {
    await signOut();
    closeMenu();
    navigate('/');
  };

  // Obtener primer nombre del usuario
  const firstName = user.name.split(' ')[0];
  const avatarUrl = user.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`;

  return (
    <div className="relative">
      {/* Botón de usuario */}
      <button
        type="button"
        onClick={toggleMenu}
        className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 border border-gray-800 rounded-lg px-3 py-2 transition-colors"
        aria-label="Menú de usuario"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <img
          src={avatarUrl}
          alt={user.name}
          className="w-8 h-8 rounded-full"
        />
        <span className="text-white text-sm font-medium hidden sm:block">
          {firstName}
        </span>
        <ChevronDown className="w-4 h-4 text-gray-400" />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <>
          <Overlay onClick={closeMenu} />
          <div className="absolute right-0 mt-2 w-56 bg-gray-900 border border-gray-800 rounded-lg shadow-xl z-50 overflow-hidden">
            {/* Info del usuario */}
            <div className="p-3 border-b border-gray-800">
              <p className="text-white font-medium text-sm">{user.name}</p>
              <p className="text-gray-400 text-xs truncate">{user.email}</p>
            </div>

            {/* Opciones de menú */}
            <div className="py-2">
              {MENU_ITEMS.map((item) => (
                <button
                  key={item.path}
                  type="button"
                  onClick={() => handleNavigation(item.path)}
                  className="w-full flex items-center gap-3 px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors text-sm"
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </button>
              ))}
            </div>

            {/* Cerrar sesión */}
            <div className="border-t border-gray-800 py-2">
              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2 text-red-400 hover:bg-gray-800 hover:text-red-300 transition-colors text-sm"
              >
                <LogOut className="w-4 h-4" />
                Cerrar Sesión
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

