import { useState, FormEvent } from 'react';
import { User, Mail, Phone, MapPin } from 'lucide-react';
import { ShippingInfo } from '../../lib/checkout/types';

interface ShippingFormProps {
  onSubmit: (data: ShippingInfo) => void;
  initialData?: ShippingInfo;
}

export function ShippingForm({ onSubmit, initialData }: ShippingFormProps) {
  const [formData, setFormData] = useState<ShippingInfo>(
    initialData || {
      fullName: '',
      email: '',
      phone: '',
      address: '',
    }
  );

  const [errors, setErrors] = useState<Partial<Record<keyof ShippingInfo, string>>>({});

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    // Formato español: 9 dígitos, puede empezar con 6, 7, 8 o 9
    const re = /^[6-9]\d{8}$/;
    return re.test(phone.replace(/\s/g, ''));
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ShippingInfo, string>> = {};

    if (!formData.fullName || formData.fullName.trim().length < 3) {
      newErrors.fullName = 'El nombre debe tener al menos 3 caracteres';
    }

    if (!formData.email || !validateEmail(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.phone || !validatePhone(formData.phone)) {
      newErrors.phone = 'Teléfono inválido (formato español)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const handleChange = (field: keyof ShippingInfo, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Limpiar error del campo cuando el usuario empieza a escribir
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Nombre completo */}
      <div>
        <label className="block text-white font-semibold mb-2">
          <User className="w-4 h-4 inline mr-2" />
          Nombre Completo *
        </label>
        <input
          type="text"
          value={formData.fullName}
          onChange={(e) => handleChange('fullName', e.target.value)}
          className={`w-full bg-black border ${
            errors.fullName ? 'border-red-500' : 'border-gray-700'
          } rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors`}
          placeholder="Ej: Juan García Martínez"
        />
        {errors.fullName && (
          <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block text-white font-semibold mb-2">
          <Mail className="w-4 h-4 inline mr-2" />
          Email *
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          className={`w-full bg-black border ${
            errors.email ? 'border-red-500' : 'border-gray-700'
          } rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors`}
          placeholder="tu@email.com"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
      </div>

      {/* Teléfono */}
      <div>
        <label className="block text-white font-semibold mb-2">
          <Phone className="w-4 h-4 inline mr-2" />
          Teléfono *
        </label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          className={`w-full bg-black border ${
            errors.phone ? 'border-red-500' : 'border-gray-700'
          } rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors`}
          placeholder="612345678"
        />
        {errors.phone && (
          <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
        )}
      </div>

      {/* Dirección (opcional) */}
      <div>
        <label className="block text-white font-semibold mb-2">
          <MapPin className="w-4 h-4 inline mr-2" />
          Dirección (opcional)
        </label>
        <input
          type="text"
          value={formData.address}
          onChange={(e) => handleChange('address', e.target.value)}
          className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors"
          placeholder="Calle, número, ciudad"
        />
        <p className="text-gray-400 text-xs mt-1">
          Las entradas son digitales y se enviarán por email
        </p>
      </div>

      <button
        type="submit"
        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-lg transition-colors"
      >
        Continuar al Pago
      </button>
    </form>
  );
}

