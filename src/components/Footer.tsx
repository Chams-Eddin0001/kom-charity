import { ArrowRight, Mail, Facebook, Twitter, Linkedin, Instagram, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import { useAdminData } from "../hooks/useAdminData";

const Footer = () => {
    const footer = useAdminData('footer');
    const settings = useAdminData('settings');

    const socialIcons: Record<string, React.ElementType> = {
        facebook: Facebook,
        twitter: Twitter,
        linkedin: Linkedin,
        instagram: Instagram,
        youtube: Youtube
    };

    return (
        <footer className="bg-neutral-200 dark:bg-black text-neutral-800 dark:text-white pt-16 pb-8 transition-colors">
            <div className="container mx-auto px-4">
                {/* Newsletter Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-12 border-b border-neutral-300 dark:border-white/10">
                    <div className="max-w-md">
                        <h3 className="font-serif text-2xl mb-2 text-neutral-900 dark:text-white">Stay Updated</h3>
                        <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                            Follow us on social media for the latest news and updates.
                        </p>
                    </div>
                </div>

                {/* Main Footer Content */}
                <div className="grid md:grid-cols-4 gap-12 py-12">
                    {/* Brand Column */}
                    <div className="md:col-span-1">
                        <Link to="/" className="font-serif text-2xl font-bold block mb-4 text-neutral-900 dark:text-white">
                            {settings.organizationName}
                        </Link>
                        <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-6 leading-relaxed">
                            {settings.tagline}
                        </p>

                        {/* Social Links */}
                        <div className="flex gap-3">
                            {Object.entries(settings.socialLinks || {}).map(([platform, url]) => {
                                if (!url) return null;
                                const Icon = socialIcons[platform];
                                if (!Icon) return null;
                                return (
                                    <a
                                        key={platform}
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 rounded-full border border-neutral-400 dark:border-white/20 flex items-center justify-center text-neutral-700 dark:text-white hover:bg-neutral-300 dark:hover:bg-white/10 hover:border-neutral-500 dark:hover:border-white/40 transition-all"
                                        aria-label={platform}
                                    >
                                        <Icon className="w-4 h-4" />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Link Columns */}
                    {footer.map((section) => (
                        <div key={section.id}>
                            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-neutral-700 dark:text-neutral-300">
                                {section.title}
                            </h4>
                            <ul className="space-y-3">
                                {section.links.map((link, idx) => (
                                    <li key={idx}>
                                        <Link
                                            to={link.href}
                                            className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white text-sm transition-colors inline-flex items-center gap-1 group"
                                        >
                                            {link.name}
                                            <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-neutral-300 dark:border-white/10">
                    <div className="flex items-center gap-6 text-sm text-neutral-500 dark:text-neutral-500">
                        <span>© {new Date().getFullYear()} {settings.organizationName}</span>
                        <span className="hidden md:inline">•</span>
                        <a href="#" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Privacy Policy</a>
                        <span className="hidden md:inline">•</span>
                        <a href="#" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Terms of Use</a>
                    </div>

                    {/* Contact */}
                    <div className="flex items-center gap-4 text-sm">
                        <a
                            href={`mailto:${settings.contactEmail}`}
                            className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
                        >
                            <Mail className="w-4 h-4" />
                            {settings.contactEmail}
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;