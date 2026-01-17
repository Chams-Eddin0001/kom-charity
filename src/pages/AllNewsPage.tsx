import { Calendar, ArrowRight, Search } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { useState } from "react";

const AllNewsPage = () => {
    const [searchTerm, setSearchTerm] = useState("");

    // This will be fetched from the backend/admin dashboard in the future
    const allNewsItems = [
        {
            slug: "machine-learning-medical-image",
            date: "January 2025",
            title: "Machine Learning for Medical Image Analysis",
            excerpt: "New research on transformer-inspired training principles for breast cancer prediction, combining EfficientNetB0 and ResNet50 architectures.",
            category: "AI Research",
            gradient: "from-purple-400 to-purple-500"
        },
        {
            slug: "llm-education",
            date: "December 2024",
            title: "Large Language Models in Education",
            excerpt: "A comprehensive review published on LLMs: addressing issues and solutions in learning environments for improved educational outcomes.",
            category: "Education Tech",
            gradient: "from-gray-600 to-gray-700"
        },
        {
            slug: "5g-millimeter-wave",
            date: "November 2024",
            title: "5G Millimeter Wave Connectivity",
            excerpt: "New effective path loss modeling approach for 5G millimeter wave connectivity published, advancing telecommunications research.",
            category: "Telecommunications",
            gradient: "from-orange-400 to-orange-500"
        },
        {
            slug: "smart-home-iot",
            date: "October 2024",
            title: "Smart Home IoT Integration",
            excerpt: "Exploring the integration of IoT devices in smart home environments for improved energy efficiency and user experience.",
            category: "Smart Home",
            gradient: "from-purple-500 to-purple-600"
        },
        {
            slug: "visible-light-communications",
            date: "September 2024",
            title: "Visible Light Communications Advances",
            excerpt: "Research breakthrough in visible light communications technology for high-speed indoor wireless connectivity.",
            category: "Telecommunications",
            gradient: "from-orange-500 to-orange-600"
        },
        {
            slug: "renewable-energy-optimization",
            date: "August 2024",
            title: "Renewable Energy Optimization",
            excerpt: "Novel algorithms for optimizing renewable energy distribution in smart grid systems across South Africa.",
            category: "Energy",
            gradient: "from-gray-700 to-gray-800"
        }
    ];

    const filteredNews = allNewsItems.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const categories = [...new Set(allNewsItems.map(item => item.category))];

    return (
        <div className="min-h-screen">
            <Header />
            <main className="pt-20">
                <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
                    <div className="absolute top-20 left-0 w-72 h-72 bg-orange-200/20 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 right-0 w-72 h-72 bg-purple-200/20 rounded-full blur-3xl"></div>

                    <div className="container mx-auto px-4">
                        {/* Header */}
                        <div className="section-header">
                            <div className="inline-block mb-4">
                                <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-semibold">
                                    All Publications
                                </span>
                            </div>
                            <h2 className="section-title">News & Research Archive</h2>
                            <p className="section-description">
                                Browse all research publications, news, and updates from our team.
                            </p>
                        </div>

                        {/* Search and Filter */}
                        <div className="max-w-2xl mx-auto mb-12">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <Input
                                    type="text"
                                    placeholder="Search news and publications..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-12 h-14 text-lg rounded-xl border-gray-200 focus:border-gray-400"
                                />
                            </div>

                            {/* Category Tags */}
                            <div className="flex flex-wrap gap-2 mt-4 justify-center">
                                <button
                                    onClick={() => setSearchTerm("")}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${searchTerm === "" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                        }`}
                                >
                                    All
                                </button>
                                {categories.map(category => (
                                    <button
                                        key={category}
                                        onClick={() => setSearchTerm(category)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${searchTerm === category ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                            }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Results Count */}
                        <p className="text-center text-gray-600 mb-8">
                            Showing {filteredNews.length} of {allNewsItems.length} articles
                        </p>

                        {/* News Grid */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredNews.map((item, index) => (
                                <Card key={index} className="card-interactive overflow-hidden border border-gray-100">
                                    <div className="relative h-48 overflow-hidden">
                                        <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient}`}>
                                            <div className="absolute inset-0 opacity-10" style={{
                                                backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                                                backgroundSize: '20px 20px'
                                            }}></div>
                                        </div>
                                        <div className="absolute top-4 left-4 bg-white text-gray-900 px-4 py-2 rounded-full text-xs font-bold shadow-lg">
                                            {item.category}
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                                            <Calendar className="w-4 h-4" />
                                            <span className="font-medium">{item.date}</span>
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                                        <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-2">{item.excerpt}</p>
                                        <Link to={`/news/${item.slug}`} className="flex items-center gap-2 text-gray-700 font-semibold hover:text-gray-900 transition-colors text-sm">
                                            <span>Read More</span>
                                            <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </Card>
                            ))}
                        </div>

                        {filteredNews.length === 0 && (
                            <div className="text-center py-16">
                                <p className="text-gray-600 text-lg">No articles found matching "{searchTerm}"</p>
                                <button
                                    onClick={() => setSearchTerm("")}
                                    className="mt-4 text-purple-600 hover:text-purple-700 font-medium"
                                >
                                    Clear search
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
