import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';

// Customer Pages
import HomePage from './features/storefront/HomePage';
import ShopPage from './features/storefront/ShopPage';
import ProductDetailPage from './features/product/ProductDetailPage';
import CartPage from './features/cart/CartPage';
import CheckoutPage from './features/checkout/CheckoutPage';
import SuccessPage from './features/checkout/SuccessPage';
import TrackOrderPage from './features/tracking/TrackOrderPage';

// Admin Pages
import AdminLoginPage from './features/admin/AdminLoginPage';
import AdminDashboardPage from './features/admin/AdminDashboardPage';
import AdminOrdersPage from './features/admin/AdminOrdersPage';
import AdminOrderDetailPage from './features/admin/AdminOrderDetailPage';
import AdminProductsPage from './features/admin/AdminProductsPage';
import AdminSettingsPage from './features/admin/AdminSettingsPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Customer Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="shop" element={<ShopPage />} />
          <Route path="product/:id" element={<ProductDetailPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="track-order" element={<TrackOrderPage />} />
          <Route path="success" element={<SuccessPage />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="orders" element={<AdminOrdersPage />} />
          <Route path="orders/:id" element={<AdminOrderDetailPage />} />
          <Route path="products" element={<AdminProductsPage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
