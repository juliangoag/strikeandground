# Milestone 3: Panel de Administración

**Objetivo:** Implementar un panel completo de administración para gestionar eventos, visualizar estadísticas de ventas, gestionar usuarios y validar tickets escaneados.

**Fecha de inicio:** Enero 8, 2026  
**Estado:** 📋 En Progreso

---

## 📋 Lista de Tareas (To-Do List)

### Fase 1: Sistema de Roles

- [ ] **1.1** Actualizar tipo User con campo role
  - Modificar `app/lib/auth/types.ts`
  - Agregar campo `role: 'user' | 'admin'` a interfaz User
  - Valor por defecto: 'user'
  - Usuario demo debe ser admin

- [ ] **1.2** Actualizar mockAuthService
  - En registro, asignar role 'user' por defecto
  - Actualizar DEMO_USER con role 'admin'
  - Función helper `isAdmin(user)` para verificar rol

- [ ] **1.3** Crear componente AdminRoute
  - Crear `app/lib/auth/components/AdminRoute.tsx`
  - Similar a ProtectedRoute pero verifica rol admin
  - Mostrar página "Acceso Denegado" si no es admin
  - Redirigir a login si no está autenticado

### Fase 2: Dashboard Administrativo

- [ ] **2.1** Crear página AdminDashboard
  - Crear archivo `app/pages/(protected)/admin/AdminDashboard.tsx`
  - Ruta: `/admin`
  - Layout con sidebar de navegación
  - Estadísticas principales en cards

- [ ] **2.2** Implementar estadísticas generales
  - Total de eventos (publicados, borradores)
  - Total de órdenes (completadas, pendientes, totales)
  - Ingresos totales (suma de órdenes completadas)
  - Total de usuarios registrados
  - Total de tickets generados
  - Total de tickets validados

- [ ] **2.3** Implementar gráficos (opcional)
  - Ventas por mes (preparado para futuro)
  - Eventos más vendidos
  - Por ahora: tablas con datos

- [ ] **2.4** Implementar tabla de órdenes recientes
  - Últimas 10 órdenes
  - Información: ID, usuario, total, fecha, estado
  - Link a detalles de orden
  - Filtro rápido por estado

- [ ] **2.5** Implementar accesos rápidos
  - Botón "Crear Nuevo Evento"
  - Botón "Validar Tickets"
  - Botón "Ver Todos los Eventos"
  - Botón "Ver Todos los Usuarios"

### Fase 3: Gestión de Eventos (CRUD)

- [ ] **3.1** Crear página AdminEventsPage
  - Crear archivo `app/pages/(protected)/admin/AdminEventsPage.tsx`
  - Ruta: `/admin/events`
  - Tabla con todos los eventos
  - Columnas: Imagen, Título, Fecha, Categoría, Precio, Estado, Acciones

- [ ] **3.2** Implementar listado de eventos
  - Obtener eventos de `upcomingEvents` (mock)
  - Estados: Publicado, Borrador, Destacado
  - Filtros: Por categoría, por estado
  - Búsqueda por nombre
  - Ordenamiento: Fecha, Título, Precio

- [ ] **3.3** Implementar acciones por evento
  - Botón "Editar" (abre modal o página)
  - Botón "Eliminar" (con confirmación)
  - Toggle "Destacado" (marcar/desmarcar)
  - Toggle "Publicado/Borrador"
  - Ver detalles (abre en nueva pestaña)

- [ ] **3.4** Crear componente AdminEventForm
  - Crear archivo `app/components/admin/AdminEventForm.tsx`
  - Modal o página para crear/editar evento
  - Campos:
    - Título (requerido)
    - Fecha (date picker)
    - Ubicación (text)
    - Combate principal (text)
    - URL de imagen (text, preview)
    - Precio base (number)
    - Categoría (select)
    - Estado (checkbox: destacado, publicado)
  - Validaciones completas
  - Preview en tiempo real

- [ ] **3.5** Implementar crear evento
  - Botón "Crear Nuevo Evento" en AdminEventsPage
  - Abrir AdminEventForm vacío
  - Generar ID único
  - Guardar en localStorage (nuevo array)
  - Actualizar listado automáticamente

- [ ] **3.6** Implementar editar evento
  - Click en "Editar" carga datos en form
  - Modificar evento existente
  - Actualizar en localStorage
  - Refrescar listado

- [ ] **3.7** Implementar eliminar evento
  - Confirmación: "¿Eliminar evento X?"
  - Verificar si tiene órdenes asociadas
  - Warning si tiene órdenes
  - Eliminar de localStorage
  - Actualizar listado

### Fase 4: Gestión de Usuarios

- [ ] **4.1** Crear página AdminUsersPage
  - Crear archivo `app/pages/(protected)/admin/AdminUsersPage.tsx`
  - Ruta: `/admin/users`
  - Tabla con todos los usuarios
  - Columnas: Avatar, Nombre, Email, Rol, Fecha registro, Órdenes, Acciones

- [ ] **4.2** Implementar listado de usuarios
  - Obtener de localStorage
  - Mostrar todos los usuarios
  - Búsqueda por nombre o email
  - Filtro por rol (Admin, Usuario)
  - Ordenamiento

- [ ] **4.3** Implementar estadísticas por usuario
  - Cantidad de órdenes por usuario
  - Total gastado por usuario
  - Tickets comprados
  - Última actividad

- [ ] **4.4** Implementar acciones por usuario
  - Ver perfil (modal con info completa)
  - Ver órdenes del usuario
  - Cambiar rol (admin ↔ user)
  - Desactivar usuario (futuro)

### Fase 5: Validación de Tickets (Scanner)

- [ ] **5.1** Mejorar AdminScanPage existente
  - Ya existe en `app/pages/(protected)/AdminScanPage.tsx`
  - Mover a `app/pages/(protected)/admin/AdminScanPage.tsx`
  - Integrar en layout admin

- [ ] **5.2** Mejorar UI del scanner
  - Input grande para pegar código
  - Botón "Validar" prominente
  - Shortcuts de teclado (Enter para validar)
  - Clear automático después de validar

- [ ] **5.3** Mejorar resultados de validación
  - Card grande con resultado
  - Colores más evidentes (verde/rojo/amarillo)
  - Sonido de éxito/error (opcional)
  - Animaciones de feedback
  - Información completa del ticket y evento

- [ ] **5.4** Implementar estadísticas de validación
  - Tickets validados hoy
  - Tickets validados por evento
  - Últimas validaciones (live feed)
  - Botón "Limpiar Historial"

### Fase 6: Layout Admin

- [ ] **6.1** Crear componente AdminLayout
  - Crear archivo `app/components/admin/AdminLayout.tsx`
  - Sidebar con navegación
  - Header con título de sección
  - Contenido principal
  - Responsive (sidebar colapsa en mobile)

- [ ] **6.2** Crear AdminSidebar
  - Logo en header
  - Items de navegación:
    - Dashboard (Home icon)
    - Eventos (Calendar icon)
    - Usuarios (Users icon)
    - Scanner (QrCode icon)
    - Estadísticas (BarChart icon)
  - Item activo destacado
  - Link de "Volver al Sitio"

- [ ] **6.3** Crear AdminHeader
  - Título de la sección actual
  - Breadcrumbs
  - Usuario admin actual
  - Botón de logout

### Fase 7: Servicios y Datos

- [ ] **7.1** Crear mockAdminService
  - Crear archivo `app/lib/admin/services/mockAdminService.ts`
  - Funciones:
    - getStatistics() - Estadísticas generales
    - getAllEvents() - Todos los eventos
    - createEvent(event) - Crear evento
    - updateEvent(id, data) - Actualizar evento
    - deleteEvent(id) - Eliminar evento
    - getAllUsers() - Todos los usuarios
    - updateUserRole(userId, role) - Cambiar rol
    - getRecentOrders(limit) - Órdenes recientes

- [ ] **7.2** Crear tipos admin
  - Crear archivo `app/lib/admin/types.ts`
  - Interfaces:
    - AdminStatistics
    - EventFormData
    - UserWithStats

- [ ] **7.3** Implementar localStorage para eventos admin
  - Key: `strike_ground_admin_events`
  - Combinar con eventos mock existentes
  - Eventos admin tienen prioridad

### Fase 8: Rutas y Navegación

- [ ] **8.1** Agregar rutas admin en App.tsx
  - `/admin` → AdminDashboard
  - `/admin/events` → AdminEventsPage
  - `/admin/users` → AdminUsersPage
  - `/admin/scan` → AdminScanPage
  - Todas protegidas con AdminRoute

- [ ] **8.2** Agregar acceso en Header
  - Si usuario es admin, mostrar link "Admin"
  - En UserMenu, agregar opción "Panel Admin"
  - Icono: Shield o Settings

- [ ] **8.3** Agregar acceso en ProfilePage
  - Card "Panel de Administración" (solo para admins)
  - Link directo a `/admin`

### Fase 9: Seguridad y Validaciones

- [ ] **9.1** Implementar verificación de rol en frontend
  - AdminRoute verifica rol admin
  - Ocultar opciones admin para usuarios normales
  - Feedback claro si intenta acceder sin permisos

- [ ] **9.2** Validaciones de formularios
  - Validar todos los campos de AdminEventForm
  - Validar fechas (no puede ser en el pasado)
  - Validar URLs de imágenes
  - Validar precios (> 0)

- [ ] **9.3** Confirmaciones para acciones críticas
  - Eliminar evento
  - Cambiar rol de usuario
  - Marcar ticket como usado
  - Limpiar historial

### Fase 10: Estilos y UX

- [ ] **10.1** Diseño consistente
  - Usar misma paleta (negro, gris, rojo)
  - Sidebar oscuro
  - Cards con borders
  - Botones con estados hover

- [ ] **10.2** Responsive design
  - Sidebar colapsa en mobile (hamburger)
  - Tablas con scroll horizontal
  - Cards stack en mobile
  - Forms optimizados para mobile

- [ ] **10.3** Estados de carga
  - Skeletons para tablas
  - Loading en botones
  - Loading en estadísticas
  - Spinners consistentes

- [ ] **10.4** Feedback visual
  - Toasts para acciones exitosas
  - Animaciones suaves
  - Confirmaciones visuales
  - Error handling con mensajes claros

### Fase 11: Testing y Verificación

- [ ] **11.1** Testing de roles
  - Usuario normal no puede acceder a admin
  - Admin puede acceder a todas las páginas
  - Links admin solo visibles para admins

- [ ] **11.2** Testing de CRUD eventos
  - Crear evento → aparece en listado
  - Editar evento → cambios se guardan
  - Eliminar evento → desaparece del listado
  - Toggle destacado funciona

- [ ] **11.3** Testing de validación tickets
  - Ticket válido → marca como usado
  - Ticket usado → no permite usar de nuevo
  - Ticket inválido → muestra error claro

- [ ] **11.4** Testing responsive
  - Mobile (320px, 375px, 414px)
  - Tablet (768px, 1024px)
  - Desktop (1280px, 1920px)

### Fase 12: Documentación

- [ ] **12.1** Actualizar README.md
  - Agregar sección "Panel de Administración"
  - Documentar acceso (solo usuario demo por ahora)
  - Listar funcionalidades
  - Agregar rutas admin

- [ ] **12.2** Actualizar DOCUMENTACION.md
  - Nueva sección "Módulo de Administración"
  - Documentar mockAdminService
  - Documentar sistema de roles
  - Ejemplos de código

- [ ] **12.3** Actualizar CHANGELOG.md
  - Versión 1.9.0
  - Listar todas las funcionalidades
  - Listar componentes nuevos
  - Screenshots (opcional)

- [ ] **12.4** Crear guía de uso admin
  - Cómo crear un evento
  - Cómo validar tickets
  - Cómo gestionar usuarios
  - FAQ admin

---

## 🎯 Criterios de Aceptación

### Funcionales
- [ ] Usuario admin puede acceder al panel
- [ ] Usuario normal NO puede acceder al panel
- [ ] Admin puede crear eventos nuevos
- [ ] Admin puede editar eventos existentes
- [ ] Admin puede eliminar eventos
- [ ] Admin puede ver estadísticas de ventas
- [ ] Admin puede ver lista de usuarios
- [ ] Admin puede cambiar roles de usuarios
- [ ] Admin puede validar tickets desde el scanner
- [ ] Dashboard muestra datos en tiempo real
- [ ] Todas las acciones se persisten en localStorage

### No Funcionales
- [ ] Diseño consistente con el resto de la app
- [ ] Responsive en todos los dispositivos
- [ ] Loading states en todas las operaciones
- [ ] Error handling completo
- [ ] Confirmaciones para acciones críticas
- [ ] Código TypeScript type-safe
- [ ] Componentes reutilizables

### Técnicos
- [ ] 0 errores de TypeScript
- [ ] 0 errores de consola
- [ ] AdminRoute funciona correctamente
- [ ] Sistema de roles implementado
- [ ] localStorage sincronizado
- [ ] Build exitoso

---

## 📁 Estructura de Archivos a Crear

```
app/
├── lib/
│   ├── admin/
│   │   ├── services/
│   │   │   └── mockAdminService.ts    # Servicio admin
│   │   └── types.ts                   # Tipos admin
│   └── auth/
│       └── components/
│           └── AdminRoute.tsx          # Protección admin
├── components/
│   └── admin/
│       ├── AdminLayout.tsx             # Layout principal admin
│       ├── AdminSidebar.tsx            # Sidebar navegación
│       ├── AdminHeader.tsx             # Header admin
│       ├── AdminEventForm.tsx          # Form crear/editar evento
│       ├── StatCard.tsx                # Card de estadística
│       └── EventsTable.tsx             # Tabla de eventos
└── pages/
    └── (protected)/
        └── admin/
            ├── AdminDashboard.tsx      # Dashboard principal
            ├── AdminEventsPage.tsx     # Gestión de eventos
            ├── AdminUsersPage.tsx      # Gestión de usuarios
            └── AdminScanPage.tsx       # Scanner de tickets
```

---

## 🔄 Dependencias

### Internas
- `app/lib/auth/types.ts` - Para tipos User y rol
- `app/providers/AuthProvider.tsx` - Para verificar usuario admin
- `app/lib/events/data.ts` - Para eventos existentes
- `app/lib/checkout/services/mockCheckoutService.ts` - Para órdenes
- `app/lib/tickets/services/mockTicketService.ts` - Para tickets

### Externas (ya instaladas)
- `react-router-dom` - Navegación
- `lucide-react` - Iconos
- `tailwindcss` - Estilos

### Nuevas
- Ninguna (usaremos las existentes)

---

## 🚀 Próximos Pasos Después del Milestone

1. **Milestone 4**: Sistema de notificaciones por email (simulado)
2. **Mejoras de UX**: Animaciones, transiciones, feedback
3. **Optimizaciones**: Performance, lazy loading
4. **Migración a producción**: Backend real, base de datos

---

## ⚠️ Notas Importantes

- **Sistema de Roles MOCK**: Solo verifica en frontend, no es seguro para producción
- **localStorage**: Eventos admin se guardan localmente
- **Usuario Demo**: Es admin por defecto para testing
- **Producción**: Implementar autenticación real con permisos server-side

---

## 📝 Notas del Desarrollador

_Espacio para notas durante la implementación_

```
// Ejemplo:
// - Decidí usar modal en lugar de página para AdminEventForm
// - Agregué confirmación doble para eliminar eventos con órdenes
// - Implementé cache para mejorar performance de estadísticas
```

---

**Creado:** Enero 8, 2026  
**Versión del Proyecto:** 1.8.0 → 1.9.0  
**Estimación de Tiempo:** 5-7 días de desarrollo

---

## 🎨 Mockup del Dashboard

```
┌─────────────────────────────────────────────────────────┐
│ SIDEBAR    │  ADMIN DASHBOARD                           │
│            │                                             │
│ 🏠 Dashboard│  ┌───────┐ ┌───────┐ ┌───────┐ ┌───────┐│
│ 📅 Eventos │  │ 12    │ │ 234   │ │5,430€ │ │ 156   ││
│ 👥 Usuarios│  │Eventos│ │Órdenes│ │Ventas │ │Usuarios││
│ 📱 Scanner │  └───────┘ └───────┘ └───────┘ └───────┘│
│            │                                             │
│            │  ÓRDENES RECIENTES                         │
│            │  ┌──────────────────────────────────────┐ │
│            │  │ #ORD-123  Juan P.  150€  Completada  │ │
│            │  │ #ORD-124  María G. 200€  Completada  │ │
│            │  │ #ORD-125  Pedro L. 100€  Pendiente   │ │
│            │  └──────────────────────────────────────┘ │
│            │                                             │
│ [Volver]   │  [Crear Evento] [Validar Tickets]         │
└─────────────────────────────────────────────────────────┘
```
