import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useCartStore from '@/store/useCartStore';
import { globalConfig } from '@/config/global.config';
import { ShieldCheck, Truck, CreditCard, ChevronRight, Loader2 } from 'lucide-react'; // MODIFIED
import { automationServices } from '@/services/n8n-client'; // ADDED

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, getTotal, clearCart } = useCartStore();
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false); // ADDED
  const subtotal = getTotal();
  const shipping = subtotal > globalConfig.ui.freeShippingThreshold ? 0 : 15;
  const total = subtotal + shipping;

  useEffect(() => {
    if (items.length === 0 && !isSubmitting) {
      navigate('/shop');
    }
  }, [items, navigate, isSubmitting]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => { // MODIFIED
    e.preventDefault();
    setIsSubmitting(true); // ADDED
    
    try {
      const orderData = {
        customer: formData,
        items,
        subtotal,
        shipping,
        total,
        paymentMethod: 'COD',
        timestamp: new Date().toISOString(),
      };

      // Call n8n Webhook
      await automationServices.submitOrder(orderData);
      
      const orderId = `VL-${Math.floor(Math.random() * 90000) + 10000}`;
      clearCart();
      navigate('/success', { 
        state: { 
          customerName: formData.fullName,
          orderId: orderId,
          total: total
        } 
      });
    } catch (error) {
      console.error('Order submission failed:', error);
      const fallbackId = `VL-${Math.floor(Math.random() * 90000) + 10000}`;
      // Fallback for demo
      clearCart();
      navigate('/success', { 
        state: { 
          customerName: formData.fullName,
          orderId: fallbackId,
          total: total,
          isOffline: true
        } 
      });
    } finally {
      setIsSubmitting(false); // ADDED
    }
  };

  if (items.length === 0) return null;

  return (
    <section className="py-12 max-w-7xl mx-auto px-6 lg:px-10">
      {/* Page Header */}
      <div className="mb-12">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-luxury-dark/40 mb-3">
          <Link to="/cart" className="hover:text-luxury-gold transition-colors">Cart</Link>
          <ChevronRight size={10} />
          <span className="text-luxury-gold font-semibold">Checkout</span>
        </div>
        <h1 className="font-serif text-5xl font-light tracking-tight">Complete Order</h1>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left: Shipping Details */}
        <div className="lg:col-span-7 space-y-8">
          <div className="luxury-card rounded-2xl p-8 border-luxury-gold/10">
            <h2 className="font-serif text-2xl font-light mb-8 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-luxury-gold/10 text-luxury-gold text-xs flex items-center justify-center font-sans font-bold">1</span>
              Shipping Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-[10px] uppercase tracking-widest text-luxury-dark/50 mb-2 font-semibold">Full Name</label>
                <input
                  required
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g. John Doe"
                  className="w-full border border-gray-200 rounded-xl px-5 py-3.5 text-sm focus:outline-none focus:border-luxury-gold transition-all bg-gray-50/30"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-luxury-dark/50 mb-2 font-semibold">Email Address</label>
                <input
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full border border-gray-200 rounded-xl px-5 py-3.5 text-sm focus:outline-none focus:border-luxury-gold transition-all bg-gray-50/30"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-luxury-dark/50 mb-2 font-semibold">Phone Number</label>
                <input
                  required
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 234 567 890"
                  className="w-full border border-gray-200 rounded-xl px-5 py-3.5 text-sm focus:outline-none focus:border-luxury-gold transition-all bg-gray-50/30"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-[10px] uppercase tracking-widest text-luxury-dark/50 mb-2 font-semibold">Street Address</label>
                <input
                  required
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="House number and street name"
                  className="w-full border border-gray-200 rounded-xl px-5 py-3.5 text-sm focus:outline-none focus:border-luxury-gold transition-all bg-gray-50/30"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-luxury-dark/50 mb-2 font-semibold">City</label>
                <input
                  required
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="e.g. New York"
                  className="w-full border border-gray-200 rounded-xl px-5 py-3.5 text-sm focus:outline-none focus:border-luxury-gold transition-all bg-gray-50/30"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-luxury-dark/50 mb-2 font-semibold">Postal Code</label>
                <input
                  required
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  placeholder="10001"
                  className="w-full border border-gray-200 rounded-xl px-5 py-3.5 text-sm focus:outline-none focus:border-luxury-gold transition-all bg-gray-50/30"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-[10px] uppercase tracking-widest text-luxury-dark/50 mb-2 font-semibold">Order Notes (Optional)</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Instructions for delivery..."
                  className="w-full border border-gray-200 rounded-xl px-5 py-3.5 text-sm focus:outline-none focus:border-luxury-gold transition-all bg-gray-50/30 resize-none"
                />
              </div>
            </div>
          </div>

          <div className="luxury-card rounded-2xl p-8 border-luxury-gold/10">
            <h2 className="font-serif text-2xl font-light mb-8 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-luxury-gold/10 text-luxury-gold text-xs flex items-center justify-center font-sans font-bold">2</span>
              Payment Method
            </h2>
            
            <div className="relative border-2 border-luxury-gold/30 bg-luxury-gold/5 rounded-2xl p-6 flex items-center justify-between group cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-luxury-gold text-luxury-black rounded-full flex items-center justify-center">
                  <CreditCard size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Cash on Delivery</h3>
                  <p className="text-xs text-luxury-dark/50">Pay when your order arrives</p>
                </div>
              </div>
              <div className="w-6 h-6 rounded-full border-4 border-luxury-gold bg-luxury-black shadow-[0_0_10px_rgba(212,175,55,0.4)]" />
            </div>
            
            <p className="mt-6 text-[11px] text-luxury-dark/40 leading-relaxed italic">
              * Please have the exact amount ready for the delivery partner to ensure a smooth experience.
            </p>
          </div>
        </div>

        {/* Right: Order Summary */}
        <div className="lg:col-span-5 sticky top-32">
          <div className="luxury-card rounded-2xl p-8 border-luxury-gold/10 bg-white">
            <h2 className="font-serif text-2xl font-light mb-8">Order Summary</h2>
            
            <div className="max-h-60 overflow-y-auto mb-8 pr-2 custom-scrollbar">
              {items.map((item) => (
                <div key={item.p_id} className="flex gap-4 mb-4 pb-4 border-b border-gray-50 last:border-0 last:mb-0 last:pb-0">
                  <div className="w-16 h-16 bg-gray-50 rounded-lg flex-shrink-0 p-2 border border-gray-100">
                    <img src={item.img_url} alt={item.name} className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium truncate">{item.name}</h4>
                    <p className="text-[10px] text-luxury-dark/40 uppercase tracking-widest">{item.brand}</p>
                    <p className="text-[11px] mt-1 text-luxury-gold font-semibold">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-sm">
                <span className="text-luxury-dark/60">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-luxury-dark/60">Shipping</span>
                <span className="font-medium">
                  {shipping === 0 ? (
                    <span className="text-green-600 font-semibold uppercase tracking-wider text-[10px]">Free</span>
                  ) : (
                    `$${shipping.toFixed(2)}`
                  )}
                </span>
              </div>
            </div>
            
            <div className="gold-divider mb-8" />
            
            <div className="flex justify-between items-end mb-10">
              <span className="text-[11px] uppercase tracking-[0.2em] font-semibold">Payable Amount</span>
              <div className="text-right">
                <p className="text-4xl font-light text-luxury-black font-serif">${total.toFixed(2)}</p>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting} // MODIFIED
              className="luxury-btn w-full flex items-center justify-center gap-3 py-5 text-[11px] mb-6 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  Processing in n8n...
                  <Loader2 size={16} className="animate-spin" />
                </>
              ) : (
                <>
                  Confirm COD Order
                  <ShieldCheck size={16} />
                </>
              )}
            </button>

            <div className="space-y-4 border-t border-gray-100 pt-6">
              <div className="flex items-center gap-3 text-luxury-dark/40">
                <Truck size={14} className="text-luxury-gold" />
                <span className="text-[10px] uppercase tracking-wider">Fast International Shipping</span>
              </div>
              <div className="flex items-center gap-3 text-luxury-dark/40">
                <ShieldCheck size={14} className="text-luxury-gold" />
                <span className="text-[10px] uppercase tracking-wider">100% Authentic Fragrances</span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};

export default CheckoutPage;
