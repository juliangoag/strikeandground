// Modal para subir foto de perfil
import { useState, useRef } from 'react';
import { X, Upload, Camera, AlertCircle, Loader, CheckCircle } from 'lucide-react';

interface AvatarUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (imageUrl: string) => Promise<void>;
  currentAvatar?: string;
}

export function AvatarUploadModal({ isOpen, onClose, onUpload, currentAvatar }: AvatarUploadModalProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError('');

    // Validar tipo de archivo
    if (!file.type.startsWith('image/')) {
      setError('Por favor selecciona un archivo de imagen válido (JPG, PNG, GIF)');
      return;
    }

    // Validar tamaño (max 2MB para localStorage)
    const maxSize = 2 * 1024 * 1024; // 2MB
    if (file.size > maxSize) {
      setError('La imagen es muy grande. Por favor selecciona una imagen menor a 2MB');
      return;
    }

    // Crear preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!preview) {
      setError('Por favor selecciona una imagen');
      return;
    }

    setIsUploading(true);
    setError('');

    try {
      // Comprimir imagen si es muy grande
      const compressedImage = await compressImage(preview);
      
      await onUpload(compressedImage);
      
      // Cerrar modal después de éxito
      setTimeout(() => {
        onClose();
        setPreview(null);
      }, 500);
    } catch (err: any) {
      setError(err.message || 'Error al subir la imagen');
    } finally {
      setIsUploading(false);
    }
  };

  const handleCancel = () => {
    setPreview(null);
    setError('');
    onClose();
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={handleCancel}
      ></div>

      {/* Modal */}
      <div className="relative bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-2xl w-full max-w-md shadow-2xl">
        {/* Header */}
        <div className="relative p-6 border-b border-gray-800">
          <button
            onClick={handleCancel}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <h2 className="text-2xl font-bold text-white mb-2">
            Cambiar Foto de Perfil
          </h2>
          <p className="text-sm text-gray-400">
            Selecciona una imagen desde tu equipo
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Preview Area */}
          <div className="mb-6">
            <div className="relative w-40 h-40 mx-auto mb-4">
              {preview || currentAvatar ? (
                <img
                  src={preview || currentAvatar}
                  alt="Preview"
                  className="w-full h-full rounded-full object-cover border-4 border-gray-800"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-gray-800 border-4 border-gray-700 flex items-center justify-center">
                  <Camera className="w-16 h-16 text-gray-600" />
                </div>
              )}

              {/* Icon overlay cuando hay preview */}
              {preview && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 hover:opacity-100 transition-opacity">
                  <CheckCircle className="w-12 h-12 text-green-500" />
                </div>
              )}
            </div>

            {/* File Input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
              onChange={handleFileSelect}
              className="hidden"
            />

            {/* Select Button */}
            <button
              onClick={triggerFileInput}
              disabled={isUploading}
              className="w-full bg-gray-900 hover:bg-gray-800 border border-gray-800 text-white px-4 py-3 rounded-lg transition-colors font-medium flex items-center justify-center gap-2"
            >
              <Upload className="w-5 h-5" />
              {preview ? 'Seleccionar otra imagen' : 'Seleccionar imagen'}
            </button>

            {/* Info */}
            <div className="mt-3 text-center text-xs text-gray-500">
              JPG, PNG, GIF o WEBP • Máximo 2MB
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 bg-red-500/10 border border-red-500/50 rounded-lg p-3 flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={handleCancel}
              disabled={isUploading}
              className="flex-1 bg-gray-900 hover:bg-gray-800 border border-gray-800 text-white px-4 py-3 rounded-lg transition-colors font-medium"
            >
              Cancelar
            </button>
            <button
              onClick={handleUpload}
              disabled={!preview || isUploading}
              className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white px-4 py-3 rounded-lg transition-colors font-semibold flex items-center justify-center gap-2"
            >
              {isUploading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Subiendo...
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5" />
                  Guardar Foto
                </>
              )}
            </button>
          </div>

          {/* MOCK Notice */}
          <div className="mt-4 bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
            <p className="text-xs text-blue-400">
              🎭 <strong>Modo MOCK:</strong> La imagen se guarda en Base64 en localStorage. 
              En producción se subiría a un servicio de almacenamiento (AWS S3, Cloudinary, etc.)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Función auxiliar para comprimir imagen
async function compressImage(base64: string, maxWidth = 400): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = base64;
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;

      // Calcular nuevas dimensiones manteniendo aspect ratio
      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve(base64);
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);

      // Convertir a JPEG con calidad 0.8
      const compressedBase64 = canvas.toDataURL('image/jpeg', 0.8);
      resolve(compressedBase64);
    };

    img.onerror = () => {
      resolve(base64); // Si falla, devolver original
    };
  });
}

