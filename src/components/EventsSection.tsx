import { EventCard } from './EventCard';
import { upcomingEvents } from '../data/events';

export function EventsSection() {
  const highlightedEvents = upcomingEvents.filter(event => event.isHighlight);
  const otherEvents = upcomingEvents.filter(event => !event.isHighlight);

  return (
    <section id="eventos" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Próximos Eventos
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Las mejores veladas de deportes de contacto. No te pierdas la acción.
          </p>
        </div>

        {highlightedEvents.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="text-red-500">★</span> Destacados
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {highlightedEvents.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        )}

        {otherEvents.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">Más eventos</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherEvents.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
