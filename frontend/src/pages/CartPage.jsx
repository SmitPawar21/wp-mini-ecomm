import React, { useState, useEffect, useMemo } from 'react';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingCart, User, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Cookies from "js-cookie"

// cart updated
// item delete

const CartPage = () => {
  const [cart, setCart] = useState();
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

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/cart`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${Cookies.get('token')}`
        }
      });

      const data = await response.json();
      console.log(data);
      setCartItems(data.cart.items);
      setCart(data.cart);
    }

    fetchData();
    setIsLoading(false);
  }, []);


  const handleUpdateQuantity = async (productId, newQuantity) => {
    const item = cartItems.find(i => i.productId._id === productId);
    if (newQuantity < 1 || newQuantity > item.productId.stock) {
      return;
    }

    const updatedItems = cartItems.map(i =>
      i.productId._id === productId ? { ...i, quantity: newQuantity } : i
    );
    setCartItems(updatedItems);

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/cart/update`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${Cookies.get('token')}`
        },
        body: JSON.stringify({productId, quantity: newQuantity})
      });

      const data = await response.json();
      console.log(data);
    } catch (err) {
      alert(err);
    }
  };

  const handleRemoveItem = async (productId) => {
    setCartItems(currentItems =>
      currentItems.filter(item => item.productId._id !== productId)
    );
    
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/cart/remove/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${Cookies.get('token')}`
        }
      });

      const data = await response.json();
      console.log(data);

    } catch (err) {
      alert(err);
    }
  };

  const { subtotal, tax, total } = useMemo(() => {
    let subtotal = 0;
    cartItems.forEach(item => {
      const price = item.productId.isOnSale ? item.productId.discountPrice : item.productId.price;
      subtotal += price * item.quantity;
    });

    const tax = subtotal * 0.05;
    const total = subtotal + tax;

    return { subtotal, tax, total };
  }, [cartItems]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  const quantityBtnStyle = `p-1 rounded-full transition-colors`
  const quantityBtnHover = (e) => e.currentTarget.style.backgroundColor = colors.primary;
  const quantityBtnLeave = (e) => e.currentTarget.style.backgroundColor = 'transparent';

  if (isLoading) {
    return (
      <div style={{ backgroundColor: colors.background }} className="min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <p style={{ color: colors.textWhite }} className="text-xl">Loading Cart...</p>
        </div>
      </div>
    );
  }

  if (!isLoading && cartItems.length === 0) {
    return (
      <div style={{ backgroundColor: colors.background }} className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold mb-4" style={{ color: colors.textWhite }}>Your Cart is Empty</h1>
          <p className="text-lg mb-8" style={{ color: colors.textLight }}>Looks like you haven't added anything to your cart yet.</p>
          <button
            onClick={() => navigate('/home')} // Navigate to shop page
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

  return (
    <div style={{ backgroundColor: colors.background }} className="min-h-screen pb-20">
      <Navbar isAuthenticated={true} />

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8" style={{ color: colors.textWhite }}>
          Shopping Cart
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">

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
                <img
                  src={item.productId.thumbnail}
                  alt={item.productId.name}
                  className="w-full sm:w-28 h-48 sm:h-28 object-cover rounded-md"
                />

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

          <div className="w-full lg:w-1/3">
            <div
              className="p-6 rounded-lg sticky top-28"
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
        <div className="mt-8">
          <a
            href="/home"
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
