// Formulario de Recuperación de Contraseña
import { useState } from 'react';
import { useAuth } from '../../../providers/AuthProvider';
import { Mail, AlertCircle, CheckCircle, Loader, ArrowLeft } from 'lucide-react';

interface ForgotPasswordFormProps {
  onSuccess?: () => void;
  onBack?: () => void;
}

export function ForgotPasswordForm({ onSuccess, onBack }: ForgotPasswordFormProps) {
  const { forgotPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await forgotPassword(email);
      setSuccess(true);
      setTimeout(() => {
        onSuccess?.();
      }, 3000);
    } catch (err: any) {
      setError(err.message || 'Error al enviar email de recuperación');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/10 rounded-full mb-4">
          <CheckCircle className="w-8 h-8 text-green-500" />
        </div>

        <h3 className="text-xl font-bold text-white">
          ¡Email Enviado!
        </h3>

        <p className="text-gray-400 text-sm">
          Hemos enviado un enlace de recuperación a <strong className="text-white">{email}</strong>
        </p>

        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
          <p className="text-xs text-blue-400">
            🎭 <strong>Modo MOCK:</strong> En producción, recibirías un email real. 
            Por ahora, puedes volver a iniciar sesión.
          </p>
        </div>

        <button
          onClick={onSuccess}
          className="text-sm text-red-400 hover:text-red-300 transition-colors"
        >
          Volver al login
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="mb-4">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver
        </button>
      </div>

      <p className="text-gray-400 text-sm mb-4">
        Ingresa tu email y te enviaremos un enlace para recuperar tu contraseña.
      </p>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Email
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-gray-900 border border-gray-800 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors"
            placeholder="tu@email.com"
            required
            disabled={isLoading}
          />
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 flex items-start gap-2">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        {isLoading && <Loader className="w-5 h-5 animate-spin" />}
        {isLoading ? 'Enviando...' : 'Enviar Enlace'}
      </button>
    </form>
  );
}

