import { PromoCode, PaymentMethodType } from './types';

export const availablePaymentMethods: PaymentMethodType[] = ['card', 'paypal', 'bizum'];

export const paymentMethodLabels: Record<PaymentMethodType, string> = {
  card: 'Tarjeta de Crédito/Débito',
  paypal: 'PayPal',
  bizum: 'Bizum',
};

export const paymentMethodDetails = [
  {
    type: 'card' as PaymentMethodType,
    name: 'Tarjeta de Crédito/Débito',
    icon: '💳',
    description: 'Visa, Mastercard, American Express',
  },
  {
    type: 'paypal' as PaymentMethodType,
    name: 'PayPal',
    icon: '🅿️',
    description: 'Paga con tu cuenta de PayPal',
  },
  {
    type: 'bizum' as PaymentMethodType,
    name: 'Bizum',
    icon: '📱',
    description: 'Pago instantáneo con Bizum',
  },
];

export const promoCodes: PromoCode[] = [
  {
    code: 'PROMO10',
    discountPercent: 10,
    description: '10% de descuento',
    isActive: true,
  },
  {
    code: 'PROMO20',
    discountPercent: 20,
    description: '20% de descuento',
    isActive: true,
  },
  {
    code: 'PRIMERA',
    discountPercent: 15,
    description: '15% de descuento en tu primera compra',
    isActive: true,
  },
  {
    code: 'VIP30',
    discountPercent: 30,
    description: '30% de descuento VIP',
    isActive: true,
  },
];

export const ticketTypeLabels = {
  general: 'Entrada General',
  vip: 'Entrada VIP',
  ringside: 'Entrada Ringside',
};

export const ticketTypeDescriptions = {
  general: 'Acceso general al evento',
  vip: 'Asientos preferenciales + acceso a zona VIP',
  ringside: 'Primera fila + meet & greet',
};

// Multiplicadores de precio según tipo de entrada
export const ticketPriceMultipliers = {
  general: 1,
  vip: 2,
  ringside: 3,
};
