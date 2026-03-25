import { useEffect } from 'react';
import { globalConfig } from '@/config/global.config';
import { Link } from 'react-router-dom';
import products from '@/data/products';

const HomePage = () => {
  const featured = products.slice(20, 24); // Show the new premium ones!
  const newArrivals = products.slice(24, 27); // Other new ones
  const classics = products.slice(0, 4);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative">
      {/* Global Animated Background */}
      <div className="orbital-bg" />

      {/* ========================================
          HERO SECTION — FULL-WIDTH VIDEO BACKGROUND
          ======================================== */}
      <section className="hero-video-container rounded-none" style={{ minHeight: '650px' }}>
        {/* Background Video — plays continuously */}
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/assets/perfume-hero.png"
        >
          <source
            src="/assets/hero-bg.mp4"
            type="video/mp4"
          />
        </video>

        {/* Dark overlay gradient */}
        <div className="hero-video-overlay" />

        {/* Hero Content */}
        <div className="hero-content flex items-center justify-center min-h-[650px] text-center">
          <div className="max-w-4xl mx-auto px-6 lg:px-10 w-full flex flex-col items-center">
            {/* Centered Text Content */}
            <div className="w-full">
              <p className="text-luxury-gold text-[11px] uppercase tracking-[0.5em] mb-8 animate-fade-in">
                The Collective 2026
              </p>
              <h1 className="font-serif text-7xl md:text-9xl font-light text-white tracking-tight mb-8 animate-fade-in-delay-1 leading-none">
                <span className="text-shimmer">{globalConfig.brand.name}</span>
              </h1>
              <p className="text-white/60 text-xl max-w-2xl mx-auto leading-relaxed mb-12 animate-fade-in-delay-2">
                {globalConfig.brand.slogan}
              </p>
              <div className="flex flex-col gap-8 justify-center items-center animate-fade-in-delay-3">
                <Link to="/shop" className="luxury-btn min-w-[280px]">
                  Explore Collection
                </Link>
                <Link to="/track-order" className="text-white/40 hover:text-white text-[10px] uppercase tracking-[0.4em] font-bold transition-all border-b border-transparent hover:border-white/20 pb-1">
                  Track Order
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom gold accent */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-luxury-gold/50 to-transparent z-10" />
      </section>

      {/* ========================================
          VALUE PROPOSITIONS
          ======================================== */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: '✦', title: 'Authentic Only', desc: '100% genuine international fragrances' },
            { icon: '◈', title: 'Free Shipping', desc: `On orders over ${globalConfig.ui.currencySymbol}${globalConfig.ui.freeShippingThreshold}` },
            { icon: '⟐', title: 'Cash on Delivery', desc: 'Pay when you receive your order' },
          ].map((item) => (
            <div key={item.title} className="text-center py-6">
              <span className="text-luxury-gold text-2xl mb-3 block">{item.icon}</span>
              <h3 className="text-sm uppercase tracking-[0.2em] font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-luxury-dark/50">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-10"><div className="gold-divider" /></div>

      {/* ========================================
          FEATURED FRAGRANCES
          ======================================== */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
        <div className="flex justify-between items-end mb-12">
          <div>
            <p className="text-luxury-gold text-[11px] uppercase tracking-[0.3em] mb-3">Curated Selection</p>
            <h2 className="font-serif text-4xl font-light tracking-tight">Featured Fragrances</h2>
          </div>
          <Link to="/shop" className="text-[11px] uppercase tracking-[0.2em] text-luxury-gold hover:text-luxury-gold-dark transition-colors font-semibold">
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featured.map((product) => (
            <Link
              key={product.p_id}
              to={`/product/${product.p_id}`}
              className="glass-card rounded-3xl overflow-hidden group cursor-pointer reveal"
            >
              <div className="h-80 bg-gradient-to-b from-white/50 to-transparent flex items-center justify-center overflow-hidden p-8">
                <img
                  src={product.img_url}
                  alt={product.name}
                  className="h-60 object-contain transition-transform duration-1000 group-hover:scale-110 drop-shadow-2xl"
                  loading="lazy"
                />
              </div>
              <div className="p-8">
                <p className="text-[10px] text-luxury-gold uppercase tracking-[0.3em] mb-2 font-bold">{product.brand}</p>
                <h3 className="font-serif text-xl mb-2 group-hover:text-luxury-gold transition-colors duration-500">{product.name}</h3>
                <p className="text-[11px] text-luxury-dark/40 mb-5 italic">{product.category}</p>
                <p className="text-luxury-gold font-bold text-xl tracking-tight">${product.price.toFixed(2)}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ========================================
          BRAND STORY SECTION
          ======================================== */}
      <section className="bg-luxury-black text-white py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-luxury-gold text-[11px] uppercase tracking-[0.3em] mb-4">The Veloura Promise</p>
            <h2 className="font-serif text-4xl md:text-5xl font-light mb-6 leading-tight">
              Where Luxury Meets <br />
              <span className="text-shimmer">Automation</span>
            </h2>
            <p className="text-white/50 leading-relaxed mb-8">
              Every fragrance in our collection is sourced directly from international houses.
              Our n8n-powered backend ensures instant order processing, real-time tracking,
              and a seamless experience from click to delivery.
            </p>
            <Link to="/shop" className="luxury-btn-outline inline-block">
              Discover More
            </Link>
          </div>
          <div className="relative flex justify-center">
            <div className="absolute w-64 h-64 bg-luxury-gold/5 rounded-full blur-[60px]" />
            <img
              src="/assets/perfume-hero.png"
              alt="Veloura Luxury"
              className="relative w-80 h-auto object-contain opacity-90"
            />
          </div>
        </div>
      </section>

      {/* ========================================
          NEW ARRIVALS
          ======================================== */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
        <div className="flex justify-between items-end mb-12">
          <div>
            <p className="text-luxury-gold text-[11px] uppercase tracking-[0.3em] mb-3">Just In</p>
            <h2 className="font-serif text-4xl font-light tracking-tight">New Arrivals</h2>
          </div>
          <Link to="/shop" className="text-[11px] uppercase tracking-[0.2em] text-luxury-gold hover:text-luxury-gold-dark transition-colors font-semibold">
            Shop All →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {newArrivals.map((product) => (
            <Link
              key={product.p_id}
              to={`/product/${product.p_id}`}
              className="glass-card rounded-3xl overflow-hidden group cursor-pointer reveal"
            >
              <div className="h-80 bg-gradient-to-b from-white/30 to-transparent flex items-center justify-center overflow-hidden p-8">
                <img
                  src={product.img_url}
                  alt={product.name}
                  className="h-60 object-contain transition-transform duration-1000 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div className="p-8">
                <p className="text-[10px] text-luxury-gold uppercase tracking-[0.3em] mb-2 font-bold">{product.brand}</p>
                <h3 className="font-serif text-xl mb-2 group-hover:text-luxury-gold transition-colors duration-500">{product.name}</h3>
                <p className="text-[11px] text-luxury-dark/40 mb-5 italic">{product.category}</p>
                <p className="text-luxury-gold font-bold text-xl tracking-tight">${product.price.toFixed(2)}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-10"><div className="gold-divider" /></div>

      {/* ========================================
          BRAND LOGOS STRIP
          ======================================== */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <p className="text-center text-[11px] uppercase tracking-[0.4em] text-luxury-dark/60 mb-12">International Houses We Carry</p>
        <div className="flex flex-wrap justify-center gap-x-14 gap-y-8">
          {['CHANEL', 'DIOR', 'TOM FORD', 'VERSACE', 'YSL', 'ARMANI', 'GUCCI', 'CREED', 'PACO RABANNE', 'BURBERRY'].map(b => (
            <span
              key={b}
              className="text-[12px] font-semibold tracking-[0.35em] text-luxury-dark/40 hover:text-luxury-gold transition-colors duration-500 cursor-default"
            >
              {b}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
