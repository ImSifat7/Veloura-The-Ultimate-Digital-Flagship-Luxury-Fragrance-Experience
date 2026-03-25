import { useLocation, Link, useNavigate } from 'react-router-dom';
import { CheckCircle, Package, Home, ArrowRight, ExternalLink } from 'lucide-react';
import { globalConfig } from '@/config/global.config';

const SuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { customerName, orderId, total, isOffline } = location.state || { 
    customerName: 'Valued Customer', 
    orderId: 'VL-' + Math.floor(Math.random() * 90000) + 10000,
    total: 0
  };

  return (
    <section className="py-20 max-w-4xl mx-auto px-6 text-center animate-in fade-in duration-1000">
      <div className="relative mb-12 inline-block">
        <div className="absolute inset-0 bg-luxury-gold/20 blur-[100px] rounded-full animate-pulse" />
        <div className="relative w-32 h-32 bg-luxury-black text-luxury-gold rounded-full flex items-center justify-center mx-auto border-2 border-luxury-gold/30 shadow-[0_0_50px_rgba(212,175,55,0.2)]">
          <CheckCircle size={64} strokeWidth={1} className="animate-bounce-slow" />
        </div>
      </div>

      <div className="space-y-4 mb-12">
        <p className="text-luxury-gold text-[12px] uppercase tracking-[0.6em] font-bold">Selection Confirmed</p>
        <h1 className="font-serif text-5xl md:text-7xl font-light tracking-tight text-luxury-black">
          Thank you, <span className="text-shimmer italic">{customerName.split(' ')[0]}</span>.
        </h1>
        <p className="text-luxury-dark/40 text-lg font-light">Your order is being prepared for its journey.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 max-w-3xl mx-auto">
        <div className="luxury-card rounded-3xl p-10 border-luxury-gold/10 bg-white/50 backdrop-blur-sm flex flex-col items-center justify-center">
          <p className="text-[11px] uppercase tracking-widest text-luxury-dark/40 mb-3 font-semibold">Order Reference</p>
          <p className="font-serif text-3xl text-luxury-black mb-6 tracking-wider font-bold">#{orderId}</p>
          
          <div className="flex items-center justify-center gap-3 text-luxury-gold font-medium bg-luxury-gold/5 px-4 py-2 rounded-full border border-luxury-gold/10">
            <Package size={16} />
            <span className="text-[11px] uppercase tracking-widest">Preparing for Dispatch</span>
          </div>
        </div>

        <div className="luxury-card rounded-3xl p-10 border-luxury-gold/10 bg-luxury-black text-white text-left flex flex-col justify-between">
          <div>
            <h3 className="font-serif text-2xl font-light text-luxury-gold mb-4">Automation Active</h3>
            <p className="text-xs text-white/50 leading-relaxed mb-6">
              {isOffline 
                ? "Our n8n automation is processing your request offline. We've logged your selection."
                : `Our @Veloura_Perfume_bot has notified Sifat. Your order of $${total?.toFixed(2)} is now in the queue.`}
            </p>
          </div>
          <Link 
            to="/track-order" 
            className="flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-luxury-gold hover:translate-x-2 transition-all font-bold group"
          >
            Track Your Shipment
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
        <Link 
          to="/shop" 
          className="luxury-btn py-5 px-10 flex items-center justify-center gap-3 group min-w-[240px]"
        >
          Explore More Collections
          <ExternalLink size={16} />
        </Link>
        <Link 
          to="/" 
          className="text-[11px] uppercase tracking-[0.3em] text-luxury-dark/50 hover:text-luxury-gold transition-all font-semibold italic flex items-center gap-2"
        >
          <Home size={14} />
          Back to Veloura Main
        </Link>
      </div>

      <div className="max-w-md mx-auto py-8 px-6 border border-luxury-gold/20 rounded-2xl bg-luxury-gold/5">
        <p className="text-[10px] uppercase tracking-[0.2em] text-luxury-gold/60 leading-relaxed">
          Need assistance? Our concierge is available at {globalConfig.brand.supportContact}.
        </p>
      </div>
    </section>
  );
};

export default SuccessPage;
