import { useParams, useNavigate, Link } from 'react-router-dom';
import { Calendar, MapPin, Tag, Clock, Users, ArrowLeft, Ticket } from 'lucide-react';
import { upcomingEvents } from '../data/events';

const categoryLabels = {
  MMA: 'MMA',
  BOXEO: 'Boxeo',
  MUAY_THAI: 'Muay Thai',
  KICKBOXING: 'Kickboxing',
  BJJ: 'BJJ',
  WRESTLING: 'Wrestling',
};

export function EventDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Buscar el evento por ID
  const event = upcomingEvents.find((e) => e.id === id);

  // Si no existe el evento, mostrar error
  if (!event) {
    return (
      <div className="min-h-screen bg-black pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Evento no encontrado</h1>
          <p className="text-gray-400 mb-8">
            El evento que buscas no existe o ha sido eliminado.
          </p>
          <Link
            to="/eventos"
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors font-semibold"
          >
            <ArrowLeft className="w-5 h-5" />
            Ver todos los eventos
          </Link>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(event.date).toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const formattedTime = new Date(event.date).toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="min-h-screen bg-black pt-20">
      {/* Hero Section con imagen */}
      <div className="relative h-[400px] md:h-[500px]">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>

        {/* Badge de categoría */}
        <div className="absolute top-8 left-8">
          <span className="inline-block bg-red-500 text-white text-sm font-bold px-4 py-2 rounded-lg">
            {categoryLabels[event.category]}
          </span>
        </div>

        {/* Badge destacado */}
        {event.isHighlight && (
          <div className="absolute top-8 right-8">
            <span className="inline-block bg-yellow-500 text-black text-sm font-bold px-4 py-2 rounded-lg">
              ⭐ DESTACADO
            </span>
          </div>
        )}

        {/* Contenido sobre la imagen */}
        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white hover:text-red-500 transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Volver</span>
          </button>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            {event.title}
          </h1>
          <p className="text-2xl md:text-3xl text-red-400 font-semibold">
            {event.mainFight}
          </p>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna principal - Información del evento */}
          <div className="lg:col-span-2 space-y-8">
            {/* Información básica */}
            <div className="bg-gradient-to-b from-gray-900 to-black rounded-xl p-6 border border-gray-800">
              <h2 className="text-2xl font-bold text-white mb-6">
                Información del Evento
              </h2>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <Calendar className="w-6 h-6 text-red-500 mt-1" />
                  <div>
                    <p className="text-white font-semibold">Fecha y Hora</p>
                    <p className="text-gray-400 capitalize">{formattedDate}</p>
                    <p className="text-gray-400">{formattedTime}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-red-500 mt-1" />
                  <div>
                    <p className="text-white font-semibold">Ubicación</p>
                    <p className="text-gray-400">{event.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Tag className="w-6 h-6 text-red-500 mt-1" />
                  <div>
                    <p className="text-white font-semibold">Precio</p>
                    <p className="text-gray-400">Desde {event.price}€</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 text-red-500 mt-1" />
                  <div>
                    <p className="text-white font-semibold">Duración Estimada</p>
                    <p className="text-gray-400">Aproximadamente 4 horas</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Descripción */}
            <div className="bg-gradient-to-b from-gray-900 to-black rounded-xl p-6 border border-gray-800">
              <h2 className="text-2xl font-bold text-white mb-4">
                Sobre el Evento
              </h2>
              <p className="text-gray-300 leading-relaxed">
                {event.title} es uno de los eventos más esperados del año en {categoryLabels[event.category]}.
                La velada estará encabezada por el enfrentamiento entre los mejores competidores
                en el combate principal: <span className="text-red-400 font-semibold">{event.mainFight}</span>.
              </p>
              <p className="text-gray-300 leading-relaxed mt-4">
                Este evento promete ser una noche llena de acción, técnica y emoción,
                reuniendo a algunos de los mejores peleadores de la región. No te pierdas
                la oportunidad de vivir esta experiencia única en {event.location}.
              </p>
            </div>

            {/* Cartelera de peleas */}
            <div className="bg-gradient-to-b from-gray-900 to-black rounded-xl p-6 border border-gray-800">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Users className="w-6 h-6 text-red-500" />
                Cartelera de Peleas
              </h2>

              <div className="space-y-4">
                {/* Combate Principal */}
                <div className="bg-black/50 rounded-lg p-4 border-l-4 border-red-500">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-red-500 text-sm font-bold">COMBATE PRINCIPAL</span>
                    <span className="text-gray-400 text-sm">5 Rounds</span>
                  </div>
                  <p className="text-white text-lg font-bold">{event.mainFight}</p>
                  <p className="text-gray-400 text-sm mt-1">{categoryLabels[event.category]}</p>
                </div>

                {/* Combates de ejemplo (puedes expandir esto con datos reales) */}
                <div className="bg-black/30 rounded-lg p-4 border-l-4 border-gray-600">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-sm font-semibold">CO-MAIN EVENT</span>
                    <span className="text-gray-400 text-sm">3 Rounds</span>
                  </div>
                  <p className="text-white font-semibold">Pendiente de Confirmar</p>
                  <p className="text-gray-400 text-sm mt-1">{categoryLabels[event.category]}</p>
                </div>

                <div className="text-center py-4">
                  <p className="text-gray-400 text-sm">+ Más combates por confirmar</p>
                </div>
              </div>
            </div>
          </div>

          {/* Columna lateral - Compra de entradas */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-b from-gray-900 to-black rounded-xl p-6 border border-gray-800 sticky top-24">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Ticket className="w-5 h-5 text-red-500" />
                Comprar Entradas
              </h3>

              <div className="space-y-4 mb-6">
                {/* Tipo de entrada */}
                <div className="bg-black/50 rounded-lg p-4 border border-gray-700 hover:border-red-500 transition-colors cursor-pointer">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-white font-semibold">General</p>
                      <p className="text-gray-400 text-sm">Acceso general al evento</p>
                    </div>
                    <p className="text-white font-bold">{event.price}€</p>
                  </div>
                </div>

                <div className="bg-black/50 rounded-lg p-4 border border-gray-700 hover:border-red-500 transition-colors cursor-pointer">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-white font-semibold">VIP</p>
                      <p className="text-gray-400 text-sm">Asientos preferenciales</p>
                    </div>
                    <p className="text-white font-bold">{event.price * 2}€</p>
                  </div>
                </div>

                <div className="bg-black/50 rounded-lg p-4 border border-gray-700 hover:border-red-500 transition-colors cursor-pointer">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-white font-semibold">Ringside</p>
                      <p className="text-gray-400 text-sm">Primera fila</p>
                    </div>
                    <p className="text-white font-bold">{event.price * 3}€</p>
                  </div>
                </div>
              </div>

              <button className="w-full bg-red-600 hover:bg-red-700 text-white px-6 py-4 rounded-lg transition-colors font-bold text-lg mb-3">
                Comprar Ahora
              </button>

              <p className="text-gray-400 text-xs text-center">
                Entradas limitadas. Los precios pueden variar según disponibilidad.
              </p>

              {/* Información adicional */}
              <div className="mt-6 pt-6 border-t border-gray-800">
                <h4 className="text-white font-semibold mb-3">Información Importante</h4>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">•</span>
                    <span>Las puertas abren 1 hora antes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">•</span>
                    <span>Evento para mayores de 18 años</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">•</span>
                    <span>No se permiten reembolsos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">•</span>
                    <span>Entradas digitales enviadas por email</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Eventos relacionados */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-white mb-8">Otros Eventos</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingEvents
              .filter((e) => e.id !== event.id)
              .slice(0, 3)
              .map((relatedEvent) => (
                <Link
                  key={relatedEvent.id}
                  to={`/eventos/${relatedEvent.id}/details`}
                  className="group bg-gradient-to-b from-gray-900 to-black rounded-xl overflow-hidden border border-gray-800 hover:border-red-500 transition-all"
                >
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={relatedEvent.imageUrl}
                      alt={relatedEvent.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-white font-bold mb-1">{relatedEvent.title}</h3>
                    <p className="text-red-400 text-sm">{relatedEvent.mainFight}</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

