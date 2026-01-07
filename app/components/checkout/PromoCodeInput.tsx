import { useState } from 'react';
import { Tag, X, CheckCircle } from 'lucide-react';
import { promoCodes } from '../../lib/checkout/mocks';

interface PromoCodeInputProps {
  onApply: (code: string, discount: number) => void;
  appliedCode?: string;
  onRemove?: () => void;
}

export function PromoCodeInput({ onApply, appliedCode, onRemove }: PromoCodeInputProps) {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleApply = async () => {
    if (!code.trim()) {
      setError('Ingresa un código');
      return;
    }

    setLoading(true);
    setError('');

    // Simular verificación (500ms)
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Buscar código en la lista de códigos válidos
    const promoCode = promoCodes.find(
      (p) => p.code.toUpperCase() === code.toUpperCase()
    );

    if (promoCode) {
      onApply(promoCode.code, promoCode.discountPercent);
      setCode('');
      setError('');
    } else {
      setError('Código inválido o expirado');
    }

    setLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleApply();
    }
  };

  // Si ya hay un código aplicado, mostrar badge
  if (appliedCode) {
    return (
      <div className="bg-green-500/10 border border-green-500 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <div>
              <p className="text-green-500 font-semibold">Código aplicado</p>
              <p className="text-gray-300 text-sm">{appliedCode}</p>
            </div>
          </div>
          {onRemove && (
            <button
              type="button"
              onClick={onRemove}
              aria-label="Eliminar código promocional"
              className="text-gray-400 hover:text-red-500 transition-colors p-2"
              title="Eliminar código"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    );
  }

  // Si no hay código aplicado, mostrar input
  return (
    <div className="space-y-2">
      <label className="block text-white font-semibold mb-2">
        <Tag className="w-4 h-4 inline mr-2" />
        Código Promocional
      </label>

      <div className="flex gap-2">
        <input
          type="text"
          value={code}
          onChange={(e) => {
            setCode(e.target.value.toUpperCase());
            setError('');
          }}
          onKeyPress={handleKeyPress}
          className={`flex-1 bg-black border ${
            error ? 'border-red-500' : 'border-gray-700'
          } rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors`}
          placeholder="Ej: PROMO10"
          disabled={loading}
        />
        <button
          type="button"
          onClick={handleApply}
          disabled={loading || !code.trim()}
          aria-label="Aplicar código promocional"
          className="bg-red-600 hover:bg-red-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg transition-colors font-semibold"
        >
          {loading ? 'Validando...' : 'Aplicar'}
        </button>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* Códigos disponibles (solo para demo) */}
      <div className="mt-3">
        <p className="text-gray-400 text-xs mb-2">Códigos disponibles (demo):</p>
        <div className="flex flex-wrap gap-2">
          {promoCodes.map((promo) => (
            <button
              key={promo.code}
              type="button"
              onClick={() => {
                setCode(promo.code);
                setError('');
              }}
              aria-label={`Usar código ${promo.code}`}
              className="text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 px-3 py-1 rounded transition-colors"
            >
              {promo.code}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

