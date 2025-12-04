import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Flame, User, LogOut, Settings, ChevronDown } from 'lucide-react';
import { useAuth } from '../auth/context/AuthContext';
import { AuthModal } from '../auth/components/AuthModal';

export function Header() {
  const { user, isAuthenticated, signOut } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'register'>('login');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();

  const handleAuthClick = (tab: 'login' | 'register') => {
    setAuthModalTab(tab);
    setShowAuthModal(true);
  };

  const handleLogout = async () => {
    await signOut();
    setShowUserMenu(false);
    navigate('/');
  };

  const handleProfileClick = () => {
    setShowUserMenu(false);
    navigate('/profile');
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <Flame className="w-8 h-8 text-red-500" />
              <span className="text-white text-xl font-bold tracking-tight">
                STRIKE & GROUND
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              <a href="/#eventos" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
                Eventos
              </a>
              <a href="/#beneficios" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
                Por qué nosotros
              </a>
              <a href="/#seguridad" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
                Seguridad
              </a>
            </nav>

            <div className="flex items-center gap-3">
              {isAuthenticated && user ? (
                // Usuario autenticado
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 border border-gray-800 rounded-lg px-3 py-2 transition-colors"
                  >
                    <img
                      src={user.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
                      alt={user.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="text-white text-sm font-medium hidden sm:block">
                      {user.name.split(' ')[0]}
                    </span>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </button>

                  {/* Dropdown Menu */}
                  {showUserMenu && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setShowUserMenu(false)}
                      ></div>
                      <div className="absolute right-0 mt-2 w-56 bg-gray-900 border border-gray-800 rounded-lg shadow-xl z-50 overflow-hidden">
                        <div className="p-3 border-b border-gray-800">
                          <p className="text-white font-medium text-sm">{user.name}</p>
                          <p className="text-gray-400 text-xs truncate">{user.email}</p>
                        </div>

                        <div className="py-2">
                          <button
                            onClick={handleProfileClick}
                            className="w-full flex items-center gap-3 px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors text-sm"
                          >
                            <User className="w-4 h-4" />
                            Mi Perfil
                          </button>
                          <button
                            onClick={() => {
                              setShowUserMenu(false);
                              navigate('/settings');
                            }}
                            className="w-full flex items-center gap-3 px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors text-sm"
                          >
                            <Settings className="w-4 h-4" />
                            Configuración
                          </button>
                        </div>

                        <div className="border-t border-gray-800 py-2">
                          <button
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
              ) : (
                // Usuario no autenticado
                <>
                  <button
                    onClick={() => handleAuthClick('login')}
                    className="hidden sm:block text-gray-300 hover:text-white px-4 py-2 rounded-lg transition-colors font-medium text-sm"
                  >
                    Iniciar Sesión
                  </button>
                  <button
                    onClick={() => handleAuthClick('register')}
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors font-semibold text-sm"
                  >
                    Registrarse
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        defaultTab={authModalTab}
      />
    </>
  );
}
