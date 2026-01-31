import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useAdminData } from "../hooks/useAdminData";

const Hero = () => {
    const hero = useAdminData('hero');
    const stats = useAdminData('stats');
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    // Split headline into words for animation
    const words = hero.headline.split(' ');

    // Check if a word should be highlighted
    const getWordClass = (word: string) => {
        const cleanWord = word.replace(/[^a-zA-Z]/g, '').toLowerCase();

        for (const hw of hero.highlightWords) {
            const highlightWords = hw.text.toLowerCase().split(' ');
            if (highlightWords.includes(cleanWord)) {
                return hw.type === 'mint' ? 'highlight-purple' : 'highlight-coral';
            }
        }
        return '';
    };

    return (
        <section className="relative min-h-screen flex items-center bg-[var(--color-bg)]">
            {/* Background Pattern */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 -right-20 w-96 h-96 bg-[var(--color-accent-purple)] opacity-5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-[var(--color-accent-coral)] opacity-5 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 pt-24 pb-16 relative z-10">
                <div className="max-w-4xl">
                    {/* Animated Headline */}
                    <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight mb-8">
                        {words.map((word, index) => {
                            const highlightClass = getWordClass(word);
                            return (
                                <span
                                    key={index}
                                    className={`inline-block mr-[0.3em] ${isLoaded ? 'animate-word-reveal' : 'opacity-0'} ${highlightClass}`}
                                    style={{ animationDelay: `${index * 50}ms` }}
                                >
                                    {word}
                                </span>
                            );
                        })}
                    </h1>

                    {/* Interest Selector */}
                    <div className={`mb-12 ${isLoaded ? 'animate-fade-in-up delay-500' : 'opacity-0'}`}>
                        <p className="text-[var(--color-text-muted)] text-lg mb-4">I'm interested in</p>
                        <div className="flex flex-wrap gap-3">
                            {hero.interestOptions.map((option, index) => (
                                <Link
                                    key={option.value}
                                    to={`/${option.value}`}
                                    className="group px-5 py-2.5 border border-[var(--color-border)] rounded-full text-sm font-medium text-[var(--color-text-secondary)] hover:border-[var(--color-accent-purple)] hover:text-[var(--color-accent-purple)] hover:bg-[var(--color-accent-purple)]/5 transition-all duration-300"
                                    style={{ animationDelay: `${600 + index * 100}ms` }}
                                >
                                    {option.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className={`flex flex-wrap gap-6 ${isLoaded ? 'animate-fade-in-up delay-700' : 'opacity-0'}`}>
                        {hero.quickLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.href}
                                className="group inline-flex items-center gap-2 text-[var(--color-text)] font-medium hover:text-[var(--color-accent-purple)] transition-colors"
                            >
                                {link.name}
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Stats Section */}
                <div className={`mt-20 pt-12 border-t border-[var(--color-border)] ${isLoaded ? 'animate-fade-in-up delay-800' : 'opacity-0'}`}>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.sort((a, b) => a.order - b.order).map((stat, index) => (
                            <div
                                key={stat.id}
                                className="text-center md:text-left"
                                style={{ animationDelay: `${900 + index * 100}ms` }}
                            >
                                <div className="font-serif text-3xl md:text-4xl lg:text-5xl text-[var(--color-text)] mb-2">
                                    {stat.number}
                                </div>
                                <div className="text-[var(--color-text-muted)] text-sm">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
                <div className="w-6 h-10 border-2 border-[var(--color-border)] rounded-full flex justify-center pt-2">
                    <div className="w-1.5 h-3 bg-[var(--color-text-muted)] rounded-full animate-pulse" />
                </div>
            </div>
        </section>
    );
};

export default Hero;