import QRCode from 'qrcode';
import type { QRData } from '../types';

/**
 * Secret key para firmar tickets (MOCK)
 * En producción, usar variable de entorno
 */
const SECRET_KEY = 'strikeandground-secret-2026';

/**
 * Genera un hash simple para firmar el ticket (MOCK)
 * En producción, usar JWT o firma criptográfica real
 */
export const generateSecureHash = (data: Omit<QRData, 'signature'>): string => {
  const str = JSON.stringify(data) + SECRET_KEY;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(36);
};

/**
 * Codifica los datos del ticket en string JSON
 */
export const encodeTicketData = (qrData: QRData): string => {
  return JSON.stringify(qrData);
};

/**
 * Decodifica el string JSON del QR a QRData
 */
export const decodeTicketData = (qrString: string): QRData | null => {
  try {
    const data = JSON.parse(qrString);
    // Validar que tenga todos los campos necesarios
    if (
      data.ticketId &&
      data.orderId &&
      data.userId &&
      data.eventId &&
      data.ticketType &&
      data.timestamp &&
      data.signature
    ) {
      return data as QRData;
    }
    return null;
  } catch (error) {
    console.error('Error al decodificar QR data:', error);
    return null;
  }
};

/**
 * Genera un código QR en formato base64
 * @param qrData - Datos a codificar en el QR
 * @returns Promise con la imagen QR en base64
 */
export const generateQRCode = async (qrData: QRData): Promise<string> => {
  try {
    const qrString = encodeTicketData(qrData);
    
    // Opciones del QR
    const options = {
      width: 400,                  // Tamaño 400x400px
      margin: 2,                   // Margen alrededor del QR
      errorCorrectionLevel: 'H' as const,  // Nivel alto de corrección de errores
      color: {
        dark: '#000000',           // Color de los módulos (negro)
        light: '#FFFFFF',          // Color de fondo (blanco)
      },
    };

    // Generar QR code en base64
    const qrCodeDataURL = await QRCode.toDataURL(qrString, options);
    return qrCodeDataURL;
  } catch (error) {
    console.error('Error al generar QR code:', error);
    throw new Error('No se pudo generar el código QR');
  }
};

/**
 * Verifica si la firma del ticket es válida (MOCK)
 */
export const verifyTicketSignature = (qrData: QRData): boolean => {
  const dataWithoutSignature = {
    ticketId: qrData.ticketId,
    orderId: qrData.orderId,
    userId: qrData.userId,
    eventId: qrData.eventId,
    ticketType: qrData.ticketType,
    timestamp: qrData.timestamp,
  };
  
  const expectedHash = generateSecureHash(dataWithoutSignature);
  return expectedHash === qrData.signature;
};

