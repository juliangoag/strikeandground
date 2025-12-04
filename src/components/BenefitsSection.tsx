import { Ticket, Shield, Clock, Star } from 'lucide-react';

const benefits = [
  {
    icon: Ticket,
    title: 'Entradas Verificadas',
    description: 'Todas nuestras entradas están 100% verificadas y garantizadas. Sin sorpresas.',
  },
  {
    icon: Shield,
    title: 'Pago Seguro',
    description: 'Transacciones protegidas con encriptación de nivel bancario. Tu dinero está seguro.',
  },
  {
    icon: Clock,
    title: 'Entrega Instantánea',
    description: 'Recibe tus entradas digitales al instante por email. Listos para usar.',
  },
  {
    icon: Star,
    title: 'Mejores Ubicaciones',
    description: 'Acceso prioritario a los mejores asientos. Vive la acción de cerca.',
  },
];

export function BenefitsSection() {
  return (
    <section id="beneficios" className="py-20 bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            ¿Por Qué Elegirnos?
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            La forma más segura y confiable de conseguir tus entradas para eventos de deportes de contacto.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="bg-gradient-to-b from-gray-900 to-black p-6 rounded-xl border border-gray-800 hover:border-red-500/50 transition-all duration-300 group"
              >
                <div className="bg-red-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-red-500/20 transition-colors">
                  <Icon className="w-6 h-6 text-red-500" />
                </div>
                <h3 className="text-white text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{benefit.description}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-3">
            +10,000 Clientes Satisfechos
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Miles de aficionados ya han vivido experiencias inolvidables gracias a nosotros.
            Únete a la comunidad.
          </p>
          <div className="flex items-center justify-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
            ))}
            <span className="ml-2 text-white font-semibold">4.9/5</span>
          </div>
        </div>
      </div>
    </section>
  );
}
