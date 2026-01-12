// Modal de Autenticación - Muestra Login o Register
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import { ForgotPasswordForm } from './ForgotPasswordForm';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'login' | 'register';
}

export function AuthModal({ isOpen, onClose, defaultTab = 'login' }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<'login' | 'register' | 'forgot'>(defaultTab);

  // Sincronizar activeTab con defaultTab cuando cambie o cuando se abra el modal
  useEffect(() => {
    if (isOpen) {
      setActiveTab(defaultTab);
    }
  }, [isOpen, defaultTab]);

  if (!isOpen) return null;

  const handleSuccess = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-2xl w-full max-w-md shadow-2xl">
        {/* Header */}
        <div className="relative p-6 border-b border-gray-800">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <h2 className="text-2xl font-bold text-white text-center mb-4">
            {activeTab === 'forgot' ? 'Recuperar Contraseña' : 'Strike & Ground'}
          </h2>

          {activeTab !== 'forgot' && (
            <div className="flex gap-2 bg-black/50 p-1 rounded-lg">
              <button
                onClick={() => setActiveTab('login')}
                className={`flex-1 py-2 rounded-md font-medium transition-all ${
                  activeTab === 'login'
                    ? 'bg-red-600 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Iniciar Sesión
              </button>
              <button
                onClick={() => setActiveTab('register')}
                className={`flex-1 py-2 rounded-md font-medium transition-all ${
                  activeTab === 'register'
                    ? 'bg-red-600 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Registrarse
              </button>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'login' && (
            <LoginForm 
              onSuccess={handleSuccess}
              onForgotPassword={() => setActiveTab('forgot')}
            />
          )}
          {activeTab === 'register' && (
            <RegisterForm onSuccess={handleSuccess} />
          )}
          {activeTab === 'forgot' && (
            <ForgotPasswordForm 
              onSuccess={() => setActiveTab('login')}
              onBack={() => setActiveTab('login')}
            />
          )}
        </div>

        {/* Footer */}
        <div className="p-6 pt-0 text-center">
          <p className="text-xs text-gray-500">
            Al continuar, aceptas nuestros{' '}
            <a href="#" className="text-red-400 hover:text-red-300">
              Términos de Servicio
            </a>{' '}
            y{' '}
            <a href="#" className="text-red-400 hover:text-red-300">
              Política de Privacidad
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

