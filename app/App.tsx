import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './providers/AuthProvider';
import { CartProvider } from './providers/CartProvider';
import { ProtectedRoute } from './lib/auth/components/ProtectedRoute';
import { AdminRoute } from './lib/auth/components/AdminRoute';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { EventsPage } from './pages/EventsPage';
import { EventDetailsPage } from './pages/EventDetailsPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { ProfilePage } from './pages/(protected)/ProfilePage';
import { SettingsPage } from './pages/(protected)/SettingsPage';
import { MyOrdersPage } from './pages/(protected)/MyOrdersPage';
import { TicketsPage } from './pages/(protected)/TicketsPage';
import { AdminDashboard } from './pages/(protected)/admin/AdminDashboard';
import { AdminUsersPage } from './pages/(protected)/admin/AdminUsersPage';
import { AdminEventsPage } from './pages/(protected)/admin/AdminEventsPage';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <div className="min-h-screen bg-black">
            <Header />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/eventos" element={<EventsPage />} />
              <Route path="/eventos/:id/details" element={<EventDetailsPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile/settings"
                element={
                  <ProtectedRoute>
                    <SettingsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile/orders"
                element={
                  <ProtectedRoute>
                    <MyOrdersPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/tickets/:orderId"
                element={
                  <ProtectedRoute>
                    <TicketsPage />
                  </ProtectedRoute>
                }
              />
              {/* Admin Routes */}
              <Route
                path="/admin"
                element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/users"
                element={
                  <AdminRoute>
                    <AdminUsersPage />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/events"
                element={
                  <AdminRoute>
                    <AdminEventsPage />
                  </AdminRoute>
                }
              />
            </Routes>
            <Footer />
          </div>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
