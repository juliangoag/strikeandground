import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './providers/AuthProvider';
import { CartProvider } from './providers/CartProvider';
import { ProtectedRoute } from './lib/auth/components/ProtectedRoute';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { EventsPage } from './pages/EventsPage';
import { EventDetailsPage } from './pages/EventDetailsPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { ProfilePage } from './pages/(protected)/ProfilePage';
import { SettingsPage } from './pages/(protected)/SettingsPage';

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
            </Routes>
            <Footer />
          </div>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
