import { AdminStatistics, UserWithStats } from '../types';
import { mockCheckoutService } from '../../checkout/services/mockCheckoutService';
import { mockTicketService } from '../../tickets/services/mockTicketService';
import { upcomingEvents } from '../../events/data';
import { User } from '../../auth/types';

const USERS_KEY = 'strike_ground_users';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockAdminService = {
  /**
   * Obtiene estadísticas generales del sistema
   */
  async getStatistics(): Promise<AdminStatistics> {
    await delay(500);

    const orders = await mockCheckoutService.getAllOrders();
    const tickets = mockTicketService.getAllTickets();
    const usersData = localStorage.getItem(USERS_KEY);
    const users = usersData ? JSON.parse(usersData) : [];

    const completedOrders = orders.filter((o) => o.status === 'completed');
    const pendingOrders = orders.filter((o) => o.status === 'pending');
    const totalRevenue = completedOrders.reduce((sum, o) => sum + o.total, 0);
    const validatedTickets = tickets.filter((t) => t.status === 'used').length;

    return {
      totalEvents: upcomingEvents.length,
      publishedEvents: upcomingEvents.length, // En MOCK todos están publicados
      draftEvents: 0,
      totalOrders: orders.length,
      completedOrders: completedOrders.length,
      pendingOrders: pendingOrders.length,
      totalRevenue,
      totalUsers: users.length,
      totalTickets: tickets.length,
      validatedTickets,
    };
  },

  /**
   * Obtiene todos los usuarios con sus estadísticas
   */
  async getAllUsersWithStats(): Promise<UserWithStats[]> {
    await delay(300);

    const usersData = localStorage.getItem(USERS_KEY);
    const users: User[] = usersData ? JSON.parse(usersData) : [];
    const orders = await mockCheckoutService.getAllOrders();

    return users.map((user) => {
      const userOrders = orders.filter((o) => o.userId === user.id);
      const completedUserOrders = userOrders.filter((o) => o.status === 'completed');
      const totalSpent = completedUserOrders.reduce((sum, o) => sum + o.total, 0);
      const totalTickets = completedUserOrders.reduce((sum, o) => {
        return sum + o.items.reduce((itemSum, item) => itemSum + item.quantity, 0);
      }, 0);

      // Última actividad es la fecha de la última orden
      const lastOrder = userOrders.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )[0];

      return {
        ...user,
        totalOrders: userOrders.length,
        totalSpent,
        totalTickets,
        lastActivity: lastOrder ? lastOrder.createdAt : user.created_at,
      };
    });
  },

  /**
   * Cambia el rol de un usuario
   */
  async changeUserRole(userId: string, newRole: 'user' | 'admin'): Promise<void> {
    await delay(300);

    const usersData = localStorage.getItem(USERS_KEY);
    const users = usersData ? JSON.parse(usersData) : [];
    const userIndex = users.findIndex((u: any) => u.id === userId);

    if (userIndex === -1) {
      throw new Error('Usuario no encontrado');
    }

    users[userIndex].role = newRole;
    localStorage.setItem(USERS_KEY, JSON.stringify(users));

    // Si es el usuario actual, actualizar también
    const currentUserData = localStorage.getItem('strike_ground_current_user');
    if (currentUserData) {
      const currentUser = JSON.parse(currentUserData);
      if (currentUser.id === userId) {
        currentUser.role = newRole;
        localStorage.setItem('strike_ground_current_user', JSON.stringify(currentUser));
      }
    }

    console.log(`[MOCK ADMIN] Rol de usuario ${userId} cambiado a ${newRole}`);
  },

  /**
   * Obtiene las órdenes recientes
   */
  async getRecentOrders(limit: number = 10) {
    await delay(300);
    const orders = await mockCheckoutService.getAllOrders();
    return orders
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit);
  },
};
