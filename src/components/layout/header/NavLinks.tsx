import { Link } from 'react-router-dom';

const NAV_ITEMS = [
  { href: '/eventos', label: 'Eventos' },
  { href: '/#beneficios', label: 'Por qué nosotros' },
  { href: '/#seguridad', label: 'Seguridad' },
] as const;

/**
 * Enlaces de navegación principal
 * Oculto en mobile, visible en desktop
 */
export function NavLinks() {
  return (
    <nav className="hidden md:flex items-center gap-8" role="navigation">
      {NAV_ITEMS.map((item) => {
        const isExternal = item.href.startsWith('/#');
        
        if (isExternal) {
          return (
            <a
              key={item.href}
              href={item.href}
              className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
            >
              {item.label}
            </a>
          );
        }
        
        return (
          <Link
            key={item.href}
            to={item.href}
            className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

