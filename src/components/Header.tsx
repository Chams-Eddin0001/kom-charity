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
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${scrolled
            ? 'bg-white border-b border-gray-200 shadow-sm'
            : 'bg-white/95 border-b border-gray-100'
            }`}>
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="bg-gray-900 p-2 rounded-lg group-hover:bg-gray-800 transition-colors">
                            <Heart className="w-5 h-5 text-white" fill="currentColor" />
                        </div>
                        <span className="text-lg font-semibold text-gray-900">
                            Kommunity Foundation
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.href}
                                className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium py-1"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    {/* CTA Button */}
                    <div className="hidden md:block">
                        <Link to="/donate">
                            <Button className="bg-gray-900 hover:bg-gray-800 text-white font-medium text-sm px-5 py-2 rounded-lg shadow-sm hover:shadow-md transition-all">
                                Donate
                                <Heart className="ml-2 w-4 h-4" fill="currentColor" />
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <nav className="md:hidden mt-4 pb-4 flex flex-col gap-1 border-t border-gray-200 pt-4 animate-fade-in">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all text-sm font-medium py-2 px-3 rounded-lg"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link to="/donate" onClick={() => setMobileMenuOpen(false)}>
                            <Button className="bg-gray-900 hover:bg-gray-800 text-white font-medium w-full text-sm mt-2 py-2 rounded-lg">
                                Donate
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