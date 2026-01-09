import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Calendar, 
  MapPin, 
  DollarSign, 
  Star,
  Eye,
  Plus,
  Filter
} from 'lucide-react';
import { AdminLayout } from '../../../components/admin/AdminLayout';
import { upcomingEvents } from '../../../lib/events/data';
import { Event } from '../../../lib/events/types';

export const AdminEventsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [cityFilter, setCityFilter] = useState<string>('all');

  // Obtener categorías y ciudades únicas
  const categories = useMemo(() => {
    const cats = new Set(upcomingEvents.map(e => e.category));
    return Array.from(cats);
  }, []);

  const cities = useMemo(() => {
    const citiesSet = new Set(upcomingEvents.map(e => e.location.split(',')[0].trim()));
    return Array.from(citiesSet);
  }, []);

  // Filtrar eventos
  const filteredEvents = useMemo(() => {
    return upcomingEvents.filter(event => {
      const matchesSearch = 
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.mainFight.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = categoryFilter === 'all' || event.category === categoryFilter;
      
      const matchesCity = cityFilter === 'all' || event.location.includes(cityFilter);

      return matchesSearch && matchesCategory && matchesCity;
    });
  }, [searchTerm, categoryFilter, cityFilter]);

  // Estadísticas
  const stats = {
    total: upcomingEvents.length,
    featured: upcomingEvents.filter(e => e.isFeatured).length,
    filtered: filteredEvents.length,
  };

  return (
    <AdminLayout 
      title="Gestión de Eventos" 
      description="Administrar eventos, crear nuevos y editar existentes"
    >
      {/* Header con botón de acción */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="bg-gray-900 border border-gray-800 rounded-lg px-4 py-2">
            <span className="text-sm text-gray-400">Total:</span>
            <span className="ml-2 text-lg font-bold text-white">{stats.total}</span>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-lg px-4 py-2">
            <span className="text-sm text-gray-400">Destacados:</span>
            <span className="ml-2 text-lg font-bold text-yellow-400">{stats.featured}</span>
          </div>
        </div>
        
        <button
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-lg transition-colors"
          onClick={() => alert('Función de crear evento próximamente')}
        >
          <Plus className="w-5 h-5" />
          Crear Evento
        </button>
      </div>

      {/* Filtros */}
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-gray-400" />
          <h3 className="text-lg font-semibold text-white">Filtros</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Búsqueda */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar eventos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-950 border border-gray-800 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500"
            />
          </div>

          {/* Filtro de categoría */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 bg-gray-950 border border-gray-800 rounded-lg text-white focus:outline-none focus:border-red-500"
          >
            <option value="all">Todas las categorías</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          {/* Filtro de ciudad */}
          <select
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            className="px-4 py-2 bg-gray-950 border border-gray-800 rounded-lg text-white focus:outline-none focus:border-red-500"
          >
            <option value="all">Todas las ciudades</option>
            {cities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        {/* Contador de resultados */}
        {searchTerm || categoryFilter !== 'all' || cityFilter !== 'all' ? (
          <div className="mt-3 text-sm text-gray-400">
            Mostrando {filteredEvents.length} de {stats.total} eventos
          </div>
        ) : null}
      </div>

      {/* Tabla de eventos */}
      {filteredEvents.length === 0 ? (
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 text-center">
          <Calendar className="w-12 h-12 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-400">No se encontraron eventos</p>
        </div>
      ) : (
        <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-950 border-b border-gray-800">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase">Evento</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase">Fecha</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase">Ubicación</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase">Categoría</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase">Precio Base</th>
                  <th className="text-center px-6 py-3 text-xs font-medium text-gray-400 uppercase">Estado</th>
                  <th className="text-center px-6 py-3 text-xs font-medium text-gray-400 uppercase">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {filteredEvents.map((event) => (
                  <EventRow key={event.id} event={event} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

interface EventRowProps {
  event: Event;
}

const EventRow = ({ event }: EventRowProps) => {
  return (
    <tr className="hover:bg-gray-800 transition-colors">
      {/* Evento con imagen */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <img
            src={event.image}
            alt={event.title}
            className="w-16 h-16 object-cover rounded-lg"
          />
          <div>
            <p className="text-sm font-medium text-white">{event.title}</p>
            <p className="text-xs text-gray-400">{event.mainFight}</p>
          </div>
        </div>
      </td>

      {/* Fecha */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-2 text-sm text-gray-300">
          <Calendar className="w-4 h-4 text-gray-400" />
          {new Date(event.date).toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
          })}
        </div>
      </td>

      {/* Ubicación */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-2 text-sm text-gray-300">
          <MapPin className="w-4 h-4 text-gray-400" />
          {event.location}
        </div>
      </td>

      {/* Categoría */}
      <td className="px-6 py-4">
        <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400">
          {event.category}
        </span>
      </td>

      {/* Precio Base */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-white">
          <DollarSign className="w-4 h-4 text-green-400" />
          {event.basePrice}€
        </div>
      </td>

      {/* Estado */}
      <td className="px-6 py-4">
        <div className="flex items-center justify-center">
          {event.isFeatured && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-400">
              <Star className="w-3 h-3" />
              Destacado
            </span>
          )}
        </div>
      </td>

      {/* Acciones */}
      <td className="px-6 py-4">
        <div className="flex items-center justify-center gap-2">
          <Link
            to={`/eventos/${event.id}/details`}
            target="_blank"
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
            title="Ver detalles"
          >
            <Eye className="w-4 h-4" />
          </Link>
        </div>
      </td>
    </tr>
  );
};
