import { Order, CheckoutItem, ShippingInfo, PaymentMethod, PromoCode } from '../types';
import { promoCodes } from '../mocks';

const ORDERS_KEY = 'strike_ground_orders';

// Simula un delay de red
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockCheckoutService = {
  /**
   * Crea una nueva orden y la guarda en localStorage
   */
  async createOrder(orderData: {
    items: CheckoutItem[];
    shippingInfo: ShippingInfo;
    paymentMethod: PaymentMethod;
    subtotal: number;
    discount: number;
    total: number;
    promoCode?: string;
    userId?: string;
  }): Promise<Order> {
    await delay(500); // Simular llamada a API

    const order: Order = {
      id: `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      userId: orderData.userId,
      items: orderData.items,
      shippingInfo: orderData.shippingInfo,
      paymentMethod: orderData.paymentMethod,
      subtotal: orderData.subtotal,
      discount: orderData.discount,
      total: orderData.total,
      promoCode: orderData.promoCode,
      status: 'completed',
      createdAt: new Date().toISOString(),
    };

    // Guardar en localStorage
    const orders = this.getAllOrders();
    orders.push(order);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));

    console.log('[MOCK] Orden creada:', order);
    return order;
  },

  /**
   * Obtiene todas las órdenes de un usuario
   */
  async getOrders(userId: string): Promise<Order[]> {
    await delay(300);

    const orders = this.getAllOrders();
    return orders.filter((order) => order.userId === userId);
  },

  /**
   * Obtiene todas las órdenes (sin filtrar)
   */
  getAllOrders(): Order[] {
    const ordersData = localStorage.getItem(ORDERS_KEY);
    return ordersData ? JSON.parse(ordersData) : [];
  },

  /**
   * Obtiene una orden por ID
   */
  async getOrderById(orderId: string): Promise<Order | null> {
    await delay(300);

    const orders = this.getAllOrders();
    return orders.find((order) => order.id === orderId) || null;
  },

  /**
   * Simula el procesamiento de un pago
   * Retorna true si el pago es exitoso, false si falla
   */
  async simulatePayment(): Promise<{ success: boolean; message: string }> {
    await delay(3000); // Simular procesamiento de 3 segundos

    // 90% de probabilidad de éxito
    const success = Math.random() > 0.1;

    if (success) {
      console.log('[MOCK] Pago procesado exitosamente');
      return {
        success: true,
        message: 'Pago procesado correctamente',
      };
    } else {
      console.log('[MOCK] Pago rechazado');
      return {
        success: false,
        message: 'El pago fue rechazado. Por favor, verifica tus datos e intenta nuevamente.',
      };
    }
  },

  /**
   * Valida un código promocional
   */
  validatePromoCode(code: string): PromoCode | null {
    const promoCode = promoCodes.find(
      (promo) => promo.code.toLowerCase() === code.toLowerCase() && promo.isActive
    );

    if (promoCode) {
      console.log('[MOCK] Código promocional válido:', promoCode);
    } else {
      console.log('[MOCK] Código promocional inválido:', code);
    }

    return promoCode || null;
  },

  /**
   * Calcula el descuento aplicado
   */
  calculateDiscount(subtotal: number, promoCode?: PromoCode): number {
    if (!promoCode) return 0;
    return (subtotal * promoCode.discountPercent) / 100;
  },

  /**
   * Calcula el total de una orden
   */
  calculateTotal(subtotal: number, discount: number): number {
    return Math.max(0, subtotal - discount);
  },
};
