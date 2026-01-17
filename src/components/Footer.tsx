import { Heart, ArrowUp } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
    const linkRoutes: Record<string, string> = {
        "About Us": "/about",
        "Programs": "/programs",
        "News": "/news",
        "Contact": "/contact",
        "Donate": "/donate",
        "Volunteer": "/volunteer",
        "Partner With Us": "/partner",
        "Fundraise": "/fundraise",
        "Annual Reports": "/annual-reports",
        "Impact Stories": "/impact-stories",
        "FAQs": "/faqs",
        "Privacy Policy": "/privacy-policy"
    };

    const footerLinks = {
        "Quick Links": ["About Us", "Programs", "News", "Contact"],
        "Get Involved": ["Donate", "Volunteer", "Partner With Us", "Fundraise"],
        "Resources": ["Annual Reports", "Impact Stories", "FAQs", "Privacy Policy"]
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16 relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5" style={{
                backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                backgroundSize: '40px 40px'
            }}></div>

            {/* Decorative gradient orbs */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                    {/* Logo & Description */}
                    <div className="md:col-span-1">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-gradient-to-br from-gray-700 to-gray-800 p-3 rounded-xl shadow-lg">
                                <Heart className="w-7 h-7 text-white" fill="currentColor" />
                            </div>
                            <span className="text-xl font-bold">Kommunity Foundation</span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            Led by Professor Khmaies Ouahada, advancing smart technologies and engineering education at the University of Johannesburg.
                        </p>
                        {/* Scroll to top button */}
                        <button
                            onClick={scrollToTop}
                            className="flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 transition-colors group"
                        >
                            <span>Back to top</span>
                            <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
                        </button>
                    </div>

                    {/* Links */}
                    {Object.entries(footerLinks).map(([title, links]) => (
                        <div key={title}>
                            <h4 className="font-bold mb-6 text-white text-lg">
                                {title}
                            </h4>
                            <ul className="space-y-3">
                                {links.map((link) => (
                                    <li key={link}>
                                        <Link
                                            to={linkRoutes[link] || "#"}
                                            className="text-gray-400 hover:text-white transition-colors text-sm"
                                        >
                                            {link}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-gray-400 text-center md:text-left">
                            © 2025 Kommunity Foundation. Led by Prof. Khmaies Ouahada, University of Johannesburg.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;