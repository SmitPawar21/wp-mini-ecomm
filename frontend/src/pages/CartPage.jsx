import React, { useState, useEffect, useMemo } from 'react';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingCart, User, Menu, X } from 'lucide-react';

// =====================================================================
// Mock navigate hook (for Navbar)
// =====================================================================
const useNavigate = () => (path) => console.log(`Navigating to ${path}`);

// =====================================================================
// Navbar Component (Copied from previous file to make this runnable)
// =====================================================================
const Navbar = ({ isAuthenticated = false }) => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const colors = {
    background: '#040D12',
    cardBg: '#183D3D',
    border: '#5C8374',
    textLight: '#93B1A6',
    textWhite: '#ffffff',
    primary: '#A27B5C',
    primaryHover: '#b58e70',
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleLogout = () => {
    console.log('User logged out');
    navigate('/');
  };

  const linkBaseStyle = { color: colors.textLight };
  
  const linkHoverEnter = (e) => {
    e.currentTarget.style.color = colors.primary;
  };
  const linkHoverLeave = (e) => {
    e.currentTarget.style.color = colors.textLight;
  };
  
  const mobileLinkHoverEnter = (e) => {
     e.currentTarget.style.backgroundColor = colors.cardBg;
  };
   const mobileLinkHoverLeave = (e) => {
     e.currentTarget.style.backgroundColor = 'transparent';
  };


  return (
    <nav
      className="sticky top-0 z-50 w-full"
      style={{
        backgroundColor: `${colors.background}E6`, // 90% opacity
        backdropFilter: 'blur(10px)',
        borderBottom: `1px solid ${colors.border}4D`,
      }}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="relative flex items-center justify-between h-20">
          
          {/* Left Side: Logo/Title */}
          <div className="flex-shrink-0">
            <a 
              href="/" 
              className="text-2xl font-bold" 
              style={{ color: colors.textWhite }}
            >
              E-commerce Website
            </a>
          </div>

          {/* Center: Desktop Nav Links */}
          <div className="hidden lg:flex lg:items-center lg:space-x-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                className="px-3 py-2 rounded-lg font-medium transition-colors"
                style={linkBaseStyle}
                onMouseEnter={linkHoverEnter}
                onMouseLeave={linkHoverLeave}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Right Side: Icons & Auth */}
          <div className="flex items-center space-x-4">
            {/* Cart Icon */}
            <button
              className="p-2 rounded-full transition-colors"
              style={{ color: colors.textLight }}
              onMouseEnter={(e) => e.currentTarget.style.color = colors.primary}
              onMouseLeave={(e) => e.currentTarget.style.color = colors.textLight}
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="w-6 h-6" />
            </button>

            {/* Auth Buttons (Desktop) */}
            <div className="hidden lg:flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  <button
                    className="p-2 rounded-full transition-colors"
                    style={{ color: colors.textLight }}
                    onMouseEnter={(e) => e.currentTarget.style.color = colors.primary}
                    onMouseLeave={(e) => e.currentTarget.style.color = colors.textLight}
                    aria-label="Profile"
                    onClick={() => navigate('/profile')}
                  >
                    <User className="w-6 h-6" />
                  </button>
                  <button
                    onClick={handleLogout}
                    className="px-5 py-2 rounded-lg font-medium transition-colors"
                    style={{
                      borderColor: colors.primary,
                      borderWidth: '1px',
                      color: colors.primary
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = colors.primary;
                      e.currentTarget.style.color = colors.textWhite;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = colors.primary;
                    }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => navigate('/login')}
                    className="px-5 py-2 rounded-lg font-medium transition-colors"
                    style={{ color: colors.textLight }}
                    onMouseEnter={(e) => e.currentTarget.style.color = colors.primary}
                    onMouseLeave={(e) => e.currentTarget.style.color = colors.textLight}
                  >
                    Login
                  </button>
                  <button
                    onClick={() => navigate('/register')}
                    className="px-5 py-2 rounded-lg font-medium transition-colors"
                    style={{
                      backgroundColor: colors.primary,
                      color: colors.textWhite
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.primaryHover}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = colors.primary}
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
            
            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md"
                style={{ color: colors.textLight }}
                aria-label="Toggle main menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden absolute top-20 left-0 w-full shadow-lg p-4"
          style={{ 
            backgroundColor: colors.background,
            borderTop: `1px solid ${colors.border}4D`
          }}
        >
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                className="block w-full text-left px-4 py-3 rounded-lg font-medium"
                style={linkBaseStyle}
                onMouseEnter={mobileLinkHoverEnter}
                onMouseLeave={mobileLinkHoverLeave}
              >
                {link.name}
              </a>
            ))}
            
            {/* Mobile Auth Buttons */}
            <div className="border-t" style={{ borderColor: `${colors.border}4D` }}></div>
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => { navigate('/profile'); setIsMobileMenuOpen(false); }}
                  className="w-full text-left px-4 py-3 rounded-lg font-medium"
                  style={linkBaseStyle}
                  onMouseEnter={mobileLinkHoverEnter}
                  onMouseLeave={mobileLinkHoverLeave}
                >
                  Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 rounded-lg font-medium"
                  style={{ color: colors.primary }}
                  onMouseEnter={mobileLinkHoverEnter}
                  onMouseLeave={mobileLinkHoverLeave}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => { navigate('/login'); setIsMobileMenuOpen(false); }}
                  className="w-full text-left px-4 py-3 rounded-lg font-medium"
                  style={linkBaseStyle}
                  onMouseEnter={mobileLinkHoverEnter}
                  onMouseLeave={mobileLinkHoverLeave}
                >
                  Login
                </button>
                <button
                  onClick={() => { navigate('/register'); setIsMobileMenuOpen(false); }}
                  className="w-full text-left px-4 py-3 rounded-lg font-medium"
                  style={{
                    backgroundColor: colors.primary,
                    color: colors.textWhite
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.primaryHover}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = colors.primary}
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
// =====================================================================
// End of Navbar Component
// =====================================================================


// =====================================================================
// Mock Cart Data
// =====================================================================
const mockCartItems = [
  {
    productId: {
      _id: "60d5f1f77e8b4b001f6d9e01",
      name: "Classic Denim Jacket",
      brand: "EcoWear",
      thumbnail: "https://placehold.co/150x150/183D3D/93B1A6?text=Jacket",
      price: 4999,
      discountPrice: 4499,
      isOnSale: true,
      stock: 150
    },
    quantity: 1
  },
  {
    productId: {
      _id: "60d5f1f77e8b4b001f6d9e02",
      name: "Premium Wireless Headphones",
      brand: "AudioMax",
      thumbnail: "https://placehold.co/150x150/5C8374/FFFFFF?text=Headphones",
      price: 19999,
      discountPrice: 0,
      isOnSale: false,
      stock: 50
    },
    quantity: 2
  },
  {
    productId: {
      _id: "60d5f1f77e8b4b001f6d9e03",
      name: "Organic Cotton T-Shirt",
      brand: "EcoWear",
      thumbnail: "https://placehold.co/150x150/A27B5C/FFFFFF?text=T-Shirt",
      price: 1599,
      discountPrice: 1299,
      isOnSale: true,
      stock: 200
    },
    quantity: 3
  }
];
// =====================================================================


// =====================================================================
// CartPage Component
// =====================================================================
const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate(); // Using the mock

  const colors = {
    background: '#040D12',
    cardBg: '#183D3D',
    border: '#5C8374',
    textLight: '#93B1A6',
    textWhite: '#ffffff',
    primary: '#A27B5C',
    primaryHover: '#b58e70',
  };

  // Simulate fetching cart data
  useEffect(() => {
    setIsLoading(true);
    // In a real app, you'd fetch from your API here
    // e.g., const response = await fetch('/api/cart');
    setTimeout(() => {
      setCartItems(mockCartItems); // Using mock data
      setIsLoading(false);
    }, 1000); // Simulate 1s loading time
  }, []);

  /**
   * Handle Quantity Change
   * In a real app, this would call your API to update the cart
   */
  const handleUpdateQuantity = (productId, newQuantity) => {
    // Prevent quantity from going below 1 or above stock
    const item = cartItems.find(i => i.productId._id === productId);
    if (newQuantity < 1 || newQuantity > item.productId.stock) {
      return; 
    }
    
    setCartItems(currentItems =>
      currentItems.map(item =>
        item.productId._id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
    // API call example:
    // fetch(`/api/cart/update/${productId}`, { method: 'PUT', body: JSON.stringify({ quantity: newQuantity }) });
    console.log(`API Call: Update product ${productId} to quantity ${newQuantity}`);
  };

  /**
   * Handle Item Removal
   * In a real app, this would call your API to remove from the cart
   */
  const handleRemoveItem = (productId) => {
    setCartItems(currentItems =>
      currentItems.filter(item => item.productId._id !== productId)
    );
    // API call example:
    // fetch(`/api/cart/remove/${productId}`, { method: 'DELETE' });
    console.log(`API Call: Remove product ${productId}`);
  };

  /**
   * Calculate totals
   */
  const { subtotal, tax, total } = useMemo(() => {
    let subtotal = 0;
    cartItems.forEach(item => {
      const price = item.productId.isOnSale ? item.productId.discountPrice : item.productId.price;
      subtotal += price * item.quantity;
    });

    // Mock 5% tax
    const tax = subtotal * 0.05;
    const total = subtotal + tax;
    
    return { subtotal, tax, total };
  }, [cartItems]);

  // Format currency (INR)
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  // Quantity control button style
  const quantityBtnStyle = `p-1 rounded-full transition-colors`
  const quantityBtnHover = (e) => e.currentTarget.style.backgroundColor = colors.primary;
  const quantityBtnLeave = (e) => e.currentTarget.style.backgroundColor = 'transparent';

  // Loading State
  if (isLoading) {
    return (
      <div style={{ backgroundColor: colors.background }} className="min-h-screen">
        <Navbar isAuthenticated={true} />
        <div className="flex items-center justify-center h-96">
          <p style={{ color: colors.textWhite }} className="text-xl">Loading Cart...</p>
        </div>
      </div>
    );
  }

  // Empty Cart State
  if (!isLoading && cartItems.length === 0) {
    return (
      <div style={{ backgroundColor: colors.background }} className="min-h-screen">
        <Navbar isAuthenticated={true} />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold mb-4" style={{ color: colors.textWhite }}>Your Cart is Empty</h1>
          <p className="text-lg mb-8" style={{ color: colors.textLight }}>Looks like you haven't added anything to your cart yet.</p>
          <button
            onClick={() => navigate('/shop')} // Navigate to shop page
            className="px-8 py-3 rounded-lg font-bold transition-colors text-lg"
            style={{
              backgroundColor: colors.primary,
              color: colors.textWhite
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.primaryHover}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = colors.primary}
          >
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  // Cart Page (with items)
  return (
    <div style={{ backgroundColor: colors.background }} className="min-h-screen pb-20">
      <Navbar isAuthenticated={true} />

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8" style={{ color: colors.textWhite }}>
          Shopping Cart
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Column: Cart Items */}
          <div className="flex-1 space-y-4">
            {cartItems.map(item => (
              <div
                key={item.productId._id}
                className="flex flex-col sm:flex-row p-4 rounded-lg"
                style={{
                  backgroundColor: colors.cardBg,
                  border: `1px solid ${colors.border}4D`
                }}
              >
                {/* Image */}
                <img
                  src={item.productId.thumbnail}
                  alt={item.productId.name}
                  className="w-full sm:w-28 h-48 sm:h-28 object-cover rounded-md"
                />
                
                {/* Details */}
                <div className="flex-1 sm:ml-4 mt-4 sm:mt-0">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="text-lg font-semibold" style={{ color: colors.textWhite }}>
                        {item.productId.name}
                      </h3>
                      <p className="text-sm" style={{ color: colors.textLight }}>
                        {item.productId.brand}
                      </p>
                    </div>
                    <button 
                      onClick={() => handleRemoveItem(item.productId._id)}
                      className="p-1 rounded-full transition-colors"
                      style={{ color: colors.textLight }}
                      onMouseEnter={(e) => e.currentTarget.style.color = colors.primary}
                      onMouseLeave={(e) => e.currentTarget.style.color = colors.textLight}
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mt-4">
                    {/* Quantity Selector */}
                    <div className="flex items-center space-x-2" style={{ color: colors.textWhite }}>
                      <button 
                        onClick={() => handleUpdateQuantity(item.productId._id, item.quantity - 1)}
                        className={quantityBtnStyle}
                        style={{ border: `1px solid ${colors.border}` }}
                        onMouseEnter={quantityBtnHover}
                        onMouseLeave={quantityBtnLeave}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-10 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => handleUpdateQuantity(item.productId._id, item.quantity + 1)}
                        className={quantityBtnStyle}
                        style={{ border: `1px solid ${colors.border}` }}
                        onMouseEnter={quantityBtnHover}
                        onMouseLeave={quantityBtnLeave}
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="mt-4 sm:mt-0 text-right">
                      {item.productId.isOnSale ? (
                        <>
                          <p className="text-xl font-bold" style={{ color: colors.primary }}>
                            {formatCurrency(item.productId.discountPrice)}
                          </p>
                          <p className="text-sm line-through" style={{ color: colors.textLight }}>
                            {formatCurrency(item.productId.price)}
                          </p>
                        </>
                      ) : (
                        <p className="text-xl font-bold" style={{ color: colors.textWhite }}>
                          {formatCurrency(item.productId.price)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Order Summary */}
          <div className="w-full lg:w-1/3">
            <div 
              className="p-6 rounded-lg sticky top-28" // sticky top to follow scroll
              style={{
                backgroundColor: colors.cardBg,
                border: `1px solid ${colors.border}4D`
              }}
            >
              <h2 className="text-2xl font-semibold mb-6" style={{ color: colors.textWhite }}>
                Order Summary
              </h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span style={{ color: colors.textLight }}>Subtotal</span>
                  <span style={{ color: colors.textWhite }}>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: colors.textLight }}>Tax (5%)</span>
                  <span style={{ color: colors.textWhite }}>{formatCurrency(tax)}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: colors.textLight }}>Shipping</span>
                  <span style={{ color: colors.textWhite }}>FREE</span>
                </div>
              </div>

              <div className="border-t my-4" style={{ borderColor: `${colors.border}80` }}></div>

              <div className="flex justify-between items-center mb-6">
                <span className="text-xl font-bold" style={{ color: colors.textWhite }}>Total</span>
                <span className="text-2xl font-bold" style={{ color: colors.textWhite }}>{formatCurrency(total)}</span>
              </div>

              <button
                onClick={() => navigate('/checkout')} // Navigate to checkout page
                className="w-full py-3 rounded-lg font-bold transition-colors text-lg"
                style={{
                  backgroundColor: colors.primary,
                  color: colors.textWhite
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.primaryHover}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = colors.primary}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>

        </div>
        
        {/* Continue Shopping Link */}
        <div className="mt-8">
           <a 
             href="/shop" 
             className="inline-flex items-center gap-2 transition-colors"
             style={{ color: colors.textLight }}
             onMouseEnter={(e) => e.currentTarget.style.color = colors.primary}
             onMouseLeave={(e) => e.currentTarget.style.color = colors.textLight}
           >
             <ArrowLeft className="w-4 h-4" />
             Continue Shopping
           </a>
        </div>
        
      </div>
    </div>
  );
};

export default CartPage;
