import React, { useState, useEffect } from 'react';
import Cookies from "js-cookie"

const ProductDetail = ({ productId, onBack }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariants, setSelectedVariants] = useState({});
  const [quantity, setQuantity] = useState(1);

  const colors = {
    background: '#040D12',
    cardBg: '#183D3D',
    border: '#5C8374',
    textLight: '#93B1A6',
    textWhite: '#ffffff',
    primary: '#A27B5C',
    primaryHover: '#b58e70',
  };

  useEffect(() => {
    // Simulate fetching product data
    // Replace this with your actual API call
    console.log(Cookies.get('token'));
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/products/${productId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${Cookies.get('token')}`
          }
        });
        const data = await response.json();
        console.log(data);

        setProduct(data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleQuantityChange = (type) => {
    if (type === 'increment' && quantity < product.stock) {
      setQuantity(quantity + 1);
    } else if (type === 'decrement' && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/cart/add`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${Cookies.get('token')}`
        },
        body: JSON.stringify({productId, quantity})
      });

      const data = await response.json();
      console.log(data);

      setLoading(false);
    } catch (err) {
      alert(err);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: colors.background }}>
        <div className="text-xl" style={{ color: colors.textLight }}>Loading...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4" style={{ backgroundColor: colors.background }}>
        <div className="text-xl" style={{ color: colors.textLight }}>Product not found</div>
        <button
          onClick={onBack}
          className="px-6 py-2 rounded-md"
          style={{ backgroundColor: colors.primary, color: colors.textWhite }}
        >
          Go Back Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8" style={{ backgroundColor: colors.background }}>
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 rounded-md mb-6 border"
          style={{ 
            backgroundColor: 'transparent', 
            color: colors.textLight,
            borderColor: colors.border
          }}
        >
          ← Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div>
            <div className="rounded-lg overflow-hidden mb-4 border" style={{ backgroundColor: colors.cardBg, borderColor: colors.border }}>
              <img 
                src={product.images[selectedImage]} 
                alt={product.name}
                className="w-full h-96 object-cover"
                onError={(e) => { e.target.src = ''; }}
              />
            </div>
            
            {/* Thumbnail Gallery */}
            <div className="flex gap-2 flex-wrap">
              {product.images.map((img, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className="w-20 h-20 rounded-md overflow-hidden cursor-pointer border-2"
                  style={{
                    backgroundColor: colors.cardBg,
                    borderColor: selectedImage === index ? colors.primary : colors.border,
                  }}
                >
                  <img 
                    src={img} 
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.src = ''; }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div style={{ color: colors.textWhite }}>
            {/* Brand & Category */}
            <div className="flex gap-2 mb-2">
              <span className="text-sm px-3 py-1 rounded border" style={{ backgroundColor: colors.cardBg, color: colors.textLight, borderColor: colors.border }}>
                {product.brand}
              </span>
              <span className="text-sm px-3 py-1 rounded border" style={{ backgroundColor: colors.cardBg, color: colors.textLight, borderColor: colors.border }}>
                {product.category}
              </span>
            </div>

            {/* Product Name */}
            <h1 className="text-3xl font-bold mb-2">
              {product.name}
            </h1>

            {/* SKU & Availability */}
            <div className="flex gap-4 mb-4 text-sm" style={{ color: colors.textLight }}>
              <span>SKU: {product.sku}</span>
              <span style={{ color: product.stock > 0 ? '#4ade80' : '#ef4444' }}>
                {product.availabilityStatus}
              </span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-center gap-4">
                <span className="text-4xl font-bold" style={{ color: colors.primary }}>
                  ₹{product.price}
                </span>
                {product.isOnSale && (
                  <>
                    <span className="text-xl line-through" style={{ color: colors.textLight }}>
                      ₹{product.price}
                    </span>
                    <span className="text-sm px-2 py-1 rounded bg-red-500" style={{ color: colors.textWhite }}>
                      {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="leading-relaxed mb-6" style={{ color: colors.textLight }}>
              {product.description}
            </p>

            {/* Variants */}
            {product.variants.map((variant, index) => (
              <div key={index} className="mb-6">
                <label className="block mb-2 font-medium">
                  {variant.name}
                </label>
                <div className="flex gap-2 flex-wrap">
                  {variant.value.split(',').map((option, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedVariants({...selectedVariants, [variant.name]: option.trim()})}
                      className="px-4 py-2 rounded-md border"
                      style={{
                        backgroundColor: selectedVariants[variant.name] === option.trim() ? colors.primary : colors.cardBg,
                        color: colors.textWhite,
                        borderColor: colors.border
                      }}
                    >
                      {option.trim()}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block mb-2 font-medium">
                Quantity
              </label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleQuantityChange('decrement')}
                  className="w-10 h-10 rounded-md border text-xl"
                  style={{
                    backgroundColor: colors.cardBg,
                    color: colors.textWhite,
                    borderColor: colors.border
                  }}
                >
                  -
                </button>
                <span className="px-6 py-2 rounded-md border" style={{ backgroundColor: colors.cardBg, borderColor: colors.border }}>
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange('increment')}
                  className="w-10 h-10 rounded-md border text-xl"
                  style={{
                    backgroundColor: colors.cardBg,
                    color: colors.textWhite,
                    borderColor: colors.border
                  }}
                >
                  +
                </button>
                <span className="text-sm ml-2" style={{ color: colors.textLight }}>
                  ({product.stock} available)
                </span>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="w-full py-4 rounded-lg text-lg font-semibold mb-8 transition-colors"
              style={{
                backgroundColor: product.stock > 0 ? colors.primary : colors.border,
                color: colors.textWhite,
                cursor: product.stock > 0 ? 'pointer' : 'not-allowed'
              }}
              onMouseEnter={(e) => {
                if (product.stock > 0) e.target.style.backgroundColor = colors.primaryHover;
              }}
              onMouseLeave={(e) => {
                if (product.stock > 0) e.target.style.backgroundColor = colors.primary;
              }}
            >
              {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </button>

            {/* Specifications */}
            <div className="p-6 rounded-lg border mb-6" style={{ backgroundColor: colors.cardBg, borderColor: colors.border }}>
              <h3 className="text-xl font-semibold mb-4">
                Specifications
              </h3>
              <div className="space-y-3">
                {product.specifications.map((spec, index) => (
                  <div key={index} className="flex justify-between pb-3" style={{ borderBottom: index < product.specifications.length - 1 ? `1px solid ${colors.border}` : 'none' }}>
                    <span style={{ color: colors.textLight }}>{spec.key}</span>
                    <span className="font-medium" style={{ color: colors.textWhite }}>{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div>
              <h3 className="text-base font-semibold mb-3" style={{ color: colors.textLight }}>
                Tags
              </h3>
              <div className="flex gap-2 flex-wrap">
                {product.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="text-sm px-3 py-1 rounded-full border"
                    style={{
                      backgroundColor: colors.cardBg,
                      color: colors.textLight,
                      borderColor: colors.border
                    }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;