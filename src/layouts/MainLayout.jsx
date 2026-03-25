import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { globalConfig } from '../config/global.config';
import useCartStore from '../store/useCartStore';

const MainLayout = () => {
  const { pathname } = useLocation();
  const itemCount = useCartStore((s) => s.getItemCount());
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navLinks = [
    { to: '/shop', label: 'Collection' },
    { to: '/track-order', label: 'Track Order' },
    { to: '/cart', label: 'Cart' },
  ];

  return (
    <div className="min-h-screen bg-luxury-cream text-luxury-dark font-premium relative overflow-x-hidden">
      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-[100] bg-luxury-black/95 backdrop-blur-xl transition-all duration-700 ease-in-out ${
          isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center min-h-screen gap-12 text-center">
          <button 
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-10 right-10 text-luxury-gold text-xs uppercase tracking-[0.5em] font-bold"
          >
            Close
          </button>
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setIsMenuOpen(false)}
              className="font-serif text-4xl text-white/50 hover:text-luxury-gold transition-all tracking-tight"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Top Announcement Bar */}
      <div className="bg-luxury-black text-luxury-gold text-[10px] sm:text-[11px] text-center py-2.5 tracking-[0.2em] uppercase px-4">
        {globalConfig.ui.announcement}
      </div>

      {/* Premium Header */}
      <header className="sticky top-0 z-50 glass border-b border-luxury-gold/10">
        <nav className="max-w-7xl mx-auto px-6 lg:px-10 py-5 flex justify-between items-center">
          <Link to="/" className="group flex items-center gap-3">
            <span className="font-serif text-xl sm:text-2xl md:text-3xl tracking-[0.15em] text-luxury-black group-hover:text-luxury-gold transition-colors duration-500">
              {globalConfig.brand.name.toUpperCase()}
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative text-[11px] uppercase tracking-[0.2em] font-semibold transition-colors duration-300 ${
                  pathname === link.to ? 'text-luxury-gold' : 'text-luxury-dark/70 hover:text-luxury-gold'
                }`}
              >
                {link.label}
                {link.to === '/cart' && itemCount > 0 && (
                  <span className="absolute -top-2.5 -right-4 w-4 h-4 bg-luxury-gold text-luxury-black text-[9px] font-bold rounded-full flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
                {pathname === link.to && (
                  <span className="absolute -bottom-1 left-0 right-0 h-[1px] bg-luxury-gold" />
                )}
              </Link>
            ))}
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center gap-6">
            <Link to="/cart" className="relative text-luxury-dark">
              <span className="text-[10px] uppercase tracking-widest font-bold">Cart</span>
              {itemCount > 0 && (
                <span className="absolute -top-2.5 -right-3 w-3.5 h-3.5 bg-luxury-gold text-luxury-black text-[8px] font-bold rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="text-[10px] uppercase tracking-widest font-bold text-luxury-gold"
            >
              Menu
            </button>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="relative">
        <Outlet />
      </main>

      {/* Premium Footer */}
      <footer className="bg-luxury-black text-white/80 mt-24">
        <div className="gold-divider" />
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            {/* Brand Column */}
            <div>
              <h3 className="font-serif text-2xl tracking-[0.15em] text-luxury-gold mb-4">
                {globalConfig.brand.name.toUpperCase()}
              </h3>
              <p className="text-sm leading-relaxed text-white/50">
                {globalConfig.brand.slogan}. Curating the world's finest fragrances, delivered to your doorstep.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-[11px] uppercase tracking-[0.25em] text-luxury-gold mb-6">Explore</h4>
              <div className="space-y-3 text-sm">
                <Link to="/shop" className="block text-white/50 hover:text-luxury-gold transition-colors">Collection</Link>
                <Link to="/track-order" className="block text-white/50 hover:text-luxury-gold transition-colors">Track Order</Link>
                <Link to="/cart" className="block text-white/50 hover:text-luxury-gold transition-colors">Cart</Link>
              </div>
            </div>

            {/* Contact & Socials */}
            <div>
              <h4 className="text-[11px] uppercase tracking-[0.25em] text-luxury-gold mb-6">Connect with {globalConfig.brand.owner}</h4>
              <p className="text-sm text-white/50 mb-3 hover:text-white transition-colors cursor-default">
                Phone: {globalConfig.brand.supportContact}
              </p>
              <div className="flex gap-5 mt-5">
                <a href={globalConfig.brand.socials.facebook} target="_blank" rel="noopener noreferrer" className="text-[10px] uppercase tracking-widest text-white/30 hover:text-luxury-gold transition-all">Facebook</a>
                <a href={globalConfig.brand.socials.instagram} target="_blank" rel="noopener noreferrer" className="text-[10px] uppercase tracking-widest text-white/30 hover:text-luxury-gold transition-all">Instagram</a>
                <a href={globalConfig.brand.socials.github} target="_blank" rel="noopener noreferrer" className="text-[10px] uppercase tracking-widest text-white/30 hover:text-luxury-gold transition-all">GitHub</a>
              </div>
            </div>
          </div>

          <div className="gold-divider mb-8" />
          <div className="flex justify-between items-center text-[11px] text-white/30 uppercase tracking-wider">
            <p>&copy; {new Date().getFullYear()} {globalConfig.brand.name}</p>
            <p>Powered by n8n Automation</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
