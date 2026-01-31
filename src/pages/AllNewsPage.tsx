import { Calendar, ArrowRight, Search } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState } from "react";
import { useAdminData } from "../hooks/useAdminData";

const AllNewsPage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const news = useAdminData('news');

    const filteredNews = news.filter(item =>
        (item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.excerpt.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (selectedCategory === null || item.category === selectedCategory)
    );

    const categories = [...new Set(news.map(item => item.category))];

    const categoryColors: Record<string, string> = {
        Story: "bg-[#9333EA] text-white",
        Event: "bg-[#FF7A52]",
        News: "bg-[var(--color-text)] text-[var(--color-bg)]"
    };

    return (
        <div className="min-h-screen bg-[var(--color-bg)]">
            <Header />
            <main className="pt-28">
                {/* Hero Section */}
                <section className="py-16 md:py-24 bg-[var(--color-bg)]">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl">
                            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6 text-[var(--color-text)]">
                                News & <span className="highlight-purple">Events</span>
                            </h1>
                            <p className="text-xl text-[var(--color-text-secondary)] leading-relaxed">
                                Stay updated with our latest news, research publications, and upcoming events.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Filter Section */}
                <section className="py-8 bg-[var(--color-bg-alt)] border-b border-[var(--color-border)]">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
                            {/* Search */}
                            <div className="relative w-full md:w-96">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-muted)]" />
                                <input
                                    type="text"
                                    placeholder="Search news..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 border border-[var(--color-border)] rounded-lg bg-[var(--color-bg)] text-[var(--color-text)] focus:outline-none focus:border-[var(--color-text)]"
                                />
                            </div>

                            {/* Category Filters */}
                            <div className="flex flex-wrap gap-2">
                                <button
                                    onClick={() => setSelectedCategory(null)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === null
                                        ? "bg-[var(--color-text)] text-[var(--color-bg)]"
                                        : "bg-[var(--color-card)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg)]"
                                        }`}
                                >
                                    All
                                </button>
                                {categories.map(category => (
                                    <button
                                        key={category}
                                        onClick={() => setSelectedCategory(category)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === category
                                            ? "bg-[var(--color-text)] text-[var(--color-bg)]"
                                            : "bg-[var(--color-card)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg)]"
                                            }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* News Grid */}
                <section className="py-16 bg-[var(--color-bg-alt)]">
                    <div className="container mx-auto px-4">
                        <p className="text-[var(--color-text-muted)] mb-8">
                            Showing {filteredNews.length} of {news.length} articles
                        </p>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredNews.map((item) => (
                                <Link
                                    key={item.id}
                                    to={`/news/${item.slug}`}
                                    className="group bg-[var(--color-card)] rounded-lg overflow-hidden hover:shadow-lg transition-all"
                                >
                                    <div className="aspect-[4/3] relative overflow-hidden bg-[var(--color-bg-alt)]">
                                        {item.image ? (
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-[#9333EA] to-[#FF7A52]" />
                                        )}
                                        <span className={`${categoryColors[item.category] || 'bg-gray-800 text-white'} text-xs font-medium px-3 py-1 absolute top-4 left-4 rounded`}>
                                            {item.category}
                                        </span>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] mb-3">
                                            <Calendar className="w-4 h-4" />
                                            <span>{item.date}</span>
                                        </div>
                                        <h3 className="font-serif text-xl mb-2 text-[var(--color-text)] group-hover:text-[var(--color-accent-purple)] transition-colors">
                                            {item.title}
                                        </h3>
                                        <p className="text-[var(--color-text-secondary)] text-sm line-clamp-2 mb-4">
                                            {item.excerpt}
                                        </p>
                                        <span className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-text)] group-hover:text-[var(--color-accent-purple)]">
                                            Read More
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {filteredNews.length === 0 && (
                            <div className="text-center py-16">
                                <p className="text-[var(--color-text-secondary)] text-lg">No articles found matching your criteria.</p>
                                <button
                                    onClick={() => { setSearchTerm(""); setSelectedCategory(null); }}
                                    className="mt-4 text-[var(--color-text)] hover:text-[var(--color-accent-purple)] font-medium underline"
                                >
                                    Clear filters
                                </button>
                            </div>
                        )}
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default AllNewsPage;
