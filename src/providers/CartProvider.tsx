import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { CheckoutItem, TicketType } from '../lib/checkout/types';
import { FightEvent } from '../lib/events/types';
import { ticketPriceMultipliers } from '../lib/checkout/mocks';

const CART_KEY = 'strike_ground_cart';

interface CartContextType {
  items: CheckoutItem[];
  itemCount: number;
  subtotal: number;
  addItem: (event: FightEvent, ticketType: TicketType, quantity: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: (discount?: number) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CheckoutItem[]>([]);

  // Cargar carrito desde localStorage al montar
  useEffect(() => {
    loadCart();
  }, []);

  // Guardar carrito en localStorage cada vez que cambie
  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem(CART_KEY, JSON.stringify(items));
    } else {
      localStorage.removeItem(CART_KEY);
    }
  }, [items]);

  const loadCart = () => {
    try {
      const savedCart = localStorage.getItem(CART_KEY);
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        setItems(parsedCart);
        console.log('[CART] Carrito cargado desde localStorage:', parsedCart);
      }
    } catch (error) {
      console.error('Error loading cart:', error);
      setItems([]);
    }
  };

  const addItem = (event: FightEvent, ticketType: TicketType, quantity: number) => {
    const priceMultiplier = ticketPriceMultipliers[ticketType];
    const pricePerTicket = event.price * priceMultiplier;

    // Verificar si ya existe un item con el mismo evento y tipo de entrada
    const existingItemIndex = items.findIndex(
      (item) => item.event.id === event.id && item.ticketType === ticketType
    );

    if (existingItemIndex >= 0) {
      // Si existe, actualizar cantidad
      const updatedItems = [...items];
      updatedItems[existingItemIndex].quantity += quantity;
      setItems(updatedItems);
      console.log('[CART] Cantidad actualizada:', updatedItems[existingItemIndex]);
    } else {
      // Si no existe, agregar nuevo item
      const newItem: CheckoutItem = {
        id: `${event.id}-${ticketType}-${Date.now()}`,
        event,
        ticketType,
        quantity,
        pricePerTicket,
      };
      setItems([...items, newItem]);
      console.log('[CART] Item agregado:', newItem);
    }
  };

  const removeItem = (itemId: string) => {
    const updatedItems = items.filter((item) => item.id !== itemId);
    setItems(updatedItems);
    console.log('[CART] Item eliminado:', itemId);
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }

    const updatedItems = items.map((item) =>
      item.id === itemId ? { ...item, quantity } : item
    );
    setItems(updatedItems);
    console.log('[CART] Cantidad actualizada para item:', itemId, 'Nueva cantidad:', quantity);
  };

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem(CART_KEY);
    console.log('[CART] Carrito vaciado');
  };

  const getTotal = (discount: number = 0): number => {
    const sub = subtotal;
    return Math.max(0, sub - discount);
  };

  // Calcular subtotal
  const subtotal = items.reduce((total, item) => {
    return total + item.pricePerTicket * item.quantity;
  }, 0);

  // Calcular cantidad total de items
  const itemCount = items.reduce((count, item) => count + item.quantity, 0);

  const value: CartContextType = {
    items,
    itemCount,
    subtotal,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
