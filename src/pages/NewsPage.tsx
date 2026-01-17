import { Calendar, ArrowRight } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";

const NewsPage = () => {
    const newsItems = [
        {
            date: "March 15, 2025",
            title: "New School Opens in Rural Community",
            excerpt: "We're proud to announce the opening of our 50th school, bringing quality education to 800 children in a previously underserved region.",
            category: "Education",
            gradient: "from-purple-400 to-purple-500"
        },
        {
            date: "March 8, 2025",
            title: "Clean Water Initiative Reaches 10,000 Families",
            excerpt: "Our water purification project has successfully provided clean drinking water to over 10,000 families across five countries.",
            category: "Water & Sanitation",
            gradient: "from-gray-600 to-gray-700"
        },
        {
            date: "February 28, 2025",
            title: "Healthcare Drive Provides Free Checkups",
            excerpt: "Our mobile clinic initiative completed a successful month-long campaign, serving 3,000 patients with free medical consultations.",
            category: "Healthcare",
            gradient: "from-orange-400 to-orange-500"
        }
    ];

    return (
        <div className="min-h-screen">
            <Header />
            <main className="pt-20">
                <section className="py-20 md:py-28 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
                    <div className="absolute top-20 left-0 w-72 h-72 bg-orange-200/20 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 right-0 w-72 h-72 bg-purple-200/20 rounded-full blur-3xl"></div>

                    <div className="container mx-auto px-4">
                        <div className="section-header">
                            <div className="inline-block mb-4">
                                <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-semibold">
                                    Latest Updates
                                </span>
                            </div>
                            <h2 className="section-title">News & Updates</h2>
                            <p className="section-description">
                                Stay informed about our latest projects, success stories, and the impact we're making together.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8 mb-16">
                            {newsItems.map((item, index) => (
                                <Card key={index} className="card-interactive overflow-hidden border border-gray-100">
                                    <div className="relative h-56 overflow-hidden">
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
                                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                                            <Calendar className="w-4 h-4" />
                                            <span className="font-medium">{item.date}</span>
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                                        <p className="text-gray-600 mb-6 leading-relaxed">{item.excerpt}</p>
                                        <div className="flex items-center gap-2 text-gray-700 font-semibold cursor-pointer">
                                            <span>Read More</span>
                                            <ArrowRight className="w-5 h-5" />
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>

                        <div className="text-center">
                            <Button size="lg" variant="outline" className="border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white font-semibold px-8 py-6 rounded-xl">
                                View All News
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default NewsPage;
