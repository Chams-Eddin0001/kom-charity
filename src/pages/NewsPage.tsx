import { Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import newsAiMedical from "@/assets/news-ai-medical.png";
import newsLlmEducation from "@/assets/news-llm-education.png";
import news5gTelecom from "@/assets/news-5g-telecom.png";

const NewsPage = () => {
    const newsItems = [
        {
            slug: "machine-learning-medical-image",
            date: "January 2025",
            title: "Machine Learning for Medical Image Analysis",
            excerpt: "New research on transformer-inspired training principles for breast cancer prediction, combining EfficientNetB0 and ResNet50 architectures.",
            category: "AI Research",
            image: newsAiMedical
        },
        {
            slug: "llm-education",
            date: "December 2024",
            title: "Large Language Models in Education",
            excerpt: "A comprehensive review published on LLMs: addressing issues and solutions in learning environments for improved educational outcomes.",
            category: "Education Tech",
            image: newsLlmEducation
        },
        {
            slug: "5g-millimeter-wave",
            date: "November 2024",
            title: "5G Millimeter Wave Connectivity",
            excerpt: "New effective path loss modeling approach for 5G millimeter wave connectivity published, advancing telecommunications research.",
            category: "Telecommunications",
            image: news5gTelecom
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
                                    Research Updates
                                </span>
                            </div>
                            <h2 className="section-title">News & Publications</h2>
                            <p className="section-description">
                                Stay informed about the latest research publications, breakthroughs, and academic achievements from Professor Khmaies Ouahada's team.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8 mb-16">
                            {newsItems.map((item, index) => (
                                <Card key={index} className="card-interactive overflow-hidden border border-gray-100">
                                    <div className="relative h-56 overflow-hidden">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
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
                                        <Link to={`/news/${item.slug}`} className="flex items-center gap-2 text-gray-700 font-semibold hover:text-gray-900 transition-colors">
                                            <span>Read More</span>
                                            <ArrowRight className="w-5 h-5" />
                                        </Link>
                                    </div>
                                </Card>
                            ))}
                        </div>

                        <div className="text-center">
                            <Link to="/all-news">
                                <Button size="lg" variant="outline" className="border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white font-semibold px-8 py-6 rounded-xl">
                                    View All News
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default NewsPage;
