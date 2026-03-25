import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import productsData from '@/data/products';
import { CATEGORIES } from '@/constants';
import useCartStore from '@/store/useCartStore';
import { Plus, Loader2 } from 'lucide-react';
import { automationServices } from '@/services/n8n-client';

const ShopPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('default');
  const [products, setProducts] = useState(productsData); // MODIFIED
  const [loading, setLoading] = useState(true); // ADDED
  const { addItem } = useCartStore();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await automationServices.getProducts();
        if (data && Array.isArray(data)) {
          setProducts(data);
        }
      } catch (error) {
        console.error('Failed to fetch products from n8n:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []); // ADDED

  const brands = useMemo(() => {
    const unique = [...new Set(products.map((p) => p.brand))];
    return ['All', ...unique.sort()];
  }, []);

  const categories = ['All', ...CATEGORIES];

  const filtered = useMemo(() => {
    let result = [...products];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q)
      );
    }

    if (selectedBrand !== 'All') {
      result = result.filter((p) => p.brand === selectedBrand);
    }

    if (selectedCategory !== 'All') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (sortBy === 'price-asc') result.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-desc') result.sort((a, b) => b.price - a.price);
    if (sortBy === 'name') result.sort((a, b) => a.name.localeCompare(b.name));

    return result;
  }, [searchQuery, selectedBrand, selectedCategory, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
      {/* Page Header */}
      <div className="mb-10">
        <p className="text-luxury-gold text-[11px] uppercase tracking-[0.3em] mb-3">Discover</p>
        <h1 className="font-serif text-5xl font-light tracking-tight">Our Collection</h1>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-wrap gap-4 mb-8 p-6 glass rounded-2xl border border-luxury-gold/10">
        <input
          type="text"
          placeholder="Search fragrances..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 min-w-[200px] border border-gray-200 rounded-xl px-5 py-3 text-sm bg-white/80 focus:outline-none focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold/20 transition-all"
        />
        <select
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
          className="border border-gray-200 rounded-xl px-5 py-3 text-sm bg-white/80 focus:outline-none focus:border-luxury-gold transition-all cursor-pointer"
        >
          {brands.map((b) => (
            <option key={b} value={b}>{b === 'All' ? 'All Brands' : b}</option>
          ))}
        </select>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-gray-200 rounded-xl px-5 py-3 text-sm bg-white/80 focus:outline-none focus:border-luxury-gold transition-all cursor-pointer"
        >
          {categories.map((c) => (
            <option key={c} value={c}>{c === 'All' ? 'All Categories' : c}</option>
          ))}
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border border-gray-200 rounded-xl px-5 py-3 text-sm bg-white/80 focus:outline-none focus:border-luxury-gold transition-all cursor-pointer"
        >
          <option value="default">Sort By</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
          <option value="name">Name: A → Z</option>
        </select>
      </div>

      {/* Results Count & Loading State */}
      <div className="flex justify-between items-center mb-8">
        <p className="text-[11px] text-luxury-dark/40 uppercase tracking-[0.15em]">
          Showing {filtered.length} of {products.length} fragrances
        </p>
        {loading && (
          <div className="flex items-center gap-2 text-luxury-gold text-[10px] uppercase tracking-widest font-semibold">
            <Loader2 size={14} className="animate-spin" />
            Connecting to n8n...
          </div>
        )}
      </div>

      {/* Product Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filtered.map((product, i) => (
            <Link
              key={product.p_id}
              to={`/product/${product.p_id}`}
              className="luxury-card rounded-2xl overflow-hidden group cursor-pointer"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className="h-72 bg-gradient-to-b from-gray-50 to-white flex items-center justify-center overflow-hidden p-6">
                <img
                  src={product.img_url}
                  alt={product.name}
                  className="h-52 object-contain transition-transform duration-1000 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <p className="text-[10px] text-luxury-gold uppercase tracking-[0.25em] mb-1.5">{product.brand}</p>
                <h3 className="font-medium text-base mb-1 group-hover:text-luxury-gold transition-colors duration-500">{product.name}</h3>
                <p className="text-[11px] text-luxury-dark/40 mb-4">{product.category}</p>
                <div className="flex justify-between items-center">
                  <p className="text-luxury-gold font-semibold text-lg">${product.price.toFixed(2)}</p>
                  
                  {/* ADDED: Add to Cart Button */}
                  <button
                    onClick={(e) => handleAddToCart(e, product)}
                    className="p-2.5 rounded-xl bg-luxury-gold/10 text-luxury-gold hover:bg-luxury-gold hover:text-luxury-black transition-all duration-300"
                    title="Add to Cart"
                  >
                    <Plus size={18} />
                  </button>

                  {product.stock < 10 && (
                    <span className="text-[9px] text-red-400 uppercase tracking-[0.15em] font-semibold px-2 py-0.5 bg-red-50 rounded-full">
                      Low Stock
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-24">
          <p className="font-serif text-2xl text-luxury-dark/30 mb-4">No fragrances found</p>
          <p className="text-sm text-luxury-dark/40">Try adjusting your filters.</p>
        </div>
      )}
    </div>
  );
};

export default ShopPage;
