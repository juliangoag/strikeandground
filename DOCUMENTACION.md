# 📖 Documentación Completa - Strike & Ground

## 📑 Índice

1. [Arquitectura del Proyecto](#1-arquitectura-del-proyecto)
2. [Módulo de Autenticación](#2-módulo-de-autenticación)
3. [Gestión de Perfil de Usuario](#3-gestión-de-perfil-de-usuario)
4. [Sistema de Configuración](#4-sistema-de-configuración)
5. [Upload de Avatar](#5-upload-de-avatar)
6. [Módulo de Eventos](#6-módulo-de-eventos)
7. [Guía de Desarrollo](#7-guía-de-desarrollo)
8. [API Reference](#8-api-reference)
9. [Migración a Producción](#9-migración-a-producción)
10. [Solución de Problemas](#10-solución-de-problemas)
11. [FAQ](#11-faq)

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

### Estructura de Archivos Detallada

```
project/
├── src/
│   ├── auth/                              # Módulo de autenticación
│   │   ├── components/
│   │   │   ├── AuthModal.tsx             # Modal principal con tabs
│   │   │   ├── LoginForm.tsx             # Formulario de login
│   │   │   ├── RegisterForm.tsx          # Formulario de registro
│   │   │   ├── ForgotPasswordForm.tsx    # Recuperación de contraseña
│   │   │   ├── ProtectedRoute.tsx        # HOC para rutas protegidas
│   │   │   └── AvatarUploadModal.tsx     # Upload de foto de perfil
│   │   ├── context/
│   │   │   └── AuthContext.tsx           # Context + Provider + useAuth
│   │   ├── services/
│   │   │   └── mockAuthService.ts        # Lógica MOCK completa
│   │   └── types/
│   │       └── auth.types.ts             # Tipos TypeScript
│   ├── components/                        # Componentes globales
│   │   ├── Header.tsx                    # Navegación principal
│   │   ├── Hero.tsx                      # Sección hero
│   │   ├── EventsSection.tsx             # Sección de eventos destacados
│   │   ├── EventCard.tsx                 # Tarjeta de evento
│   │   ├── SearchBar.tsx                 # Barra de búsqueda de eventos
│   │   ├── BenefitsSection.tsx           # Beneficios
│   │   ├── SecuritySection.tsx           # Seguridad
│   │   └── Footer.tsx                    # Pie de página
│   ├── pages/                            # Páginas
│   │   ├── HomePage.tsx                  # Landing page
│   │   ├── EventsPage.tsx                # Catálogo completo de eventos
│   │   ├── ProfilePage.tsx               # Perfil de usuario
│   │   └── SettingsPage.tsx              # Configuración
│   ├── data/
│   │   └── events.ts                     # Datos de eventos
│   ├── types/
│   │   └── event.ts                      # Tipos de eventos
│   ├── App.tsx                           # Componente raíz + Router
│   ├── main.tsx                          # Entry point
│   └── index.css                         # Estilos globales
├── public/                               # Assets estáticos
├── dist/                                 # Build de producción
├── README.md                             # Documentación principal
├── DOCUMENTACION.md                      # Este archivo
├── CHANGELOG.md                          # Historial de cambios
├── package.json                          # Dependencias
├── tsconfig.json                         # Config TypeScript
├── tailwind.config.js                    # Config Tailwind
└── vite.config.ts                        # Config Vite
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
- Redirige a home si no autenticado
- Permite acceso si autenticado

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

### AuthContext y useAuth Hook

**Hook principal para acceder al estado de autenticación:**

```typescript
const {
  user,              // User | null - Usuario actual
  isLoading,         // boolean - Cargando sesión
  isAuthenticated,   // boolean - Si hay usuario autenticado
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
- Botón "Comprar"

**Efectos visuales:**
- Hover con escala 1.02
- Imagen con zoom al hover
- Gradientes elegantes
- Bordes que cambian de color
- Transiciones suaves

**Categorías y colores:**

| Categoría | Color | Badge |
|-----------|-------|-------|
| MMA | Rojo (`red-500`) | MMA |
| BOXEO | Azul (`blue-500`) | Boxeo |
| MUAY_THAI | Amarillo (`yellow-500`) | Muay Thai |
| KICKBOXING | Púrpura (`purple-500`) | Kickboxing |
| BJJ | Verde (`green-500`) | BJJ |
| WRESTLING | Naranja (`orange-500`) | Wrestling |

### Cómo Agregar un Evento

**Editar:** `src/data/events.ts`

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

## 7. Guía de Desarrollo

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
// src/pages/NewPage.tsx
export function NewPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <h1>Nueva Página</h1>
    </div>
  );
}
```

**Nota:** Siempre agregar `pt-20` para compensar el header fixed.

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

## 8. API Reference

### useAuth Hook

```typescript
const {
  user: User | null,
  isLoading: boolean,
  isAuthenticated: boolean,
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
  signUp: (credentials: RegisterCredentials) => Promise<void>;
  signIn: (credentials: LoginCredentials) => Promise<void>;
  signOut: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  verifyEmail: () => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
}
```

---

## 9. Migración a Producción

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
// src/auth/services/realAuthService.ts
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
// src/auth/services/firebaseAuthService.ts
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

## 10. Solución de Problemas

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

**Solución:** Verificar `src/index.css`:
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

## 11. FAQ

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

1. Actualizar tipo `User` en `auth.types.ts`
2. Actualizar `mockAuthService.register()`
3. Actualizar `ProfilePage.tsx`

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

1. **Actualizar tipo** en `src/types/event.ts`:
```typescript
category: 'MMA' | 'BOXEO' | '...' | 'NUEVA_CATEGORIA';
```

2. **Actualizar labels** en `EventCard.tsx`:
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

**Versión**: 1.1.0 (MOCK)  
**Última actualización**: Diciembre 4, 2025  
**Estado**: ✅ Sistema MOCK completamente funcional + Módulo de Eventos

---

*¿Preguntas o problemas? Revisa la sección [Solución de Problemas](#10-solución-de-problemas) o [FAQ](#11-faq).*

