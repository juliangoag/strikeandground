import { Link } from 'react-router-dom';
import { Flame } from 'lucide-react';
import { useAuth } from '../auth/context/AuthContext';
import { AuthModal } from '../auth/components/AuthModal';
import { NavLinks } from './header/NavLinks';
import { CartDropdown } from './header/CartDropdown';
import { UserMenu } from './header/UserMenu';
import { AuthButtons } from './header/AuthButtons';

/**
 * Componente Header principal de la aplicación
 * Maneja la navegación, autenticación y carrito de compras
 */
export function Header() {
  const { 
    isAuthenticated, 
    authModalOpen, 
    authModalMode, 
    setAuthModalOpen, 
    setAuthModalMode 
  } = useAuth();

  const handleAuthClick = (tab: 'login' | 'register') => {
    setAuthModalMode(tab);
    setAuthModalOpen(true);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <Flame className="w-8 h-8 text-red-500" />
              <span className="text-white text-xl font-bold tracking-tight">
                STRIKE & GROUND
              </span>
            </Link>

            {/* Navegación */}
            <NavLinks />

            {/* Acciones de usuario */}
            <div className="flex items-center gap-3">
              <CartDropdown />
              
              {isAuthenticated ? (
                <UserMenu />
              ) : (
                <AuthButtons onAuthClick={handleAuthClick} />
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Modal de Autenticación */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        defaultTab={authModalMode}
      />
    </>
  );
}
