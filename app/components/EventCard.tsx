import { Link } from 'react-router-dom';
import { Calendar, MapPin, Tag } from 'lucide-react';
import { FightEvent } from '../types/event';

interface EventCardProps {
  event: FightEvent;
}

const categoryLabels = {
  MMA: 'MMA',
  BOXEO: 'Boxeo',
  MUAY_THAI: 'Muay Thai',
  KICKBOXING: 'Kickboxing',
  BJJ: 'BJJ',
  WRESTLING: 'Wrestling',
};

export function EventCard({ event }: EventCardProps) {
  const formattedDate = new Date(event.date).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <Link to={`/eventos/${event.id}/details`} className="block">
      <div className="group relative bg-gradient-to-b from-gray-900 to-black rounded-xl overflow-hidden border border-gray-800 hover:border-red-500/50 transition-all duration-300 hover:scale-[1.02]">
        {event.isHighlight && (
          <div className="absolute top-4 right-4 z-10 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            DESTACADO
          </div>
        )}

        <div className="relative h-48 overflow-hidden">
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

          <div className="absolute bottom-3 left-3">
            <span className="inline-block bg-red-500/90 text-white text-xs font-bold px-2 py-1 rounded">
              {categoryLabels[event.category]}
            </span>
          </div>
        </div>

        <div className="p-5">
          <h3 className="text-white text-xl font-bold mb-2">{event.title}</h3>
          <p className="text-red-400 text-sm font-semibold mb-4">{event.mainFight}</p>

          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <Calendar className="w-4 h-4" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <MapPin className="w-4 h-4" />
              <span>{event.location}</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-800">
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-gray-400" />
              <span className="text-white text-lg font-bold">Desde {event.price}€</span>
            </div>
            <button 
              type="button"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = `/eventos/${event.id}/details`;
              }}
              aria-label={`Ver detalles de ${event.title}`}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-semibold"
            >
              Ver Detalles
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
