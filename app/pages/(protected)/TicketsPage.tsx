import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Loader2, Download, Ticket as TicketIcon, ChevronLeft } from 'lucide-react';
import { mockTicketService } from '../../lib/tickets/services/mockTicketService';
import { mockCheckoutService } from '../../lib/checkout/services/mockCheckoutService';
import type { Ticket } from '../../lib/tickets/types';
import type { Order } from '../../lib/checkout/types';
import { TicketView } from '../../components/tickets/TicketView';

/**
 * Página que muestra todos los tickets de una orden
 * Permite visualizar y descargar cada entrada
 */
export const TicketsPage = () => {
  const { orderId } = useParams<{ orderId: string }>();
  
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTicketIndex, setSelectedTicketIndex] = useState(0);
  const [error, setError] = useState<string>('');

  // Cargar tickets y orden
  useEffect(() => {
    const loadData = async () => {
      if (!orderId) {
        setError('ID de orden no especificado');
        setIsLoading(false);
        return;
      }

      try {
        // Cargar orden
        const orderData = await mockCheckoutService.getOrderById(orderId);
        if (!orderData) {
          setError('Orden no encontrada');
          setIsLoading(false);
          return;
        }
        setOrder(orderData);

        // Cargar tickets
        let ticketData = await mockTicketService.getTicketsByOrder(orderId);
        
        // Si no hay tickets, generarlos ahora
        if (ticketData.length === 0 && orderData.status === 'completed') {
          console.log('[TicketsPage] Generando tickets para orden:', orderId);
          ticketData = await mockTicketService.generateTickets(orderData);
        }

        setTickets(ticketData);
      } catch (err) {
        console.error('Error al cargar tickets:', err);
        setError('Error al cargar las entradas');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [orderId]);

  // Descargar todos los tickets
  const handleDownloadAll = () => {
    window.print();
  };

  // Navegar entre tickets
  const handlePrevTicket = () => {
    if (selectedTicketIndex > 0) {
      setSelectedTicketIndex(selectedTicketIndex - 1);
    }
  };

  const handleNextTicket = () => {
    if (selectedTicketIndex < tickets.length - 1) {
      setSelectedTicketIndex(selectedTicketIndex + 1);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white pt-20 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-red-500 animate-spin" />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <TicketIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Error al Cargar Entradas</h2>
            <p className="text-gray-400 mb-6">{error || 'Orden no encontrada'}</p>
            <Link
              to="/profile/orders"
              className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
            >
              Volver a Mis Órdenes
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (tickets.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <TicketIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">No hay entradas disponibles</h2>
            <p className="text-gray-400 mb-6">
              Esta orden no tiene entradas generadas aún.
            </p>
            <Link
              to="/profile/orders"
              className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
            >
              Volver a Mis Órdenes
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const currentTicket = tickets[selectedTicketIndex];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6 no-print">
          <Link to="/" className="hover:text-white transition-colors">
            Inicio
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/profile" className="hover:text-white transition-colors">
            Perfil
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/profile/orders" className="hover:text-white transition-colors">
            Mis Órdenes
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-white">Entradas</span>
        </nav>

        {/* Header */}
        <div className="flex items-center justify-between mb-8 no-print">
          <div>
            <h1 className="text-4xl font-bold mb-2">Tus Entradas</h1>
            <p className="text-gray-400">
              {tickets.length} {tickets.length === 1 ? 'entrada' : 'entradas'} para tu compra
            </p>
          </div>
          <button
            type="button"
            onClick={handleDownloadAll}
            className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
            aria-label="Descargar todas las entradas"
          >
            <Download className="w-5 h-5" />
            Descargar Todas
          </button>
        </div>

        {/* Navegación entre tickets */}
        {tickets.length > 1 && (
          <div className="flex items-center justify-center gap-4 mb-8 no-print">
            <button
              type="button"
              onClick={handlePrevTicket}
              disabled={selectedTicketIndex === 0}
              className="p-2 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
              aria-label="Entrada anterior"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <div className="text-center">
              <p className="text-sm text-gray-400">
                Entrada {selectedTicketIndex + 1} de {tickets.length}
              </p>
              <p className="text-white font-semibold">
                {currentTicket.event.title}
              </p>
            </div>

            <button
              type="button"
              onClick={handleNextTicket}
              disabled={selectedTicketIndex === tickets.length - 1}
              className="p-2 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
              aria-label="Entrada siguiente"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        )}

        {/* Ticket actual */}
        <div id={`ticket-${selectedTicketIndex}`} className="mb-8">
          <TicketView ticket={currentTicket} order={order} />
        </div>

        {/* Botón volver */}
        <div className="text-center no-print">
          <Link
            to="/profile/orders"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Volver a Mis Órdenes
          </Link>
        </div>
      </div>
    </div>
  );
};

