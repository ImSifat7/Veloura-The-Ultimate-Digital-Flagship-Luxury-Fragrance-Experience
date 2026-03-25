const AdminSettingsPage = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Site Settings</h2>
      <div className="space-y-6">
        <div className="border rounded-lg p-6">
          <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Announcement Banner</h3>
          <input
            type="text"
            placeholder="Enter banner message..."
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-luxury-gold"
            disabled
          />
          <p className="text-xs text-gray-400 mt-2">Editable via Google Sheets — Phase 5</p>
        </div>
        <div className="border rounded-lg p-6">
          <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Shipping Fee</h3>
          <input
            type="number"
            placeholder="0.00"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-luxury-gold"
            disabled
          />
          <p className="text-xs text-gray-400 mt-2">Editable via Google Sheets — Phase 5</p>
        </div>
      </div>
    </div>
  );
};

export default AdminSettingsPage;
