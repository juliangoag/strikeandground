// Página de Configuración de Usuario
import { useState } from 'react';
import { useAuth } from '../../auth/context/AuthContext';
import { 
  Lock, 
  Bell, 
  Shield, 
  Trash2, 
  Save, 
  CheckCircle,
  AlertCircle,
  Eye,
  EyeOff,
  Loader
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function SettingsPage() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  if (!user) return null;

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Configuración</h1>
            <p className="text-gray-400">Gestiona tu cuenta y preferencias</p>
          </div>

          {/* Global Message */}
          {message && (
            <div className={`mb-6 rounded-lg p-4 flex items-start gap-3 ${
              message.type === 'success' 
                ? 'bg-green-500/10 border border-green-500/30' 
                : 'bg-red-500/10 border border-red-500/30'
            }`}>
              {message.type === 'success' ? (
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              )}
              <p className={message.type === 'success' ? 'text-green-400' : 'text-red-400'}>
                {message.text}
              </p>
            </div>
          )}

          <div className="space-y-6">
            {/* Cambio de Contraseña */}
            <PasswordSection 
              onMessage={setMessage}
            />

            {/* Notificaciones */}
            <NotificationsSection 
              onMessage={setMessage}
            />

            {/* Privacidad y Seguridad */}
            <PrivacySection 
              onMessage={setMessage}
            />

            {/* Zona Peligrosa */}
            <DangerZoneSection 
              onMessage={setMessage}
              onDeleteAccount={async () => {
                await signOut();
                navigate('/');
              }}
            />
          </div>
        </div>
      </div>
  );
}

// ============================================
// SECCIÓN: CAMBIO DE CONTRASEÑA
// ============================================

function PasswordSection({ onMessage }: { onMessage: (msg: any) => void }) {
  const [isChanging, setIsChanging] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const validatePassword = (password: string) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return re.test(password);
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    onMessage(null);

    try {
      // Validaciones
      if (passwords.new !== passwords.confirm) {
        throw new Error('Las contraseñas nuevas no coinciden');
      }

      if (!validatePassword(passwords.new)) {
        throw new Error('La contraseña debe tener mínimo 8 caracteres, incluir mayúsculas, números y símbolos');
      }

      // Simular cambio de contraseña (MOCK)
      await new Promise(resolve => setTimeout(resolve, 1000));

      // En producción, aquí llamarías a un servicio real
      console.log('[MOCK] Contraseña actualizada');

      onMessage({ type: 'success', text: 'Contraseña actualizada correctamente' });
      setPasswords({ current: '', new: '', confirm: '' });
      setIsChanging(false);
      
      // Limpiar mensaje después de 3 segundos
      setTimeout(() => onMessage(null), 3000);
    } catch (error: any) {
      onMessage({ type: 'error', text: error.message || 'Error al cambiar contraseña' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-red-500/10 p-3 rounded-lg">
          <Lock className="w-6 h-6 text-red-500" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Contraseña</h2>
          <p className="text-sm text-gray-400">Cambia tu contraseña de acceso</p>
        </div>
      </div>

      {!isChanging ? (
        <button
          onClick={() => setIsChanging(true)}
          className="bg-gray-900 hover:bg-gray-800 border border-gray-800 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
        >
          Cambiar Contraseña
        </button>
      ) : (
        <form onSubmit={handleChangePassword} className="space-y-4">
          {/* Contraseña Actual */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Contraseña Actual
            </label>
            <div className="relative">
              <input
                type={showPasswords.current ? 'text' : 'password'}
                value={passwords.current}
                onChange={(e) => setPasswords(prev => ({ ...prev, current: e.target.value }))}
                className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 pr-12 text-white focus:outline-none focus:border-red-500"
                placeholder="••••••••"
                required
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
              >
                {showPasswords.current ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Nueva Contraseña */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Nueva Contraseña
            </label>
            <div className="relative">
              <input
                type={showPasswords.new ? 'text' : 'password'}
                value={passwords.new}
                onChange={(e) => setPasswords(prev => ({ ...prev, new: e.target.value }))}
                className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 pr-12 text-white focus:outline-none focus:border-red-500"
                placeholder="••••••••"
                required
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
              >
                {showPasswords.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Confirmar Contraseña */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Confirmar Nueva Contraseña
            </label>
            <div className="relative">
              <input
                type={showPasswords.confirm ? 'text' : 'password'}
                value={passwords.confirm}
                onChange={(e) => setPasswords(prev => ({ ...prev, confirm: e.target.value }))}
                className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 pr-12 text-white focus:outline-none focus:border-red-500"
                placeholder="••••••••"
                required
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
              >
                {showPasswords.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {passwords.confirm && passwords.new !== passwords.confirm && (
              <p className="mt-1 text-xs text-red-400">Las contraseñas no coinciden</p>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={isLoading || passwords.new !== passwords.confirm}
              className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white px-4 py-3 rounded-lg transition-colors font-semibold flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Cambiando...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Guardar Cambios
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => {
                setIsChanging(false);
                setPasswords({ current: '', new: '', confirm: '' });
              }}
              disabled={isLoading}
              className="px-6 py-3 text-gray-400 hover:text-white transition-colors"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

// ============================================
// SECCIÓN: NOTIFICACIONES
// ============================================

function NotificationsSection({ onMessage }: { onMessage: (msg: any) => void }) {
  const [notifications, setNotifications] = useState({
    email: true,
    events: true,
    offers: false,
    newsletter: true,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    onMessage(null);

    try {
      // Simular guardado (MOCK)
      await new Promise(resolve => setTimeout(resolve, 800));
      
      console.log('[MOCK] Preferencias de notificaciones guardadas:', notifications);
      
      onMessage({ type: 'success', text: 'Preferencias de notificaciones actualizadas' });
      setTimeout(() => onMessage(null), 3000);
    } catch (error: any) {
      onMessage({ type: 'error', text: 'Error al guardar preferencias' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-500/10 p-3 rounded-lg">
          <Bell className="w-6 h-6 text-blue-500" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Notificaciones</h2>
          <p className="text-sm text-gray-400">Configura cómo quieres recibir notificaciones</p>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <NotificationToggle
          label="Notificaciones por Email"
          description="Recibe actualizaciones importantes por correo"
          checked={notifications.email}
          onChange={(checked) => setNotifications(prev => ({ ...prev, email: checked }))}
        />
        <NotificationToggle
          label="Recordatorios de Eventos"
          description="Te avisamos antes de tus eventos"
          checked={notifications.events}
          onChange={(checked) => setNotifications(prev => ({ ...prev, events: checked }))}
        />
        <NotificationToggle
          label="Ofertas y Promociones"
          description="Recibe descuentos exclusivos"
          checked={notifications.offers}
          onChange={(checked) => setNotifications(prev => ({ ...prev, offers: checked }))}
        />
        <NotificationToggle
          label="Newsletter"
          description="Noticias y novedades de deportes de contacto"
          checked={notifications.newsletter}
          onChange={(checked) => setNotifications(prev => ({ ...prev, newsletter: checked }))}
        />
      </div>

      <button
        onClick={handleSave}
        disabled={isLoading}
        className="bg-gray-900 hover:bg-gray-800 disabled:bg-gray-700 border border-gray-800 text-white px-6 py-3 rounded-lg transition-colors font-semibold flex items-center gap-2"
      >
        {isLoading ? (
          <>
            <Loader className="w-5 h-5 animate-spin" />
            Guardando...
          </>
        ) : (
          <>
            <Save className="w-5 h-5" />
            Guardar Preferencias
          </>
        )}
      </button>
    </div>
  );
}

function NotificationToggle({ 
  label, 
  description, 
  checked, 
  onChange 
}: { 
  label: string; 
  description: string; 
  checked: boolean; 
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-800 last:border-0">
      <div className="flex-1">
        <p className="text-white font-medium">{label}</p>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative w-12 h-6 rounded-full transition-colors ${
          checked ? 'bg-red-600' : 'bg-gray-700'
        }`}
      >
        <div
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
            checked ? 'translate-x-6' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
}

// ============================================
// SECCIÓN: PRIVACIDAD Y SEGURIDAD
// ============================================

function PrivacySection({ onMessage }: { onMessage: (msg: any) => void }) {
  const [privacy, setPrivacy] = useState({
    profilePublic: false,
    showActivity: true,
    allowMessages: true,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    onMessage(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      console.log('[MOCK] Configuración de privacidad guardada:', privacy);
      
      onMessage({ type: 'success', text: 'Configuración de privacidad actualizada' });
      setTimeout(() => onMessage(null), 3000);
    } catch (error: any) {
      onMessage({ type: 'error', text: 'Error al guardar configuración' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-purple-500/10 p-3 rounded-lg">
          <Shield className="w-6 h-6 text-purple-500" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Privacidad y Seguridad</h2>
          <p className="text-sm text-gray-400">Controla la visibilidad de tu información</p>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <NotificationToggle
          label="Perfil Público"
          description="Otros usuarios pueden ver tu perfil"
          checked={privacy.profilePublic}
          onChange={(checked) => setPrivacy(prev => ({ ...prev, profilePublic: checked }))}
        />
        <NotificationToggle
          label="Mostrar Actividad"
          description="Mostrar eventos a los que asistirás"
          checked={privacy.showActivity}
          onChange={(checked) => setPrivacy(prev => ({ ...prev, showActivity: checked }))}
        />
        <NotificationToggle
          label="Permitir Mensajes"
          description="Otros usuarios pueden enviarte mensajes"
          checked={privacy.allowMessages}
          onChange={(checked) => setPrivacy(prev => ({ ...prev, allowMessages: checked }))}
        />
      </div>

      <button
        onClick={handleSave}
        disabled={isLoading}
        className="bg-gray-900 hover:bg-gray-800 disabled:bg-gray-700 border border-gray-800 text-white px-6 py-3 rounded-lg transition-colors font-semibold flex items-center gap-2"
      >
        {isLoading ? (
          <>
            <Loader className="w-5 h-5 animate-spin" />
            Guardando...
          </>
        ) : (
          <>
            <Save className="w-5 h-5" />
            Guardar Configuración
          </>
        )}
      </button>
    </div>
  );
}

// ============================================
// SECCIÓN: ZONA PELIGROSA
// ============================================

function DangerZoneSection({ 
  onMessage, 
  onDeleteAccount 
}: { 
  onMessage: (msg: any) => void;
  onDeleteAccount: () => Promise<void>;
}) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [confirmText, setConfirmText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (confirmText !== 'ELIMINAR') {
      onMessage({ type: 'error', text: 'Debes escribir "ELIMINAR" para confirmar' });
      return;
    }

    setIsDeleting(true);
    onMessage(null);

    try {
      // Simular eliminación
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Limpiar datos MOCK
      localStorage.removeItem('strike_ground_users');
      localStorage.removeItem('strike_ground_current_user');
      localStorage.removeItem('strike_ground_session');
      
      console.log('[MOCK] Cuenta eliminada');
      
      onMessage({ type: 'success', text: 'Cuenta eliminada correctamente' });
      
      // Esperar un momento y luego hacer logout
      setTimeout(async () => {
        await onDeleteAccount();
      }, 1500);
    } catch (error: any) {
      onMessage({ type: 'error', text: 'Error al eliminar cuenta' });
      setIsDeleting(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-red-900/20 to-black border border-red-900/50 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-red-500/10 p-3 rounded-lg">
          <Trash2 className="w-6 h-6 text-red-500" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Zona Peligrosa</h2>
          <p className="text-sm text-gray-400">Acciones irreversibles en tu cuenta</p>
        </div>
      </div>

      {!showDeleteConfirm ? (
        <div>
          <p className="text-gray-300 text-sm mb-4">
            Una vez eliminada tu cuenta, no hay vuelta atrás. Por favor, está seguro.
          </p>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="bg-red-600/10 hover:bg-red-600/20 border border-red-600/50 text-red-400 px-4 py-2 rounded-lg transition-colors text-sm font-medium"
          >
            Eliminar mi Cuenta
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
            <p className="text-red-400 text-sm font-medium mb-2">
              ⚠️ Esta acción es irreversible
            </p>
            <p className="text-gray-400 text-sm">
              Perderás acceso a tu cuenta, historial de compras, y toda tu información.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Escribe <span className="text-red-400 font-bold">ELIMINAR</span> para confirmar
            </label>
            <input
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500"
              placeholder="ELIMINAR"
              disabled={isDeleting}
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleDelete}
              disabled={isDeleting || confirmText !== 'ELIMINAR'}
              className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white px-4 py-3 rounded-lg transition-colors font-semibold flex items-center justify-center gap-2"
            >
              {isDeleting ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Eliminando...
                </>
              ) : (
                <>
                  <Trash2 className="w-5 h-5" />
                  Eliminar Permanentemente
                </>
              )}
            </button>
            <button
              onClick={() => {
                setShowDeleteConfirm(false);
                setConfirmText('');
              }}
              disabled={isDeleting}
              className="px-6 py-3 text-gray-400 hover:text-white transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

