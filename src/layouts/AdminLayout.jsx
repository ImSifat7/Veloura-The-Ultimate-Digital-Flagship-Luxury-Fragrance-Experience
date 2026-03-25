import { Outlet, Link, useNavigate } from 'react-router-dom';
import { globalConfig } from '../config/global.config';

const AdminLayout = () => {
  const navigate = useNavigate();

  // Guard skeleton for Phase 5
  // const { isAuthenticated } = useAdminStore();
  // if (!isAuthenticated) navigate('/admin/login');

  return (
    <div className="min-h-screen flex bg-gray-50 font-sans">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-luxury-black text-white p-6">
        <h2 className="text-xl font-bold text-luxury-gold mb-10 tracking-widest">
          {globalConfig.brand.name} ADMIN
        </h2>
        <nav className="space-y-4 text-sm opacity-80">
          <Link to="/admin" className="block hover:text-luxury-gold">Dashboard</Link>
          <Link to="/admin/orders" className="block hover:text-luxury-gold">Orders</Link>
          <Link to="/admin/products" className="block hover:text-luxury-gold">Products</Link>
          <Link to="/admin/settings" className="block hover:text-luxury-gold">Settings</Link>
          <hr className="border-gray-800" />
          <Link to="/" className="block text-xs opacity-50 hover:opacity-100">View Storefront</Link>
        </nav>
      </aside>

      {/* Admin Content Area */}
      <main className="flex-1 p-10">
        <header className="mb-10 flex justify-between items-center">
          <h1 className="text-3xl font-light text-gray-800 tracking-tight">Management Suite</h1>
          <button className="text-xs uppercase tracking-widest px-4 py-2 border border-gray-300 rounded hover:bg-gray-100">Logout</button>
        </header>
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
