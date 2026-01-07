import { useState } from 'react';
import { CreditCard, Calendar, Lock } from 'lucide-react';
import { PaymentMethod } from '../../lib/checkout/types';
import { paymentMethodDetails } from '../../lib/checkout/mocks';

interface PaymentMethodSelectorProps {
  selectedMethod: PaymentMethod | null;
  onSelect: (method: PaymentMethod) => void;
}

export function PaymentMethodSelector({
  selectedMethod,
  onSelect,
}: PaymentMethodSelectorProps) {
  const [cardData, setCardData] = useState({
    number: '',
    cvv: '',
    expiry: '',
  });

  const [validationErrors, setValidationErrors] = useState({
    number: '',
    cvv: '',
    expiry: '',
  });

  const handleMethodSelect = (type: PaymentMethod['type']) => {
    if (type === 'card') {
      // Si es tarjeta, esperar a que se completen los datos
      onSelect({ type });
      // Resetear datos de tarjeta al cambiar
      setCardData({ number: '', cvv: '', expiry: '' });
      setValidationErrors({ number: '', cvv: '', expiry: '' });
    } else {
      // Para PayPal y Bizum, seleccionar directamente
      onSelect({ type });
    }
  };

  const validateCardNumber = (number: string): boolean => {
    const cleaned = number.replace(/\s/g, '');
    return cleaned.length === 16 && /^\d+$/.test(cleaned);
  };

  const validateExpiry = (expiry: string): boolean => {
    if (expiry.length !== 5) return false;
    const [month, year] = expiry.split('/');
    const monthNum = parseInt(month, 10);
    const yearNum = parseInt('20' + year, 10);
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;

    return (
      monthNum >= 1 &&
      monthNum <= 12 &&
      (yearNum > currentYear || (yearNum === currentYear && monthNum >= currentMonth))
    );
  };

  const validateCVV = (cvv: string): boolean => {
    return cvv.length === 3 && /^\d+$/.test(cvv);
  };

  // Validar y actualizar método de pago cuando cambien los datos de la tarjeta
  const handleCardDataChange = (field: 'number' | 'expiry' | 'cvv', value: string) => {
    const updatedCardData = { ...cardData, [field]: value };
    setCardData(updatedCardData);

    // Limpiar error del campo
    setValidationErrors({ ...validationErrors, [field]: '' });

    // Si todos los campos están completos y válidos, actualizar el método de pago
    if (selectedMethod?.type === 'card') {
      const isNumberValid = field === 'number' ? validateCardNumber(value) : validateCardNumber(updatedCardData.number);
      const isExpiryValid = field === 'expiry' ? validateExpiry(value) : validateExpiry(updatedCardData.expiry);
      const isCvvValid = field === 'cvv' ? validateCVV(value) : validateCVV(updatedCardData.cvv);

      if (isNumberValid && isExpiryValid && isCvvValid) {
        onSelect({
          type: 'card',
          cardDetails: updatedCardData,
          lastFourDigits: updatedCardData.number.replace(/\s/g, '').slice(-4),
        });
      } else {
        // Si los datos no son válidos, actualizar sin cardDetails
        onSelect({ type: 'card' });
      }
    }
  };

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, '');
    const groups = cleaned.match(/.{1,4}/g) || [];
    return groups.join(' ').substr(0, 19); // 16 dígitos + 3 espacios
  };

  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return `${cleaned.substr(0, 2)}/${cleaned.substr(2, 2)}`;
    }
    return cleaned;
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-white mb-4">Método de Pago</h3>

      {/* Métodos de pago */}
      <div className="space-y-3">
        {paymentMethodDetails.map((method) => (
          <div
            key={method.type}
            onClick={() => handleMethodSelect(method.type)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleMethodSelect(method.type);
              }
            }}
            aria-label={`Seleccionar ${method.name}`}
            className={`
              relative p-4 rounded-lg border-2 cursor-pointer transition-all
              ${
                selectedMethod?.type === method.type
                  ? 'border-red-500 bg-red-500/10'
                  : 'border-gray-700 bg-black/50 hover:border-gray-600'
              }
            `}
          >
            <div className="flex items-center gap-4">
              {/* Radio button */}
              <div
                className={`
                  w-5 h-5 rounded-full border-2 flex items-center justify-center
                  ${
                    selectedMethod?.type === method.type
                      ? 'border-red-500'
                      : 'border-gray-600'
                  }
                `}
              >
                {selectedMethod?.type === method.type && (
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                )}
              </div>

              {/* Icono y nombre */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl">{method.icon}</span>
                  <span className="text-white font-semibold">{method.name}</span>
                </div>
                <p className="text-gray-400 text-sm">{method.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Formulario de tarjeta (solo si se selecciona tarjeta) */}
      {selectedMethod?.type === 'card' && (
        <div className="bg-black/50 border border-gray-700 rounded-lg p-6 space-y-4">
          <p className="text-gray-300 text-sm mb-4">
            <Lock className="w-4 h-4 inline mr-2" />
            Esta es una simulación. Puedes usar cualquier número de tarjeta.
          </p>

          {/* Número de tarjeta */}
          <div>
            <label className="block text-white font-semibold mb-2">
              <CreditCard className="w-4 h-4 inline mr-2" />
              Número de Tarjeta
            </label>
            <input
              type="text"
              value={cardData.number}
              onChange={(e) =>
                handleCardDataChange('number', formatCardNumber(e.target.value))
              }
              className={`w-full bg-black border rounded-lg px-4 py-3 text-white focus:outline-none transition-colors ${
                validationErrors.number
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-gray-700 focus:border-red-500'
              }`}
              placeholder="1234 5678 9012 3456"
              maxLength={19}
            />
            {validationErrors.number && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.number}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Fecha de expiración */}
            <div>
              <label className="block text-white font-semibold mb-2">
                <Calendar className="w-4 h-4 inline mr-2" />
                Expiración
              </label>
              <input
                type="text"
                value={cardData.expiry}
                onChange={(e) =>
                  handleCardDataChange('expiry', formatExpiry(e.target.value))
                }
                className={`w-full bg-black border rounded-lg px-4 py-3 text-white focus:outline-none transition-colors ${
                  validationErrors.expiry
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-gray-700 focus:border-red-500'
                }`}
                placeholder="MM/AA"
                maxLength={5}
              />
              {validationErrors.expiry && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.expiry}</p>
              )}
            </div>

            {/* CVV */}
            <div>
              <label className="block text-white font-semibold mb-2">CVV</label>
              <input
                type="text"
                value={cardData.cvv}
                onChange={(e) =>
                  handleCardDataChange(
                    'cvv',
                    e.target.value.replace(/\D/g, '').substr(0, 3)
                  )
                }
                className={`w-full bg-black border rounded-lg px-4 py-3 text-white focus:outline-none transition-colors ${
                  validationErrors.cvv
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-gray-700 focus:border-red-500'
                }`}
                placeholder="123"
                maxLength={3}
              />
              {validationErrors.cvv && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.cvv}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

