import type { Order } from '../../checkout/types';
import type { Ticket, QRData, ValidationResult, ValidationHistory } from '../types';
import { generateQRCode, generateSecureHash, decodeTicketData, verifyTicketSignature } from '../utils/qrGenerator';

const TICKETS_KEY = 'strike_ground_tickets';
const VALIDATIONS_KEY = 'strike_ground_validations';

/**
 * Servicio MOCK para gestionar tickets con códigos QR
 */
export const mockTicketService = {
  /**
   * Genera tickets para una orden completada
   * Crea un ticket por cada item en la orden respetando las cantidades
   */
  async generateTickets(order: Order): Promise<Ticket[]> {
    const tickets: Ticket[] = [];

    // Generar tickets para cada item
    for (const item of order.items) {
      for (let i = 0; i < item.quantity; i++) {
        const ticketId = `TKT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        
        // Crear QR data
        const qrData: Omit<QRData, 'signature'> = {
          ticketId,
          orderId: order.id,
          userId: order.userId || 'guest',
          eventId: item.event.id,
          ticketType: item.ticketType,
          timestamp: new Date().toISOString(),
        };

        // Generar firma
        const signature = generateSecureHash(qrData);
        const fullQRData: QRData = { ...qrData, signature };

        // Generar código QR
        const qrCodeData = JSON.stringify(fullQRData);

        // Crear ticket
        const ticket: Ticket = {
          id: ticketId,
          orderId: order.id,
          userId: order.userId || 'guest',
          eventId: item.event.id,
          event: item.event,
          ticketType: item.ticketType,
          qrCodeData,
          status: 'valid',
          isUsed: false,
          createdAt: new Date().toISOString(),
          purchasePrice: item.pricePerTicket,
        };

        tickets.push(ticket);
      }
    }

    // Guardar todos los tickets
    const existingTickets = this.getAllTickets();
    const allTickets = [...existingTickets, ...tickets];
    localStorage.setItem(TICKETS_KEY, JSON.stringify(allTickets));

    console.log(`[MOCK] ${tickets.length} tickets generados para orden ${order.id}`);
    return tickets;
  },

  /**
   * Obtiene todos los tickets del sistema
   */
  getAllTickets(): Ticket[] {
    const data = localStorage.getItem(TICKETS_KEY);
    if (!data) return [];
    try {
      return JSON.parse(data);
    } catch {
      return [];
    }
  },

  /**
   * Obtiene todos los tickets de una orden
   */
  async getTicketsByOrder(orderId: string): Promise<Ticket[]> {
    const allTickets = this.getAllTickets();
    return allTickets.filter(ticket => ticket.orderId === orderId);
  },

  /**
   * Obtiene un ticket específico por ID
   */
  async getTicketById(ticketId: string): Promise<Ticket | null> {
    const allTickets = this.getAllTickets();
    return allTickets.find(ticket => ticket.id === ticketId) || null;
  },

  /**
   * Valida un ticket escaneado
   */
  async validateTicket(qrString: string): Promise<ValidationResult> {
    // Decodificar datos del QR
    const qrData = decodeTicketData(qrString);
    
    if (!qrData) {
      return {
        isValid: false,
        message: 'Código QR inválido o corrupto',
        reason: 'INVALID_FORMAT',
      };
    }

    // Verificar firma
    if (!verifyTicketSignature(qrData)) {
      return {
        isValid: false,
        message: 'Ticket inválido: firma de seguridad no coincide',
        reason: 'INVALID_SIGNATURE',
      };
    }

    // Buscar ticket
    const ticket = await this.getTicketById(qrData.ticketId);
    
    if (!ticket) {
      return {
        isValid: false,
        message: 'Ticket no encontrado en el sistema',
        reason: 'NOT_FOUND',
      };
    }

    // Verificar si ya fue usado
    if (ticket.isUsed) {
      return {
        isValid: false,
        message: 'Esta entrada ya fue utilizada',
        reason: 'ALREADY_USED',
        ticket,
      };
    }

    // Verificar estado
    if (ticket.status !== 'valid') {
      return {
        isValid: false,
        message: `Ticket ${ticket.status}`,
        reason: `STATUS_${ticket.status.toUpperCase()}`,
        ticket,
      };
    }

    // Todo está bien
    return {
      isValid: true,
      message: 'Ticket válido',
      ticket,
    };
  },

  /**
   * Marca un ticket como usado
   */
  async markTicketAsUsed(ticketId: string): Promise<Ticket> {
    const allTickets = this.getAllTickets();
    const ticketIndex = allTickets.findIndex(t => t.id === ticketId);

    if (ticketIndex === -1) {
      throw new Error('Ticket no encontrado');
    }

    // Actualizar ticket
    allTickets[ticketIndex].isUsed = true;
    allTickets[ticketIndex].usedAt = new Date().toISOString();
    allTickets[ticketIndex].status = 'used';

    // Guardar cambios
    localStorage.setItem(TICKETS_KEY, JSON.stringify(allTickets));

    console.log(`[MOCK] Ticket ${ticketId} marcado como usado`);
    return allTickets[ticketIndex];
  },

  /**
   * Guarda una validación en el historial
   */
  async saveValidationHistory(ticketId: string, result: ValidationResult): Promise<void> {
    const history = this.getValidationHistory();
    
    const newValidation: ValidationHistory = {
      id: `VAL-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      ticketId,
      timestamp: new Date().toISOString(),
      result,
    };

    history.unshift(newValidation); // Agregar al inicio
    
    // Mantener solo las últimas 50 validaciones
    const limitedHistory = history.slice(0, 50);
    
    localStorage.setItem(VALIDATIONS_KEY, JSON.stringify(limitedHistory));
  },

  /**
   * Obtiene el historial de validaciones
   */
  getValidationHistory(): ValidationHistory[] {
    const data = localStorage.getItem(VALIDATIONS_KEY);
    if (!data) return [];
    try {
      return JSON.parse(data);
    } catch {
      return [];
    }
  },

  /**
   * Limpia el historial de validaciones
   */
  clearValidationHistory(): void {
    localStorage.removeItem(VALIDATIONS_KEY);
    console.log('[MOCK] Historial de validaciones limpiado');
  },

  /**
   * Regenera el código QR de un ticket (admin)
   */
  async regenerateTicketQR(ticketId: string): Promise<string> {
    const ticket = await this.getTicketById(ticketId);
    if (!ticket) {
      throw new Error('Ticket no encontrado');
    }

    const qrData = decodeTicketData(ticket.qrCodeData);
    if (!qrData) {
      throw new Error('Datos del ticket corruptos');
    }

    // Generar nuevo QR code en base64
    const qrCodeImageBase64 = await generateQRCode(qrData);
    return qrCodeImageBase64;
  },
};

