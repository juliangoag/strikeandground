# 🥊 Strike & Ground

Plataforma web de venta de entradas para eventos de deportes de contacto (MMA, Boxeo, Kickboxing, Muay Thai, BJJ, Wrestling).

## 🚀 Quick Start

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Abrir en navegador
# http://localhost:5174
```

## 🔑 Credenciales Demo

El sistema incluye un usuario demo precargado:

```
Email: demo@strikeandground.com
Password: Demo123!
```

**Uso:** Click en "Iniciar Sesión" → "Usar credenciales demo" → "Iniciar Sesión"

## ✨ Funcionalidades

### Implementado ✅

- **Sistema de Autenticación (MOCK)**
  - Registro de usuarios con validación completa
  - Inicio y cierre de sesión
  - Recuperación de contraseña
  - Verificación de email automática
  - Persistencia de sesión (7 días)

- **Gestión de Perfil**
  - Perfil de usuario editable
  - Avatar automático (Dicebear API)
  - Upload de avatar personalizado
  - Compresión automática de imágenes

- **Configuración de Usuario**
  - Cambio de contraseña con validación segura
  - Preferencias de notificaciones
  - Control de privacidad
  - Eliminación de cuenta

- **Catálogo de Eventos**
  - Landing page moderna y responsive
  - Página dedicada de eventos con sistema de búsqueda avanzada
  - Filtros por ciudad y categoría de deporte
  - Buscador de eventos en tiempo real
  - Listado de eventos destacados y regulares
  - Información detallada de cada evento
  - Diseño optimizado para conversión

### Pendiente ⚠️

- Backend real (actualmente usa localStorage)
- Sistema de compra de entradas
- Pasarela de pago (Stripe/PayPal)
- Panel de administración
- Generación de entradas con QR

## 🎯 Stack Tecnológico

```
Frontend:
├── React 18.3.1           # Framework UI
├── TypeScript 5.5.3       # Tipado estático
├── React Router 6.x       # Navegación
├── Tailwind CSS 3.4.1     # Estilos
├── Lucide React 0.344.0   # Iconos
└── Vite 5.4.2             # Build tool

Backend (MOCK):
└── localStorage           # Almacenamiento simulado
```

## 📁 Estructura del Proyecto

```
src/
├── auth/                  # Módulo de autenticación
│   ├── components/        # UI de auth (modals, forms, etc.)
│   ├── context/           # AuthContext + useAuth hook
│   ├── services/          # mockAuthService (lógica MOCK)
│   └── types/             # Tipos TypeScript
├── components/            # Componentes globales
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── EventsSection.tsx
│   ├── EventCard.tsx
│   ├── SearchBar.tsx
│   ├── BenefitsSection.tsx
│   ├── SecuritySection.tsx
│   └── Footer.tsx
├── pages/                 # Páginas de la aplicación
│   ├── HomePage.tsx
│   ├── EventsPage.tsx
│   ├── ProfilePage.tsx
│   └── SettingsPage.tsx
├── data/                  # Datos estáticos
│   └── events.ts
├── types/                 # Definiciones TypeScript
│   └── event.ts
├── App.tsx                # Componente raíz + Router
└── main.tsx               # Entry point
```

## 🛠️ Comandos Disponibles

```bash
# Desarrollo
npm run dev              # Iniciar servidor de desarrollo

# Build
npm run build            # Build de producción
npm run preview          # Preview del build

# Calidad de código
npm run lint             # Linting con ESLint
npm run typecheck        # Verificación de tipos TypeScript
```

## 📚 Documentación Completa

Para información detallada sobre arquitectura, API, guías de desarrollo y migración a producción, consulta:

📖 **[DOCUMENTACION.md](./DOCUMENTACION.md)** - Documentación técnica completa

📝 **[CHANGELOG.md](./CHANGELOG.md)** - Historial de cambios e implementaciones

## 🎨 Rutas Disponibles

```
/           → Landing page (pública)
/eventos    → Catálogo completo de eventos con filtros (pública)
/profile    → Perfil de usuario (protegida, requiere login)
/settings   → Configuración de usuario (protegida, requiere login)
```

## ⚠️ Nota Importante: Sistema MOCK

Este proyecto usa un **sistema MOCK** para autenticación y almacenamiento:

- ✅ Perfecto para desarrollo, demos y prototipado
- ✅ No requiere servidor backend
- ✅ Funcionalidad completa en el navegador
- ❌ **NO apto para producción** (contraseñas sin encriptar, localStorage)

Para producción, ver la guía de migración en [DOCUMENTACION.md](./DOCUMENTACION.md#migración-a-producción).

## 🔐 Seguridad

Las contraseñas en el sistema MOCK se almacenan en **texto plano** en localStorage. Para producción necesitas:

- Backend real (Supabase, Firebase, o custom)
- Contraseñas hasheadas (bcrypt)
- HTTPS obligatorio
- Tokens JWT
- Rate limiting

## 🚀 Próximos Pasos

1. **Probar el sistema**: Usa las credenciales demo y explora todas las funcionalidades
2. **Leer la documentación**: Revisa `DOCUMENTACION.md` para entender la arquitectura
3. **Migrar a producción**: Sigue la guía de migración cuando estés listo
4. **Implementar compras**: Integrar sistema de compra de entradas real

## 🐛 Solución Rápida de Problemas

### El servidor no inicia
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Sesión no persiste
Verifica que no estés en modo incógnito del navegador.

### Credenciales demo no funcionan
```javascript
// En consola del navegador:
localStorage.clear()
// Luego refrescar la página
```

## 📊 Estado del Proyecto

```
🟢 Frontend:     100% completo
🟡 Backend:      MOCK funcional
🔴 Producción:   Requiere migración
```

## 📄 Licencia

[Especificar licencia del proyecto]

---

**Versión**: 1.1.0 (MOCK)  
**Última actualización**: Diciembre 4, 2025  
**Estado**: ✅ Sistema MOCK completamente funcional

---

*¿Necesitas ayuda? Revisa la [documentación completa](./DOCUMENTACION.md) o busca en [solución de problemas](./DOCUMENTACION.md#solución-de-problemas).*

