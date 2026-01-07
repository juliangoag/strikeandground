import { FightEvent } from '../events/types';

export type TicketType = 'general' | 'vip' | 'ringside';

export interface CheckoutItem {
  id: string;
  event: FightEvent;
  ticketType: TicketType;
  quantity: number;
  pricePerTicket: number;
}

export interface ShippingInfo {
  fullName: string;
  email: string;
  phone: string;
  address?: string;
}

export type PaymentMethodType = 'card' | 'paypal' | 'bizum';

export interface PaymentMethod {
  type: PaymentMethodType;
  lastFourDigits?: string;
  cardDetails?: {
    number: string;
    expiry: string;
    cvv: string;
  };
}

export interface CardDetails {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
}

export type OrderStatus = 'pending' | 'completed' | 'failed' | 'cancelled';

export interface Order {
  id: string;
  userId?: string;
  items: CheckoutItem[];
  shippingInfo: ShippingInfo;
  paymentMethod: PaymentMethod;
  subtotal: number;
  discount: number;
  total: number;
  promoCode?: string;
  status: OrderStatus;
  createdAt: string;
}

export interface PromoCode {
  code: string;
  discountPercent: number;
  description: string;
  isActive: boolean;
}
