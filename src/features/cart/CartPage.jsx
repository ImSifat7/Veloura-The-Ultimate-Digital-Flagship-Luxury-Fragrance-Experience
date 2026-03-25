import { Link } from 'react-router-dom';
import useCartStore from '@/store/useCartStore';
import { Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import { globalConfig } from '@/config/global.config';

const CartPage = () => {
  const { items, removeItem, updateQuantity, getTotal, getItemCount } = useCartStore();
  const subtotal = getTotal();
  const shipping = subtotal > globalConfig.ui.freeShippingThreshold ? 0 : 15;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <section className="py-20 text-center">
        <div className="max-w-md mx-auto px-6">
          <div className="w-20 h-20 bg-luxury-cream rounded-full flex items-center justify-center mx-auto mb-8 border border-luxury-gold/20">
            <span className="text-3xl">🛍️</span>
          </div>
          <h1 className="font-serif text-3xl font-light mb-4">Your Cart is Empty</h1>
          <p className="text-luxury-dark/50 mb-10 leading-relaxed">
            Discover our collection of elite scents and find your perfect fragrance today.
          </p>
          <Link to="/shop" className="luxury-btn inline-block">
            Explore Collection
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 max-w-7xl mx-auto px-6 lg:px-10">
      <div className="mb-12">
        <p className="text-luxury-gold text-[11px] uppercase tracking-[0.3em] mb-3">Shopping Bag</p>
        <h1 className="font-serif text-5xl font-light tracking-tight">Your Selection</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-6">
          {items.map((item) => (
            <div 
              key={item.p_id} 
              className="luxury-card rounded-2xl overflow-hidden p-6 flex flex-col sm:flex-row items-center gap-6"
            >
              <Link 
                to={`/product/${item.p_id}`}
                className="w-32 h-32 bg-gray-50 rounded-xl flex items-center justify-center p-4 flex-shrink-0"
              >
                <img 
                  src={item.img_url} 
                  alt={item.name} 
                  className="w-full h-full object-contain drop-shadow-sm"
                />
              </Link>

              <div className="flex-1 text-center sm:text-left">
                <p className="text-luxury-gold text-[10px] uppercase tracking-[0.2em] mb-1">{item.brand}</p>
                <h3 className="font-medium text-lg mb-1">{item.name}</h3>
                <p className="text-xs text-luxury-dark/40 mb-4">{item.category}</p>
                
                <div className="flex items-center justify-center sm:justify-start gap-4">
                  <div className="flex items-center border border-gray-200 rounded-lg bg-white overflow-hidden">
                    <button 
                      onClick={() => updateQuantity(item.p_id, item.quantity - 1)}
                      className="p-2 hover:bg-gray-50 transition-colors text-luxury-dark/60"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-10 text-center text-sm font-medium">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.p_id, item.quantity + 1)}
                      className="p-2 hover:bg-gray-50 transition-colors text-luxury-dark/60"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => removeItem(item.p_id)}
                    className="p-2 text-red-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                    title="Remove item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="text-right flex-shrink-0">
                <p className="text-lg font-semibold text-luxury-gold">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
                <p className="text-[10px] text-luxury-dark/30 mt-1 uppercase tracking-wider">
                  ${item.price.toFixed(2)} each
                </p>
              </div>
            </div>
          ))}

          <Link 
            to="/shop" 
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-luxury-dark/40 hover:text-luxury-gold transition-colors font-semibold mt-4"
          >
            ← Add more fragrances
          </Link>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-4 sticky top-32">
          <div className="luxury-card rounded-2xl p-8 border-luxury-gold/10">
            <h2 className="font-serif text-2xl font-light mb-8">Summary</h2>
            
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
              {shipping > 0 && (
                <p className="text-[10px] text-luxury-gold/60 italic leading-snug">
                  Spend ${(globalConfig.ui.freeShippingThreshold - subtotal).toFixed(2)} more for free shipping.
                </p>
              )}
            </div>
            
            <div className="gold-divider mb-8" />
            
            <div className="flex justify-between items-end mb-10">
              <span className="text-[11px] uppercase tracking-[0.2em] font-semibold">Total</span>
              <div className="text-right">
                <p className="text-3xl font-light text-luxury-black font-serif">${total.toFixed(2)}</p>
                <p className="text-[10px] text-luxury-dark/30 uppercase tracking-widest mt-1">Estimates inclusive of tax</p>
              </div>
            </div>

            <Link 
              to="/checkout" 
              className="luxury-btn w-full flex items-center justify-center gap-3 py-5 text-[11px]"
            >
              Proceed to Checkout
              <ArrowRight size={14} />
            </Link>

            <div className="mt-8 flex items-center justify-center gap-6">
              <span className="text-[9px] uppercase tracking-[0.2em] text-luxury-dark/30 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full" /> Secure Payment
              </span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-luxury-dark/30 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-luxury-gold rounded-full" /> Veloura Promise
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartPage;
