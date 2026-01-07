// Servicio de autenticación MOCK - Simula un backend real
import { User, LoginCredentials, RegisterCredentials } from '../types';

// Storage keys
const USERS_KEY = 'strike_ground_users';
const CURRENT_USER_KEY = 'strike_ground_current_user';
const SESSION_KEY = 'strike_ground_session';

// Simula latencia de red
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Usuario demo precargado
const DEMO_USER = {
  id: 'demo-user-1',
  email: 'demo@strikeandground.com',
  name: 'Usuario Demo',
  password: 'Demo123!', // En producción NUNCA almacenar passwords en texto plano
  avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=demo',
  created_at: new Date().toISOString(),
  email_verified: true,
};

// Inicializar usuarios mock
const initMockUsers = () => {
  const users = localStorage.getItem(USERS_KEY);
  if (!users) {
    localStorage.setItem(USERS_KEY, JSON.stringify([DEMO_USER]));
  }
};

// Obtener todos los usuarios
const getUsers = (): any[] => {
  initMockUsers();
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
};

// Guardar usuarios
const saveUsers = (users: any[]) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

// Validar email
const isValidEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Validar password
const isValidPassword = (password: string): boolean => {
  // Mínimo 8 caracteres, 1 mayúscula, 1 número, 1 símbolo
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return re.test(password);
};

export const mockAuthService = {
  // REGISTRO
  async register(credentials: RegisterCredentials): Promise<User> {
    await delay(1000); // Simula latencia

    const { email, password, confirmPassword, name } = credentials;

    // Validaciones
    if (!email || !password || !name) {
      throw new Error('Todos los campos son requeridos');
    }

    if (!isValidEmail(email)) {
      throw new Error('Email inválido');
    }

    if (password !== confirmPassword) {
      throw new Error('Las contraseñas no coinciden');
    }

    if (!isValidPassword(password)) {
      throw new Error('La contraseña debe tener mínimo 8 caracteres, incluir mayúsculas, números y símbolos');
    }

    const users = getUsers();

    // Verificar si el email ya existe
    if (users.find((u: any) => u.email === email)) {
      throw new Error('Este email ya está registrado');
    }

    // Crear nuevo usuario
    const newUser = {
      id: `user-${Date.now()}`,
      email,
      name,
      password, // En producción esto estaría hasheado
      avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      created_at: new Date().toISOString(),
      email_verified: false, // En MOCK lo verificamos automáticamente después
    };

    users.push(newUser);
    saveUsers(users);

    // Retornar usuario sin password
    const { password: _, ...userWithoutPassword } = newUser;
    return userWithoutPassword as User;
  },

  // LOGIN
  async login(credentials: LoginCredentials): Promise<User> {
    await delay(800); // Simula latencia

    const { email, password } = credentials;

    if (!email || !password) {
      throw new Error('Email y contraseña son requeridos');
    }

    const users = getUsers();
    const user = users.find((u: any) => u.email === email);

    if (!user) {
      throw new Error('Email o contraseña incorrectos');
    }

    if (user.password !== password) {
      throw new Error('Email o contraseña incorrectos');
    }

    // Guardar sesión
    const session = {
      userId: user.id,
      token: `mock-token-${Date.now()}`,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 días
    };

    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));

    // Retornar usuario sin password
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword as User;
  },

  // LOGOUT
  async logout(): Promise<void> {
    await delay(300);
    localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(CURRENT_USER_KEY);
  },

  // OBTENER USUARIO ACTUAL
  async getCurrentUser(): Promise<User | null> {
    await delay(300);

    const session = localStorage.getItem(SESSION_KEY);
    if (!session) {
      return null;
    }

    const { expiresAt, userId } = JSON.parse(session) as { expiresAt: string; userId: string; token: string };

    // Verificar si la sesión expiró
    if (new Date(expiresAt) < new Date()) {
      localStorage.removeItem(SESSION_KEY);
      localStorage.removeItem(CURRENT_USER_KEY);
      return null;
    }

    const users = getUsers();
    const user = users.find((u: any) => u.id === userId);

    if (!user) {
      return null;
    }

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword as User;
  },

  // RECUPERAR CONTRASEÑA (envía email)
  async forgotPassword(email: string): Promise<void> {
    await delay(1000);

    if (!email) {
      throw new Error('Email es requerido');
    }

    if (!isValidEmail(email)) {
      throw new Error('Email inválido');
    }

    const users = getUsers();
    const user = users.find((u: any) => u.email === email);

    // Por seguridad, siempre retornar éxito aunque el email no exista
    if (!user) {
      console.log('[MOCK] Email no encontrado, pero retornamos éxito por seguridad');
    } else {
      console.log('[MOCK] Email de recuperación enviado a:', email);
      console.log('[MOCK] En producción, aquí se enviaría un email real');
    }

    // Simular envío de email
    return;
  },

  // RESETEAR CONTRASEÑA
  async resetPassword(_token: string, newPassword: string): Promise<void> {
    await delay(1000);

    if (!newPassword) {
      throw new Error('Contraseña es requerida');
    }

    if (!isValidPassword(newPassword)) {
      throw new Error('La contraseña debe tener mínimo 8 caracteres, incluir mayúsculas, números y símbolos');
    }

    // En MOCK, simplemente actualizamos la contraseña del usuario actual
    const currentUserStr = localStorage.getItem(CURRENT_USER_KEY);
    if (!currentUserStr) {
      throw new Error('No hay sesión activa');
    }

    const currentUser = JSON.parse(currentUserStr);
    const users = getUsers();
    const userIndex = users.findIndex((u: any) => u.id === currentUser.id);

    if (userIndex === -1) {
      throw new Error('Usuario no encontrado');
    }

    users[userIndex].password = newPassword;
    saveUsers(users);

    console.log('[MOCK] Contraseña actualizada exitosamente');
  },

  // VERIFICAR EMAIL
  async verifyEmail(userId: string): Promise<void> {
    await delay(500);

    const users = getUsers();
    const userIndex = users.findIndex((u: any) => u.id === userId);

    if (userIndex === -1) {
      throw new Error('Usuario no encontrado');
    }

    users[userIndex].email_verified = true;
    saveUsers(users);

    // Actualizar usuario en sesión
    const currentUserStr = localStorage.getItem(CURRENT_USER_KEY);
    if (currentUserStr) {
      const currentUser = JSON.parse(currentUserStr);
      if (currentUser.id === userId) {
        currentUser.email_verified = true;
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser));
      }
    }

    console.log('[MOCK] Email verificado exitosamente');
  },

  // ACTUALIZAR PERFIL
  async updateProfile(userId: string, updates: Partial<User>): Promise<User> {
    await delay(800);

    const users = getUsers();
    const userIndex = users.findIndex((u: any) => u.id === userId);

    if (userIndex === -1) {
      throw new Error('Usuario no encontrado');
    }

    // Actualizar usuario
    users[userIndex] = { ...users[userIndex], ...updates };
    saveUsers(users);

    // Actualizar usuario en sesión
    const currentUserStr = localStorage.getItem(CURRENT_USER_KEY);
    if (currentUserStr) {
      const currentUser = JSON.parse(currentUserStr);
      if (currentUser.id === userId) {
        const updatedUser = { ...currentUser, ...updates };
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser));
      }
    }

    const { password: _, ...userWithoutPassword } = users[userIndex];
    return userWithoutPassword as User;
  },
};

