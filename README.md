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
  - Página de detalles completa para cada evento
  - Sistema de navegación fluida entre eventos
  - Información detallada con cartelera de peleas
  - Sidebar de compra de entradas con múltiples opciones
  - Diseño optimizado para conversión

- **Sistema de Compras (MOCK)**
  - Carrito de compras completo con persistencia
  - Icono de carrito en Header con badge de cantidad
  - Dropdown de vista rápida del carrito
  - Agregar entradas desde página de detalles del evento
  - Selección de tipo de entrada (General, VIP, Ringside)
  - Selector de cantidad de entradas
  - Proceso de checkout completo en 3 pasos
  - Formulario de información de contacto
  - Múltiples métodos de pago (Tarjeta, PayPal, Bizum)
  - Sistema de códigos promocionales con descuentos
  - Simulación de procesamiento de pago
  - Confirmación de órdenes con número único
  - Almacenamiento de órdenes en localStorage
  - Notificaciones toast al agregar al carrito

### Pendiente ⚠️

- Backend real (actualmente usa localStorage)
- Pasarela de pago real (Stripe/PayPal)
- Panel de administración
- Generación de entradas con QR
- Página "Mis Órdenes" en perfil de usuario
- Sistema de notificaciones en tiempo real

## 🎯 Stack Tecnológico

```
Frontend:
├── React 18.3.1           # Framework UI
├── TypeScript 5.5.3       # Tipado estático
├── React Router 7.x       # Navegación
├── Tailwind CSS 3.4.1     # Estilos
├── Lucide React 0.344.0   # Iconos
└── Vite 5.4.2             # Build tool

Backend (MOCK):
└── localStorage           # Almacenamiento simulado
```

## 📚 Documentación Completa

La documentación completa del proyecto está en la carpeta `documentacion/`:

- 📘 [**Documentación Técnica**](documentacion/DOCUMENTACION.md) - Arquitectura, API y guías completas
- 📝 [**Changelog**](documentacion/CHANGELOG.md) - Historial de cambios e implementaciones
- 🎯 [**Milestone 1**](documentacion/Milestone-1.md) - Plan de implementación Checkout

## 🎨 Rutas Disponibles

### Rutas Públicas
```
/                      → Landing page
/eventos               → Catálogo completo de eventos con filtros
/eventos/:id/details   → Detalles de un evento específico
/checkout              → Proceso de compra (requiere items en carrito)
```

### Rutas Protegidas (requieren autenticación)
```
/profile               → Perfil de usuario
/profile/settings      → Configuración de usuario
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

## ⚠️ Nota Importante: Sistema MOCK

Este proyecto usa un **sistema MOCK** para autenticación, carrito y procesamiento de órdenes:

- ✅ Perfecto para desarrollo, demos y prototipado
- ✅ No requiere servidor backend
- ✅ Funcionalidad completa en el navegador
- ❌ **NO apto para producción** (datos sin encriptar, localStorage)

Para producción, ver la guía de migración en [DOCUMENTACION.md](documentacion/DOCUMENTACION.md#10-migración-a-producción).

## 🔐 Seguridad

Las contraseñas en el sistema MOCK se almacenan en **texto plano** en localStorage. Para producción necesitas:

- Backend real (Supabase, Firebase, o custom)
- Contraseñas hasheadas (bcrypt)
- HTTPS obligatorio
- Tokens JWT
- Rate limiting
- Pasarela de pago real (Stripe/PayPal)

## 🚀 Próximos Pasos

1. **Probar el sistema**: Usa las credenciales demo y explora todas las funcionalidades
2. **Leer la documentación**: Revisa `documentacion/DOCUMENTACION.md` para entender la arquitectura
3. **Migrar a producción**: Sigue la guía de migración cuando estés listo
4. **Implementar backend real**: Integrar con Supabase o tu backend preferido

## 🐛 Solución Rápida de Problemas

### El servidor no inicia
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Sesión no persiste
Verifica que no estés en modo incógnito del navegador.

### Credenciales demo no funcionan
```javascript
// En consola del navegador:
localStorage.clear()
// Luego refrescar la página
```

### Carrito vacío después de refrescar
El carrito persiste en localStorage. Si se vació, puede ser que el navegador limpió localStorage o estás en modo incógnito.

## 📊 Estado del Proyecto

```
🟢 Frontend:     100% completo
🟢 Carrito:      100% funcional (MOCK)
🟢 Checkout:     100% funcional (MOCK)
🟡 Backend:      MOCK funcional
🔴 Producción:   Requiere migración a backend real
```

## 📄 Licencia

[Especificar licencia del proyecto]

---

**Versión**: 1.5.1 (MOCK)  
**Última actualización**: Diciembre 22, 2025  
**Estado**: ✅ Sistema MOCK completamente funcional + Código 100% Auditado

---

*¿Necesitas ayuda? Revisa la [documentación completa](documentacion/DOCUMENTACION.md) o busca en la sección de [solución de problemas](documentacion/DOCUMENTACION.md#11-solución-de-problemas).*

