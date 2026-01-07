# Milestone 2: Página de Mis Órdenes

**Objetivo:** Crear una página completa en el perfil del usuario donde pueda ver, filtrar y gestionar todas sus órdenes de compra con detalles completos.

**Fecha de inicio:** Enero 7, 2026  
**Estado:** 📋 En Progreso

---

## 📋 Lista de Tareas (To-Do List)

### Fase 1: Preparación y Estructura

- [ ] **1.1** Crear página MyOrdersPage
  - Crear archivo `app/pages/(protected)/MyOrdersPage.tsx`
  - Configurar como ruta protegida (requiere autenticación)
  - Estructura base con Header y Layout consistente
  - Padding top de 20 para compensar header fixed

- [ ] **1.2** Actualizar tipos TypeScript
  - Agregar tipo `OrderStatus` si no existe
  - Asegurar que interfaz `Order` tenga todos los campos necesarios
  - Crear tipo `OrderFilter` para filtros de órdenes
  - Definir tipo `OrderSortBy` para ordenamiento

- [ ] **1.3** Extender mockCheckoutService
  - Verificar método `getOrders(userId)` está implementado
  - Agregar método `getOrderById(orderId)` si no existe
  - Agregar método `cancelOrder(orderId)` (MOCK)
  - Asegurar persistencia correcta en localStorage

### Fase 2: Componentes Reutilizables

- [ ] **2.1** Crear componente OrderCard
  - Crear archivo `app/components/orders/OrderCard.tsx`
  - Mostrar información resumida de la orden:
    - Número de orden
    - Fecha de compra
    - Estado (badge con colores)
    - Total pagado
    - Cantidad de entradas
    - Evento(s) comprado(s)
  - Botón "Ver Detalles" expandible
  - Diseño: card con hover effect, bordes rojos
  - Props: `order: Order`, `onViewDetails?: () => void`

- [ ] **2.2** Crear componente OrderDetailsModal
  - Crear archivo `app/components/orders/OrderDetailsModal.tsx`
  - Modal full-screen o drawer en mobile
  - Mostrar información completa:
    - Resumen de items comprados
    - Información de envío/contacto
    - Método de pago utilizado
    - Desglose de precios (subtotal, descuento, total)
    - Código promocional usado (si aplica)
    - Timeline de la orden (fecha de compra)
  - Botón "Ver Entrada" para cada item
  - Botón "Descargar Resumen" (PDF simulado)
  - Botón cerrar modal
  - Props: `order: Order`, `isOpen: boolean`, `onClose: () => void`

- [ ] **2.3** Crear componente OrderFilters
  - Crear archivo `app/components/orders/OrderFilters.tsx`
  - Filtro por estado (Todas, Completadas, Pendientes, Canceladas)
  - Filtro por rango de fechas
  - Ordenamiento (Más reciente, Más antiguo, Mayor total, Menor total)
  - Buscador por número de orden o evento
  - Botón "Limpiar Filtros"
  - Props: `onFilterChange: (filters: OrderFilter) => void`

- [ ] **2.4** Crear componente OrderStatusBadge
  - Crear archivo `app/components/orders/OrderStatusBadge.tsx`
  - Badge con colores por estado:
    - Completada: Verde (bg-green-500)
    - Pendiente: Amarillo (bg-yellow-500)
    - Cancelada: Rojo (bg-red-500)
  - Icono correspondiente de Lucide
  - Props: `status: OrderStatus`

- [ ] **2.5** Crear componente EmptyOrdersState
  - Crear archivo `app/components/orders/EmptyOrdersState.tsx`
  - Mostrar cuando no hay órdenes
  - Icono de carrito vacío
  - Mensaje: "Aún no has realizado ninguna compra"
  - Botón CTA: "Ver Eventos Disponibles"
  - Diseño consistente con el resto del proyecto

### Fase 3: Página Principal MyOrdersPage

- [ ] **3.1** Implementar estructura base
  - Layout responsive (mobile y desktop)
  - Título de página: "Mis Órdenes"
  - Breadcrumbs: Inicio > Perfil > Mis Órdenes
  - Contador de órdenes totales
  - Loading state mientras carga datos

- [ ] **3.2** Integrar obtención de órdenes
  - Usar `useAuth()` para obtener userId
  - Llamar a `mockCheckoutService.getOrders(userId)`
  - Estado local para almacenar órdenes
  - useEffect para cargar al montar componente
  - Manejo de errores si falla la carga

- [ ] **3.3** Implementar sistema de filtrado
  - Estado local para filtros activos
  - Función de filtrado que procesa las órdenes
  - Aplicar filtros en tiempo real
  - Mostrar contador de resultados filtrados
  - Persistir filtros en URL query params (opcional)

- [ ] **3.4** Implementar listado de órdenes
  - Grid de OrderCard components
  - Responsive: 1 columna (mobile), 2 columnas (tablet), 2 columnas (desktop)
  - Ordenamiento aplicado
  - Animaciones al cargar (fade-in)
  - Paginación si hay muchas órdenes (>10)

- [ ] **3.5** Implementar vista de detalles
  - Estado para orden seleccionada
  - Abrir OrderDetailsModal al click en "Ver Detalles"
  - Pasar orden completa al modal
  - Cerrar modal y limpiar estado

- [ ] **3.6** Implementar estado vacío
  - Mostrar EmptyOrdersState si no hay órdenes
  - Después de aplicar filtros sin resultados
  - Mensaje diferente: "No se encontraron órdenes con estos filtros"

### Fase 4: Navegación e Integración

- [ ] **4.1** Agregar ruta en App.tsx
  - Importar MyOrdersPage
  - Agregar ruta: `/profile/orders`
  - Envolver en ProtectedRoute
  - Verificar navegación funciona

- [ ] **4.2** Agregar enlace en ProfilePage
  - Agregar botón/card "Mis Órdenes" en ProfilePage
  - Icono: ShoppingBag de Lucide
  - Mostrar cantidad de órdenes como badge
  - Link a `/profile/orders`

- [ ] **4.3** Agregar enlace en UserMenu (Header)
  - Agregar opción "Mis Órdenes" en dropdown de usuario
  - Icono: ShoppingBag
  - Entre "Mi Perfil" y "Configuración"
  - Navegación directa a `/profile/orders`

- [ ] **4.4** Integrar desde CheckoutPage
  - En paso 3 (Confirmación), botón "Ver Mis Entradas"
  - Debe navegar a `/profile/orders`
  - Resaltar la orden recién creada (si es posible)

### Fase 5: Funcionalidades Avanzadas

- [ ] **5.1** Implementar búsqueda
  - Campo de búsqueda en OrderFilters
  - Buscar por:
    - Número de orden
    - Nombre del evento
    - Email de contacto
  - Búsqueda en tiempo real (debounce 300ms)
  - Resaltar términos encontrados

- [ ] **5.2** Implementar ordenamiento
  - Dropdown de ordenamiento
  - Opciones:
    - Más reciente primero (default)
    - Más antiguo primero
    - Mayor total primero
    - Menor total primero
  - Aplicar ordenamiento inmediatamente

- [ ] **5.3** Implementar filtro de fechas
  - Date pickers para "Desde" y "Hasta"
  - Validación: "Desde" no puede ser mayor que "Hasta"
  - Botones rápidos: "Último mes", "Últimos 3 meses", "Último año"
  - Limpiar filtro de fechas

- [ ] **5.4** Implementar exportar órdenes
  - Botón "Exportar" en la página
  - Generar JSON con todas las órdenes filtradas
  - Descargar como archivo JSON
  - Preparado para futuro: CSV, PDF

- [ ] **5.5** Implementar estadísticas de usuario
  - Card con estadísticas en la parte superior:
    - Total gastado (suma de todas las órdenes)
    - Cantidad de órdenes completadas
    - Evento más comprado
    - Última compra (fecha)
  - Iconos de Lucide para cada estadística
  - Diseño: cards horizontales o verticales según espacio

### Fase 6: Estilos y Responsividad

- [ ] **6.1** Aplicar estilos consistentes
  - Fondo: `bg-black` o `bg-gradient-to-b from-gray-900 to-black`
  - Cards: `bg-gray-900/50 border border-gray-800`
  - Hover: `hover:border-red-500 transition-colors`
  - Badges: colores semánticos (verde, amarillo, rojo)
  - Botones: `bg-red-600 hover:bg-red-700`

- [ ] **6.2** Implementar diseño responsive
  - Mobile (< 768px):
    - 1 columna para cards
    - Filtros en dropdown colapsable
    - Modal full-screen
  - Tablet (768px - 1024px):
    - 2 columnas para cards
    - Filtros expandidos
  - Desktop (> 1024px):
    - 2 columnas para cards
    - Filtros en sidebar (opcional)
    - Modal centrado con overlay

- [ ] **6.3** Agregar animaciones
  - Fade-in al cargar órdenes
  - Slide-in para modal de detalles
  - Hover effects en cards
  - Loading spinner animado
  - Skeleton screens mientras carga

### Fase 7: Estados y Validaciones

- [ ] **7.1** Implementar estados de carga
  - Loading inicial al cargar órdenes
  - Skeleton cards mientras carga
  - Loading en filtros mientras procesa
  - Loading en exportar

- [ ] **7.2** Implementar manejo de errores
  - Error al cargar órdenes
  - Mensaje: "No pudimos cargar tus órdenes. Intenta de nuevo."
  - Botón "Reintentar"
  - Error en filtros (mostrar toast)
  - Error en exportar (mostrar toast)

- [ ] **7.3** Implementar validaciones
  - Usuario debe estar autenticado (ProtectedRoute)
  - Validar que fechas "Desde" < "Hasta"
  - Validar formato de búsqueda
  - Prevenir acciones duplicadas (doble click)

### Fase 8: Testing Manual

- [ ] **8.1** Testing de flujo completo
  - Usuario con 0 órdenes → Ver estado vacío
  - Usuario con órdenes → Ver listado
  - Click en "Ver Detalles" → Modal abre
  - Cerrar modal → Modal cierra correctamente
  - Aplicar filtros → Resultados actualizados
  - Limpiar filtros → Mostrar todas

- [ ] **8.2** Testing de filtros
  - Filtrar por estado "Completadas" → Solo completadas
  - Filtrar por estado "Canceladas" → Solo canceladas
  - Filtrar por rango de fechas → Resultados correctos
  - Buscar por número de orden → Encuentra orden
  - Ordenar por más reciente → Orden correcto

- [ ] **8.3** Testing responsive
  - Mobile (320px, 375px, 414px)
  - Tablet (768px, 1024px)
  - Desktop (1280px, 1920px)
  - Verificar que filtros sean accesibles
  - Verificar que modal se vea bien
  - Verificar que cards no se rompan

- [ ] **8.4** Testing de navegación
  - Desde ProfilePage → MyOrdersPage
  - Desde Header (UserMenu) → MyOrdersPage
  - Desde CheckoutPage confirmación → MyOrdersPage
  - Botón "Ver Eventos" en estado vacío → EventsPage
  - Breadcrumbs funcionan correctamente

### Fase 9: Integración con Milestone 5

- [ ] **9.1** Preparar para entradas con QR
  - Botón "Ver Entrada" en OrderDetailsModal
  - Navegar a `/tickets/:orderId` (preparado para Milestone 5)
  - Pasar datos de orden completa
  - Estado de "entrada vista" (preparado)

- [ ] **9.2** Mostrar estado de entradas
  - Badge en OrderCard: "Entradas disponibles"
  - Icono de ticket
  - Click rápido para ver entradas
  - Preparado para QR code

### Fase 10: Documentación y Cleanup

- [ ] **10.1** Actualizar README.md
  - Agregar sección "Mis Órdenes"
  - Actualizar ruta `/profile/orders` en lista de rutas
  - Documentar funcionalidades implementadas

- [ ] **10.2** Actualizar DOCUMENTACION.md
  - Agregar sección "Módulo de Mis Órdenes"
  - Documentar componentes nuevos
  - Documentar flujos de usuario
  - Agregar ejemplos de código

- [ ] **10.3** Actualizar CHANGELOG.md
  - Agregar entrada para versión nueva (v1.7.0)
  - Listar características agregadas
  - Listar componentes nuevos
  - Listar rutas nuevas

- [ ] **10.4** Verificación final TypeScript
  - Ejecutar `npm run typecheck`
  - Corregir todos los errores de tipos
  - Asegurar que no haya `any` types

- [ ] **10.5** Limpieza de código
  - Eliminar console.logs de debug
  - Eliminar código comentado
  - Verificar imports no utilizados
  - Ejecutar `npm run lint` y corregir warnings

---

## 🎯 Criterios de Aceptación

### Funcionales
- [ ] Usuario puede ver todas sus órdenes en `/profile/orders`
- [ ] Usuario puede filtrar órdenes por estado
- [ ] Usuario puede buscar órdenes por número o evento
- [ ] Usuario puede ordenar órdenes por diferentes criterios
- [ ] Usuario puede ver detalles completos de cada orden
- [ ] Usuario ve estado vacío si no tiene órdenes
- [ ] Usuario puede acceder desde múltiples puntos (perfil, header, checkout)
- [ ] Usuario ve estadísticas de sus compras
- [ ] Las órdenes se cargan desde localStorage correctamente
- [ ] Los filtros funcionan en tiempo real

### No Funcionales
- [ ] Diseño consistente con el resto de la aplicación
- [ ] Responsive en mobile, tablet y desktop
- [ ] Loading states implementados
- [ ] Error handling implementado
- [ ] Animaciones suaves y profesionales
- [ ] Código TypeScript con tipos correctos
- [ ] Componentes reutilizables y modulares
- [ ] Performance: carga rápida incluso con muchas órdenes

### Técnicos
- [ ] No hay errores en consola
- [ ] TypeScript compila sin errores
- [ ] Lint pasa sin warnings críticos
- [ ] Código sigue convenciones del proyecto
- [ ] Persistencia en localStorage funciona
- [ ] Navegación integrada correctamente
- [ ] Preparado para Milestone 5 (QR)

---

## 📁 Estructura de Archivos a Crear

```
app/
├── components/
│   └── orders/                        # Nuevos componentes de órdenes
│       ├── OrderCard.tsx              # Card individual de orden
│       ├── OrderDetailsModal.tsx      # Modal de detalles completos
│       ├── OrderFilters.tsx           # Filtros y búsqueda
│       ├── OrderStatusBadge.tsx       # Badge de estado
│       └── EmptyOrdersState.tsx       # Estado vacío
└── pages/
    └── (protected)/
        └── MyOrdersPage.tsx           # Página principal de órdenes
```

---

## 🔄 Dependencias

### Internas
- `app/providers/AuthProvider.tsx` - Para obtener usuario actual
- `app/lib/checkout/services/mockCheckoutService.ts` - Para obtener órdenes
- `app/lib/checkout/types.ts` - Para tipos de Order
- `app/lib/events/types.ts` - Para tipos de eventos

### Externas (ya instaladas)
- `react-router-dom` - Para navegación
- `lucide-react` - Para iconos
- `tailwindcss` - Para estilos

### Nuevas (si es necesario)
- Ninguna (usaremos las existentes)

---

## 🚀 Próximos Pasos Después del Milestone

1. **Milestone 5**: Generación de entradas con QR code
2. **Milestone 3**: Panel de administración para gestionar eventos
3. **Milestone 4**: Sistema de notificaciones por email (simulado)

---

## ⚠️ Notas Importantes

- **MOCK System**: Las órdenes se obtienen de localStorage
- **Preparación para QR**: Botones "Ver Entrada" preparados para Milestone 5
- **Escalabilidad**: Estructura preparada para paginación futura
- **Performance**: Optimizar si hay más de 50 órdenes (implementar virtualización)

---

## 📝 Notas del Desarrollador

_Espacio para que el desarrollador agregue notas durante la implementación_

```
// Ejemplo:
// - Decidí usar modal en lugar de página separada para detalles
// - Agregé animaciones con framer-motion para mejor UX
// - Implementé virtual scroll para listas largas
```

---

**Creado:** Enero 7, 2026  
**Versión del Proyecto:** 1.6.0 → 1.7.0  
**Estimación de Tiempo:** 2-3 días de desarrollo

