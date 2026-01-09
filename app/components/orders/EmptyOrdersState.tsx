import { ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

interface EmptyOrdersStateProps {
  hasFilters?: boolean;
}

/**
 * Estado vacío que se muestra cuando el usuario no tiene órdenes
 * o cuando los filtros no retornan resultados
 */
export const EmptyOrdersState = ({ hasFilters = false }: EmptyOrdersStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="w-24 h-24 bg-gray-800/50 rounded-full flex items-center justify-center mb-6">
        <ShoppingBag className="w-12 h-12 text-gray-600" />
      </div>

      {hasFilters ? (
        <>
          <h3 className="text-2xl font-bold text-white mb-2">
            No se encontraron órdenes
          </h3>
          <p className="text-gray-400 text-center max-w-md mb-8">
            No hay órdenes que coincidan con los filtros seleccionados. Intenta ajustar tus criterios de búsqueda.
          </p>
        </>
      ) : (
        <>
          <h3 className="text-2xl font-bold text-white mb-2">
            Aún no has realizado ninguna compra
          </h3>
          <p className="text-gray-400 text-center max-w-md mb-8">
            Explora nuestros eventos.
          </p>
          <Link
            to="/eventos"
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
          >
            Ver Eventos Disponibles
          </Link>
        </>
      )}
    </div>
  );
};

