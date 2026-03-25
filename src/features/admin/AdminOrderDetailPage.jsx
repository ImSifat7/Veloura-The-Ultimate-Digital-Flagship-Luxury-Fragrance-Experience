import { useParams } from 'react-router-dom';

const AdminOrderDetailPage = () => {
  const { id } = useParams();

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Order #{id}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="border rounded-lg p-6">
          <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Customer Info</h3>
          <p className="text-gray-400">Customer details — Phase 5</p>
        </div>
        <div className="border rounded-lg p-6">
          <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Order Items</h3>
          <p className="text-gray-400">Line items — Phase 5</p>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetailPage;
