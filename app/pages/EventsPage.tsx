import { useState } from 'react';
import { SearchBar, SearchFilters } from '../components/events/SearchBar';
import { EventCard } from '../components/events/EventCard';
import { upcomingEvents } from '../lib/events/data';

export function EventsPage() {
  const [filters, setFilters] = useState<SearchFilters>({
    city: 'Todas las ciudades',
    category: 'Todas las categorías',
    searchTerm: '',
  });

  const handleSearch = (newFilters: SearchFilters) => {
    setFilters(newFilters);
  };

  // Filtrar eventos según los filtros seleccionados
  const filteredEvents = upcomingEvents.filter((event) => {
    // Filtro por ciudad
    const cityMatch =
      filters.city === 'Todas las ciudades' ||
      event.location.toLowerCase().includes(filters.city.toLowerCase());

    // Filtro por categoría
    const categoryMap: Record<string, string> = {
      'MMA': 'MMA',
      'Boxeo': 'BOXEO',
      'Muay Thai': 'MUAY_THAI',
      'Kickboxing': 'KICKBOXING',
      'BJJ': 'BJJ',
      'Wrestling': 'WRESTLING',
    };

    const categoryMatch =
      filters.category === 'Todas las categorías' ||
      event.category === categoryMap[filters.category];

    // Filtro por término de búsqueda
    const searchMatch =
      filters.searchTerm === '' ||
      event.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      event.mainFight.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(filters.searchTerm.toLowerCase());

    return cityMatch && categoryMatch && searchMatch;
  });

  // Separar eventos destacados y normales
  const highlightedEvents = filteredEvents.filter((event) => event.isHighlight);
  const regularEvents = filteredEvents.filter((event) => !event.isHighlight);

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Todos los Eventos
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Descubre las mejores veladas de deportes de contacto. Filtra por ciudad,
            categoría o busca tu evento favorito.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-12">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Contador de resultados */}
        <div className="mb-6">
          <p className="text-gray-400 text-sm">
            Mostrando{' '}
            <span className="text-white font-semibold">{filteredEvents.length}</span>{' '}
            evento{filteredEvents.length !== 1 ? 's' : ''}
            {(filters.city !== 'Todas las ciudades' ||
              filters.category !== 'Todas las categorías' ||
              filters.searchTerm !== '') && (
              <button
                onClick={() =>
                  setFilters({
                    city: 'Todas las ciudades',
                    category: 'Todas las categorías',
                    searchTerm: '',
                  })
                }
                className="ml-2 text-red-500 hover:text-red-400 transition-colors underline"
              >
                Limpiar filtros
              </button>
            )}
          </p>
        </div>

        {/* Eventos Destacados */}
        {highlightedEvents.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="text-red-500">★</span> Eventos Destacados
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {highlightedEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        )}

        {/* Eventos Regulares */}
        {regularEvents.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">
              {highlightedEvents.length > 0 ? 'Más Eventos' : 'Eventos'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        )}

        {/* Sin resultados */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-20">
            <div className="mb-4">
              <span className="text-6xl">🔍</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              No se encontraron eventos
            </h3>
            <p className="text-gray-400 mb-6">
              No hay eventos que coincidan con tus criterios de búsqueda.
            </p>
            <button
              onClick={() =>
                setFilters({
                  city: 'Todas las ciudades',
                  category: 'Todas las categorías',
                  searchTerm: '',
                })
              }
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors font-semibold"
            >
              Ver todos los eventos
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

