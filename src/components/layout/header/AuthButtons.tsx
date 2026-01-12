interface AuthButtonsProps {
  onAuthClick: (tab: 'login' | 'register') => void;
}

/**
 * Botones de login y registro para usuarios no autenticados
 */
export function AuthButtons({ onAuthClick }: AuthButtonsProps) {
  return (
    <>
      <button
        type="button"
        onClick={() => onAuthClick('login')}
        className="hidden sm:block text-gray-300 hover:text-white px-4 py-2 rounded-lg transition-colors font-medium text-sm"
      >
        Iniciar Sesión
      </button>
      <button
        type="button"
        onClick={() => onAuthClick('register')}
        className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors font-semibold text-sm"
      >
        Registrarse
      </button>
    </>
  );
}

