import { useParams, Link } from 'react-router-dom';
import products from '@/data/products';
import useCartStore from '@/store/useCartStore';
import { useState } from 'react';

const ProductDetailPage = () => {
  const { id } = useParams();
  const product = products.find((p) => p.p_id === id);
  const { addItem } = useCartStore();
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <section className="text-center py-20">
        <h1 className="text-2xl font-light mb-4">Product Not Found</h1>
        <Link to="/shop" className="luxury-btn inline-block">Back to Shop</Link>
      </section>
    );
  }

  const notes = product.scent_notes_json;
  const related = products.filter((p) => p.brand === product.brand && p.p_id !== product.p_id).slice(0, 3);

  const handleAddToCart = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
        {/* Image */}
        <div className="bg-gray-50 rounded-2xl flex items-center justify-center p-10 min-h-[500px]">
          <img
            src={product.img_url}
            alt={product.name}
            className="max-h-[420px] object-contain drop-shadow-lg"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col justify-center">
          <p className="text-luxury-gold text-xs uppercase tracking-[0.3em] mb-3">{product.brand}</p>
          <h1 className="text-4xl font-light tracking-tight mb-2">{product.name}</h1>
          <p className="text-sm text-gray-400 mb-6">{product.category}</p>
          <p className="text-3xl text-luxury-gold font-semibold mb-8">${product.price.toFixed(2)}</p>

          {/* Scent Pyramid */}
          <div className="border-t border-gray-200 pt-6 mb-8 space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Scent Profile</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-2">Top Notes</p>
                <p className="text-sm font-medium">{notes.top}</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-2">Middle Notes</p>
                <p className="text-sm font-medium">{notes.middle}</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-2">Base Notes</p>
                <p className="text-sm font-medium">{notes.base}</p>
              </div>
            </div>
          </div>

          {/* Stock */}
          <div className="flex items-center gap-2 mb-6">
            <span className={`w-2 h-2 rounded-full ${product.stock > 10 ? 'bg-green-500' : 'bg-red-500'}`} />
            <p className="text-xs text-gray-400">
              {product.stock > 10 ? 'In Stock' : `Only ${product.stock} left`}
            </p>
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            className={`w-full text-center py-4 rounded-lg transition-all duration-300 text-sm uppercase tracking-widest font-semibold ${
              added
                ? 'bg-green-600 text-white border border-green-600'
                : 'luxury-btn'
            }`}
          >
            {added ? '✓ Added to Cart' : 'Add to Cart'}
          </button>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <div>
          <h2 className="text-2xl font-light tracking-wide mb-8">More from {product.brand}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {related.map((r) => (
              <Link
                key={r.p_id}
                to={`/product/${r.p_id}`}
                className="luxury-card rounded-xl overflow-hidden group"
              >
                <div className="h-56 bg-gray-50 flex items-center justify-center overflow-hidden">
                  <img src={r.img_url} alt={r.name} className="h-44 object-contain transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                </div>
                <div className="p-4">
                  <h3 className="font-medium group-hover:text-luxury-gold transition-colors">{r.name}</h3>
                  <p className="text-luxury-gold font-semibold mt-1">${r.price.toFixed(2)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductDetailPage;
