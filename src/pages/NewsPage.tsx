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
        <div className="min-h-screen bg-[var(--color-bg)]">
            <Header />
            <main className="pt-20">
                <section className="py-16 md:py-20 bg-[var(--color-bg)]">
                    <div className="container mx-auto px-4">
                        <div className="section-header">
                            <span className="inline-block bg-[var(--color-bg-alt)] text-[var(--color-text-secondary)] px-4 py-1.5 rounded-full text-sm font-medium mb-4">
                                Research Updates
                            </span>
                            <h1 className="section-title text-[var(--color-text)]">News & Publications</h1>
                            <p className="section-description text-[var(--color-text-secondary)]">
                                Stay informed about the latest research publications and achievements from Professor Khmaies Ouahada's team.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6 mb-12">
                            {newsItems.map((item, index) => (
                                <Card key={index} className="overflow-hidden border border-[var(--color-border)] bg-[var(--color-card)] rounded-xl shadow-sm hover:shadow-md transition-all group">
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <div className="absolute top-3 left-3 bg-[var(--color-bg)] text-[var(--color-text-secondary)] px-3 py-1 rounded-full text-xs font-medium shadow-sm">
                                            {item.category}
                                        </div>
                                    </div>
                                    <div className="p-5">
                                        <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] mb-3">
                                            <Calendar className="w-4 h-4" />
                                            <span>{item.date}</span>
                                        </div>
                                        <h3 className="text-lg font-semibold text-[var(--color-text)] mb-2">{item.title}</h3>
                                        <p className="text-[var(--color-text-secondary)] text-sm mb-4 leading-relaxed">{item.excerpt}</p>
                                        <Link to={`/news/${item.slug}`} className="inline-flex items-center gap-1 text-[var(--color-text)] font-medium text-sm hover:text-[var(--color-accent-purple)] transition-colors group">
                                            Read More
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </Card>
                            ))}
                        </div>

                        <div className="text-center">
                            <Link to="/all-news">
                                <Button variant="outline" className="border border-[var(--color-border)] text-[var(--color-text)] hover:bg-[var(--color-bg-alt)] font-medium px-6 py-2 rounded-lg">
                                    View All News
                                    <ArrowRight className="ml-2 w-4 h-4" />
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
