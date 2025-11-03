import React, { useContext, useState } from 'react';
import { ShoppingCart, User, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { logout } = useContext(AuthContext);

    // Define colors from your palette
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
        { name: 'Home', path: '/home' },
        { name: 'My Orders', path: '/my-orders' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ];

    const handleLogout = () => {
        console.log('User logged out');
        logout();
        navigate('/');
    };

    // Styles for nav links
    const linkStyle = `transition-colors ${isMobileMenuOpen ? 'block w-full text-left px-5 py-3 rounded-lg' : 'px-3 py-2'}`;
    const linkHoverStyle = `hover:bg-[${colors.cardBg}] lg:hover:bg-transparent lg:hover:text-[${colors.primary}]`;

    // Combined styles for applying with style attribute for colors
    const linkBaseStyle = { color: colors.textLight };
    const linkHoverEnter = (e) => {
        if (!isMobileMenuOpen) {
            e.currentTarget.style.color = colors.primary;
        } else {
            e.currentTarget.style.backgroundColor = colors.cardBg;
        }
    };
    const linkHoverLeave = (e) => {
        if (!isMobileMenuOpen) {
            e.currentTarget.style.color = colors.textLight;
        } else {
            e.currentTarget.style.backgroundColor = 'transparent';
        }
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
                            onClick={() => navigate("/cart")}
                        >
                            <ShoppingCart className="w-6 h-6" />
                        </button>

                        {/* Auth Buttons (Desktop) */}
                        <div className="hidden lg:flex items-center space-x-4">
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
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.cardBg}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                            >
                                {link.name}
                            </a>
                        ))}

                        {/* Mobile Auth Buttons */}
                        <div className="border-t" style={{ borderColor: `${colors.border}4D` }}></div>

                        <>
                            <button
                                onClick={() => { navigate('/profile'); setIsMobileMenuOpen(false); }}
                                className="w-full text-left px-4 py-3 rounded-lg font-medium"
                                style={linkBaseStyle}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.cardBg}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                            >
                                Profile
                            </button>
                            <button
                                onClick={handleLogout}
                                className="w-full text-left px-4 py-3 rounded-lg font-medium"
                                style={{ color: colors.primary }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.cardBg}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                            >
                                Logout
                            </button>
                        </>

                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;

