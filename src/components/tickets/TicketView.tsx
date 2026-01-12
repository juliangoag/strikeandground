import { useEffect, useState } from 'react';
import { Calendar, MapPin, Ticket as TicketIcon, User, Mail, QrCode, AlertCircle } from 'lucide-react';
import type { Ticket } from '../../lib/tickets/types';
import type { Order } from '../../lib/checkout/types';
import { generateQRCode, decodeTicketData } from '../../lib/tickets/utils/qrGenerator';

interface TicketViewProps {
  ticket: Ticket;
  order: Order;
}

/**
 * Componente que muestra una entrada digital con código QR
 * Diseño profesional y print-friendly
 */
export const TicketView = ({ ticket, order }: TicketViewProps) => {
  const [qrCodeImage, setQrCodeImage] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  // Generar QR code al montar
  useEffect(() => {
    const generateQR = async () => {
      try {
        const qrData = decodeTicketData(ticket.qrCodeData);
        if (qrData) {
          const qrImage = await generateQRCode(qrData);
          setQrCodeImage(qrImage);
        }
      } catch (error) {
        console.error('Error al generar QR:', error);
      } finally {
        setIsLoading(false);
      }
    };

    generateQR();
  }, [ticket]);

  // Formatear fecha del evento
  const eventDate = new Date(ticket.event.date).toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  // Etiquetas de tipos de entrada
  const ticketTypeLabels: Record<string, string> = {
    general: 'GENERAL',
    vip: 'VIP',
    ringside: 'RINGSIDE',
  };

  const ticketTypeColors: Record<string, string> = {
    general: 'bg-blue-500',
    vip: 'bg-purple-500',
    ringside: 'bg-red-500',
  };

  return (
    <div className="relative bg-white text-black rounded-lg overflow-hidden shadow-2xl max-w-2xl mx-auto">
      {/* Header con logo */}
      <div className="bg-gradient-to-r from-gray-900 to-black p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">STRIKE & GROUND</h1>
            <p className="text-sm text-gray-400">Tu entrada digital</p>
          </div>
          <TicketIcon className="w-12 h-12 text-red-500" />
        </div>
      </div>

      {/* Contenido principal */}
      <div className="p-8 space-y-6">
        {/* Información del evento */}
        <div className="border-b border-gray-300 pb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{ticket.event.title}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-gray-600" />
              <div>
                <p className="text-gray-600">Fecha</p>
                <p className="font-semibold capitalize">{eventDate}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-gray-600" />
              <div>
                <p className="text-gray-600">Ubicación</p>
                <p className="font-semibold">{ticket.event.location}</p>
              </div>
            </div>
          </div>

          <div className="mt-4 bg-gray-100 rounded-lg p-4">
            <p className="text-sm font-semibold text-gray-700 mb-1">Combate Principal</p>
            <p className="text-base font-bold text-gray-900">{ticket.event.mainFight}</p>
          </div>
        </div>

        {/* Código QR */}
        <div className="text-center py-6">
          <div className="inline-block bg-white p-4 rounded-lg border-4 border-gray-900">
            {isLoading ? (
              <div className="w-64 h-64 flex items-center justify-center bg-gray-100">
                <div className="text-gray-400">Generando QR...</div>
              </div>
            ) : qrCodeImage ? (
              <img
                src={qrCodeImage}
                alt="Código QR"
                className="w-64 h-64"
              />
            ) : (
              <div className="w-64 h-64 flex items-center justify-center bg-gray-100">
                <QrCode className="w-16 h-16 text-gray-400" />
              </div>
            )}
          </div>
          <p className="text-sm text-gray-600 mt-4 font-semibold">
            Escanea este código en la entrada del evento
          </p>
        </div>

        {/* Tipo de entrada */}
        <div className="text-center">
          <span className={`inline-block ${ticketTypeColors[ticket.ticketType]} text-white px-6 py-2 rounded-full font-bold text-lg`}>
            {ticketTypeLabels[ticket.ticketType]}
          </span>
          <p className="text-sm text-gray-600 mt-2">Precio: {ticket.purchasePrice.toFixed(2)}€</p>
        </div>

        {/* Información del comprador */}
        <div className="border-t border-gray-300 pt-6 space-y-3">
          <h3 className="font-bold text-gray-900 mb-3">Información del Comprador</h3>
          
          <div className="flex items-center gap-2 text-sm">
            <User className="w-4 h-4 text-gray-600" />
            <span className="text-gray-600">Nombre:</span>
            <span className="font-semibold">{order.shippingInfo.fullName}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Mail className="w-4 h-4 text-gray-600" />
            <span className="text-gray-600">Email:</span>
            <span className="font-semibold">{order.shippingInfo.email}</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <TicketIcon className="w-4 h-4 text-gray-600" />
            <span className="text-gray-600">Orden:</span>
            <span className="font-mono text-xs">#{order.id.slice(-12).toUpperCase()}</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <QrCode className="w-4 h-4 text-gray-600" />
            <span className="text-gray-600">Ticket ID:</span>
            <span className="font-mono text-xs">#{ticket.id.slice(-12).toUpperCase()}</span>
          </div>
        </div>

        {/* Instrucciones */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-900">
              <p className="font-semibold mb-2">Instrucciones Importantes:</p>
              <ul className="space-y-1 list-disc list-inside">
                <li>Presenta este código QR en la entrada del evento</li>
                <li>Puedes mostrarlo desde tu móvil o imprimirlo</li>
                <li>Las puertas abren 1 hora antes del evento</li>
                <li>Conserva tu código hasta el final del evento</li>
                <li>No compartas tu código con nadie</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500 pt-4 border-t border-gray-300">
          <p>Strike & Ground • www.strikeandground.com</p>
          <p className="mt-1">
            Comprado el {new Date(order.createdAt).toLocaleDateString('es-ES', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>
          <p className="mt-2 text-gray-400">
            Entrada no reembolsable • Mayor de 18 años requerido
          </p>
        </div>
      </div>

      {/* Overlay si el ticket ya fue usado */}
      {ticket.isUsed && (
        <div className="absolute inset-0 bg-red-500/80 flex items-center justify-center backdrop-blur-sm">
          <div className="text-center text-white">
            <div className="text-8xl font-black mb-4 transform -rotate-12">USADO</div>
            <p className="text-xl font-semibold">
              Esta entrada fue utilizada el{' '}
              {ticket.usedAt && new Date(ticket.usedAt).toLocaleString('es-ES')}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

