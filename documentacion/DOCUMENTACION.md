# 📖 Documentación Completa - Strike & Ground

## 📑 Índice

1. [Arquitectura del Proyecto](#1-arquitectura-del-proyecto)
   - [Stack Tecnológico](#stack-tecnológico-completo)
   - [Flujo de Datos](#flujo-de-datos)
   - [Estructura de Archivos](#estructura-de-archivos-completa)
   - [Modelo de Datos](#modelo-de-datos)
   - [Estadísticas del Proyecto](#estadísticas-del-proyecto)
2. [Módulo de Autenticación](#2-módulo-de-autenticación)
3. [Gestión de Perfil de Usuario](#3-gestión-de-perfil-de-usuario)
4. [Sistema de Configuración](#4-sistema-de-configuración)
5. [Upload de Avatar](#5-upload-de-avatar)
6. [Módulo de Eventos](#6-módulo-de-eventos)
   - [EventsPage - Catálogo](#eventspage)
   - [EventDetailsPage - Detalles](#eventdetailspage)
   - [EventCard - Tarjetas](#eventcard)
7. [Módulo de Checkout](#7-módulo-de-checkout)
   - [CartContext - Contexto del Carrito](#cartcontext)
   - [mockCheckoutService - Servicio de Órdenes](#mockcheckoutservice)
   - [CheckoutPage - Página Principal](#checkoutpage)
   - [Componentes del Checkout](#componentes-del-checkout)
8. [Guía de Desarrollo](#8-guía-de-desarrollo)
9. [API Reference](#9-api-reference)
10. [Migración a Producción](#10-migración-a-producción)
11. [Solución de Problemas](#11-solución-de-problemas)
12. [FAQ](#12-faq)

---

## 1. Arquitectura del Proyecto

### Stack Tecnológico Completo

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

Deploy:
└── Netlify CLI            # Preparado para deploy
```

### Flujo de Datos

```
┌─────────────┐
│   Usuario   │
└──────┬──────┘
       │
       ▼
┌─────────────────┐
│  Componentes UI │  (Forms, Modals, Pages)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   AuthContext   │  (Estado global, useAuth hook)
└────────┬────────┘
         │
         ▼
┌──────────────────┐
│ mockAuthService  │  (Lógica de negocio)
└────────┬─────────┘
         │
         ▼
┌─────────────────┐
│  localStorage   │  (Persistencia de datos)
└─────────────────┘
```

### Estructura de Archivos Completa

**NOTA:** Reestructurada el 7 de enero de 2026 siguiendo convenciones de Next.js App Router

```
project/
│
├── 📂 app/                           # Código fuente de la aplicación
│   │
│   ├── 📂 components/                # Componentes organizados por feature
│   │   ├── 📂 layout/                # Componentes de layout
│   │   │   ├── Header.tsx            # Navegación principal
│   │   │   ├── Footer.tsx            # Pie de página
│   │   │   ├── 📂 header/            # Subcomponentes del header
│   │   │   │   ├── AuthButtons.tsx   # Botones de autenticación
│   │   │   │   ├── CartDropdown.tsx  # Dropdown del carrito
│   │   │   │   ├── NavLinks.tsx      # Enlaces de navegación
│   │   │   │   └── UserMenu.tsx      # Menú de usuario
│   │   │   └── layout.tsx            # Layout wrapper (futuro)
│   │   │
│   │   ├── 📂 home/                  # Componentes de la home
│   │   │   ├── Hero.tsx              # Sección hero
│   │   │   ├── EventsSection.tsx     # Eventos destacados
│   │   │   ├── BenefitsSection.tsx   # Beneficios
│   │   │   └── SecuritySection.tsx   # Seguridad
│   │   │
│   │   ├── 📂 events/                # Componentes de eventos
│   │   │   ├── EventCard.tsx         # Tarjeta de evento
│   │   │   └── SearchBar.tsx         # Barra de búsqueda
│   │   │
│   │   ├── 📂 checkout/              # Componentes de checkout
│   │   │   ├── OrderSummary.tsx      # Resumen de orden
│   │   │   ├── PaymentMethodSelector.tsx # Selector de pago
│   │   │   ├── PromoCodeInput.tsx    # Código promocional
│   │   │   └── ShippingForm.tsx      # Formulario de envío
│   │   │
│   │   └── 📂 ui/                    # Componentes UI base
│   │       └── Overlay.tsx           # Overlay reutilizable
│   │
│   ├── 📂 lib/                       # Utilidades y servicios
│   │   ├── 📂 auth/                  # Módulo de autenticación
│   │   │   ├── 📂 components/        # Componentes específicos de auth
│   │   │   │   ├── AuthModal.tsx     # Modal principal
│   │   │   │   ├── LoginForm.tsx     # Formulario de login
│   │   │   │   ├── RegisterForm.tsx  # Formulario de registro
│   │   │   │   ├── ForgotPasswordForm.tsx # Recuperación
│   │   │   │   ├── ProtectedRoute.tsx # HOC rutas protegidas
│   │   │   │   └── AvatarUploadModal.tsx # Upload avatar
│   │   │   ├── 📂 services/
│   │   │   │   └── mockAuthService.ts # Lógica MOCK auth
│   │   │   └── types.ts              # Tipos de autenticación
│   │   │
│   │   ├── 📂 checkout/              # Módulo de checkout
│   │   │   ├── 📂 services/
│   │   │   │   └── mockCheckoutService.ts # Lógica MOCK checkout
│   │   │   ├── mocks.ts              # Datos MOCK de checkout
│   │   │   └── types.ts              # Tipos de checkout
│   │   │
│   │   └── 📂 events/                # Módulo de eventos
│   │       ├── data.ts               # Datos de eventos
│   │       └── types.ts              # Tipos de eventos
│   │
│   ├── 📂 providers/                 # React Context Providers
│   │   ├── AuthProvider.tsx          # Provider de autenticación
│   │   └── CartProvider.tsx          # Provider del carrito
│   │
│   ├── 📂 pages/                     # Páginas de la aplicación
│   │   ├── 📂 (protected)/           # Rutas protegidas
│   │   │   ├── ProfilePage.tsx       # Perfil de usuario
│   │   │   └── SettingsPage.tsx      # Configuración
│   │   ├── HomePage.tsx              # Landing page (/)
│   │   ├── EventsPage.tsx            # Catálogo (/eventos)
│   │   ├── EventDetailsPage.tsx      # Detalles (/eventos/:id/details)
│   │   └── CheckoutPage.tsx          # Checkout (/checkout)
│   │
│   ├── 📂 styles/                    # Estilos
│   │   └── globals.css               # Estilos globales (antes index.css)
│   │
│   ├── App.tsx                       # Componente raíz + Router
│   ├── main.tsx                      # Entry point
│   └── vite-env.d.ts                 # Tipos de Vite
│
├── 📂 documentacion/                 # 📚 Documentación del proyecto
│   ├── README.md                     # Guía de inicio rápido
│   ├── DOCUMENTACION.md              # Documentación técnica completa (este archivo)
│   ├── CHANGELOG.md                  # Historial de cambios
│   └── Milestone-1.md                # Plan de implementación Checkout
│
├── 📂 public/                        # Assets estáticos
│
├── 📂 node_modules/                  # Dependencias (generado)
│
├── 📄 README.md                      # README principal del proyecto
├── 📄 index.html                     # HTML principal
├── 📄 package.json                   # Dependencias y scripts
├── 📄 package-lock.json              # Lock de dependencias
├── 📄 vite.config.ts                 # Configuración de Vite
├── 📄 tsconfig.json                  # Configuración TypeScript (base)
├── 📄 tsconfig.app.json              # Configuración TypeScript (app)
├── 📄 tsconfig.node.json             # Configuración TypeScript (node)
├── 📄 tailwind.config.js             # Configuración Tailwind CSS
├── 📄 postcss.config.js              # Configuración PostCSS
├── 📄 eslint.config.js               # Configuración ESLint
└── 📄 .gitignore                     # Archivos ignorados por Git
```

### Modelo de Datos

#### User

```typescript
interface User {
  id: string;
  email: string;
  name: string;
  password: string;              // ⚠️ MOCK: texto plano
  avatar_url: string;
  created_at: string;
  email_verified: boolean;
  last_login?: string;
}
```

#### FightEvent

```typescript
interface FightEvent {
  id: string;
  title: string;
  date: string;                  // ISO format: 'YYYY-MM-DD'
  location: string;
  mainFight: string;
  imageUrl: string;
  price: number;                 // En euros
  category: 'MMA' | 'BOXEO' | 'MUAY_THAI' | 'KICKBOXING' | 'BJJ' | 'WRESTLING';
  isHighlight?: boolean;
}
```

#### Session

```typescript
interface Session {
  userId: string;
  token: string;                 // "mock-token-{timestamp}"
  expiresAt: string;             // ISO date (7 días desde login)
}
```

### Estadísticas del Proyecto

#### Código Fuente

| Categoría | Archivos | Líneas Aprox. |
|-----------|----------|---------------|
| Autenticación | 7 | ~870 |
| Componentes Globales | 17 | ~1,200 |
| Páginas | 6 | ~1,800 |
| Contextos | 2 | ~280 |
| Servicios | 2 | ~400 |
| Datos y Tipos | 4 | ~250 |
| **Total** | **38** | **~4,800** |

#### Documentación

| Documento | Líneas | Última Actualización |
|-----------|--------|---------------------|
| README.md (raíz) | ~150 | Dic 19, 2025 |
| README.md (doc) | ~220 | Dic 19, 2025 |
| DOCUMENTACION.md | ~2,600 | Dic 19, 2025 |
| CHANGELOG.md | ~900 | Dic 19, 2025 |
| Milestone-1.md | ~500 | Dic 19, 2025 |
| **Total** | **~4,370** | - |

### Organización por Funcionalidad

#### 🔐 Autenticación
```
app/auth/
├── components/    → UI de autenticación
├── context/       → Estado global (AuthContext)
├── services/      → Lógica de negocio (mockAuthService)
└── types/         → Tipos TypeScript
```

#### 🛒 Carrito y Checkout
```
app/context/
└── CartContext.tsx    → Estado del carrito

app/services/
└── mockCheckoutService.ts    → Lógica de órdenes

app/components/
├── OrderSummary.tsx          → Resumen de compra
├── PaymentMethodSelector.tsx → Selector de pago
├── PromoCodeInput.tsx        → Códigos promocionales
└── ShippingForm.tsx          → Información de contacto
```

#### 🎨 UI Global
```
app/components/
├── Header.tsx           → Navegación principal (refactorizado)
├── header/
│   ├── NavLinks.tsx     → Enlaces de navegación
│   ├── AuthButtons.tsx  → Botones de autenticación
│   ├── UserMenu.tsx     → Menú desplegable de usuario
│   └── CartDropdown.tsx → Dropdown del carrito
├── ui/
│   └── Overlay.tsx      → Overlay reutilizable para dropdowns
├── Hero.tsx             → Landing hero
├── EventsSection.tsx    → Eventos destacados
├── EventCard.tsx        → Tarjeta de evento
├── SearchBar.tsx        → Búsqueda y filtros
├── BenefitsSection.tsx  → Beneficios
├── SecuritySection.tsx  → Seguridad
└── Footer.tsx           → Pie de página
```

#### 📄 Páginas

**Públicas:**
```
app/pages/
├── HomePage.tsx           → Landing page (/)
├── EventsPage.tsx         → Catálogo (/eventos)
├── EventDetailsPage.tsx   → Detalles (/eventos/:id/details)
└── CheckoutPage.tsx       → Proceso de compra (/checkout)
```

**Protegidas (requieren autenticación):**
```
app/pages/(protected)/
├── ProfilePage.tsx        → Perfil (/profile)
└── SettingsPage.tsx       → Configuración (/profile/settings)
```

### Rutas de la Aplicación

#### Rutas Públicas
```
/                      → HomePage
/eventos               → EventsPage
/eventos/:id/details   → EventDetailsPage
/checkout              → CheckoutPage (requiere items en carrito)
```

#### Rutas Protegidas (requieren autenticación)
```
/profile               → ProfilePage
/profile/settings      → SettingsPage
```

### Flujo de Datos Principal

#### Autenticación
```
Usuario → UI (Forms) → AuthContext → mockAuthService → localStorage
                ↓
         Estado Global (useAuth)
                ↓
         Componentes (Header, ProtectedRoute, etc.)
```

#### Carrito de Compras
```
Usuario → EventDetailsPage (selecciona entradas)
    ↓
addItem(event, ticketType, quantity)
    ↓
CartContext actualiza estado
    ↓
localStorage guarda carrito
    ↓
Header muestra icono con badge
    ↓
Usuario navega a /checkout
    ↓
CheckoutPage procesa compra
    ↓
mockCheckoutService crea orden
    ↓
Carrito se limpia después de compra exitosa
```

#### Eventos
```
events.ts (datos estáticos)
    ↓
EventsPage / EventDetailsPage
    ↓
EventCard (componente)
    ↓
Usuario
```

### Dependencias Principales

#### Producción
```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^7.10.0",
  "lucide-react": "^0.344.0"
}
```

#### Desarrollo
```json
{
  "typescript": "^5.5.3",
  "vite": "^5.4.2",
  "tailwindcss": "^3.4.1",
  "eslint": "^9.9.1",
  "@types/react": "^18.3.5",
  "@types/react-dom": "^18.3.0"
}
```

### Comandos de Desarrollo

```bash
# Desarrollo
npm run dev              # Puerto 5174

# Build
npm run build            # Genera dist/

# Preview
npm run preview          # Preview del build

# Calidad
npm run lint             # ESLint
npm run typecheck        # TypeScript
```

### Convenciones de Nomenclatura

#### Archivos
- **Componentes:** PascalCase (ej: `EventCard.tsx`)
- **Páginas:** PascalCase + "Page" (ej: `HomePage.tsx`)
- **Servicios:** camelCase + "Service" (ej: `mockAuthService.ts`)
- **Contextos:** PascalCase + "Context" (ej: `CartContext.tsx`)
- **Tipos:** camelCase + ".types" (ej: `auth.types.ts`) o solo camelCase (ej: `checkout.ts`)
- **Datos:** camelCase (ej: `events.ts`)

#### Carpetas
- **Carpetas normales:** camelCase (ej: `components/`, `pages/`)
- **Carpetas especiales:** Entre paréntesis para agrupar (ej: `(protected)/`)

---

## 2. Módulo de Autenticación

### ¿Qué es el Sistema MOCK?

Un sistema **MOCK** simula un backend real pero funciona completamente en el frontend usando `localStorage`. Esto permite:

- ✅ Desarrollo sin necesidad de backend
- ✅ Demostración funcional inmediata
- ✅ Prototipado rápido
- ✅ Testing de UI/UX
- ✅ Fácil migración a backend real

### Funcionalidades Implementadas

#### 1. Registro de Usuarios ✅

**Características:**
- Formulario completo con validación
- Validación de email (formato correcto)
- Validación de contraseña segura:
  - Mínimo 8 caracteres
  - Una letra mayúscula
  - Un número
  - Un símbolo (@$!%*?&)
- Verificación de contraseñas coincidentes
- Detección de emails duplicados
- Auto-login después del registro
- Verificación automática de email (simulada)

**Flujo:**
```
1. Usuario completa formulario de registro
2. Sistema valida datos
3. Verifica que email no exista
4. Crea usuario en localStorage
5. Hace auto-login
6. Redirige a home
7. (2 segundos) Marca email como verificado
```

#### 2. Inicio de Sesión ✅

**Características:**
- Login con email y contraseña
- Validación de credenciales
- Persistencia de sesión (7 días)
- Manejo de errores
- Credenciales demo precargadas
- Botón "Usar credenciales demo"

**Flujo:**
```
1. Usuario ingresa credenciales
2. Sistema valida en localStorage
3. Verifica contraseña
4. Crea sesión con token
5. Actualiza estado global
6. Cierra modal
7. Header muestra usuario autenticado
```

#### 3. Recuperación de Contraseña ✅

**Características:**
- Formulario de solicitud
- Simulación de envío de email
- Validación de email
- Feedback al usuario
- Mensaje de éxito
- Redirección automática a login

**Nota:** En MOCK, siempre retorna éxito por seguridad (no revela si email existe).

#### 4. Gestión de Sesiones ✅

**Características:**
- Sesión persistente en localStorage
- Auto-carga de sesión al refrescar
- Expiración de sesión (7 días)
- Cierre de sesión completo
- Limpieza de datos al cerrar sesión

**Keys en localStorage:**
```javascript
'strike_ground_users'        // Array de todos los usuarios
'strike_ground_current_user' // Usuario actual
'strike_ground_session'      // Sesión activa
```

#### 5. Protección de Rutas ✅

**Componente:** `ProtectedRoute`

**Funcionalidad:**
- Verifica si hay usuario autenticado
- Muestra loading mientras verifica sesión
- Muestra página de "Autenticación Requerida" si no autenticado
- Permite acceso si autenticado

**Características de la página de autenticación requerida:**
- Icono de bloqueo visual
- Mensaje claro explicando por qué no puede acceder
- Botón "Iniciar Sesión" que abre el modal de login
- Botón "Crear Cuenta" que abre el modal de registro
- Botón "Volver al Inicio" para navegación
- Diseño consistente con el resto de la aplicación

**Uso:**
```typescript
<Route
  path="/profile"
  element={
    <ProtectedRoute>
      <ProfilePage />
    </ProtectedRoute>
  }
/>
```

**Antes vs Ahora:**

*Antes (v1.3.1):*
- Redirect silencioso a `/` si no autenticado
- Usuario confundido sobre por qué fue redirigido

*Ahora (v1.3.2):*
- Página informativa clara
- Botones de acción directos para login/registro
- Mejor experiencia de usuario

### AuthContext y useAuth Hook

**Hook principal para acceder al estado de autenticación:**

```typescript
const {
  user,              // User | null - Usuario actual
  isLoading,         // boolean - Cargando sesión
  isAuthenticated,   // boolean - Si hay usuario autenticado
  authModalOpen,     // boolean - Estado del modal de autenticación
  authModalMode,     // 'login' | 'register' - Modo del modal
  setAuthModalOpen,  // (open: boolean) => void - Abrir/cerrar modal
  setAuthModalMode,  // (mode: 'login' | 'register') => void - Cambiar modo
  signUp,            // (credentials) => Promise<void>
  signIn,            // (credentials) => Promise<void>
  signOut,           // () => Promise<void>
  forgotPassword,    // (email) => Promise<void>
  verifyEmail,       // () => Promise<void>
  updateProfile,     // (updates) => Promise<void>
} = useAuth();
```

**Ejemplo de uso:**

```typescript
import { useAuth } from '../auth/context/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, signOut } = useAuth();

  if (!isAuthenticated) {
    return <div>No autenticado</div>;
  }

  return (
    <div>
      <p>Hola, {user.name}</p>
      <button onClick={signOut}>Cerrar Sesión</button>
    </div>
  );
}
```

### Validaciones Implementadas

#### Email
```typescript
const isValidEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};
```

#### Contraseña Segura
```typescript
const isValidPassword = (password: string): boolean => {
  // Mínimo 8 caracteres, 1 mayúscula, 1 número, 1 símbolo
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return re.test(password);
};
```

### Usuario Demo Precargado

```typescript
const DEMO_USER = {
  id: 'demo-user-1',
  email: 'demo@strikeandground.com',
  name: 'Usuario Demo',
  password: 'Demo123!',
  avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=demo',
  created_at: new Date().toISOString(),
  email_verified: true,
};
```

Este usuario se crea automáticamente la primera vez que se inicia la aplicación.

---

## 3. Gestión de Perfil de Usuario

### Página de Perfil (`/profile`)

**Ubicación:** Ruta protegida que requiere autenticación

**Características:**

#### Información Personal
- **Avatar**: Generado automáticamente con Dicebear API
- **Nombre**: Editable inline
- **Email**: No editable (por seguridad)
- **Badge de verificación**: Muestra si email está verificado
- **Fecha de registro**: Formato localizado en español

#### Edición de Nombre

**Flujo:**
```
1. Click en botón "Editar"
2. Campo de texto se activa
3. Usuario modifica nombre
4. Click en "Guardar" o "Cancelar"
5. Sistema actualiza en localStorage
6. UI se actualiza
```

**Validación:**
- Nombre no puede estar vacío
- Mínimo 2 caracteres

#### Estadísticas

Panel preparado para mostrar:
- Eventos asistidos (preparado para futuro)
- Entradas compradas (preparado para futuro)
- Miembro desde (fecha de registro)

#### Avatar Dinámico

Generado con Dicebear API:
```typescript
avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
```

**Ventajas:**
- Único por usuario (basado en email)
- Consistente (mismo email = mismo avatar)
- Sin necesidad de upload inicial
- Se puede reemplazar con avatar personalizado

---

## 4. Sistema de Configuración

### Página de Configuración (`/settings`)

**Ubicación:** Ruta protegida que requiere autenticación

### Secciones Implementadas

#### 1. 🔐 Cambio de Contraseña

**Funcionalidades:**
- Cambiar contraseña actual
- Validación de contraseña segura en tiempo real
- Confirmación de contraseña
- Botones mostrar/ocultar contraseña
- Loading states
- Mensajes de éxito/error

**Validaciones:**
- Contraseña nueva: mínimo 8 caracteres
- Debe incluir mayúsculas
- Debe incluir números
- Debe incluir símbolos (@$!%*?&)
- Las contraseñas nuevas deben coincidir

**Requisitos visuales en tiempo real:**
- ✓ Mínimo 8 caracteres
- ✓ Una letra mayúscula
- ✓ Un número
- ✓ Un símbolo (@$!%*?&)

#### 2. 🔔 Notificaciones

**Opciones disponibles:**

| Opción | Descripción | Por Defecto |
|--------|-------------|-------------|
| **Notificaciones por Email** | Actualizaciones importantes | ✅ Activado |
| **Recordatorios de Eventos** | Avisos antes de eventos | ✅ Activado |
| **Ofertas y Promociones** | Descuentos exclusivos | ❌ Desactivado |
| **Newsletter** | Noticias de deportes | ✅ Activado |

**Características:**
- Toggles interactivos (switches)
- Guardado individual de preferencias
- Persistencia (MOCK)
- Feedback visual al guardar

#### 3. 🛡️ Privacidad y Seguridad

**Opciones disponibles:**

| Opción | Descripción | Por Defecto |
|--------|-------------|-------------|
| **Perfil Público** | Otros pueden ver tu perfil | ❌ Desactivado |
| **Mostrar Actividad** | Mostrar eventos | ✅ Activado |
| **Permitir Mensajes** | Recibir mensajes | ✅ Activado |

**Características:**
- Control granular de privacidad
- Preparado para futuras funcionalidades sociales
- Guardado independiente

#### 4. 🚨 Zona Peligrosa

**Funcionalidad:** Eliminación de cuenta

**Características de seguridad:**
- Confirmación en dos pasos
- Usuario debe escribir "ELIMINAR" para confirmar
- Advertencias claras y visibles
- Mensaje de irreversibilidad
- Loading state durante eliminación
- Auto-logout después de eliminar
- Redirección a home

**Flujo de eliminación:**
```
1. Click en "Eliminar mi Cuenta"
2. Lee advertencia de irreversibilidad
3. Escribe "ELIMINAR" en el campo
4. Click en "Eliminar Permanentemente"
5. Sistema elimina usuario de localStorage
6. Limpia sesión actual
7. Logout automático
8. Redirección a home
```

**¿Qué se elimina (MOCK)?**
- Usuario de `strike_ground_users`
- Sesión actual
- Datos del usuario en localStorage
- Todo el historial (en producción)

### Componente Reutilizable: NotificationToggle

```typescript
interface NotificationToggleProps {
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}
```

**Uso:**
```typescript
<NotificationToggle
  label="Notificaciones por Email"
  description="Recibe actualizaciones importantes"
  checked={notifications.email}
  onChange={(checked) => setNotifications({...notifications, email: checked})}
/>
```

---

## 5. Upload de Avatar

### Componente: AvatarUploadModal

**Funcionalidad:** Modal completo para subir fotos de perfil desde el equipo del usuario.

### Características Principales

#### 1. Selección de Archivo
- Input file oculto con trigger personalizado
- Acepta: JPG, PNG, GIF, WEBP
- Validación de tipo de archivo
- Validación de tamaño (máx 2MB)

#### 2. Preview en Tiempo Real
- Muestra preview antes de subir
- Imagen circular (igual que el avatar)
- Hover effect con checkmark
- Mantiene aspect ratio

#### 3. Compresión Automática
- Redimensiona imágenes grandes a 400px de ancho
- Mantiene aspect ratio
- Convierte a JPEG con calidad 0.8
- Reduce tamaño para localStorage

**Función de compresión:**
```typescript
async function compressImage(base64: string, maxWidth = 400): Promise<string> {
  // 1. Crea elemento Image
  // 2. Calcula nuevas dimensiones (mantiene aspect ratio)
  // 3. Dibuja en Canvas redimensionado
  // 4. Convierte a JPEG calidad 0.8
  // 5. Retorna nuevo Base64 (más pequeño)
}
```

**Ejemplo de compresión:**
- Imagen original: 3000x2000px, 2MB
- Después de comprimir: 400x267px, ~50KB
- Reducción: ~97%

#### 4. Validaciones

**Tipo de archivo:**
```typescript
if (!file.type.startsWith('image/')) {
  error('Por favor selecciona un archivo de imagen válido');
}
```

**Formatos aceptados:**
- ✅ image/jpeg
- ✅ image/png
- ✅ image/gif
- ✅ image/webp

**Tamaño de archivo:**
```typescript
const maxSize = 2 * 1024 * 1024; // 2MB
if (file.size > maxSize) {
  error('La imagen es muy grande. Máximo 2MB');
}
```

#### 5. UX Excelente
- Loading states
- Mensajes de éxito/error
- Confirmación visual
- Botón de cancelar
- Cierre automático después de éxito

### Integración en ProfilePage

**Botón de Cambiar Foto:**
- Hover sobre el avatar muestra icono de cámara
- Click abre el modal de upload
- Overlay oscuro con icono de cámara
- Transición suave

**Flujo completo:**
```
1. Usuario hover sobre avatar → Aparece icono de cámara
2. Click en avatar → Modal se abre
3. Click "Seleccionar imagen" → Selector de archivos del sistema
4. Seleccionar imagen → Preview aparece
5. Click "Guardar Foto" → Compresión automática
6. Guardado en localStorage (Base64) → Avatar actualizado
7. Mensaje de éxito → Modal se cierra
```

### Sistema de Almacenamiento (MOCK)

**Cómo funciona:**

1. **Conversión a Base64**
   - La imagen se lee con FileReader
   - Se convierte a Base64 string
   - Se comprime para ahorrar espacio

2. **Almacenamiento**
   - Se guarda en `user.avatar_url`
   - Se actualiza en localStorage
   - Persiste entre sesiones

3. **Recuperación**
   - Se lee de `user.avatar_url`
   - Si es Base64, se usa directamente
   - Si no hay, usa Dicebear por defecto

**Límites de localStorage:**
- Capacidad: ~5-10MB por dominio
- Con compresión: Puedes guardar ~5-10 fotos de perfil
- Sin compresión: Solo 1-2 fotos

### Props del Componente

```typescript
interface AvatarUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (imageUrl: string) => Promise<void>;
  currentAvatar?: string;
}
```

**Ejemplo de uso:**

```typescript
import { AvatarUploadModal } from '../auth/components/AvatarUploadModal';

function ProfilePage() {
  const [showModal, setShowModal] = useState(false);
  const { updateProfile, user } = useAuth();

  const handleUpload = async (imageUrl: string) => {
    await updateProfile({ avatar_url: imageUrl });
  };

  return (
    <>
      <div onClick={() => setShowModal(true)}>
        <img src={user.avatar_url} alt="Avatar" />
      </div>

      <AvatarUploadModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onUpload={handleUpload}
        currentAvatar={user.avatar_url}
      />
    </>
  );
}
```

---

## 6. Módulo de Eventos

### EventsPage (`/eventos`)

**Funcionalidad:** Página dedicada que muestra el catálogo completo de eventos con sistema de búsqueda y filtrado avanzado.

#### Características Principales

**1. Sistema de Búsqueda y Filtrado:**
- Filtro por ciudad (Madrid, Barcelona, Valencia, etc.)
- Filtro por categoría de deporte (MMA, Boxeo, Muay Thai, etc.)
- Búsqueda en tiempo real por nombre, pelea o ubicación
- Contador de resultados
- Botón para limpiar filtros
- Estado "Sin resultados" con mensaje amigable

**2. Organización de Eventos:**
- **Eventos Destacados**: Grid de 2 columnas en desktop
- **Eventos Regulares**: Grid de 3 columnas en desktop
- Separación visual clara entre ambas categorías

**3. Lógica de Filtrado:**
```typescript
// Filtrado inteligente que combina múltiples criterios:
- Ciudad: Busca coincidencias en la ubicación del evento
- Categoría: Mapeo de nombres legibles a códigos internos
- Búsqueda: Busca en título, pelea principal y ubicación
```

#### Responsive

| Dispositivo | Destacados | Regulares | SearchBar |
|-------------|------------|-----------|-----------|
| Mobile | 1 columna | 1 columna | Vertical (3 filas) |
| Tablet | 2 columnas | 2 columnas | Vertical (3 filas) |
| Desktop | 2 columnas | 3 columnas | Horizontal (3 columnas) |

### SearchBar Component

**Funcionalidad:** Componente reutilizable de búsqueda con tres filtros independientes.

#### Características

**1. Dropdown de Ciudad:**
- Selector desplegable con overlay
- Ciudades principales de España
- Opción "Todas las ciudades" por defecto
- Icono de ubicación (MapPin)
- Estado activo visual

**2. Dropdown de Categoría:**
- Selector desplegable con overlay
- Todas las categorías de deportes de contacto
- Opción "Todas las categorías" por defecto
- Icono de estrella
- Estado activo visual

**3. Campo de Búsqueda:**
- Input de texto libre
- Icono de búsqueda
- Placeholder descriptivo
- Búsqueda en tiempo real sin necesidad de botón
- Focus state con border rojo

#### Props del Componente

```typescript
interface SearchBarProps {
  onSearch?: (filters: SearchFilters) => void;
}

export interface SearchFilters {
  city: string;
  category: string;
  searchTerm: string;
}
```

#### Ciudades Disponibles

```typescript
const cities = [
  'Todas las ciudades',
  'Madrid',
  'Barcelona',
  'Valencia',
  'Sevilla',
  'Bilbao',
  'Málaga',
  'Zaragoza',
];
```

#### Categorías Disponibles

```typescript
const categories = [
  'Todas las categorías',
  'MMA',
  'Boxeo',
  'Muay Thai',
  'Kickboxing',
  'BJJ',
  'Wrestling',
];
```

#### Ejemplo de Uso

```typescript
import { SearchBar, SearchFilters } from '../components/SearchBar';

function MyComponent() {
  const handleSearch = (filters: SearchFilters) => {
    console.log('Filters:', filters);
    // Aplicar filtros a los eventos
  };

  return <SearchBar onSearch={handleSearch} />;
}
```

### EventsSection (Componente Home)

**Funcionalidad:** Muestra solo los eventos destacados en la landing page con un botón para ver todos.

#### Cambios vs Versión Anterior

**Antes:**
- Mostraba eventos destacados Y más eventos
- Dos grids separados
- Sin call-to-action

**Ahora:**
- Solo muestra eventos destacados
- Botón "Ver Todos los Eventos" que redirige a `/eventos`
- Diseño más limpio y enfocado

### EventCard

**Información mostrada:**
- Imagen del evento
- Badge de categoría con colores específicos
- Badge "DESTACADO" (si aplica)
- Título del evento
- Pelea principal
- Fecha (formato español localizado)
- Ubicación con icono
- Precio desde (€)
- Botón "Ver Detalles" (clicable, redirige a detalles)

**Efectos visuales:**
- Hover con escala 1.02
- Imagen con zoom al hover
- Gradientes elegantes
- Bordes que cambian de color
- Transiciones suaves

**Navegación:**
- Toda la tarjeta es un link a `/eventos/:id/details`
- Click en cualquier parte redirige a detalles del evento
- Botón "Ver Detalles" mantiene consistencia visual

**Categorías y colores:**

| Categoría | Color | Badge |
|-----------|-------|-------|
| MMA | Rojo (`red-500`) | MMA |
| BOXEO | Azul (`blue-500`) | Boxeo |
| MUAY_THAI | Amarillo (`yellow-500`) | Muay Thai |
| KICKBOXING | Púrpura (`purple-500`) | Kickboxing |
| BJJ | Verde (`green-500`) | BJJ |
| WRESTLING | Naranja (`orange-500`) | Wrestling |

### EventDetailsPage

**Ruta:** `/eventos/:id/details`

**Funcionalidad:** Página completa de detalles de un evento específico con toda la información y opciones de compra.

#### Secciones Principales

**1. Hero Section**
- Imagen del evento a pantalla completa (400-500px altura)
- Overlay oscuro con gradiente
- Badge de categoría (esquina superior izquierda)
- Badge de "DESTACADO" si aplica (esquina superior derecha)
- Título del evento en grande (4xl a 6xl)
- Combate principal en rojo
- Botón "Volver" con navegación inteligente

**2. Información del Evento**
- Fecha y hora completa (incluye día de la semana)
- Ubicación con ícono de mapa
- Precio desde
- Duración estimada (4 horas por defecto)
- Descripción del evento generada dinámicamente

**3. Cartelera de Peleas**
- Combate principal con borde rojo destacado
- Co-main event preparado para datos
- Sistema jerárquico visual
- Información de rounds

**4. Sidebar de Compra**
- Tres tipos de entradas:
  - General (precio base)
  - VIP (precio x2)
  - Ringside (precio x3)
- Botón de compra prominente
- Información importante:
  - Puertas abren 1 hora antes
  - Mayores de 18 años
  - No reembolsos
  - Entradas digitales

**5. Eventos Relacionados**
- Grid de 3 eventos similares
- Filtrado automático (excluye evento actual)
- Navegación entre eventos

#### Manejo de Errores

Si el evento no existe (ID inválido):
- Mensaje de error amigable
- Botón para regresar a `/eventos`
- Diseño consistente con el resto del sitio

#### Características Técnicas

```typescript
// Parámetros de URL
const { id } = useParams<{ id: string }>();

// Búsqueda del evento
const event = upcomingEvents.find((e) => e.id === id);

// Formato de fecha avanzado
const formattedDate = new Date(event.date).toLocaleDateString('es-ES', {
  weekday: 'long',  // "lunes", "martes", etc.
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});
```

#### Responsive Design

- **Mobile:** Stack vertical, sidebar debajo del contenido
- **Desktop:** Layout de 3 columnas (2+1), sidebar sticky
- Hero adaptable en altura
- Eventos relacionados: 1→2→3 columnas

#### Navegación

```typescript
// Botón volver usa historial del navegador
const navigate = useNavigate();
onClick={() => navigate(-1)}

// Links a otros eventos
to={`/eventos/${relatedEvent.id}/details`}
```

### Cómo Agregar un Evento

**Editar:** `app/data/events.ts`

```typescript
export const upcomingEvents: FightEvent[] = [
  // ... eventos existentes ...
  {
    id: '5',                                  // ID único
    title: 'Nombre del Evento',               // Título
    date: '2026-02-15',                       // YYYY-MM-DD
    location: 'Arena, Ciudad',                // Ubicación
    mainFight: 'Luchador A vs. Luchador B',   // Pelea principal
    imageUrl: 'https://example.com/img.jpg',  // URL de imagen
    price: 50,                                // Precio en euros
    category: 'MMA',                          // Categoría
    isHighlight: false,                       // true = destacado
  },
];
```

### Arquitectura del Header

El componente Header ha sido refactorizado para seguir mejores prácticas de arquitectura frontend:

#### Header.tsx (Componente Principal)

**Funcionalidad:** Componente orquestador que une todos los subcomponentes del header.

**Responsabilidades:**
- Mantener el layout principal del header
- Coordinar el estado del modal de autenticación
- Renderizar logo y estructura base

**Código simplificado:**
```typescript
export function Header() {
  const { isAuthenticated, authModalOpen, setAuthModalOpen, setAuthModalMode } = useAuth();

  const handleAuthClick = (tab: 'login' | 'register') => {
    setAuthModalMode(tab);
    setAuthModalOpen(true);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/">...</Link>
            <NavLinks />
            <div className="flex items-center gap-3">
              <CartDropdown />
              {isAuthenticated ? <UserMenu /> : <AuthButtons onAuthClick={handleAuthClick} />}
            </div>
          </div>
        </div>
      </header>
      <AuthModal ... />
    </>
  );
}
```

**Beneficios:**
- Solo 65 líneas (vs 240 líneas antes)
- Extremadamente legible
- Fácil de mantener
- Permite cambios aislados en subcomponentes

#### NavLinks.tsx

**Ubicación:** `app/components/header/NavLinks.tsx`

**Funcionalidad:** Maneja la navegación principal del sitio.

**Características:**
- Links configurables mediante constante `NAV_ITEMS`
- Diferencia entre links internos (React Router) y anclas (enlaces hash)
- Oculto en mobile, visible en desktop
- Role navigation para accesibilidad

**Props:** Ninguna (componente autocontenido)

```typescript
const NAV_ITEMS = [
  { href: '/eventos', label: 'Eventos' },
  { href: '/#beneficios', label: 'Por qué nosotros' },
  { href: '/#seguridad', label: 'Seguridad' },
] as const;
```

#### AuthButtons.tsx

**Ubicación:** `app/components/header/AuthButtons.tsx`

**Funcionalidad:** Botones de login y registro para usuarios no autenticados.

**Props:**
```typescript
interface AuthButtonsProps {
  onAuthClick: (tab: 'login' | 'register') => void;
}
```

**Características:**
- Botón "Iniciar Sesión" oculto en mobile
- Botón "Registrarse" siempre visible con estilo destacado
- Type button explícito para evitar envíos de formulario

#### UserMenu.tsx

**Ubicación:** `app/components/header/UserMenu.tsx`

**Funcionalidad:** Menú desplegable para usuarios autenticados.

**Características:**
- Avatar circular con nombre del usuario
- Dropdown con overlay para cerrar al hacer clic fuera
- Items de menú configurables mediante constante `MENU_ITEMS`
- Opción de logout con color diferenciado
- Estado isOpen local para controlar visibilidad
- Navegación programática con React Router

**Estado:**
```typescript
const [isOpen, setIsOpen] = useState(false);
```

**Menu Items:**
```typescript
const MENU_ITEMS = [
  { icon: User, label: 'Mi Perfil', path: '/profile' },
  { icon: Settings, label: 'Configuración', path: '/profile/settings' },
] as const;
```

**Accesibilidad:**
- `aria-label="Menú de usuario"`
- `aria-expanded={isOpen}`
- `aria-haspopup="true"`

#### CartDropdown.tsx

**Ubicación:** `app/components/header/CartDropdown.tsx`

**Funcionalidad:** Dropdown completo del carrito de compras.

**Características:**
- Badge con cantidad de items
- Vista rápida de items con imágenes
- Botón para eliminar items individuales
- Cálculo de subtotal
- Botón "Ir al Checkout"
- Estado vacío con mensaje amigable
- Organizado en subcomponentes internos

**Subcomponentes internos:**
- `EmptyCartMessage` - Mensaje cuando el carrito está vacío
- `CartItems` - Lista de items en el carrito
- `CartFooter` - Footer con total y botón de checkout

**Integración:**
```typescript
const { items, itemCount, subtotal, removeItem } = useCart();
```

**Accesibilidad:**
- `aria-label="Carrito de compras"`
- `aria-expanded={isOpen}`
- `aria-haspopup="true"`
- Labels descriptivos para cantidad de items

#### Overlay.tsx (Componente Reutilizable)

**Ubicación:** `app/components/ui/Overlay.tsx`

**Funcionalidad:** Overlay transparente para cerrar dropdowns/modales al hacer clic fuera.

**Props:**
```typescript
interface OverlayProps {
  onClick: () => void;
}
```

**Uso:**
```typescript
{isOpen && (
  <>
    <Overlay onClick={closeDropdown} />
    <div className="dropdown">...</div>
  </>
)}
```

**Características:**
- Cubre toda la pantalla (fixed inset-0)
- z-index 40 (debajo de dropdowns pero sobre contenido)
- `aria-hidden="true"` para accesibilidad
- Reutilizable en múltiples componentes

### Ventajas de la Refactorización

#### Para Desarrolladores Junior
- Código mucho más fácil de entender
- Cada archivo tiene un propósito claro
- Más fácil encontrar dónde hacer cambios
- Componentes pequeños y manejables

#### Para el Proyecto
- Mejor separación de responsabilidades
- Componentes reutilizables (Overlay)
- Fácil testing de componentes individuales
- Escalabilidad mejorada

#### Para Mantenimiento
- Cambios aislados no afectan otros componentes
- Fácil agregar nuevas funcionalidades
- Reducción de bugs por acoplamiento
- Código más predecible

### Auditoría de Calidad y Correcciones (v1.5.1)

Después de la refactorización del Header, se realizó una auditoría completa del código siguiendo las reglas establecidas en `.cursor/rules/next-js.mdc`.

#### Problemas Detectados y Corregidos

**1. Duplicación de Header/Footer (Crítico)**

**Problema:** Las páginas protegidas (ProfilePage, SettingsPage) renderizaban Header y Footer además de los globales en App.tsx, causando elementos duplicados en la interfaz.

**Solución:** 
- Eliminados Header y Footer de ProfilePage.tsx
- Eliminados Header y Footer de SettingsPage.tsx
- Corregida estructura de divs en ambas páginas
- Mantenidos solo en App.tsx para renderizado global único

**Impacto:** Eliminación completa de duplicación visual y mejora en performance.

---

**2. Errores de TypeScript (26 errores → 0)**

**Problema:** Múltiples errores de tipos en componentes del módulo Checkout y otros.

**Correcciones por Componente:**

**OrderSummary.tsx:**
- ❌ `item.eventImage` → ✅ `item.event.imageUrl`
- ❌ `item.eventTitle` → ✅ `item.event.title`
- ❌ `item.totalPrice` → ✅ `(item.pricePerTicket * item.quantity).toFixed(2)`

**ShippingForm.tsx:**
- ❌ `formData.name` → ✅ `formData.fullName`
- ❌ `errors: Partial<ShippingInfo>` → ✅ `errors: Partial<Record<keyof ShippingInfo, string>>`
- Todas las referencias al campo actualizadas consistentemente

**PromoCodeInput.tsx:**
- ❌ `promoCode.discount` → ✅ `promoCode.discountPercent`

**PaymentMethodSelector.tsx:**
- ❌ Acceso directo a propiedades de `PaymentMethodType` (string union)
- ✅ Creada estructura `paymentMethodDetails` con objetos completos en checkout-mocks.ts

**CheckoutPage.tsx:**
- ❌ `simulatePayment(total)` → ✅ `simulatePayment()` (sin parámetro)
- ❌ Parámetro `status` en createOrder → ✅ Eliminado (no existe en tipo)
- ❌ `name: user.name` → ✅ `fullName: user.name`

**CartDropdown.tsx:**
- ❌ `CartItem` → ✅ `CheckoutItem` (tipo correcto)

**NavLinks.tsx:**
- ❌ Componente dinámico con tipos incompatibles
- ✅ Renderizado condicional explícito (if/else)

**Impacto:** Código 100% type-safe, mejor autocompletado en IDE, detección temprana de errores.

---

**3. Falta de Accesibilidad (15+ elementos)**

**Problema:** Múltiples elementos interactivos sin atributos de accesibilidad requeridos por WCAG.

**Correcciones por Componente:**

**SearchBar.tsx** (4 botones corregidos):
```typescript
// Antes
<button onClick={...}>

// Después
<button 
  type="button"
  onClick={...}
  aria-label="Seleccionar ciudad"
  aria-expanded={showCityDropdown}
  aria-haspopup="true"
>
```

**EventCard.tsx**:
```typescript
<button 
  type="button"
  aria-label={`Ver detalles de ${event.title}`}
  onClick={...}
>
```

**PromoCodeInput.tsx** (4 botones):
- Todos con `type="button"`
- Labels descriptivos específicos
- Botón eliminar con aria-label

**PaymentMethodSelector.tsx**:
- Elementos seleccionables con `role="button"`
- `tabIndex={0}` para navegación por teclado
- `onKeyDown` para eventos de teclado (Enter/Space)
- `aria-label` descriptivo para cada método

**OrderSummary.tsx**:
- Botón eliminar con `type="button"` y `aria-label` dinámico

**Impacto:** Sitio 100% accesible con teclado, compatible con lectores de pantalla, cumplimiento WCAG.

---

**4. Estructura de Datos Mejorada**

**Problema:** `PaymentMethodSelector` intentaba acceder a propiedades inexistentes en `PaymentMethodType` (que es un string union type).

**Solución:** Creada nueva estructura en `checkout-mocks.ts`:

```typescript
export const paymentMethodDetails = [
  {
    type: 'card' as PaymentMethodType,
    name: 'Tarjeta de Crédito/Débito',
    icon: '💳',
    description: 'Visa, Mastercard, American Express',
  },
  {
    type: 'paypal' as PaymentMethodType,
    name: 'PayPal',
    icon: '🅿️',
    description: 'Paga con tu cuenta de PayPal',
  },
  {
    type: 'bizum' as PaymentMethodType,
    name: 'Bizum',
    icon: '📱',
    description: 'Pago instantáneo con Bizum',
  },
];
```

**Impacto:** Datos tipados correctamente, fácil de mantener y extender.

---

#### Componentes Auditados y Corregidos

| Componente | TypeScript | Accesibilidad | Total Correcciones |
|------------|------------|---------------|-------------------|
| SearchBar | - | 8 atributos | 8 |
| EventCard | - | 2 atributos | 2 |
| PromoCodeInput | 1 error | 8 atributos | 9 |
| OrderSummary | 3 errores | 2 atributos | 5 |
| ShippingForm | 9 errores | - | 9 |
| PaymentMethodSelector | 8 errores | 6 atributos | 14 |
| CheckoutPage | 4 errores | - | 4 |
| CartDropdown | 1 error | - | 1 |
| NavLinks | 1 error | - | 1 |
| ProfilePage | - | Duplicación | 1 |
| SettingsPage | - | Duplicación | 1 |
| **TOTAL** | **27** | **26** | **55** |

#### Reglas Verificadas (@.cursor/rules/next-js.mdc)

✅ **Retornos Tempranos**
```typescript
// Aplicado en múltiples componentes
if (!user) return null;
if (appliedCode) return <AppliedCodeBadge />;
```

✅ **Clases Tailwind** - Sin CSS inline en ningún componente

✅ **Nombres Descriptivos** - Variables y funciones con nombres claros

✅ **Handlers con prefijo "handle"**
- handleClick, handleSubmit, handleChange, etc.

✅ **Accesibilidad Implementada**
- aria-label, aria-expanded, aria-haspopup
- type="button" en todos los botones
- role, tabIndex, onKeyDown donde corresponde

✅ **Constantes en lugar de funciones**
```typescript
const handleClick = () => { ... }  // ✅ Correcto
```

✅ **Principio DRY Aplicado**
- Overlay reutilizable
- paymentMethodDetails centralizado
- Constantes extraídas (NAV_ITEMS, MENU_ITEMS, etc.)

#### Resultado de la Auditoría

**Estado Final:**
```
🟢 TypeScript:        0 errores (de 26)
🟢 Accesibilidad:     100% WCAG compliant
🟢 Duplicación:       0 ocurrencias
🟢 Best Practices:    100% cumplimiento
🟢 Linting:           Solo warnings menores aceptables
```

**Comandos de Verificación:**
```bash
npm run typecheck  # ✅ 0 errores
npm run lint       # ✅ Solo warnings de any en catch
```

**Impacto Global:**
- 55 correcciones aplicadas
- 11 componentes mejorados
- Código 100% conforme con estándares del proyecto
- Base sólida para desarrollo futuro

### Componentes del Landing

#### Hero
- Fondo con imagen de artes marciales
- Gradientes superpuestos
- Badge "Eventos próximamente agotados"
- Título con gradiente
- Dos botones CTA
- Estadísticas: +50 Eventos, 100% Seguro, 24/7 Soporte

#### BenefitsSection
- 4 beneficios principales
- Iconos de Lucide React
- Testimonial con rating
- Diseño en grid responsive

#### SecuritySection
- 4 características de seguridad
- Logos de métodos de pago
- Certificado de seguridad visual
- Checkmarks de validación

#### Footer
- Logo y redes sociales
- Enlaces rápidos
- Enlaces legales
- Copyright dinámico

---

## 7. Módulo de Checkout

### Visión General

El módulo de checkout implementa un sistema completo de carrito de compras y procesamiento de órdenes usando mocks. Incluye gestión de carrito, selección de entradas, formularios de información, métodos de pago y confirmación de órdenes.

### CartContext

**Ubicación:** `app/context/CartContext.tsx`

**Funcionalidad:** Context global que gestiona el estado del carrito de compras con persistencia en localStorage.

#### Hook useCart()

```typescript
const {
  items,            // CheckoutItem[] - Items en el carrito
  itemCount,        // number - Cantidad total de items
  subtotal,         // number - Subtotal en euros
  addItem,          // (event, ticketType, quantity) => void
  removeItem,       // (itemId) => void
  updateQuantity,   // (itemId, quantity) => void
  clearCart,        // () => void
  getTotal,         // (discount?) => number
} = useCart();
```

#### Persistencia

- **Key de localStorage:** `'strike_ground_cart'`
- **Guardado automático:** Cada vez que cambia el carrito
- **Carga automática:** Al montar el componente

#### Ejemplo de Uso

```typescript
import { useCart } from '../context/CartContext';

function MyComponent() {
  const { items, addItem, subtotal } = useCart();

  const handleAddToCart = () => {
    // addItem recibe: evento completo, tipo de entrada, cantidad
    addItem(event, 'vip', 2);
  };

  return (
    <div>
      <p>Items: {items.length}</p>
      <p>Subtotal: {subtotal}€</p>
      <button onClick={handleAddToCart}>Agregar</button>
    </div>
  );
}
```

### mockCheckoutService

**Ubicación:** `app/services/mockCheckoutService.ts`

**Funcionalidad:** Servicio MOCK para gestionar órdenes y simular procesamiento de pagos.

#### Métodos Principales

##### createOrder(orderData)

Crea una nueva orden y la guarda en localStorage.

```typescript
const order = await mockCheckoutService.createOrder({
  items,
  shippingInfo,
  paymentMethod,
  subtotal,
  discount,
  total,
  promoCode,
  userId,
});
// Retorna: Order con ID único generado
```

##### getOrders(userId)

Obtiene todas las órdenes de un usuario específico.

```typescript
const orders = await mockCheckoutService.getOrders(userId);
// Retorna: Order[]
```

##### simulatePayment()

Simula el procesamiento de un pago con 90% de probabilidad de éxito.

```typescript
const result = await mockCheckoutService.simulatePayment();
// Retorna: { success: boolean, message: string }
// Demora: 3 segundos
```

##### validatePromoCode(code)

Valida si un código promocional es válido.

```typescript
const promoCode = mockCheckoutService.validatePromoCode('PROMO10');
// Retorna: PromoCode | null
```

#### Códigos Promocionales Disponibles

| Código | Descuento | Descripción |
|--------|-----------|-------------|
| PROMO10 | 10% | Descuento general |
| PROMO20 | 20% | Descuento especial |
| PRIMERA | 15% | Primera compra |
| VIP30 | 30% | Descuento VIP |

### CheckoutPage

**Ubicación:** `app/pages/CheckoutPage.tsx`  
**Ruta:** `/checkout`

**Funcionalidad:** Página principal de checkout con wizard de 3 pasos.

#### Características

**1. Protección de Ruta**
- Redirige a `/eventos` si el carrito está vacío
- Permite checkout como invitado (no requiere autenticación)

**2. Wizard de 3 Pasos**

```
Paso 1: Información de Contacto
  ↓
Paso 2: Método de Pago
  ↓
Paso 3: Confirmación de Orden
```

**3. Layout Responsive**
- Desktop: 2 columnas (formulario + resumen sticky)
- Mobile: 1 columna (formulario arriba, resumen abajo)

#### Paso 1: Información de Contacto

Componente: `ShippingForm`

**Campos:**
- Nombre completo (requerido, mín 3 caracteres)
- Email (requerido, formato válido)
- Teléfono (requerido, formato español)
- Dirección (opcional)

**Validaciones:**
- Email: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- Teléfono: `/^[6-9]\d{8}$/` (formato español)

**Pre-rellenado:**
Si el usuario está autenticado, los campos se pre-rellenan con sus datos del perfil.

#### Paso 2: Método de Pago

Componentes: `PaymentMethodSelector`, `PromoCodeInput`

**Métodos de Pago Disponibles:**
1. Tarjeta de Crédito/Débito
   - Formulario MOCK con validación visual
   - Campos: Número, CVV, Fecha de expiración
2. PayPal
3. Bizum

**Sistema de Códigos Promocionales:**
- Input para ingresar código
- Validación en tiempo real (500ms delay)
- Badge visual cuando se aplica
- Botón para remover código aplicado
- Cálculo automático de descuento

**Términos y Condiciones:**
- Checkbox requerido antes de proceder
- No se puede procesar el pago sin aceptar

**Validación antes de Procesar:**
```typescript
// Validación del método de pago
if (!paymentMethod) {
  setError('Selecciona un método de pago');
  return;
}

// Validación de datos de tarjeta
if (paymentMethod.type === 'card') {
  if (!paymentMethod.cardDetails) {
    setError('Por favor completa los datos de la tarjeta correctamente');
    return;
  }
}

// Validación de términos
if (!acceptedTerms) {
  setError('Debes aceptar los términos y condiciones');
  return;
}
```

#### Paso 3: Confirmación

**Procesamiento del Pago:**
1. Validación de todos los datos requeridos
2. Loading state (3 segundos)
3. Simulación de pago (90% éxito)
4. **Guardado del total en `finalTotal` antes de limpiar carrito**
5. Creación de la orden en localStorage
6. Limpieza del carrito con `clearCart()`
7. Navegación al paso 3 (confirmación)

**Importante - Prevención del Bug de Total en 0:**
```typescript
// CORRECTO: Guardar total ANTES de clearCart()
setFinalTotal(total);  // ← Guardado del total calculado
clearCart();           // ← Limpia carrito (subtotal → 0)
setCurrentStep(3);     // ← Muestra confirmación

// En confirmación, usar finalTotal en lugar de total
<p>{finalTotal.toFixed(2)}€</p>  // ← Muestra total correcto
```

Sin este guardado previo, el `total` calculado dinámicamente se volvería 0 al limpiar el carrito, causando que la confirmación muestre "Total Pagado: 0.00€".

**Información Mostrada en Confirmación:**
- Icono de éxito
- Número de orden único
- Resumen de información de contacto
- **Total pagado (usando `finalTotal`)**
- Botones de acción: "Ver Mis Entradas" y "Volver al Inicio"

### Componentes del Checkout

#### OrderSummary

**Ubicación:** `app/components/OrderSummary.tsx`

**Props:**
```typescript
{
  items: CheckoutItem[];
  subtotal: number;
  discount?: number;
  total: number;
  onRemoveItem?: (itemId: string) => void;
  promoCode?: string;
}
```

**Funcionalidad:**
- Muestra lista de items con imagen, nombre, tipo y precio
- Botón para eliminar items individuales
- Cálculo de subtotal, descuento y total
- Badge del código promocional aplicado

#### ShippingForm

**Ubicación:** `app/components/ShippingForm.tsx`

**Props:**
```typescript
{
  onSubmit: (data: ShippingInfo) => void;
  initialData?: ShippingInfo;
}
```

**Funcionalidad:**
- Formulario completo con validaciones
- Mensajes de error en tiempo real
- Iconos de Lucide React para cada campo
- Botón de submit con validación

#### PaymentMethodSelector

**Ubicación:** `app/components/PaymentMethodSelector.tsx`

**Props:**
```typescript
{
  selectedMethod: PaymentMethod | null;
  onSelect: (method: PaymentMethod) => void;
}
```

**Funcionalidad:**
- Cards seleccionables para cada método
- Formulario condicional para tarjeta
- Formateo automático de número de tarjeta (xxxx xxxx xxxx xxxx)
- Formateo automático de fecha de expiración (MM/AA)
- **Validación en tiempo real de datos de tarjeta**
- Feedback visual inmediato con errores
- Mensajes de error específicos por campo

**Sistema de Validación:**

```typescript
// Validación de número de tarjeta
validateCardNumber(number: string): boolean
- Debe contener exactamente 16 dígitos
- Solo números permitidos
- Formato automático con espacios

// Validación de fecha de expiración
validateExpiry(expiry: string): boolean
- Formato MM/AA obligatorio
- Mes válido (01-12)
- Fecha no puede estar vencida
- Validación contra fecha actual

// Validación de CVV
validateCVV(cvv: string): boolean
- Debe contener exactamente 3 dígitos
- Solo números permitidos
```

**Estados de Validación:**
- `validationErrors`: Objeto con mensajes de error por campo
- Actualización automática al escribir
- Limpieza de errores al corregir
- Border rojo en campos con error
- Mensajes mostrados debajo de cada campo

**Flujo de Validación:**
1. Usuario selecciona método "Tarjeta"
2. Aparece formulario de datos
3. Usuario escribe en campos
4. Validación en tiempo real mientras escribe
5. Si todos los datos son válidos → `cardDetails` se agregan al `PaymentMethod`
6. Si hay errores → Muestra mensajes y previene continuar
7. PayPal y Bizum no requieren datos adicionales

#### PromoCodeInput

**Ubicación:** `app/components/PromoCodeInput.tsx`

**Props:**
```typescript
{
  onApply: (code: string, discount: number) => void;
  appliedCode?: string;
  onRemove?: () => void;
}
```

**Funcionalidad:**
- Input con botón "Aplicar"
- Loading state durante validación
- Mensajes de error para códigos inválidos
- Badge verde para código aplicado
- Botón X para remover código

### Integración con EventDetailsPage

**Modificaciones realizadas:**

1. **Selector de Tipo de Entrada**
   - Cards clicables: General, VIP, Ringside
   - Borde rojo cuando seleccionado
   - Precios dinámicos según tipo

2. **Selector de Cantidad**
   - Botones +/- para ajustar cantidad
   - Mínimo 1, máximo 10
   - Cálculo de precio total en tiempo real

3. **Botón Agregar al Carrito**
   - Icono de carrito
   - Llama a `addItem(event, ticketType, quantity)`
   - Muestra toast de confirmación

4. **Toast de Confirmación**
   - Aparece por 3 segundos
   - Muestra tipo y cantidad de entradas agregadas
   - Botón "Ver Carrito" que redirige a `/checkout`

### Integración con Header

**Modificaciones realizadas:**

1. **Icono de Carrito**
   - Icono `ShoppingCart` de Lucide React
   - Badge con cantidad de items
   - Hover effect

2. **Dropdown del Carrito**
   - Vista rápida de items en el carrito
   - Imagen miniatura de cada evento
   - Nombre, tipo de entrada y precio
   - Botón para eliminar items
   - Subtotal calculado
   - Botón "Ir al Checkout"

### Tipos TypeScript

**Ubicación:** `app/types/checkout.ts`

```typescript
// Tipo de entrada
export type TicketType = 'general' | 'vip' | 'ringside';

// Item en el carrito
export interface CheckoutItem {
  id: string;
  event: FightEvent;        // Evento completo
  ticketType: TicketType;
  quantity: number;
  pricePerTicket: number;
}

// Información de envío/contacto
export interface ShippingInfo {
  fullName: string;
  email: string;
  phone: string;
  address?: string;
}

// Método de pago
export type PaymentMethodType = 'card' | 'paypal' | 'bizum';

export interface PaymentMethod {
  type: PaymentMethodType;
  lastFourDigits?: string;
}

// Orden completa
export interface Order {
  id: string;
  userId?: string;
  items: CheckoutItem[];
  shippingInfo: ShippingInfo;
  paymentMethod: PaymentMethod;
  subtotal: number;
  discount: number;
  total: number;
  promoCode?: string;
  status: OrderStatus;
  createdAt: string;
}

// Código promocional
export interface PromoCode {
  code: string;
  discountPercent: number;
  description: string;
  isActive: boolean;
}
```

### Datos MOCK

**Ubicación:** `app/data/checkout-mocks.ts`

```typescript
// Métodos de pago disponibles
export const availablePaymentMethods: PaymentMethodType[] = [
  'card',
  'paypal',
  'bizum'
];

// Labels de métodos de pago
export const paymentMethodLabels = {
  card: 'Tarjeta de Crédito/Débito',
  paypal: 'PayPal',
  bizum: 'Bizum',
};

// Multiplicadores de precio por tipo de entrada
export const ticketPriceMultipliers = {
  general: 1,    // Precio base
  vip: 2,        // Precio x2
  ringside: 3,   // Precio x3
};
```

### Flujo Completo de Checkout

```
1. Usuario navega a EventDetailsPage
   ↓
2. Selecciona tipo de entrada y cantidad
   ↓
3. Click en "Agregar al Carrito"
   → addItem(event, ticketType, quantity)
   → CartContext agrega item
   → localStorage actualizado
   → Toast de confirmación
   ↓
4. Usuario click en icono de carrito en Header
   → Dropdown muestra items
   ↓
5. Click en "Ir al Checkout"
   → Navigate a /checkout
   ↓
6. CheckoutPage - Paso 1
   → Completar formulario de información
   → Validaciones en tiempo real
   → Click "Continuar al Pago"
   ↓
7. CheckoutPage - Paso 2
   → Seleccionar método de pago
   → (Opcional) Aplicar código promocional
   → Aceptar términos y condiciones
   → Click "Procesar Pago"
   ↓
8. Simulación de Pago (3 segundos)
   → 90% éxito / 10% rechazo
   ↓
9a. Si éxito:
   → Crear orden en mockCheckoutService
   → Guardar en localStorage
   → Limpiar carrito
   → Mostrar Paso 3 (Confirmación)
   → Número de orden generado
   
9b. Si rechazo:
   → Mostrar mensaje de error
   → Permitir reintentar
```

### localStorage Keys

```javascript
'strike_ground_cart'    // Array<CheckoutItem> - Carrito actual
'strike_ground_orders'  // Array<Order> - Todas las órdenes
```

### Migración a Producción - Módulo de Checkout

Para migrar el módulo de checkout a producción:

#### 1. Backend de Órdenes

**Opción A: Supabase**
```typescript
// Tabla orders
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users,
  items JSONB NOT NULL,
  shipping_info JSONB NOT NULL,
  payment_method JSONB NOT NULL,
  subtotal DECIMAL(10,2) NOT NULL,
  discount DECIMAL(10,2) DEFAULT 0,
  total DECIMAL(10,2) NOT NULL,
  promo_code TEXT,
  status TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

**Opción B: API REST Custom**
```
POST /api/orders       → Crear orden
GET /api/orders/:id    → Obtener orden
GET /api/orders/user/:userId → Órdenes del usuario
```

#### 2. Pasarela de Pago Real

**Stripe (Recomendado)**
```bash
npm install @stripe/stripe-js @stripe/react-stripe-js
```

```typescript
// Integración con Stripe
import { loadStripe } from '@stripe/stripe-js';

const stripe = await loadStripe('pk_live_...');

const { error, paymentIntent } = await stripe.confirmCardPayment(
  clientSecret,
  {
    payment_method: {
      card: elements.getElement(CardElement),
      billing_details: { name, email },
    },
  }
);
```

**PayPal**
```bash
npm install @paypal/react-paypal-js
```

#### 3. Seguridad

- ❗ **NUNCA** procesar pagos en el frontend
- ❗ Usar HTTPS obligatorio
- ❗ Validar todas las transacciones en el servidor
- ❗ Implementar rate limiting
- ❗ Sanitizar inputs
- ❗ Auditar todas las transacciones

---

## 8. Guía de Desarrollo

### Setup del Entorno

```bash
# Clonar/navegar al proyecto
cd project

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Abrir en navegador
# http://localhost:5174
```

### Convenciones de Código

#### TypeScript

**Siempre define interfaces para props:**
```typescript
interface MyComponentProps {
  title: string;
  onClose: () => void;
  isOpen?: boolean;  // Opcional
}

export function MyComponent({ title, onClose, isOpen = false }: MyComponentProps) {
  // ...
}
```

**Usa tipos específicos, no `any`:**
```typescript
// ❌ Mal
const user: any = getCurrentUser();

// ✅ Bien
const user: User | null = getCurrentUser();
```

#### React

**Componentes funcionales con TypeScript:**
```typescript
export function ComponentName() {
  const [state, setState] = useState<Type>(initialValue);
  
  return (
    <div>
      {/* JSX */}
    </div>
  );
}
```

**Custom Hooks:**
```typescript
function useMyHook() {
  const [value, setValue] = useState('');
  
  // lógica
  
  return { value, setValue };
}
```

#### Tailwind CSS

**Orden de clases recomendado:**
```typescript
className="
  // Layout
  flex items-center justify-between
  // Spacing
  p-4 m-2
  // Sizing
  w-full h-auto
  // Typography
  text-lg font-bold
  // Colors
  bg-black text-white
  // Effects
  hover:bg-gray-900 transition-colors
  // Responsive
  md:flex-row md:p-6
"
```

**Evitar clases duplicadas:**
```typescript
// ❌ Mal
className="bg-red-500 hover:bg-red-500"

// ✅ Bien
className="bg-red-500 hover:bg-red-600"
```

### Estructura de Componentes

**Template básico:**

```typescript
import { useState } from 'react';
import { SomeIcon } from 'lucide-react';

interface MyComponentProps {
  // props
}

export function MyComponent({ }: MyComponentProps) {
  // Estado
  const [state, setState] = useState(initialValue);
  
  // Handlers
  const handleSomething = () => {
    // lógica
  };
  
  // Render
  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Contenido */}
      </div>
    </section>
  );
}
```

### Cómo Agregar una Nueva Página

1. **Crear el componente:**
```typescript
// app/pages/NewPage.tsx (o app/pages/(protected)/NewPage.tsx si requiere autenticación)
export function NewPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <h1>Nueva Página</h1>
    </div>
  );
}
```

**Nota:** 
- Siempre agregar `pt-20` para compensar el header fixed.
- Si la página requiere autenticación, créala en `app/pages/(protected)/` en lugar de `app/pages/`

2. **Agregar la ruta en App.tsx:**
```typescript
import { NewPage } from './pages/NewPage';

// En las rutas:
<Route path="/new" element={<NewPage />} />

// O protegida:
<Route
  path="/new"
  element={
    <ProtectedRoute>
      <NewPage />
    </ProtectedRoute>
  }
/>
```

3. **Agregar navegación en Header:**
```typescript
// Para rutas internas (usar Link de react-router):
<Link to="/new" className="text-gray-300 hover:text-white">
  Nueva Página
</Link>

// Para anclas dentro de la misma página:
<a href="#seccion" className="text-gray-300 hover:text-white">
  Sección
</a>
```

### Testing Manual

**Checklist antes de commit:**

- [ ] TypeScript compila sin errores (`npm run typecheck`)
- [ ] Lint pasa sin errores (`npm run lint`)
- [ ] La página carga sin errores en consola
- [ ] Funciona en mobile (DevTools responsive mode)
- [ ] Funciona en diferentes navegadores
- [ ] Loading states funcionan
- [ ] Error handling funciona
- [ ] Navegación funciona correctamente

### Debugging

**Ver datos en localStorage:**
```javascript
// En consola del navegador
localStorage.getItem('strike_ground_users')
localStorage.getItem('strike_ground_session')
```

**Limpiar datos:**
```javascript
localStorage.clear()
```

**Ver logs del sistema MOCK:**
El mockAuthService hace `console.log` de eventos importantes:
```javascript
console.log('[MOCK] Email de recuperación enviado a:', email);
console.log('[MOCK] Email verificado exitosamente');
```

---

## 9. API Reference

### useAuth Hook

```typescript
const {
  user: User | null,
  isLoading: boolean,
  isAuthenticated: boolean,
  authModalOpen: boolean,
  authModalMode: 'login' | 'register',
  setAuthModalOpen: (open: boolean) => void,
  setAuthModalMode: (mode: 'login' | 'register') => void,
  signUp: (credentials: RegisterCredentials) => Promise<void>,
  signIn: (credentials: LoginCredentials) => Promise<void>,
  signOut: () => Promise<void>,
  forgotPassword: (email: string) => Promise<void>,
  verifyEmail: () => Promise<void>,
  updateProfile: (updates: Partial<User>) => Promise<void>,
} = useAuth();
```

### mockAuthService

#### register(credentials)

**Parámetros:**
```typescript
{
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
}
```

**Retorna:** `Promise<User>`

**Validaciones:**
- Email válido
- Contraseña segura (8+ chars, mayúsculas, números, símbolos)
- Contraseñas coincidentes
- Email no duplicado

**Errores posibles:**
- "Todos los campos son requeridos"
- "Email inválido"
- "Las contraseñas no coinciden"
- "La contraseña debe tener mínimo 8 caracteres..."
- "Este email ya está registrado"

#### login(credentials)

**Parámetros:**
```typescript
{
  email: string;
  password: string;
  rememberMe?: boolean;
}
```

**Retorna:** `Promise<User>`

**Crea:** Sesión en localStorage (válida 7 días)

**Errores posibles:**
- "Email y contraseña son requeridos"
- "Email o contraseña incorrectos"

#### logout()

**Retorna:** `Promise<void>`

**Limpia:**
- Sesión de localStorage
- Usuario actual de localStorage

#### getCurrentUser()

**Retorna:** `Promise<User | null>`

**Verifica:**
- Si hay sesión válida
- Si la sesión no expiró
- Retorna usuario o null

#### forgotPassword(email)

**Parámetros:** `email: string`

**Retorna:** `Promise<void>`

**Nota:** En MOCK, siempre retorna éxito (por seguridad)

#### verifyEmail(userId)

**Parámetros:** `userId: string`

**Retorna:** `Promise<void>`

**Marca:** Email como verificado

#### updateProfile(userId, updates)

**Parámetros:**
```typescript
userId: string
updates: Partial<User>
```

**Retorna:** `Promise<User>`

**Actualiza:** Información del perfil en localStorage

### localStorage Keys

```typescript
'strike_ground_users'        // Array<User>
'strike_ground_current_user' // User | null
'strike_ground_session'      // Session | null
```

### Tipos TypeScript Completos

```typescript
// auth.types.ts

export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  avatar_url: string;
  created_at: string;
  email_verified: boolean;
  last_login?: string;
}

export interface Session {
  userId: string;
  token: string;
  expiresAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  authModalOpen: boolean;
  authModalMode: 'login' | 'register';
  setAuthModalOpen: (open: boolean) => void;
  setAuthModalMode: (mode: 'login' | 'register') => void;
  signUp: (credentials: RegisterCredentials) => Promise<void>;
  signIn: (credentials: LoginCredentials) => Promise<void>;
  signOut: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  verifyEmail: () => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
}
```

---

## 10. Migración a Producción

### ⚠️ Importante

El sistema MOCK actual **NO es seguro para producción**:

- ❌ Contraseñas en texto plano
- ❌ No hay encriptación real
- ❌ localStorage es vulnerable
- ❌ No hay rate limiting
- ❌ No hay validación server-side

### Opciones de Backend

#### Opción 1: Supabase (Recomendado ⭐)

**Ventajas:**
- Auth built-in
- PostgreSQL
- Real-time capabilities
- Gratuito hasta cierto límite
- Fácil integración

**Setup:**

1. **Crear proyecto en Supabase:**
   - Ir a https://supabase.com
   - Crear nuevo proyecto
   - Obtener API keys

2. **Instalar dependencias:**
```bash
npm install @supabase/supabase-js
```

3. **Variables de entorno:**
```bash
# .env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

4. **Crear realAuthService.ts:**
```typescript
// app/auth/services/realAuthService.ts
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);

export const realAuthService = {
  async register({ email, password, name }) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name }
      }
    });
    
    if (error) throw error;
    return data.user;
  },

  async login({ email, password }) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) throw error;
    return data.user;
  },

  async logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async getCurrentUser() {
    const { data } = await supabase.auth.getUser();
    return data.user;
  },

  async forgotPassword(email) {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw error;
  },

  async updateProfile(userId, updates) {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId);
    
    if (error) throw error;
    return data;
  },
};
```

5. **Actualizar AuthContext:**
```typescript
// Cambiar import
import { realAuthService } from '../services/realAuthService';

// Cambiar todas las llamadas
const signUp = async (credentials: RegisterCredentials) => {
  const newUser = await realAuthService.register(credentials);
  // ...
};
```

6. **Crear tabla de perfiles en Supabase:**
```sql
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE,
  name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (id)
);
```

#### Opción 2: Firebase Auth

**Setup:**

```bash
npm install firebase
```

```typescript
// app/auth/services/firebaseAuthService.ts
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const firebaseAuthService = {
  async register({ email, password, name }) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // Guardar nombre en Firestore
    return userCredential.user;
  },

  async login({ email, password }) {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  },

  // ... más métodos
};
```

#### Opción 3: Backend Custom

**Stack sugerido:**
- Node.js + Express
- PostgreSQL / MongoDB
- JWT tokens
- bcrypt para passwords

**Ejemplo básico:**

```typescript
// Backend (Node.js + Express)
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

app.post('/api/auth/register', async (req, res) => {
  const { email, password, name } = req.body;
  
  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  
  // Save to database
  const user = await db.users.create({
    email,
    password: hashedPassword,
    name
  });
  
  // Generate JWT
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
  
  res.json({ user, token });
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  
  // Find user
  const user = await db.users.findOne({ email });
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  
  // Verify password
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return res.status(401).json({ error: 'Invalid credentials' });
  
  // Generate JWT
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
  
  res.json({ user, token });
});
```

### Migración Paso a Paso

1. **Elegir backend** (Supabase, Firebase, o custom)
2. **Configurar proyecto backend**
3. **Crear `realAuthService.ts`** con la misma interfaz que mockAuthService
4. **Actualizar AuthContext** para usar realAuthService
5. **Agregar variables de entorno**
6. **Testing exhaustivo**
7. **Deploy backend y frontend**

### Checklist de Seguridad para Producción

- [ ] Contraseñas hasheadas con bcrypt (o similar)
- [ ] HTTPS obligatorio
- [ ] Tokens JWT con expiración
- [ ] Rate limiting en endpoints de auth
- [ ] Validación server-side de todos los datos
- [ ] CORS configurado correctamente
- [ ] Variables de entorno seguras
- [ ] Logs de actividad sospechosa
- [ ] 2FA opcional disponible
- [ ] Email verification real
- [ ] Password reset con token temporal
- [ ] Session management robusto
- [ ] SQL injection protection
- [ ] XSS protection
- [ ] CSRF protection

### Upload de Avatar en Producción

**Opción 1: AWS S3**

```typescript
import AWS from 'aws-sdk';

async function uploadToS3(file: File): Promise<string> {
  const s3 = new AWS.S3({
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_KEY
  });

  const params = {
    Bucket: 'strike-ground-avatars',
    Key: `avatars/${userId}-${Date.now()}.jpg`,
    Body: file,
    ContentType: file.type,
    ACL: 'public-read'
  };

  const result = await s3.upload(params).promise();
  return result.Location;
}
```

**Opción 2: Cloudinary**

```typescript
import { v2 as cloudinary } from 'cloudinary';

async function uploadToCloudinary(base64: string): Promise<string> {
  const result = await cloudinary.uploader.upload(base64, {
    folder: 'strike-ground/avatars',
    transformation: [
      { width: 400, height: 400, crop: 'fill' },
      { quality: 'auto' }
    ]
  });

  return result.secure_url;
}
```

**Opción 3: Supabase Storage**

```typescript
async function uploadToSupabase(file: File): Promise<string> {
  const fileName = `${userId}-${Date.now()}.jpg`;
  
  const { data, error } = await supabase.storage
    .from('avatars')
    .upload(fileName, file);

  if (error) throw error;

  const { data: { publicUrl } } = supabase.storage
    .from('avatars')
    .getPublicUrl(fileName);

  return publicUrl;
}
```

---

## 11. Solución de Problemas

### Problemas Comunes

#### El servidor no inicia

**Error:** `Cannot find module` o similar

**Solución:**
```bash
# Limpiar caché
npm cache clean --force

# Eliminar node_modules
rm -rf node_modules package-lock.json

# Reinstalar
npm install

# Iniciar
npm run dev
```

#### Errores de TypeScript

**Error:** `Type 'X' is not assignable to type 'Y'`

**Solución:**
```bash
# Verificar configuración
npm run typecheck

# Ver errores detallados
npx tsc --noEmit
```

**Revisar:**
- Tipos correctamente definidos
- Imports correctos
- Props coinciden con interfaces

#### Sesión no persiste al refrescar

**Causa:** localStorage no está guardando o navegador en modo incógnito

**Solución:**
1. Verificar que no estés en modo incógnito
2. Verificar permisos de localStorage
3. Abrir DevTools → Application → Local Storage
4. Verificar que existan las keys

**Debug:**
```javascript
// En consola del navegador
localStorage.getItem('strike_ground_session')
```

#### Header no muestra usuario autenticado

**Causa:** AuthProvider no envuelve la app

**Solución:**
Verificar en `App.tsx`:
```typescript
<AuthProvider>  {/* ← Debe estar aquí */}
  <Header />
  <Routes>
    {/* ... */}
  </Routes>
</AuthProvider>
```

#### Credenciales demo no funcionan

**Causa:** localStorage corrupto o borrado

**Solución:**
```javascript
// Limpiar todo
localStorage.clear()

// Refrescar página (F5)
// El usuario demo se recreará automáticamente
```

#### Avatar no se muestra

**Causa 1:** API de Dicebear caída

**Solución:** Usar avatar por defecto
```typescript
avatar_url: user.avatar_url || '/default-avatar.png'
```

**Causa 2:** Base64 muy grande

**Solución:** Verificar compresión de imágenes

#### Ruta protegida muestra "Not authenticated"

**Causa:** Intentando acceder antes de que cargue la sesión

**Solución:**
El `ProtectedRoute` ya maneja esto con `isLoading`:
```typescript
if (isLoading) {
  return <LoadingSpinner />;
}
```

Verificar que esté implementado correctamente.

#### Estilos no se aplican

**Causa 1:** Tailwind no configurado

**Solución:** Verificar `app/index.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**Causa 2:** Clases incorrectas

**Solución:** Verificar sintaxis de Tailwind

**Causa 3:** Build caché

**Solución:**
```bash
rm -rf dist
npm run build
```

### Debugging Avanzado

#### Ver estado de React en DevTools

1. Instalar React DevTools extension
2. Abrir DevTools → Components
3. Buscar componente
4. Ver props y state

#### Ver llamadas a localStorage

```javascript
// Interceptar setItem
const originalSetItem = localStorage.setItem;
localStorage.setItem = function(key, value) {
  console.log('localStorage.setItem:', key, value);
  originalSetItem.apply(this, arguments);
};
```

#### Ver todas las renderizaciones

```typescript
function MyComponent() {
  console.log('MyComponent rendered');
  // ...
}
```

### Logs del Sistema MOCK

El mockAuthService imprime logs importantes:

```javascript
console.log('[MOCK] Email de recuperación enviado a:', email);
console.log('[MOCK] Email verificado exitosamente');
console.log('[MOCK] Contraseña actualizada');
console.log('[MOCK] Usuario registrado:', user);
console.log('[MOCK] Login exitoso:', user);
```

Busca estos logs en la consola para debugging.

---

## 12. FAQ

### General

#### ¿Es seguro el sistema MOCK?

**NO.** El sistema MOCK es solo para desarrollo y demos. Las contraseñas se almacenan en texto plano en localStorage. **Nunca usar en producción.**

#### ¿Puedo usar esto en producción?

**NO directamente.** Necesitas migrar a un backend real con contraseñas hasheadas, HTTPS, tokens JWT, etc. Ver [Migración a Producción](#9-migración-a-producción).

#### ¿Cuánto tiempo toma migrar a producción?

Depende del backend elegido:
- **Supabase/Firebase:** 1-2 días
- **Backend custom:** 1-2 semanas

#### ¿Funciona offline?

Sí, el sistema MOCK funciona completamente offline una vez cargada la página.

### Autenticación

#### ¿Cómo agrego OAuth (Google, Facebook)?

Con Supabase es muy fácil:
```typescript
const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'google'
});
```

#### ¿Puedo cambiar el tiempo de expiración de sesión?

Sí, en `mockAuthService.ts`:
```typescript
expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 días
```

#### ¿Cómo implemento "Recordarme"?

Ya está implementado. La sesión dura 7 días por defecto.

#### ¿Puedo tener múltiples roles (admin, user)?

Sí, agregar campo `role` al tipo User:
```typescript
interface User {
  // ...
  role: 'admin' | 'user';
}
```

### Perfil y Configuración

#### ¿Cómo agrego más campos al perfil?

1. Actualizar tipo `User` en `app/auth/types/auth.types.ts`
2. Actualizar `app/auth/services/mockAuthService.ts` en el método `register()`
3. Actualizar `app/pages/(protected)/ProfilePage.tsx`

#### ¿Puedo cambiar el avatar automático?

Sí, está en el código:
```typescript
avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
```

Puedes usar otros estilos de Dicebear o cualquier API de avatares.

#### ¿Cómo cambio los colores del modal?

En los componentes, busca clases de Tailwind:
```typescript
className="bg-red-600" // Cambiar a bg-blue-600, etc.
```

### Eventos

#### ¿Cómo agrego una nueva categoría de evento?

1. **Actualizar tipo** en `app/types/event.ts`:
```typescript
category: 'MMA' | 'BOXEO' | '...' | 'NUEVA_CATEGORIA';
```

2. **Actualizar labels** en `app/components/EventCard.tsx`:
```typescript
const categoryLabels = {
  // ...
  NUEVA_CATEGORIA: 'Nombre Legible',
};
```

3. **Agregar color** (opcional):
```typescript
const categoryColors = {
  // ...
  NUEVA_CATEGORIA: 'indigo',
};
```

#### ¿Cómo conecto el botón "Comprar"?

Actualmente es un placeholder. Para implementarlo:

1. Crear carrito de compras
2. Agregar sistema de pago (Stripe/PayPal)
3. Implementar backend para procesar pagos

### Desarrollo

#### ¿Funciona en mobile?

Sí, todo está diseñado con Tailwind responsive:
```typescript
className="w-full sm:w-auto md:flex lg:grid-cols-3"
```

#### ¿Cómo agrego testing?

Instalar dependencias:
```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom
```

Ejemplo de test:
```typescript
import { render, screen } from '@testing-library/react';
import { Header } from './Header';

test('renders header', () => {
  render(<Header />);
  expect(screen.getByText('Strike & Ground')).toBeInTheDocument();
});
```

#### ¿Puedo usar otro framework CSS?

Sí, pero tendrías que reemplazar todas las clases de Tailwind. Es un trabajo considerable.

#### ¿Cómo hago deploy?

**Netlify (recomendado):**
```bash
npm run build
netlify deploy --prod
```

**Vercel:**
```bash
npm run build
vercel --prod
```

**GitHub Pages:**
```bash
npm run build
# Copiar dist/ a gh-pages branch
```

### Limitaciones

#### ¿Cuántos usuarios puedo tener en MOCK?

localStorage tiene límite de ~5-10MB. Con usuarios promedio, unos 50-100 usuarios antes de problemas.

#### ¿Puedo usar imágenes grandes como avatar?

Sí, pero se comprimen automáticamente a 400px de ancho. Máximo 2MB de imagen original.

#### ¿El sistema escala?

El MOCK no. Para producción con miles de usuarios, necesitas backend real con base de datos.

---

## Conclusión

Este proyecto proporciona una base sólida para una plataforma de venta de entradas de eventos de deportes de contacto. El sistema MOCK es perfecto para desarrollo, demos y prototipado, pero **debe migrarse a un backend real para producción**.

**Puntos clave:**
- ✅ Sistema completamente funcional end-to-end
- ✅ Código limpio, modular y mantenible
- ✅ TypeScript type-safe
- ✅ Documentación completa
- ✅ Fácil migración a producción
- ⚠️ No apto para producción sin backend real

Para más información o ayuda específica, consulta las secciones relevantes de esta documentación.

---

**Versión**: 1.5.1 (MOCK)  
**Última actualización**: Diciembre 22, 2025  
**Estado**: ✅ Sistema MOCK completamente funcional + Código Auditado y Optimizado

---

*¿Preguntas o problemas? Revisa la sección [Solución de Problemas](#11-solución-de-problemas) o [FAQ](#12-faq).*

