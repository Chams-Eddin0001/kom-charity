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
        <footer className="bg-gray-900 text-white py-12">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-4 gap-10 mb-10">
                    {/* Logo & Description */}
                    <div className="md:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="bg-gray-800 p-2 rounded-lg">
                                <Heart className="w-5 h-5 text-white" fill="currentColor" />
                            </div>
                            <span className="text-lg font-semibold">Kommunity Foundation</span>
                        </div>

                        {/* Scroll to top button */}
                        <button
                            onClick={scrollToTop}
                            className="flex items-center gap-2 text-sm text-gray-400 hover:text-purple-400 transition-colors group"
                        >
                            <span>Back to top</span>
                            <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                        </button>
                    </div>

                    {/* Links */}
                    {Object.entries(footerLinks).map(([title, links]) => (
                        <div key={title}>
                            <h4 className="font-semibold mb-4 text-white">
                                {title}
                            </h4>
                            <ul className="space-y-2">
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
                <div className="border-t border-gray-800 pt-6">
                    <p className="text-sm text-gray-500 text-center md:text-left">
                        © 2025 Kommunity Foundation. Led by Prof. Khmaies Ouahada, University of Johannesburg.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;