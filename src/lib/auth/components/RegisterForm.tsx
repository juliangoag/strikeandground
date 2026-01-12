// Formulario de Registro
import { useState } from 'react';
import { useAuth } from '../../../providers/AuthProvider';
import { Mail, Lock, User, AlertCircle, CheckCircle, Loader } from 'lucide-react';

interface RegisterFormProps {
  onSuccess?: () => void;
}

export function RegisterForm({ onSuccess }: RegisterFormProps) {
  const { signUp } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const validatePassword = (password: string) => {
    const hasMinLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[@$!%*?&]/.test(password);

    return {
      hasMinLength,
      hasUpperCase,
      hasNumber,
      hasSpecialChar,
      isValid: hasMinLength && hasUpperCase && hasNumber && hasSpecialChar,
    };
  };

  const passwordValidation = validatePassword(formData.password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await signUp(formData);
      onSuccess?.();
    } catch (err: any) {
      setError(err.message || 'Error al registrarse');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Nombre completo
        </label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-gray-900 border border-gray-800 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors"
            placeholder="Juan Pérez"
            required
            disabled={isLoading}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Email
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-gray-900 border border-gray-800 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors"
            placeholder="tu@email.com"
            required
            disabled={isLoading}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Contraseña
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full bg-gray-900 border border-gray-800 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors"
            placeholder="••••••••"
            required
            disabled={isLoading}
          />
        </div>

        {/* Password requirements */}
        {formData.password && (
          <div className="mt-2 space-y-1">
            <PasswordRequirement 
              met={passwordValidation.hasMinLength}
              text="Mínimo 8 caracteres"
            />
            <PasswordRequirement 
              met={passwordValidation.hasUpperCase}
              text="Una letra mayúscula"
            />
            <PasswordRequirement 
              met={passwordValidation.hasNumber}
              text="Un número"
            />
            <PasswordRequirement 
              met={passwordValidation.hasSpecialChar}
              text="Un símbolo (@$!%*?&)"
            />
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Confirmar contraseña
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full bg-gray-900 border border-gray-800 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors"
            placeholder="••••••••"
            required
            disabled={isLoading}
          />
        </div>
        {formData.confirmPassword && formData.password !== formData.confirmPassword && (
          <p className="mt-1 text-xs text-red-400">Las contraseñas no coinciden</p>
        )}
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 flex items-start gap-2">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading || !passwordValidation.isValid || formData.password !== formData.confirmPassword}
        className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        {isLoading && <Loader className="w-5 h-5 animate-spin" />}
        {isLoading ? 'Creando cuenta...' : 'Crear Cuenta'}
      </button>
    </form>
  );
}

function PasswordRequirement({ met, text }: { met: boolean; text: string }) {
  return (
    <div className="flex items-center gap-2 text-xs">
      {met ? (
        <CheckCircle className="w-4 h-4 text-green-500" />
      ) : (
        <div className="w-4 h-4 rounded-full border border-gray-600" />
      )}
      <span className={met ? 'text-green-400' : 'text-gray-500'}>{text}</span>
    </div>
  );
}

