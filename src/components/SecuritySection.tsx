import { ShieldCheck, Lock, CheckCircle, FileCheck } from 'lucide-react';

const securityFeatures = [
  {
    icon: ShieldCheck,
    title: 'Protección del Comprador',
    description: 'Garantía de devolución 100% si el evento se cancela. Tu inversión está protegida.',
  },
  {
    icon: Lock,
    title: 'Datos Encriptados',
    description: 'SSL de 256 bits. Tus datos personales y bancarios están completamente seguros.',
  },
  {
    icon: CheckCircle,
    title: 'Validación en Tiempo Real',
    description: 'Sistema de verificación instantánea para asegurar la autenticidad de cada entrada.',
  },
  {
    icon: FileCheck,
    title: 'Comprobante Digital',
    description: 'Recibe un comprobante oficial con código QR único e intransferible.',
  },
];

export function SecuritySection() {
  return (
    <section id="seguridad" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Compra con Total
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                {' '}Confianza
              </span>
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Utilizamos la más avanzada tecnología de seguridad y protección de datos.
              Cada transacción está respaldada por nuestro sistema de garantías.
            </p>

            <div className="space-y-4">
              {securityFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex gap-4 items-start">
                    <div className="bg-red-500/10 p-3 rounded-lg flex-shrink-0">
                      <Icon className="w-5 h-5 text-red-500" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">{feature.title}</h3>
                      <p className="text-gray-400 text-sm">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/320px-PayPal.svg.png"
                alt="PayPal"
                className="h-8 opacity-60 hover:opacity-100 transition-opacity"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/320px-Visa_Inc._logo.svg.png"
                alt="Visa"
                className="h-8 opacity-60 hover:opacity-100 transition-opacity"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/320px-Mastercard-logo.svg.png"
                alt="Mastercard"
                className="h-8 opacity-60 hover:opacity-100 transition-opacity"
              />
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-500/20 blur-3xl"></div>
            <div className="relative bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-8">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500/10 rounded-full mb-4">
                  <ShieldCheck className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-white text-2xl font-bold mb-2">Certificado de Seguridad</h3>
                <p className="text-gray-400 text-sm">Todas las transacciones están protegidas</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between bg-black/50 p-3 rounded-lg">
                  <span className="text-gray-400 text-sm">Encriptación SSL</span>
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
                <div className="flex items-center justify-between bg-black/50 p-3 rounded-lg">
                  <span className="text-gray-400 text-sm">Verificación 2FA</span>
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
                <div className="flex items-center justify-between bg-black/50 p-3 rounded-lg">
                  <span className="text-gray-400 text-sm">Protección Antifraude</span>
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
                <div className="flex items-center justify-between bg-black/50 p-3 rounded-lg">
                  <span className="text-gray-400 text-sm">Garantía de Reembolso</span>
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-800 text-center">
                <p className="text-gray-500 text-xs">
                  Certificado por las principales autoridades de seguridad digital
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
