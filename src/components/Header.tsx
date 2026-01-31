import { Menu, X, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAdminData } from "../hooks/useAdminData";
import { useTheme } from "../context/ThemeContext";

const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const navigation = useAdminData('navigation');
    const settings = useAdminData('settings');
    const location = useLocation();
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location]);

    return (
        <>
            <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-black ${scrolled
                ? 'header-blur header-scrolled py-3'
                : 'bg-transparent py-5'
                }`}>
                <div className="container mx-auto px-4">
                    <nav className="flex items-center justify-between">
                        {/* Logo */}
                        <Link
                            to="/"
                            className="flex items-center gap-2 group"
                        >
                            <span className="font-serif text-xl md:text-2xl font-bold text-[var(--color-text)] group-hover:text-[var(--color-accent-purple)] transition-colors">
                                {settings.organizationName}
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-8">
                            {navigation.sort((a, b) => a.order - b.order).map(item => (
                                <Link
                                    key={item.id}
                                    to={item.href}
                                    className={`link-hover text-sm font-medium transition-colors ${location.pathname === item.href
                                        ? 'text-[var(--color-accent-purple)]'
                                        : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text)]'
                                        }`}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>

                        {/* Right Side Actions */}
                        <div className="flex items-center gap-4">
                            {/* Theme Toggle */}
                            <button
                                onClick={toggleTheme}
                                className="theme-toggle"
                                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                            >
                                {theme === 'light' ? (
                                    <Moon className="w-5 h-5 text-[var(--color-text-secondary)] hover:text-[var(--color-text)]" />
                                ) : (
                                    <Sun className="w-5 h-5 text-[var(--color-text-secondary)] hover:text-[var(--color-text)]" />
                                )}
                            </button>

                            {/* Mobile Menu Button */}
                            <button
                                className="md:hidden p-2 -mr-2"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                aria-label="Toggle menu"
                            >
                                {mobileMenuOpen ? (
                                    <X className="w-6 h-6 text-[var(--color-text)]" />
                                ) : (
                                    <Menu className="w-6 h-6 text-[var(--color-text)]" />
                                )}
                            </button>
                        </div>
                    </nav>
                </div>
            </header>

            {/* Full-Screen Mobile Menu */}
            <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
                <div className="flex flex-col h-full pt-24 px-6">
                    <nav className="flex flex-col gap-1">
                        {navigation.sort((a, b) => a.order - b.order).map((item, index) => (
                            <Link
                                key={item.id}
                                to={item.href}
                                className={`py-4 text-2xl font-serif border-b border-[var(--color-border)] animate-fade-in-up`}
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    <div className="mt-auto pb-8">
                        <p className="text-[var(--color-text-muted)] text-sm">
                            {settings.contactEmail}
                        </p>
                    </div>
                </div>
            </div>

            {/* Scroll Progress Indicator */}
            <ScrollProgress />
        </>
    );
};

// Scroll Progress Component
const ScrollProgress = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const updateProgress = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            setProgress(scrollPercent);
        };

        window.addEventListener('scroll', updateProgress);
        return () => window.removeEventListener('scroll', updateProgress);
    }, []);

    return (
        <div
            className="scroll-indicator"
            style={{ width: `${progress}%` }}
        />
    );
};

export default Header;