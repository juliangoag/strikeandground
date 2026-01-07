import type { FightEvent } from '../events/types';

/**
 * Tipo de entrada/ticket
 */
export type TicketType = 'general' | 'vip' | 'ringside';

/**
 * Estado de un ticket
 */
export type TicketStatus = 'valid' | 'used' | 'expired' | 'cancelled';

/**
 * Ticket individual con código QR
 */
export interface Ticket {
  id: string;                    // ID único del ticket
  orderId: string;               // ID de la orden
  userId: string;                // ID del usuario propietario
  eventId: string;               // ID del evento
  event: FightEvent;             // Información completa del evento
  ticketType: TicketType;        // Tipo de entrada
  qrCodeData: string;            // Datos codificados en el QR
  status: TicketStatus;          // Estado del ticket
  isUsed: boolean;               // Si ya fue usado
  usedAt?: string;               // Timestamp de cuándo se usó
  createdAt: string;             // Timestamp de creación
  purchasePrice: number;         // Precio pagado por esta entrada
}

/**
 * Datos que se codifican en el QR
 */
export interface QRData {
  ticketId: string;              // ID del ticket
  orderId: string;               // ID de la orden
  userId: string;                // ID del usuario
  eventId: string;               // ID del evento
  ticketType: TicketType;        // Tipo de entrada
  timestamp: string;             // Timestamp de generación
  signature: string;             // Hash de seguridad (MOCK)
}

/**
 * Resultado de validación de un ticket
 */
export interface ValidationResult {
  isValid: boolean;              // Si el ticket es válido
  message: string;               // Mensaje descriptivo
  ticket?: Ticket;               // Ticket validado (si es válido)
  reason?: string;               // Razón de invalidez (si no es válido)
}

/**
 * Historial de validación
 */
export interface ValidationHistory {
  id: string;                    // ID único de la validación
  ticketId: string;              // ID del ticket validado
  timestamp: string;             // Timestamp de validación
  result: ValidationResult;      // Resultado de la validación
  validatedBy?: string;          // ID del usuario que validó (futuro)
}

