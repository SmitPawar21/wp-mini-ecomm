import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import groupPhoto from '../assets/group.jpg';

const IntroPage = () => {
  const navigate = useNavigate();
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleContactChange = (e) => {
    setContactForm({ ...contactForm, [e.target.name]: e.target.value });
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    console.log('Contact Form Submitted:', contactForm);
    alert('Thank you for your message!');
    setContactForm({ name: '', email: '', message: '' });
  };

  const colors = {
    background: '#040D12',
    cardBg: '#183D3D',
    border: '#5C8374',
    textLight: '#93B1A6',
    textWhite: '#ffffff',
    primary: '#A27B5C',
    primaryHover: '#b58e70',
  };

  const products = [
    {
      name: 'Premium Headphones',
      img: `https://m.media-amazon.com/images/I/71SXIg5aNML._SL1500_.jpg`,
      delay: '0s',
    },
    {
      name: 'Smart Watch',
      img: `https://m.media-amazon.com/images/I/71wgrC1xc3L._SL1500_.jpg`,
      delay: '0.5s',
    },
    {
      name: 'Fit & Flare Wrap Dress',
      img: `https://m.media-amazon.com/images/I/618uHpeCr7L._SY879_.jpg`,
      delay: '1s',
    },
    {
      name: 'RCB Fit Tees for Men',
      img: `https://m.media-amazon.com/images/I/51oTbtXI00L._SX679_.jpg`,
      delay: '1.5s',
    },
  ];

  return (
    <div
      className="min-h-screen overflow-x-hidden"
      style={{
        backgroundColor: colors.background,
        color: colors.textLight
      }}
    >
      <header
        className="py-6 px-4 md:px-8 relative z-20"
        style={{
          borderBottom: `1px solid ${colors.border}4D`,
          backgroundColor: `${colors.background}B3`,
          backdropFilter: 'blur(10px)'
        }}
      >
        <div className="container mx-auto flex justify-between items-center">
          <h1
            className="text-2xl font-bold"
            style={{ color: colors.textWhite }}
          >
            E-commerce Website
          </h1>
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/login')}
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
          </div>
        </div>
      </header>

      <section
        className="relative text-center py-12 border-b overflow-hidden"
        style={{ borderColor: `${colors.border}4D` }}
      >
        {/* Background Glow Effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute w-[600px] h-[600px] bg-[#057B51] rounded-full blur-3xl opacity-50 top-[-100px] left-[-100px]"></div>
          <div className="absolute w-[500px] h-[500px] bg-[#01402F] rounded-full blur-3xl opacity-40 bottom-[-150px] right-[-150px]"></div>
          <div className="absolute w-[400px] h-[400px] bg-[#001719] rounded-full blur-3xl opacity-40 top-[200px] right-[200px]"></div>
          <div className="absolute w-[300px] h-[300px] bg-[#C5F37D] rounded-full blur-3xl opacity-30 bottom-[100px] left-[250px]"></div>
        </div>

        {/* Text Content */}
        <div className="relative z-10 py-10">
          <h2
            className="text-4xl md:text-5xl font-extrabold mb-4"
            style={{ color: '#FFFFFF' }} // brighter white
          >
            Welcome to The E-commerce Store
          </h2>
          <p
            className="text-lg md:text-xl max-w-3xl mx-auto"
            style={{ color: '#F5F5F5' }} // near-white for clarity
          >
            Discover the best deals, explore endless categories, and enjoy shopping made simple, secure, and satisfying.
          </p>
        </div>
      </section>


      <main>
        {/* Existing main content */}
        <section className="relative container mx-auto px-4 py-24 md:py-32 flex flex-col lg:flex-row items-center justify-between text-center lg:text-left">
          <div className="relative z-10 max-w-2xl lg:w-1/2">
            <h2
              className="text-4xl md:text-6xl font-extrabold mb-6"
              style={{ color: colors.textWhite }}
            >
              The Winter <span style={{ color: colors.primary }}>Sale</span> is On
            </h2>
            <p className="text-lg md:text-xl mb-8" style={{ color: colors.textLight }}>
              Get up to <span className="font-bold" style={{ color: colors.textWhite }}>50% OFF</span> on select electronics, fashion, and home goods. Don't miss out on these limited-time deals.
            </p>
            <button
              className="px-8 py-3 rounded-lg font-bold text-lg transition-colors"
              style={{
                backgroundColor: colors.primary,
                color: colors.textWhite
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.primaryHover}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = colors.primary}
            >
              Shop All Deals
            </button>
          </div>

          <div className="relative lg:w-1/2 mt-16 lg:mt-0">
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              {products.map((product) => (
                <div
                  key={product.name}
                  className="p-4 rounded-lg animate-float"
                  style={{
                    backgroundColor: `${colors.cardBg}80`,
                    borderColor: `${colors.border}4D`,
                    borderWidth: '1px',
                    animationDelay: product.delay,
                  }}
                >
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-full h-auto rounded-md mb-3"
                  />
                  <h3 className="font-semibold text-center" style={{ color: colors.textWhite }}>
                    {product.name}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section
          id="about"
          className="py-20"
          style={{ backgroundColor: colors.cardBg }}
        >
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <img
                src={`https://miro.medium.com/v2/resize:fit:1252/0*uxs6kz8ePkFuxs2y`}
                alt="Our Story"
                className="rounded-lg shadow-xl w-full"
              />
            </div>
            <div className="md:w-1/2">
              <h2
                className="text-3xl font-bold mb-6"
                style={{ color: colors.textWhite }}
              >
                About Us
              </h2>
              <p className="mb-4" style={{ color: colors.textLight }}>
                Welcome to E-commerce Website, your one-stop shop for the latest and greatest products. We started in 2024 with a simple mission: to provide high-quality items at unbeatable prices, backed by customer service that cares.
              </p>
              <p style={{ color: colors.textLight }}>
                Our team is passionate about finding the best deals and newest trends. We believe shopping online should be simple, fun, and secure.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Us Section */}
        <section id="contact" className="py-20">
          <div className="container mx-auto px-4 max-w-2xl text-center">
            <h2
              className="text-3xl font-bold mb-4"
              style={{ color: colors.textWhite }}
            >
              Get In Touch
            </h2>
            <p className="mb-8" style={{ color: colors.textLight }}>
              Have a question or feedback? We'd love to hear from you.
            </p>
            <form onSubmit={handleContactSubmit} className="space-y-5 text-left">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={contactForm.name}
                    onChange={handleContactChange}
                    className="w-full px-4 py-3 rounded-lg focus:outline-none transition-colors"
                    style={{
                      backgroundColor: `${colors.background}80`,
                      borderColor: `${colors.border}4D`,
                      borderWidth: '1px',
                      color: colors.textWhite
                    }}
                    onFocus={(e) => e.target.style.borderColor = colors.primary}
                    onBlur={(e) => e.target.style.borderColor = `${colors.border}4D`}
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={contactForm.email}
                    onChange={handleContactChange}
                    className="w-full px-4 py-3 rounded-lg focus:outline-none transition-colors"
                    style={{
                      backgroundColor: `${colors.background}80`,
                      borderColor: `${colors.border}4D`,
                      borderWidth: '1px',
                      color: colors.textWhite
                    }}
                    onFocus={(e) => e.target.style.borderColor = colors.primary}
                    onBlur={(e) => e.target.style.borderColor = `${colors.border}4D`}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  name="message"
                  rows="4"
                  value={contactForm.message}
                  onChange={handleContactChange}
                  className="w-full px-4 py-3 rounded-lg focus:outline-none transition-colors"
                  style={{
                    backgroundColor: `${colors.background}80`,
                    borderColor: `${colors.border}4D`,
                    borderWidth: '1px',
                    color: colors.textWhite
                  }}
                  onFocus={(e) => e.target.style.borderColor = colors.primary}
                  onBlur={(e) => e.target.style.borderColor = `${colors.border}4D`}
                  placeholder="How can we help?"
                  required
                ></textarea>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="px-8 py-3 rounded-lg font-bold text-lg transition-colors"
                  style={{
                    backgroundColor: colors.primary,
                    color: colors.textWhite
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.primaryHover}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = colors.primary}
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* Authors Section */}
        <section
          className="py-20 text-center relative overflow-hidden"
          style={{ backgroundColor: colors.cardBg }}
        >
          <div className="container mx-auto px-4">
            <h2
              className="text-3xl md:text-4xl font-bold mb-6"
              style={{ color: colors.textWhite }}
            >
              Meet Our Authors
            </h2>
            <p
              className="text-lg max-w-2xl mx-auto mb-10"
              style={{ color: colors.textLight }}
            >
              The minds behind our collections — a passionate team dedicated to creating, curating, and inspiring every product you see here.
            </p>

            <div className="flex justify-center">
              <img
                src={groupPhoto}
                alt="Authors Team"
                className="rounded-2xl shadow-lg border w-[500px]"
                style={{ borderColor: `${colors.border}80` }}
              />
            </div>
          </div>
        </section>


      </main>

      <footer
        className="py-8"
        style={{
          borderTop: `1px solid ${colors.border}4D`
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <p style={{ color: colors.textLight }}>
            © {new Date().getFullYear()} E-commerce Website. All Rights Reserved.
          </p>
        </div>
      </footer>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default IntroPage;
