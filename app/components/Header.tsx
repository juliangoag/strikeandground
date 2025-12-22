import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Flame, User, LogOut, Settings, ChevronDown, ShoppingCart, Trash2 } from 'lucide-react';
import { useAuth } from '../auth/context/AuthContext';
import { useCart } from '../context/CartContext';
import { AuthModal } from '../auth/components/AuthModal';
import { ticketTypeLabels } from '../data/checkout-mocks';

export function Header() {
  const { user, isAuthenticated, signOut, authModalOpen, authModalMode, setAuthModalOpen, setAuthModalMode } = useAuth();
  const { items, itemCount, subtotal, removeItem } = useCart();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const navigate = useNavigate();

  const handleAuthClick = (tab: 'login' | 'register') => {
    setAuthModalMode(tab);
    setAuthModalOpen(true);
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
              <Link to="/eventos" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
                Eventos
              </Link>
              <a href="/#beneficios" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
                Por qué nosotros
              </a>
              <a href="/#seguridad" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
                Seguridad
              </a>
            </nav>

            <div className="flex items-center gap-3">
              {/* Icono de carrito */}
              <div className="relative">
                <button
                  onClick={() => setShowCart(!showCart)}
                  className="relative p-2 text-gray-300 hover:text-white transition-colors"
                >
                  <ShoppingCart className="w-6 h-6" />
                  {itemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                      {itemCount}
                    </span>
                  )}
                </button>

                {/* Dropdown del carrito */}
                {showCart && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setShowCart(false)}
                    ></div>
                    <div className="absolute right-0 mt-2 w-96 bg-gray-900 border border-gray-800 rounded-lg shadow-xl z-50 max-h-[500px] overflow-hidden flex flex-col">
                      <div className="p-4 border-b border-gray-800">
                        <h3 className="text-white font-bold text-lg">Mi Carrito</h3>
                        <p className="text-gray-400 text-sm">{itemCount} artículo(s)</p>
                      </div>

                      {items.length === 0 ? (
                        <div className="p-8 text-center">
                          <ShoppingCart className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                          <p className="text-gray-400">Tu carrito está vacío</p>
                        </div>
                      ) : (
                        <>
                          <div className="flex-1 overflow-y-auto p-4 space-y-3">
                            {items.map((item) => (
                              <div
                                key={item.id}
                                className="flex gap-3 p-3 bg-black/50 rounded-lg border border-gray-800"
                              >
                                <img
                                  src={item.event.imageUrl}
                                  alt={item.event.title}
                                  className="w-16 h-16 object-cover rounded"
                                />
                                <div className="flex-1 min-w-0">
                                  <h4 className="text-white font-semibold text-sm truncate">
                                    {item.event.title}
                                  </h4>
                                  <p className="text-gray-400 text-xs">
                                    {ticketTypeLabels[item.ticketType]} × {item.quantity}
                                  </p>
                                  <p className="text-red-500 font-bold text-sm">
                                    {(item.pricePerTicket * item.quantity).toFixed(2)}€
                                  </p>
                                </div>
                                <button
                                  onClick={() => removeItem(item.id)}
                                  className="text-gray-400 hover:text-red-500 transition-colors"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                          </div>

                          <div className="p-4 border-t border-gray-800 bg-gray-900/50">
                            <div className="flex justify-between mb-4">
                              <span className="text-gray-400">Subtotal</span>
                              <span className="text-white font-bold text-lg">
                                {subtotal.toFixed(2)}€
                              </span>
                            </div>
                            <Link
                              to="/checkout"
                              onClick={() => setShowCart(false)}
                              className="block w-full bg-red-600 hover:bg-red-700 text-white text-center py-3 rounded-lg transition-colors font-semibold"
                            >
                              Ir al Checkout
                            </Link>
                          </div>
                        </>
                      )}
                    </div>
                  </>
                )}
              </div>

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
                              navigate('/profile/settings');
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
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        defaultTab={authModalMode}
      />
    </>
  );
}
