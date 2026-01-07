// Página de Perfil de Usuario
import { useState } from 'react';
import { useAuth } from '../../providers/AuthProvider';
import { AvatarUploadModal } from '../../lib/auth/components/AvatarUploadModal';
import { User, Mail, Calendar, CheckCircle, Edit2, Save, X, Camera } from 'lucide-react';

export function ProfilePage() {
  const { user, updateProfile, verifyEmail } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');

  if (!user) return null;

  const handleSave = async () => {
    setIsSaving(true);
    setMessage('');
    try {
      await updateProfile({ name });
      setIsEditing(false);
      setMessage('Perfil actualizado correctamente');
      setTimeout(() => setMessage(''), 3000);
    } catch (error: any) {
      setMessage(error.message || 'Error al actualizar perfil');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setName(user.name);
    setIsEditing(false);
  };

  const handleVerifyEmail = async () => {
    try {
      await verifyEmail();
      setMessage('Email verificado correctamente');
      setTimeout(() => setMessage(''), 3000);
    } catch (error: any) {
      setMessage(error.message || 'Error al verificar email');
    }
  };

  const handleAvatarUpload = async (imageUrl: string) => {
    try {
      await updateProfile({ avatar_url: imageUrl });
      setMessage('Foto de perfil actualizada correctamente');
      setTimeout(() => setMessage(''), 3000);
    } catch (error: any) {
      throw new Error(error.message || 'Error al actualizar foto');
    }
  };

  const memberSince = new Date(user.created_at).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-2">Mi Perfil</h1>
            <p className="text-gray-400">Gestiona tu información personal</p>
          </div>

          {/* Message */}
          {message && (
            <div className="mb-6 bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <p className="text-green-400 text-center">{message}</p>
            </div>
          )}

          <div className="grid gap-6 md:grid-cols-3">
            {/* Avatar Section */}
            <div className="md:col-span-1">
              <div className="bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-xl p-6">
                <div className="text-center">
                  <div className="relative inline-block mb-4 group">
                    <img
                      src={user.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
                      alt={user.name}
                      className="w-32 h-32 rounded-full border-4 border-gray-800 object-cover"
                    />
                    
                    {/* Botón para cambiar foto */}
                    <button
                      onClick={() => setShowAvatarModal(true)}
                      className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Cambiar foto"
                    >
                      <Camera className="w-8 h-8 text-white" />
                    </button>

                    {/* Badge de email verificado */}
                    {user.email_verified && (
                      <div className="absolute bottom-0 right-0 bg-green-500 rounded-full p-2 border-4 border-black">
                        <CheckCircle className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </div>

                  <h2 className="text-xl font-bold text-white mb-1">{user.name}</h2>
                  <p className="text-gray-400 text-sm mb-4">{user.email}</p>

                  {user.email_verified ? (
                    <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-3 py-1">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-green-400 text-xs font-medium">Email Verificado</span>
                    </div>
                  ) : (
                    <button
                      onClick={handleVerifyEmail}
                      className="text-xs text-yellow-400 hover:text-yellow-300 border border-yellow-500/30 rounded-full px-3 py-1"
                    >
                      Verificar Email
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Info Section */}
            <div className="md:col-span-2 space-y-6">
              {/* Personal Info */}
              <div className="bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white">Información Personal</h3>
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                      <span className="text-sm">Editar</span>
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={handleCancel}
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                      >
                        <X className="w-4 h-4" />
                        <span className="text-sm">Cancelar</span>
                      </button>
                      <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors disabled:opacity-50"
                      >
                        <Save className="w-4 h-4" />
                        <span className="text-sm">{isSaving ? 'Guardando...' : 'Guardar'}</span>
                      </button>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Nombre completo
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500"
                      />
                    ) : (
                      <div className="flex items-center gap-3 bg-gray-900/50 rounded-lg px-4 py-3">
                        <User className="w-5 h-5 text-gray-500" />
                        <span className="text-white">{user.name}</span>
                      </div>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Email
                    </label>
                    <div className="flex items-center gap-3 bg-gray-900/50 rounded-lg px-4 py-3">
                      <Mail className="w-5 h-5 text-gray-500" />
                      <span className="text-white">{user.email}</span>
                    </div>
                  </div>

                  {/* Member Since */}
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Miembro desde
                    </label>
                    <div className="flex items-center gap-3 bg-gray-900/50 rounded-lg px-4 py-3">
                      <Calendar className="w-5 h-5 text-gray-500" />
                      <span className="text-white">{memberSince}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-6">Estadísticas</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-500 mb-1">0</div>
                    <div className="text-xs text-gray-400">Entradas Compradas</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-500 mb-1">0</div>
                    <div className="text-xs text-gray-400">Eventos Asistidos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-500 mb-1">0€</div>
                    <div className="text-xs text-gray-400">Total Gastado</div>
                  </div>
                </div>
              </div>

              {/* Mock Notice */}
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                <p className="text-sm text-blue-400">
                  🎭 <strong>Modo MOCK:</strong> Esta es una cuenta de prueba. En producción, 
                  tendrías acceso completo a tu historial de compras y estadísticas reales.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Avatar Upload Modal */}
        <AvatarUploadModal
          isOpen={showAvatarModal}
          onClose={() => setShowAvatarModal(false)}
          onUpload={handleAvatarUpload}
          currentAvatar={user.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
        />
      </div>
  );
}

