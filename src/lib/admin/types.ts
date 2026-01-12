import { User } from '../auth/types';
import { Order } from '../checkout/types';
import { Event } from '../events/types';

/**
 * Estadísticas generales del panel administrativo
 */
export interface AdminStatistics {
  totalEvents: number;
  publishedEvents: number;
  draftEvents: number;
  totalOrders: number;
  completedOrders: number;
  pendingOrders: number;
  totalRevenue: number;
  totalUsers: number;
  totalTickets: number;
  validatedTickets: number;
}

/**
 * Usuario con estadísticas adicionales
 */
export interface UserWithStats extends User {
  totalOrders: number;
  totalSpent: number;
  totalTickets: number;
  lastActivity: string;
}

/**
 * Datos del formulario de evento
 */
export interface EventFormData {
  id?: string;
  title: string;
  date: string;
  location: string;
  mainFight: string;
  image: string;
  basePrice: number;
  category: string;
  isFeatured: boolean;
  isPublished: boolean;
}

/**
 * Estadísticas de un evento
 */
export interface EventStats {
  eventId: string;
  totalOrders: number;
  totalTicketsSold: number;
  totalRevenue: number;
}
