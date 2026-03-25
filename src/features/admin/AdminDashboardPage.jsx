const AdminDashboardPage = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-gray-50 rounded-lg p-6 text-center border">
          <p className="text-3xl font-light text-luxury-gold">0</p>
          <p className="text-xs text-gray-400 uppercase mt-2">Total Orders</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-6 text-center border">
          <p className="text-3xl font-light text-luxury-gold">$0.00</p>
          <p className="text-xs text-gray-400 uppercase mt-2">Total Revenue</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-6 text-center border">
          <p className="text-3xl font-light text-luxury-gold">0</p>
          <p className="text-xs text-gray-400 uppercase mt-2">Low Stock Items</p>
        </div>
      </div>
      <p className="text-gray-400 text-sm">Live data from n8n — Phase 5</p>
    </div>
  );
};

export default AdminDashboardPage;
