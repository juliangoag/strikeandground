# Milestone 1: Implementación de Página de Checkout

**Objetivo:** Crear una página de checkout funcional en la ruta `/checkout` con sistema basado en MOCKS, manteniendo el estilo visual y arquitectura del proyecto.

**Fecha de inicio:** Diciembre 19, 2025  
**Estado:** 📋 Pendiente

---

## 📋 Lista de Tareas (To-Do List)

### Fase 1: Preparación y Estructura de Datos

- [ ] **1.1** Crear tipos TypeScript para el checkout
  - Crear archivo `app/types/checkout.ts`
  - Definir interfaz `CheckoutItem` (evento, tipo de entrada, cantidad, precio)
  - Definir interfaz `ShippingInfo` (nombre, email, teléfono, dirección)
  - Definir interfaz `PaymentMethod` (tipo, últimos 4 dígitos si aplica)
  - Definir interfaz `Order` (id, items, total, fecha, estado, usuario)

- [ ] **1.2** Crear servicio MOCK de checkout
  - Crear archivo `app/services/mockCheckoutService.ts`
  - Implementar función `createOrder(orderData)` → guarda en localStorage
  - Implementar función `getOrders(userId)` → obtiene órdenes del usuario
  - Implementar función `simulatePayment()` → simula procesamiento de pago
  - Key de localStorage: `'strike_ground_orders'`

- [ ] **1.3** Crear datos MOCK para checkout
  - Crear archivo `app/data/checkout-mocks.ts`
  - Definir array de métodos de pago disponibles (Tarjeta, PayPal, Bizum)
  - Definir configuración de descuentos disponibles (códigos promocionales)
  - Definir tasas y comisiones (si aplican)

### Fase 2: Contexto y Estado Global

- [ ] **2.1** Crear contexto de carrito de compras
  - Crear archivo `app/context/CartContext.tsx`
  - Implementar `CartProvider` con estado de items
  - Implementar hook `useCart()` para acceder al carrito
  - Funciones: `addItem()`, `removeItem()`, `updateQuantity()`, `clearCart()`, `getTotal()`
  - Persistir carrito en localStorage (`'strike_ground_cart'`)

- [ ] **2.2** Integrar CartProvider en App.tsx
  - Importar `CartProvider` en `app/App.tsx`
  - Envolver rutas con `<CartProvider>` (dentro de `<AuthProvider>`)
  - Verificar que el contexto esté disponible en toda la app

### Fase 3: Componentes Reutilizables

- [ ] **3.1** Crear componente de resumen de orden
  - Crear archivo `app/components/OrderSummary.tsx`
  - Mostrar lista de items en el carrito
  - Mostrar subtotal, descuentos, y total
  - Diseño: fondo negro/gris oscuro, bordes rojos al hover
  - Props: `items: CheckoutItem[]`, `onRemoveItem?: (id) => void`

- [ ] **3.2** Crear componente de formulario de envío
  - Crear archivo `app/components/ShippingForm.tsx`
  - Campos: Nombre completo, Email, Teléfono, Dirección (opcional para entradas digitales)
  - Validaciones: email válido, teléfono válido, campos requeridos
  - Diseño consistente con otros formularios del proyecto
  - Props: `onSubmit: (data: ShippingInfo) => void`, `initialData?: ShippingInfo`

- [ ] **3.3** Crear componente de métodos de pago
  - Crear archivo `app/components/PaymentMethodSelector.tsx`
  - Radio buttons para seleccionar método (Tarjeta, PayPal, Bizum)
  - Iconos para cada método de pago
  - Formulario condicional si es tarjeta (número, CVV, fecha - MOCK)
  - Diseño: cards con borde que cambia a rojo cuando seleccionado
  - Props: `selectedMethod: PaymentMethod`, `onSelect: (method) => void`

- [ ] **3.4** Crear componente de código promocional
  - Crear archivo `app/components/PromoCodeInput.tsx`
  - Input para ingresar código
  - Botón "Aplicar" con estados de loading y éxito/error
  - Validación MOCK de códigos (ej: "PROMO10" = 10% descuento)
  - Mostrar código aplicado con badge verde y botón para remover
  - Props: `onApply: (code: string) => void`, `appliedCode?: string`

### Fase 4: Página Principal de Checkout

- [ ] **4.1** Crear página CheckoutPage
  - Crear archivo `app/pages/CheckoutPage.tsx`
  - Layout de 2 columnas (desktop): Formulario (izq) + Resumen (der sticky)
  - Layout de 1 columna (mobile): Formulario arriba, Resumen abajo
  - Fondo negro consistente con el resto del proyecto
  - Padding top de 20 (pt-20) para compensar header fixed

- [ ] **4.2** Implementar sección de breadcrumbs
  - Mostrar navegación: Home > Eventos > Evento > Checkout
  - Links clicables para volver atrás
  - Iconos de Lucide React (ChevronRight)
  - Diseño: texto gris con hover blanco

- [ ] **4.3** Implementar sección de items del carrito
  - Integrar componente `OrderSummary`
  - Permitir eliminar items individuales
  - Mostrar imagen miniatura del evento
  - Mostrar nombre del evento, tipo de entrada, precio unitario
  - Botón "Vaciar carrito" con confirmación

- [ ] **4.4** Implementar wizard de pasos (Steps)
  - Crear sistema de pasos: 1. Información → 2. Pago → 3. Confirmación
  - Indicador visual de paso actual
  - Navegación entre pasos (Siguiente/Anterior)
  - Validación antes de avanzar al siguiente paso
  - Diseño: círculos numerados conectados con línea

- [ ] **4.5** Implementar formulario de información
  - Integrar `ShippingForm` en paso 1
  - Guardar datos en estado local del componente
  - Botón "Continuar al Pago" con validación
  - Si usuario autenticado, pre-rellenar con datos del perfil

- [ ] **4.6** Implementar sección de pago
  - Integrar `PaymentMethodSelector` en paso 2
  - Integrar `PromoCodeInput`
  - Checkbox "Acepto términos y condiciones" (requerido)
  - Botón "Procesar Pago" con loading state
  - Llamar a `mockCheckoutService.simulatePayment()`

- [ ] **4.7** Implementar página de confirmación
  - Mostrar paso 3 después de pago exitoso
  - Mensaje de éxito con ícono de checkmark
  - Número de orden generado
  - Resumen de la compra
  - Botón "Ver Mis Entradas" (ruta a perfil/órdenes)
  - Botón "Volver al Inicio"
  - Limpiar carrito después de confirmación

### Fase 5: Integración con Eventos

- [ ] **5.1** Actualizar EventDetailsPage
  - Modificar botón "Comprar Ahora" para agregar al carrito
  - Implementar función `handleAddToCart(ticketType, quantity)`
  - Mostrar toast/notificación de "Agregado al carrito"
  - Agregar botón "Ver Carrito" en el toast

- [ ] **5.2** Agregar ícono de carrito en Header
  - Modificar `app/components/Header.tsx`
  - Agregar ícono de carrito (ShoppingCart de Lucide)
  - Mostrar badge con cantidad de items
  - Click abre dropdown con preview del carrito
  - Botón "Ir al Checkout" en el dropdown

### Fase 6: Rutas y Navegación

- [ ] **6.1** Agregar ruta de checkout en App.tsx
  - Importar `CheckoutPage`
  - Agregar ruta: `<Route path="/checkout" element={<CheckoutPage />} />`
  - Decidir si requiere autenticación o permitir checkout como invitado
  - Si requiere auth, envolver en `<ProtectedRoute>`

- [ ] **6.2** Implementar protección de ruta vacía
  - Si el carrito está vacío, redirigir a `/eventos`
  - Mostrar mensaje: "Tu carrito está vacío"
  - Evitar acceso directo a `/checkout` sin items

### Fase 7: Manejo de Estados y Validaciones

- [ ] **7.1** Implementar validaciones de formulario
  - Email: formato correcto
  - Teléfono: formato correcto (español)
  - Nombre: mínimo 3 caracteres
  - Campos requeridos no vacíos
  - Mostrar errores en rojo debajo de cada campo

- [ ] **7.2** Implementar estados de carga
  - Loading durante simulación de pago (3 segundos)
  - Spinner o skeleton durante carga
  - Deshabilitar botones durante procesamiento

- [ ] **7.3** Implementar manejo de errores
  - Pago rechazado (simulado aleatoriamente)
  - Error de red (simulado)
  - Mostrar mensajes de error amigables
  - Permitir reintentar

### Fase 8: Estilos y Responsividad

- [ ] **8.1** Aplicar estilos consistentes
  - Fondo: `bg-black` o `bg-gradient-to-b from-gray-900 to-black`
  - Textos: blancos y grises (`text-white`, `text-gray-400`)
  - Acentos: rojos (`text-red-500`, `bg-red-600`)
  - Bordes: `border border-gray-800` con hover `hover:border-red-500`
  - Botones: `bg-red-600 hover:bg-red-700` con transiciones

- [ ] **8.2** Implementar diseño responsive
  - Mobile: 1 columna, formulario completo ancho
  - Tablet: 1 columna o 2 columnas según espacio
  - Desktop: 2 columnas (formulario 2/3, resumen 1/3)
  - Resumen sticky en desktop (`sticky top-24`)

- [ ] **8.3** Agregar animaciones y transiciones
  - Transiciones suaves en botones (`transition-colors`)
  - Fade-in al cambiar de paso
  - Hover effects en cards y botones
  - Loading spinner animado

### Fase 9: Testing y Validación

- [ ] **9.1** Testing manual de flujo completo
  - Agregar item al carrito desde EventDetailsPage
  - Ver carrito en Header
  - Ir a checkout
  - Completar paso 1 (información)
  - Completar paso 2 (pago)
  - Ver confirmación paso 3
  - Verificar orden en localStorage

- [ ] **9.2** Testing de casos edge
  - Carrito vacío → redirigir
  - Usuario no autenticado → permitir o bloquear según diseño
  - Código promocional inválido → mostrar error
  - Pago rechazado → mostrar error y permitir reintentar
  - Cerrar página durante checkout → carrito persiste

- [ ] **9.3** Testing responsive
  - Probar en Chrome DevTools responsive mode
  - Breakpoints: 320px (mobile), 768px (tablet), 1024px (desktop)
  - Verificar que todos los elementos sean clicables
  - Verificar que no haya overflow horizontal

### Fase 10: Documentación y Cleanup

- [ ] **10.1** Actualizar README.md
  - Agregar sección "Sistema de Compras (MOCK)"
  - Documentar flujo de checkout
  - Actualizar lista de funcionalidades implementadas
  - Actualizar ruta `/checkout` en sección de rutas

- [ ] **10.2** Actualizar DOCUMENTACION.md
  - Agregar sección "Módulo de Checkout"
  - Documentar CartContext y useCart hook
  - Documentar mockCheckoutService
  - Documentar estructura de órdenes
  - Agregar ejemplos de código

- [ ] **10.3** Actualizar CHANGELOG.md
  - Agregar entrada para versión nueva (ej: v1.4.0)
  - Listar todas las características agregadas
  - Listar componentes nuevos
  - Listar rutas nuevas

- [ ] **10.4** Verificación final de TypeScript
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
- [ ] Usuario puede agregar entradas al carrito desde la página de detalles del evento
- [ ] Usuario puede ver el carrito en el Header con badge de cantidad
- [ ] Usuario puede acceder a la página de checkout desde el carrito
- [ ] Usuario puede completar información de contacto
- [ ] Usuario puede seleccionar método de pago
- [ ] Usuario puede aplicar código promocional válido
- [ ] Usuario puede procesar pago (simulado)
- [ ] Usuario recibe confirmación de orden con número
- [ ] Orden se guarda en localStorage
- [ ] Carrito se vacía después de completar compra

### No Funcionales
- [ ] Diseño consistente con el resto de la aplicación
- [ ] Colores: negro, gris, rojo (paleta existente)
- [ ] Responsive en mobile, tablet y desktop
- [ ] Loading states implementados
- [ ] Error handling implementado
- [ ] Código TypeScript con tipos correctos
- [ ] Componentes reutilizables y modulares
- [ ] Documentación actualizada

### Técnicos
- [ ] No hay errores en consola
- [ ] TypeScript compila sin errores
- [ ] Lint pasa sin warnings críticos
- [ ] Código sigue convenciones del proyecto
- [ ] Persistencia en localStorage funciona
- [ ] Sesión de usuario integrada correctamente

---

## 📁 Estructura de Archivos a Crear

```
app/
├── types/
│   └── checkout.ts                    # Nuevos tipos para checkout
├── services/
│   └── mockCheckoutService.ts         # Servicio MOCK de órdenes
├── context/
│   └── CartContext.tsx                # Context de carrito
├── data/
│   └── checkout-mocks.ts              # Datos MOCK (métodos pago, promos)
├── components/
│   ├── OrderSummary.tsx               # Resumen de orden
│   ├── ShippingForm.tsx               # Formulario de envío
│   ├── PaymentMethodSelector.tsx     # Selector de pago
│   └── PromoCodeInput.tsx             # Input de código promocional
└── pages/
    └── CheckoutPage.tsx               # Página principal de checkout
```

---

## 🔄 Dependencias

### Internas
- `app/auth/context/AuthContext.tsx` - Para obtener usuario actual
- `app/types/event.ts` - Para tipos de eventos
- `app/data/events.ts` - Para información de eventos

### Externas (ya instaladas)
- `react-router-dom` - Para navegación
- `lucide-react` - Para iconos
- `tailwindcss` - Para estilos

---

## 🚀 Próximos Pasos Después del Milestone

1. **Milestone 2**: Panel de administración para gestionar eventos
2. **Milestone 3**: Página de "Mis Órdenes" en el perfil
3. **Milestone 4**: Sistema de notificaciones por email (simulado)
4. **Milestone 5**: Generación de entradas con QR code

---

## ⚠️ Notas Importantes

- **MOCK System**: Todo el sistema de checkout es simulado. No hay procesamiento real de pagos.
- **localStorage**: Las órdenes se guardan en localStorage, no en un servidor.
- **Seguridad**: Este sistema NO es apto para producción. Es solo para desarrollo y demos.
- **Migración**: Para producción, integrar con Stripe, PayPal u otro procesador de pagos real.

---

## 📝 Notas del Desarrollador

_Espacio para que el desarrollador agregue notas durante la implementación_

```
// Ejemplo:
// - Cambié el nombre de X componente a Y por claridad
// - Agregué validación extra en Z porque...
// - Decidí usar A en lugar de B porque...
```

---

**Creado:** Diciembre 19, 2025  
**Versión del Proyecto:** 1.3.2 → 1.4.0  
**Estimación de Tiempo:** 3-5 días de desarrollo

