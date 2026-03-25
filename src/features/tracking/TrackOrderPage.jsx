import { useState } from 'react';
import { Search, Package, MapPin, Clock, CheckCircle, Loader2, Link } from 'lucide-react';
import { automationServices } from '@/services/n8n-client';

const TrackOrderPage = () => {
  const [orderId, setOrderId] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);

  const handleTrack = async () => {
    if (!orderId) return;
    setLoading(true);
    setError(null);
    setStatus(null);

    try {
      const data = await automationServices.trackOrder(orderId);
      if (data && data.status) {
        setStatus(data);
      } else {
        throw new Error('Order not found');
      }
    } catch (err) {
      console.error('Tracking error:', err);
      setError('Could not find order. Please check the ID and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-3xl mx-auto px-6 py-12">
      <div className="text-center mb-16">
        <p className="text-luxury-gold text-[11px] uppercase tracking-[0.4em] mb-4">Real-time Tracking</p>
        <h1 className="font-serif text-5xl font-light tracking-tight mb-6 text-luxury-black">Follow Your Scent</h1>
        <p className="text-luxury-dark/50 max-w-lg mx-auto leading-relaxed">
          Enter your unique order reference to track the progress of your selection from our house to your doorstep.
        </p>
      </div>

      <div className="luxury-card rounded-2xl p-8 mb-12 border-luxury-gold/10 bg-white">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-luxury-gold" size={18} />
            <input
              type="text"
              placeholder="e.g. VL-123456"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="w-full border border-gray-200 rounded-xl pl-14 pr-5 py-4 text-base tracking-widest focus:outline-none focus:border-luxury-gold transition-all bg-gray-50/30 uppercase font-medium"
            />
          </div>
          <button 
            onClick={handleTrack}
            disabled={loading}
            className="luxury-btn py-4 px-10 flex items-center justify-center gap-3 disabled:opacity-50 min-w-[160px]"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : 'Track Order'}
          </button>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="text-center p-6 bg-red-50 rounded-xl border border-red-100 mb-12 animate-fade-in">
          <p className="text-red-500 text-sm font-medium">{error}</p>
        </div>
      )}

      {/* Status Result */}
      {status && (
        <div className="animate-fade-in">
          <div className="luxury-card rounded-2xl p-10 border-luxury-gold/20 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-8">
              <span className="text-[10px] uppercase tracking-widest text-luxury-dark/30">Status</span>
              <p className="text-luxury-gold font-bold uppercase tracking-widest mt-1">{status.status}</p>
            </div>

            <div className="flex flex-col md:flex-row gap-12 items-start">
              <div className="space-y-10 flex-1">
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-luxury-black text-luxury-gold rounded-full flex items-center justify-center shrink-0 border border-luxury-gold/30">
                    <Package size={20} />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-light mb-1">Order Logged</h3>
                    <p className="text-sm text-luxury-dark/50">Your selection has been registered in our system and is awaiting validation.</p>
                  </div>
                </div>

                <div className="flex gap-6 opacity-40">
                  <div className="w-12 h-12 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center shrink-0">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-light mb-1">Being Prepared</h3>
                    <p className="text-sm text-luxury-dark/50">Our experts are carefully packaging your luxury fragrances.</p>
                  </div>
                </div>

                <div className="flex gap-6 opacity-40">
                  <div className="w-12 h-12 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center shrink-0">
                    <Truck size={20} />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-light mb-1">In Transit</h3>
                    <p className="text-sm text-luxury-dark/50">Your order is on its way to your destination via express courier.</p>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-64 space-y-6 pt-10 md:pt-0">
                <div className="p-5 bg-luxury-gold/5 rounded-xl border border-luxury-gold/10">
                  <div className="flex items-center gap-2 text-luxury-gold mb-3">
                    <MapPin size={14} />
                    <span className="text-[10px] uppercase tracking-widest font-bold">Location</span>
                  </div>
                  <p className="text-sm font-medium">{status.location || 'Processing Center'}</p>
                </div>

                <div className="p-5 bg-luxury-gold/5 rounded-xl border border-luxury-gold/10">
                  <div className="flex items-center gap-2 text-luxury-gold mb-3">
                    <CheckCircle size={14} />
                    <span className="text-[10px] uppercase tracking-widest font-bold">Estimated Delivery</span>
                  </div>
                  <p className="text-sm font-medium">{status.estimatedDelivery || 'Calculating...'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Connection Help */}
      <div className="mt-20 text-center border-t border-gray-100 pt-10">
        <p className="text-[10px] uppercase tracking-[0.3em] text-luxury-dark/30 mb-2">n8n Automation Status</p>
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 rounded-full border border-green-100">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
          <span className="text-[9px] font-bold text-green-600 uppercase tracking-widest">Active Connection</span>
        </div>
      </div>
    </section>
  );
};

export default TrackOrderPage;
