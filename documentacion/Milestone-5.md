# Milestone 5: Generación de Entradas con QR Code

**Objetivo:** Implementar sistema completo de generación de entradas digitales con código QR único para cada compra, con capacidad de visualización, descarga y validación (MOCK).

**Fecha de inicio:** Enero 7, 2026  
**Estado:** 📋 En Progreso

---

## 📋 Lista de Tareas (To-Do List)

### Fase 1: Preparación y Dependencias

- [ ] **1.1** Instalar librería de QR
  - Ejecutar: `npm install qrcode`
  - Instalar tipos: `npm install -D @types/qrcode`
  - Verificar instalación correcta
  - Probar generación básica de QR

- [ ] **1.2** Crear tipos TypeScript para tickets
  - Crear archivo `app/lib/tickets/types.ts`
  - Definir interfaz `Ticket`:
    - id: string (único)
    - orderId: string
    - userId: string
    - eventId: string
    - ticketType: TicketType
    - qrCode: string (base64 o URL)
    - isUsed: boolean
    - usedAt?: string
    - createdAt: string
  - Definir interfaz `QRData`:
    - ticketId: string
    - orderId: string
    - userId: string
    - eventId: string
    - timestamp: string
    - signature: string (hash simulado)

- [ ] **1.3** Crear servicio MOCK de tickets
  - Crear archivo `app/lib/tickets/services/mockTicketService.ts`
  - Implementar `generateTickets(order: Order)` → crea tickets por orden
  - Implementar `getTicketsByOrder(orderId)` → obtiene tickets de una orden
  - Implementar `getTicketById(ticketId)` → obtiene ticket específico
  - Implementar `validateTicket(qrData)` → valida QR code
  - Implementar `markTicketAsUsed(ticketId)` → marca ticket como usado
  - Key de localStorage: `'strike_ground_tickets'`

- [ ] **1.4** Crear utilidad de generación de QR
  - Crear archivo `app/lib/tickets/utils/qrGenerator.ts`
  - Función `generateQRCode(data: QRData)` → genera imagen base64
  - Función `generateSecureHash(data)` → hash simulado para firma
  - Función `encodeTicketData(ticket)` → convierte a JSON string
  - Función `decodeTicketData(qrString)` → parsea JSON string
  - Opciones de QR: tamaño 400x400, error correction 'H'

### Fase 2: Componente de Visualización de Entrada

- [ ] **2.1** Crear componente TicketView
  - Crear archivo `app/components/tickets/TicketView.tsx`
  - Layout profesional de entrada digital:
    - Header con logo Strike & Ground
    - Título del evento en grande
    - Fecha y ubicación
    - Tipo de entrada (badge destacado)
    - Código QR grande centrado (300x300px)
    - Información del comprador
    - Número de orden y ticket ID
    - Instrucciones de uso
    - Términos y condiciones
  - Diseño: Fondo blanco para impresión, bordes elegantes
  - Props: `ticket: Ticket`, `event: FightEvent`, `order: Order`

- [ ] **2.2** Agregar estilos print-friendly
  - Crear estilos específicos para impresión en `globals.css`
  - @media print: ocultar header, footer, navegación
  - Optimizar tamaño de página (A4)
  - Asegurar que QR sea visible en impresión
  - Colores: convertir a escala de grises para impresión

- [ ] **2.3** Implementar información detallada
  - Sección de información del evento:
    - Nombre del evento
    - Fecha completa (día, mes, año, hora)
    - Ubicación con icono de mapa
    - Pelea principal
    - Puertas abren 1 hora antes
  - Sección de información de compra:
    - Nombre del comprador
    - Email de contacto
    - Número de orden
    - Fecha de compra
    - Tipo de entrada con precio
  - Sección de instrucciones:
    - "Presenta este código QR en la entrada"
    - "Puedes mostrar desde tu móvil o imprimirlo"
    - "Conserva tu código hasta el final del evento"

- [ ] **2.4** Implementar estado de ticket usado
  - Overlay semi-transparente si `ticket.isUsed === true`
  - Marca de agua "USADO" diagonal grande
  - Fecha de uso mostrada
  - Diseño: overlay rojo con opacidad
  - Prevenir uso duplicado visualmente

### Fase 3: Página de Tickets

- [ ] **3.1** Crear página TicketsPage
  - Crear archivo `app/pages/(protected)/TicketsPage.tsx`
  - Ruta protegida: `/tickets/:orderId`
  - Obtener orderId de URL params
  - Cargar orden completa y sus tickets
  - Layout con lista de tickets de la orden
  - Breadcrumbs: Inicio > Perfil > Mis Órdenes > Entradas

- [ ] **3.2** Implementar lista de tickets
  - Grid de tickets en miniatura
  - Cada ticket clickable para ver en grande
  - Badge con estado: "Válido" (verde) o "Usado" (rojo)
  - Contador: "Ticket 1 de 3"
  - Navegación entre tickets con flechas
  - Responsive: 1 columna (mobile), 2 columnas (desktop)

- [ ] **3.3** Implementar vista ampliada de ticket
  - Modal full-screen o página dedicada
  - Mostrar TicketView component
  - Botón "Cerrar" para volver a lista
  - Navegación entre tickets (anterior/siguiente)
  - Compartir ticket (preparado para futuro)

- [ ] **3.4** Implementar descarga de tickets
  - Botón "Descargar Entrada" en cada ticket
  - Función que captura el componente como imagen
  - Usar html2canvas o canvas nativo
  - Descargar como PNG con nombre: `entrada-{eventName}-{ticketId}.png`
  - Loading state durante generación
  - Toast de éxito al descargar

- [ ] **3.5** Implementar descarga múltiple
  - Botón "Descargar Todas las Entradas"
  - Generar ZIP con todos los tickets (futuro)
  - Por ahora: descargar uno por uno automáticamente
  - Progress bar durante descarga múltiple
  - Toast con cantidad descargada

### Fase 4: Integración con MyOrdersPage

- [ ] **4.1** Agregar botón "Ver Entradas" en OrderCard
  - Icono: Ticket de Lucide
  - Texto: "Ver Entradas (X)" donde X es cantidad
  - Link a `/tickets/:orderId`
  - Badge destacado si hay entradas disponibles
  - Solo visible si orden está completada

- [ ] **4.2** Agregar sección de entradas en OrderDetailsModal
  - Nueva sección "Tus Entradas"
  - Botón principal "Ver y Descargar Entradas"
  - Muestra cantidad de tickets generados
  - Preview pequeño del QR (opcional)
  - Navega a TicketsPage

- [ ] **4.3** Generar tickets automáticamente
  - Al crear orden en CheckoutPage
  - Después de `createOrder()`, llamar a `generateTickets(order)`
  - Un ticket por cada item en la orden (respetando quantity)
  - Guardar tickets en localStorage
  - Verificar generación correcta

### Fase 5: Sistema de Validación de Tickets (Admin)

- [ ] **5.1** Crear página de validación AdminScanPage
  - Crear archivo `app/pages/(protected)/AdminScanPage.tsx`
  - Ruta protegida admin: `/admin/scan`
  - Verificar rol de usuario (admin) - preparado para futuro
  - Layout simple con scanner centrado
  - Breadcrumbs: Admin > Validar Entradas

- [ ] **5.2** Implementar scanner de QR
  - Opción 1: Input manual de código QR
  - Campo de texto para pegar datos del QR
  - Botón "Validar"
  - Opción 2 (futuro): Usar cámara con react-qr-scanner
  - Por ahora: solo input manual

- [ ] **5.3** Implementar lógica de validación
  - Decodificar datos del QR (JSON parse)
  - Validar estructura de datos
  - Buscar ticket en localStorage
  - Verificar firma/hash (simulado)
  - Verificar que no esté usado (`isUsed === false`)
  - Verificar que corresponda a un evento válido
  - Verificar fecha del evento (no validar antes del día)

- [ ] **5.4** Implementar resultados de validación
  - Estado VÁLIDO (verde):
    - Checkmark grande
    - Información del ticket
    - Nombre del comprador
    - Tipo de entrada
    - Evento
    - Botón "Marcar como Usado"
  - Estado INVÁLIDO (rojo):
    - X grande
    - Mensaje: "Ticket inválido o no encontrado"
    - Posibles razones
    - Botón "Intentar de nuevo"
  - Estado USADO (amarillo):
    - Warning icon
    - Mensaje: "Esta entrada ya fue utilizada"
    - Fecha de uso
    - Por quién fue validada (futuro)
    - Botón "Validar Otra Entrada"

- [ ] **5.5** Implementar marcar ticket como usado
  - Botón "Marcar como Usado" en validación exitosa
  - Confirmación: "¿Marcar esta entrada como usada?"
  - Llamar a `mockTicketService.markTicketAsUsed(ticketId)`
  - Actualizar estado visual
  - Registro de timestamp
  - Toast de confirmación

- [ ] **5.6** Implementar historial de validaciones
  - Lista de últimas validaciones
  - Mostrar: ticket ID, evento, hora, estado
  - Límite: últimas 20 validaciones
  - Guardar en localStorage: `'strike_ground_validations'`
  - Botón "Limpiar Historial"

### Fase 6: Mejoras de Seguridad (MOCK)

- [ ] **6.1** Implementar firma de tickets
  - Generar hash único por ticket
  - Combinar: ticketId + orderId + userId + timestamp + SECRET
  - SECRET: string hardcoded (para producción usar env variable)
  - Incluir firma en QR data
  - Validar firma al escanear

- [ ] **6.2** Implementar prevención de duplicados
  - Verificar que ticketId sea único
  - Prevenir generación de tickets duplicados
  - Si ya existen tickets para una orden, no regenerar
  - Opción manual de regenerar (admin, futuro)

- [ ] **6.3** Implementar protección contra screenshot
  - Marca de agua dinámica con nombre del comprador
  - Timestamp en el ticket que se actualiza (futuro)
  - Advertencia: "No compartas este código"
  - Por ahora: solo advertencias visuales

### Fase 7: Navegación e Integración

- [ ] **7.1** Agregar ruta en App.tsx
  - Ruta protegida: `/tickets/:orderId`
  - Ruta protegida admin: `/admin/scan`
  - Importar TicketsPage y AdminScanPage
  - Envolver en ProtectedRoute

- [ ] **7.2** Agregar enlace en CheckoutPage
  - En confirmación (paso 3)
  - Botón "Ver Mis Entradas" actualizado
  - Navegar a `/tickets/:orderId` de la orden recién creada
  - Resaltar que las entradas están listas

- [ ] **7.3** Agregar enlace en ProfilePage
  - Card o botón "Validar Entradas" (solo para admin)
  - Icono: QrCode de Lucide
  - Link a `/admin/scan`
  - Visible solo si usuario es admin (preparado)

- [ ] **7.4** Integrar con sistema de roles
  - Preparar User type para campo `role: 'user' | 'admin'`
  - Por ahora: todos los usuarios pueden acceder a `/admin/scan` (MOCK)
  - Futuro: solo admins pueden validar

### Fase 8: Estilos y Responsividad

- [ ] **8.1** Diseñar ticket profesional
  - Inspiración: entradas de eventos reales
  - Layout: header, body, footer
  - Colores: blanco/gris claro con acentos rojos
  - Tipografía: clara y legible
  - Bordes y sombras elegantes
  - Logo de Strike & Ground en header

- [ ] **8.2** Implementar diseño responsive
  - Mobile:
    - Ticket ocupa todo el ancho
    - QR grande y centrado
    - Información apilada verticalmente
  - Desktop:
    - Ticket con ancho máximo (600px)
    - Centrado con padding
    - Mejor uso de espacio horizontal

- [ ] **8.3** Optimizar para impresión
  - Tamaño de página: A4
  - Márgenes: 20mm en todos los lados
  - QR en tamaño óptimo para escaneo (5-7cm)
  - Ocultar elementos no necesarios
  - Colores: convertir a escala de grises
  - Incluir instrucciones de uso

- [ ] **8.4** Agregar animaciones
  - Fade-in al cargar tickets
  - Slide-in para modal de ticket ampliado
  - Animación de éxito en validación (confetti simulado)
  - Pulse en QR code para llamar atención
  - Loading animations suaves

### Fase 9: Testing y Validación

- [ ] **9.1** Testing de generación de tickets
  - Crear orden de prueba
  - Verificar que se generen tickets correctamente
  - Verificar cantidad de tickets = suma de quantities
  - Verificar QR se genera sin errores
  - Verificar datos del ticket son correctos

- [ ] **9.2** Testing de visualización
  - Ver tickets desde MyOrdersPage
  - Navegar entre múltiples tickets
  - Verificar información mostrada correctamente
  - Verificar QR es escaneable (con app de QR)
  - Verificar diseño en diferentes dispositivos

- [ ] **9.3** Testing de descarga
  - Descargar ticket como PNG
  - Verificar calidad de imagen
  - Verificar nombre de archivo correcto
  - Verificar QR en imagen descargada es escaneable
  - Testing en diferentes navegadores

- [ ] **9.4** Testing de validación
  - Escanear QR válido → Estado VÁLIDO
  - Marcar como usado → Estado USADO
  - Escanear mismo QR → Estado USADO
  - Escanear QR inválido → Estado INVÁLIDO
  - Verificar historial se actualiza

- [ ] **9.5** Testing de impresión
  - Imprimir ticket desde navegador (Ctrl+P)
  - Verificar layout se mantiene
  - Verificar QR es escaneable en papel
  - Verificar toda la información es legible
  - Testing en Chrome, Firefox, Safari

- [ ] **9.6** Testing responsive
  - Mobile: 320px, 375px, 414px
  - Tablet: 768px, 1024px
  - Desktop: 1280px, 1920px
  - Verificar tickets se ven bien en todos los tamaños
  - Verificar scanner funciona en todos los dispositivos

### Fase 10: Documentación y Cleanup

- [ ] **10.1** Actualizar README.md
  - Agregar sección "Sistema de Entradas con QR"
  - Documentar flujo de generación y validación
  - Actualizar rutas: `/tickets/:orderId`, `/admin/scan`
  - Agregar dependencia nueva: qrcode

- [ ] **10.2** Actualizar DOCUMENTACION.md
  - Agregar sección "Módulo de Tickets con QR"
  - Documentar mockTicketService
  - Documentar estructura de Ticket
  - Documentar proceso de validación
  - Agregar ejemplos de código

- [ ] **10.3** Actualizar CHANGELOG.md
  - Agregar entrada para versión nueva (v1.8.0)
  - Listar características agregadas
  - Listar componentes nuevos
  - Listar dependencias instaladas

- [ ] **10.4** Crear guía de usuario
  - Cómo descargar tus entradas
  - Cómo presentar tu entrada en el evento
  - Qué hacer si pierdes tu entrada
  - Preguntas frecuentes

- [ ] **10.5** Verificación final
  - Ejecutar `npm run typecheck` - 0 errores
  - Ejecutar `npm run lint` - corregir warnings
  - Eliminar console.logs de debug
  - Verificar imports no utilizados
  - Testing completo de flujo end-to-end

---

## 🎯 Criterios de Aceptación

### Funcionales
- [ ] Sistema genera tickets automáticamente al completar orden
- [ ] Un ticket por cada item en la orden (respeta quantity)
- [ ] Cada ticket tiene QR code único y válido
- [ ] Usuario puede ver todos sus tickets desde MyOrdersPage
- [ ] Usuario puede descargar tickets como PNG
- [ ] Tickets son imprimibles con diseño profesional
- [ ] QR codes son escaneables con apps de QR estándar
- [ ] Admin puede validar tickets desde `/admin/scan`
- [ ] Sistema detecta tickets ya usados
- [ ] Sistema detecta tickets inválidos
- [ ] Historial de validaciones se mantiene

### No Funcionales
- [ ] QR codes generados en menos de 500ms por ticket
- [ ] Diseño profesional similar a entradas reales
- [ ] Tickets legibles en impresión blanco y negro
- [ ] Responsive en todos los dispositivos
- [ ] Código limpio y bien documentado
- [ ] Tipos TypeScript correctos
- [ ] Sin errores en consola
- [ ] Performance optimizada (carga rápida de tickets)

### Técnicos
- [ ] Librería qrcode instalada correctamente
- [ ] mockTicketService funciona con localStorage
- [ ] Tickets persisten entre sesiones
- [ ] Navegación integrada correctamente
- [ ] ProtectedRoute aplicado a rutas necesarias
- [ ] Código sigue convenciones del proyecto
- [ ] Preparado para migración a producción (estructura escalable)

---

## 📁 Estructura de Archivos a Crear

```
app/
├── lib/
│   └── tickets/                       # Nuevo módulo de tickets
│       ├── services/
│       │   └── mockTicketService.ts   # Servicio MOCK de tickets
│       ├── utils/
│       │   └── qrGenerator.ts         # Utilidad generación QR
│       └── types.ts                   # Tipos de tickets
├── components/
│   └── tickets/                       # Componentes de tickets
│       ├── TicketView.tsx             # Vista de entrada digital
│       └── TicketsList.tsx            # Lista de tickets (opcional)
└── pages/
    └── (protected)/
        ├── TicketsPage.tsx            # Página de tickets de una orden
        └── AdminScanPage.tsx          # Página de validación admin
```

---

## 🔄 Dependencias

### Internas
- `app/lib/checkout/services/mockCheckoutService.ts` - Para obtener órdenes
- `app/lib/checkout/types.ts` - Para tipos Order
- `app/lib/events/data.ts` - Para información de eventos
- `app/providers/AuthProvider.tsx` - Para usuario actual

### Externas Nuevas
- `qrcode` - Generación de códigos QR
- `@types/qrcode` - Tipos TypeScript para qrcode

### Externas Existentes
- `react-router-dom` - Navegación
- `lucide-react` - Iconos
- `tailwindcss` - Estilos

### Futuras (opcional)
- `html2canvas` - Para capturar componentes como imagen
- `jszip` - Para crear ZIP con múltiples tickets
- `react-qr-scanner` - Para escanear QR con cámara

---

## 🚀 Próximos Pasos Después del Milestone

1. **Mejora de Scanner**: Implementar scanner con cámara web
2. **Sistema de Roles**: Implementar roles de usuario (admin/user)
3. **Notificaciones**: Enviar entradas por email (Milestone 4)
4. **Panel Admin**: Gestión completa de eventos (Milestone 3)

---

## ⚠️ Notas Importantes

- **MOCK System**: Validación simulada, no reemplaza sistema real
- **Seguridad**: Hash simulado, en producción usar JWT/firma criptográfica
- **QR Code**: Datos en texto plano (JSON), en producción encriptar
- **localStorage**: Límite de ~5-10MB, tickets con QR base64 ocupan espacio
- **Escalabilidad**: Para producción, almacenar QR en servidor/CDN
- **Compresión**: QR codes en base64 son pesados, considerar URL en producción

---

## 📝 Notas del Desarrollador

_Espacio para que el desarrollador agregue notas durante la implementación_

```
// Ejemplo:
// - Usé canvas para generar QR en lugar de libería externa
// - Implementé scanner con cámara usando react-qr-scanner
// - Agregué compresión de imágenes para reducir tamaño
```

---

**Creado:** Enero 7, 2026  
**Versión del Proyecto:** 1.7.0 → 1.8.0  
**Estimación de Tiempo:** 4-5 días de desarrollo

---

## 📸 Mockups de Referencia

### Ticket Design
```
┌────────────────────────────────────────┐
│  STRIKE & GROUND                   [LOGO]│
├────────────────────────────────────────┤
│                                        │
│  EVENTO: UFC Fight Night Madrid       │
│  FECHA: 15 de Febrero, 2026 - 20:00  │
│  LUGAR: Wizink Center, Madrid         │
│                                        │
│          ┌─────────────┐              │
│          │   QR CODE   │              │
│          │   [IMAGE]   │              │
│          │   400x400   │              │
│          └─────────────┘              │
│                                        │
│  TIPO: VIP                  99.00€    │
│  ORDEN: #ORD-20260107-1234            │
│  TICKET: #TKT-5678                    │
│                                        │
│  COMPRADOR: Juan Pérez                │
│  EMAIL: juan@email.com                │
│                                        │
│  ⚠️ Presenta este código en la entrada │
│  📱 Muestra desde tu móvil o imprime   │
│                                        │
├────────────────────────────────────────┤
│  Términos: No reembolsable            │
│  www.strikeandground.com              │
└────────────────────────────────────────┘
```

### Scanner Interface
```
┌────────────────────────────────────────┐
│  VALIDAR ENTRADA                       │
├────────────────────────────────────────┤
│                                        │
│  [📷 Escanear QR]  [📝 Código Manual] │
│                                        │
│  ┌──────────────────────────────────┐ │
│  │ Pega el código QR aquí...        │ │
│  └──────────────────────────────────┘ │
│                                        │
│  [    VALIDAR ENTRADA    ]            │
│                                        │
│  HISTORIAL RECIENTE:                  │
│  ✅ #TKT-5678 - VIP - 12:34          │
│  ✅ #TKT-5679 - General - 12:35      │
│  ❌ #TKT-INVALID - Inválido - 12:36  │
│                                        │
└────────────────────────────────────────┘
```

