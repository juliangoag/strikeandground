import { Zap } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/4761792/pexels-photo-4761792.jpeg')] bg-cover bg-center opacity-20"></div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-full px-4 py-2 mb-8">
          <Zap className="w-4 h-4 text-red-500" />
          <span className="text-red-400 text-sm font-medium">Eventos próximamente agotados</span>
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
          {/* Vive la Adrenalina<br /> */}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
            Strike & Ground
          </span>
        </h1>

        <p className="text-gray-300 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          La plataforma líder en deportes de contacto.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#eventos"
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg transition-all font-semibold text-lg shadow-lg shadow-red-500/30 hover:shadow-red-500/50 w-full sm:w-auto"
          >
            Próximos Eventos
          </a>
          <button className="border-2 border-gray-700 hover:border-gray-600 text-white px-8 py-4 rounded-lg transition-all font-semibold text-lg w-full sm:w-auto">
            ¿Cómo funciona?
          </button>
        </div>

        <div className="grid grid-cols-3 gap-8 mt-20 max-w-3xl mx-auto">
          <div>
            <div className="text-4xl font-bold text-white mb-2">+50</div>
            <div className="text-gray-400 text-sm">Eventos anuales</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-white mb-2">100%</div>
            <div className="text-gray-400 text-sm">Seguro y verificado</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-white mb-2">24/7</div>
            <div className="text-gray-400 text-sm">Soporte activo</div>
          </div>
        </div>
      </div>
    </section>
  );
}
