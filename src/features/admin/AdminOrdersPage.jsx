const AdminOrdersPage = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Order Management</h2>
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="px-4 py-3">Order ID</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="5" className="text-center py-10 text-gray-400">
                Orders will load from n8n — Phase 5
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrdersPage;
