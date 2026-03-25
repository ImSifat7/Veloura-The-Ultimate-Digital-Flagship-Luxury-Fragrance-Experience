const AdminProductsPage = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Product Inventory</h2>
        <button className="luxury-btn text-xs rounded-lg">Sync from Sheets</button>
      </div>
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Brand</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="5" className="text-center py-10 text-gray-400">
                Products will load from n8n — Phase 5
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProductsPage;
