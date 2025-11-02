import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import Navbar from '../components/Navbar';

const mockProducts = [
  { id: 1, name: 'Premium Headphones', price: 299, category: 'Electronics', img: 'https://placehold.co/300x300/183D3D/93B1A6?text=Headphones' },
  { id: 2, name: 'Modern Smartwatch', price: 450, category: 'Electronics', img: 'https://placehold.co/300x300/5C8374/FFFFFF?text=Watch' },
  { id: 3, name: 'Leather Jacket', price: 190, category: 'Fashion', img: 'https://placehold.co/300x300/A27B5C/FFFFFF?text=Jacket' },
  { id: 4, name: 'Coffee Maker', price: 89, category: 'Home', img: 'https://placehold.co/300x300/93B1A6/040D12?text=Coffee' },
];

const HomePage = () => {
  const [products, setProducts] = useState(mockProducts);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    brand: '',
    minPrice: '',
    maxPrice: '',
    isOnSale: false,
    sortBy: 'createdAt',
    order: 'desc',
    page: 1,
    limit: 10,
  });

  const colors = {
    background: '#040D12',
    cardBg: '#183D3D',
    border: '#5C8374',
    textLight: '#93B1A6',
    textWhite: '#ffffff',
    primary: '#A27B5C',
    primaryHover: '#b58e70',
  };

  const fetchProducts = async () => {
    setIsLoading(true);
    
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== '' && value !== false && value !== null && value !== undefined) {
        params.append(key, String(value));
      }
    });

    const queryString = params.toString();
    const backendUrl = import.meta.env?.VITE_BACKEND_URL || 'http://localhost:5000';
    const apiUrl = `${backendUrl}/api/products/all${queryString ? `?${queryString}` : ''}`;

    console.log('Fetching from:', apiUrl);

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      setProducts(data.data || []);
      setTotalPages(data.totalPages || 1);

      console.log(data);
      
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setProducts(mockProducts);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [filters.page]);

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: type === 'checkbox' ? checked : value,
      page: 1, 
    }));
  };
  
  const handleSearchClick = (e) => {
    if (e) e.preventDefault();
    setIsDrawerOpen(false);
    fetchProducts();
  };

  const handlePageChange = (newPage) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      page: newPage,
    }));
  };

  const renderInput = (name, placeholder, type = 'text') => (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={filters[name]}
      onChange={handleFilterChange}
      className="w-full px-4 py-3 rounded-lg focus:outline-none transition-colors"
      style={{
        backgroundColor: `${colors.background}80`,
        border: `1px solid ${colors.border}80`,
        color: colors.textWhite
      }}
      onFocus={(e) => e.target.style.borderColor = colors.primary}
      onBlur={(e) => e.target.style.borderColor = `${colors.border}80`}
    />
  );

  const renderSelect = (name, options) => (
    <select
      name={name}
      value={filters[name]}
      onChange={handleFilterChange}
      className="w-full px-4 py-3 rounded-lg focus:outline-none cursor-pointer"
      style={{
        backgroundColor: `${colors.background}80`,
        border: `1px solid ${colors.border}80`,
        color: colors.textWhite
      }}
      onFocus={(e) => e.target.style.borderColor = colors.primary}
      onBlur={(e) => e.target.style.borderColor = `${colors.border}80`}
    >
      {options.map(opt => (
        <option key={opt.value} value={opt.value} style={{ backgroundColor: colors.background }}>
          {opt.label}
        </option>
      ))}
    </select>
  );

  return (
    <div style={{ backgroundColor: colors.background, color: colors.textLight }} className="min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Search and Filter Button Section */}
        <div className="mb-6">
          <div className="flex gap-3">
            <div className="flex-grow">
              {renderInput('search', 'Search for products...')}
            </div>
            <button
              onClick={handleSearchClick}
              className="px-8 py-3 rounded-lg font-bold flex items-center justify-center transition-colors whitespace-nowrap"
              style={{
                backgroundColor: colors.primary,
                color: colors.textWhite
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.primaryHover}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = colors.primary}
              disabled={isLoading}
            >
              {isLoading ? '...' : <Search className="w-5 h-5" />}
              <span className="ml-2">Search</span>
            </button>
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="px-6 py-3 rounded-lg font-bold flex items-center justify-center transition-colors whitespace-nowrap"
              style={{
                backgroundColor: colors.cardBg,
                color: colors.textWhite,
                border: `1px solid ${colors.border}`
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.border}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = colors.cardBg}
            >
              <Menu className="w-5 h-5" />
              <span className="ml-2">Filters</span>
            </button>
          </div>
        </div>

        {/* Filter Drawer */}
        {isDrawerOpen && (
          <>
            {/* Overlay */}
            <div
              onClick={() => setIsDrawerOpen(false)}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: 40,
              }}
            />
            
            {/* Drawer */}
            <div
              style={{
                position: 'fixed',
                top: 0,
                right: 0,
                bottom: 0,
                width: '100%',
                maxWidth: '400px',
                backgroundColor: colors.cardBg,
                zIndex: 50,
                overflowY: 'auto',
                boxShadow: '-4px 0 6px rgba(0, 0, 0, 0.1)',
              }}
            >
              <div className="p-6">
                {/* Drawer Header */}
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold" style={{ color: colors.textWhite }}>
                    Filters
                  </h2>
                  <button
                    onClick={() => setIsDrawerOpen(false)}
                    className="p-2 rounded-lg transition-colors"
                    style={{ color: colors.textWhite }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.background}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Filter Options */}
                <div className="space-y-6">
                  {/* Category */}
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium mb-2">
                      Category
                    </label>
                    {renderSelect('category', [
                      { value: '', label: 'All' },
                      { value: 'electronics', label: 'Electronics' },
                      { value: 'fashion', label: 'Fashion' },
                      { value: 'home', label: 'Home' },
                      { value: 'beauty', label: 'Beauty' },
                    ])}
                  </div>
                  
                  {/* Brand */}
                  <div>
                    <label htmlFor="brand" className="block text-sm font-medium mb-2">
                      Brand
                    </label>
                    {renderInput('brand', 'Brand name')}
                  </div>
                  
                  {/* Price Range */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Price Range</label>
                    <div className="space-y-3">
                      {renderInput('minPrice', 'Min Price', 'number')}
                      {renderInput('maxPrice', 'Max Price', 'number')}
                    </div>
                  </div>
                  
                  {/* Sort By */}
                  <div>
                    <label htmlFor="sortBy" className="block text-sm font-medium mb-2">
                      Sort By
                    </label>
                    {renderSelect('sortBy', [
                      { value: 'createdAt', label: 'Newest' },
                      { value: 'price', label: 'Price' },
                      { value: 'name', label: 'Name' },
                    ])}
                  </div>

                  {/* Sort Order */}
                  <div>
                    <label htmlFor="order" className="block text-sm font-medium mb-2">
                      Order
                    </label>
                    {renderSelect('order', [
                      { value: 'desc', label: 'Descending' },
                      { value: 'asc', label: 'Ascending' },
                    ])}
                  </div>

                  {/* On Sale Checkbox */}
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isOnSale"
                      name="isOnSale"
                      checked={filters.isOnSale}
                      onChange={handleFilterChange}
                      className="w-4 h-4 cursor-pointer"
                      style={{ accentColor: colors.primary }}
                    />
                    <label htmlFor="isOnSale" className="ml-2 text-sm cursor-pointer">
                      On Sale Only
                    </label>
                  </div>
                </div>

                {/* Apply Button */}
                <button
                  onClick={handleSearchClick}
                  className="w-full mt-8 px-6 py-3 rounded-lg font-bold transition-colors"
                  style={{
                    backgroundColor: colors.primary,
                    color: colors.textWhite
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.primaryHover}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = colors.primary}
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Product Grid Section */}
      <div className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="text-center" style={{ color: colors.textWhite }}>Loading products...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <div 
                key={product.id}
                className="rounded-lg overflow-hidden transition-transform transform hover:-translate-y-1"
                style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.border}4D` }}
              >
                <img src={product.img} alt={product.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2" style={{ color: colors.textWhite }}>
                    {product.name}
                  </h3>
                  <p className="text-sm mb-1">{product.category}</p>
                  <p className="text-xl font-bold" style={{ color: colors.primary }}>
                    ${product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Pagination Section */}
        <div className="flex justify-center items-center gap-4 mt-12">
          <button
            onClick={() => handlePageChange(filters.page - 1)}
            disabled={filters.page <= 1 || isLoading}
            className="px-4 py-2 rounded-lg disabled:opacity-50 transition-colors"
            style={{ backgroundColor: colors.primary, color: colors.textWhite }}
            onMouseEnter={(e) => !e.currentTarget.disabled && (e.currentTarget.style.backgroundColor = colors.primaryHover)}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = colors.primary}
          >
            Previous
          </button>
          <span style={{ color: colors.textWhite }}>
            Page {filters.page} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(filters.page + 1)}
            disabled={filters.page >= totalPages || isLoading}
            className="px-4 py-2 rounded-lg disabled:opacity-50 transition-colors"
            style={{ backgroundColor: colors.primary, color: colors.textWhite }}
            onMouseEnter={(e) => !e.currentTarget.disabled && (e.currentTarget.style.backgroundColor = colors.primaryHover)}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = colors.primary}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;