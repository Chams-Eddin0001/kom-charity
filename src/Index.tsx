import Header from "./components/Header";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useAdminData } from "./hooks/useAdminData";
import { useEffect, useRef, useState } from "react";

// Scroll Animation Hook
const useScrollAnimation = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(element);
                }
            },
            { threshold: 0.1, rootMargin: '50px' }
        );

        observer.observe(element);
        return () => observer.unobserve(element);
    }, []);

    return { ref, isVisible };
};

// Latest News Section
const LatestNews = () => {
    const news = useAdminData('news');
    const featuredNews = news.filter(n => n.featured).slice(0, 3);
    const displayNews = featuredNews.length > 0 ? featuredNews : news.slice(0, 3);
    const { ref, isVisible } = useScrollAnimation();

    const categoryColors: Record<string, string> = {
        Story: "bg-[var(--color-accent-purple)] text-white",
        Event: "bg-[var(--color-accent-coral)] text-white",
        News: "bg-[var(--color-text)] text-[var(--color-bg)]"
    };

    return (
        <section ref={ref} className="py-20 bg-[var(--color-bg)]">
            <div className="container mx-auto px-4">
                <div className={`flex justify-between items-end mb-12 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
                    <h2 className="font-serif text-3xl md:text-4xl text-[var(--color-text)]">Latest News</h2>
                    <Link
                        to="/news"
                        className="group flex items-center gap-2 text-[var(--color-text)] hover:text-[var(--color-accent-purple)] transition-colors"
                    >
                        <span className="font-medium">View All</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {displayNews.map((item, index) => (
                        <Link
                            key={item.id}
                            to={`/news/${item.slug}`}
                            className={`group block card-hover ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div className="bg-[var(--color-bg-alt)] aspect-[4/3] rounded-lg mb-4 overflow-hidden relative">
                                {item.image && (
                                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                )}
                                <span className={`${categoryColors[item.category] || 'bg-[var(--color-text-secondary)] text-white'} text-xs font-medium px-3 py-1 absolute top-4 left-4 rounded`}>
                                    {item.category}
                                </span>
                            </div>
                            <h3 className="font-serif text-xl mb-2 text-[var(--color-text)] group-hover:text-[var(--color-accent-purple)] transition-colors">
                                {item.title}
                            </h3>
                            <p className="text-[var(--color-text-secondary)] text-sm">
                                {item.excerpt}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

// Programs Overview Section
const ProgramsOverview = () => {
    const programs = useAdminData('programs');
    const { ref, isVisible } = useScrollAnimation();

    return (
        <section ref={ref} className="py-20 bg-[var(--color-bg-alt)]">
            <div className="container mx-auto px-4">
                <div className={`max-w-3xl mb-12 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
                    <h2 className="font-serif text-3xl md:text-4xl mb-4 text-[var(--color-text)]">
                        Our Focus Areas
                    </h2>
                    <p className="text-[var(--color-text-secondary)] text-lg">
                        We work across key areas to create lasting, sustainable impact in communities.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {programs.sort((a, b) => a.order - b.order).map((program, index) => (
                        <Link
                            key={program.id}
                            to="/programs"
                            className={`group bg-[var(--color-card)] p-6 rounded-lg card-hover ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <h3 className="font-serif text-xl mb-2 text-[var(--color-text)] group-hover:text-[var(--color-accent-purple)] transition-colors">
                                {program.name}
                            </h3>
                            <p className="text-[var(--color-text-secondary)] text-sm mb-4">
                                {program.description}
                            </p>
                            <ArrowRight className="w-5 h-5 text-[var(--color-text-muted)] group-hover:text-[var(--color-accent-purple)] group-hover:translate-x-1 transition-all" />
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

// Partners Section
const PartnersSection = () => {
    const partners = useAdminData('partners');
    const { ref, isVisible } = useScrollAnimation();

    if (partners.length === 0) return null;

    return (
        <section ref={ref} className="py-16 bg-[var(--color-bg)] border-t border-[var(--color-border)]">
            <div className="container mx-auto px-4">
                <h2 className={`font-serif text-2xl text-center mb-10 text-[var(--color-text)] ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
                    Our Partners
                </h2>
                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
                    {partners.sort((a, b) => a.order - b.order).map((partner, index) => (
                        <a
                            key={partner.id}
                            href={partner.website || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            {partner.logo ? (
                                <img src={partner.logo} alt={partner.name} className="h-12 w-auto" />
                            ) : (
                                <span className="text-[var(--color-text-muted)] font-medium">{partner.name}</span>
                            )}
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

// Call to Action Section
const CTASection = () => {
    const { ref, isVisible } = useScrollAnimation();

    return (
        <section ref={ref} className="py-20 bg-neutral-200 dark:bg-black transition-colors">
            <div className="container mx-auto px-4 text-center">
                <h2 className={`font-serif text-3xl md:text-4xl mb-6 text-neutral-900 dark:text-white ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
                    Join Us in Making a Difference
                </h2>
                <p className={`text-neutral-600 dark:text-neutral-400 text-lg max-w-2xl mx-auto mb-8 ${isVisible ? 'animate-fade-in-up delay-100' : 'opacity-0'}`}>
                    Whether you're looking to volunteer, partner, or learn more about our work,
                    we'd love to hear from you.
                </p>
                <div className={`flex flex-col sm:flex-row gap-4 justify-center ${isVisible ? 'animate-fade-in-up delay-200' : 'opacity-0'}`}>
                    <Link
                        to="/get-involved"
                        className="inline-flex items-center gap-2 px-6 py-3 border border-neutral-400 dark:border-white/30 text-neutral-800 dark:text-white rounded-lg font-medium hover:bg-neutral-300 dark:hover:bg-white/10 transition-all"
                    >
                        Get Involved
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 dark:bg-white text-white dark:text-black rounded-lg font-medium hover:bg-neutral-800 dark:hover:bg-white/90 transition-all"
                    >
                        Contact Us
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

const Index = () => {
    return (
        <div className="min-h-screen bg-[var(--color-bg)]">
            <Header />
            <main>
                <Hero />
                <LatestNews />
                <ProgramsOverview />
                <PartnersSection />
                <CTASection />
            </main>
            <Footer />
        </div>
    );
};

export default Index;
