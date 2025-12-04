import { Flame, Instagram, Twitter, Facebook, Mail } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Flame className="w-8 h-8 text-red-500" />
              <span className="text-white text-xl font-bold">STRIKE & GROUND</span>
            </div>

            <div className="flex gap-4">
              <a
                href="#"
                className="bg-gray-900 hover:bg-gray-800 p-2 rounded-lg transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-gray-400" />
              </a>
              <a
                href="#"
                className="bg-gray-900 hover:bg-gray-800 p-2 rounded-lg transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5 text-gray-400" />
              </a>
              <a
                href="#"
                className="bg-gray-900 hover:bg-gray-800 p-2 rounded-lg transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 text-gray-400" />
              </a>
              <a
                href="#"
                className="bg-gray-900 hover:bg-gray-800 p-2 rounded-lg transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5 text-gray-400" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <a href="#eventos" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Próximos Eventos
                </a>
              </li>
              <li>
                <a href="#beneficios" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Por Qué Nosotros
                </a>
              </li>
              <li>
                <a href="#seguridad" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Seguridad
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Términos y Condiciones
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Política de Privacidad
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Política de Reembolso
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Contacto
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-900 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © {currentYear} Strike & Ground. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
