import { Heart, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Programs", href: "/programs" },
        { name: "News", href: "/news" },
        { name: "Get Involved", href: "/get-involved" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
            ? 'bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-lg'
            : 'bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm'
            }`}>
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className={`bg-gradient-to-br from-gray-800 to-gray-900 p-2.5 rounded-xl transition-all duration-300 shadow-md ${scrolled ? 'group-hover:scale-110 group-hover:shadow-xl' : 'group-hover:scale-105 group-hover:shadow-lg'
                            }`}>
                            <Heart className="w-6 h-6 text-white" fill="currentColor" />
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                            Kommunity Foundation
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.href}
                                className="text-gray-700 hover:text-gray-900 transition-colors font-medium relative group py-2"
                            >
                                {link.name}
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-orange-500 transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        ))}
                    </nav>

                    {/* CTA Button */}
                    <div className="hidden md:block">
                        <Link to="/donate">
                            <Button className="bg-gray-900 hover:bg-gray-800 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 border-0 px-6 py-2.5 rounded-xl">
                                Donate Now
                                <Heart className="ml-2 w-4 h-4" fill="currentColor" />
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 text-gray-900 hover:bg-gray-100 rounded-xl transition-colors"
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <nav className="md:hidden mt-4 pb-4 flex flex-col gap-2 border-t border-gray-200 pt-4 animate-fade-in">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-all font-medium py-3 px-4 rounded-xl"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link to="/donate" onClick={() => setMobileMenuOpen(false)}>
                            <Button className="bg-gray-900 hover:bg-gray-800 text-white font-semibold w-full shadow-lg mt-2 border-0 py-3 rounded-xl">
                                Donate Now
                                <Heart className="ml-2 w-4 h-4" fill="currentColor" />
                            </Button>
                        </Link>
                    </nav>
                )}
            </div>
        </header>
    );
};

export default Header;