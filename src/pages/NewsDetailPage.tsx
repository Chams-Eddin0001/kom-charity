import { Calendar, ArrowLeft, User, BookOpen } from "lucide-react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";

const newsData: Record<string, {
    date: string;
    title: string;
    category: string;
    content: string[];
    author: string;
}> = {
    "machine-learning-medical-image": {
        date: "January 2025",
        title: "Machine Learning for Medical Image Analysis",
        category: "AI Research",
        author: "Prof. Khmaies Ouahada",
        content: [
            "Our research team has published groundbreaking work on transformer-inspired training principles for breast cancer prediction, combining EfficientNetB0 and ResNet50 architectures to achieve improved diagnostic accuracy.",
            "This research addresses one of healthcare's most critical challenges: early and accurate detection of breast cancer. By leveraging advanced deep learning architectures, we've developed a model that can analyze medical images with unprecedented precision.",
            "The study combines the efficiency of EfficientNetB0 with the robust feature extraction capabilities of ResNet50, creating a hybrid approach that outperforms traditional single-architecture models.",
            "Key findings include improved sensitivity in detecting early-stage tumors and reduced false-positive rates, which could significantly impact clinical workflows and patient outcomes.",
            "This work is part of our ongoing commitment to applying artificial intelligence for healthcare improvement, particularly in developing nations where access to specialist radiologists may be limited."
        ]
    },
    "llm-education": {
        date: "December 2024",
        title: "Large Language Models in Education",
        category: "Education Tech",
        author: "Prof. Khmaies Ouahada",
        content: [
            "A comprehensive review has been published examining the issues and solutions surrounding Large Language Models (LLMs) in learning environments, providing valuable insights for educators and institutions.",
            "As LLMs like ChatGPT become increasingly prevalent in educational settings, understanding their impact, limitations, and best practices for integration becomes crucial for effective teaching and learning.",
            "Our review addresses key challenges including academic integrity concerns, the potential for misinformation, and the need for critical thinking skills when interacting with AI-generated content.",
            "We propose practical solutions and frameworks for educators to harness the benefits of LLMs while mitigating risks, including assessment redesign strategies and AI literacy curricula.",
            "The paper also explores how LLMs can be leveraged to personalize learning experiences, provide instant feedback, and support students with diverse learning needs.",
            "This research aligns with our broader mission of advancing engineering education through innovative pedagogical methods and emerging technologies."
        ]
    },
    "5g-millimeter-wave": {
        date: "November 2024",
        title: "5G Millimeter Wave Connectivity",
        category: "Telecommunications",
        author: "Prof. Khmaies Ouahada",
        content: [
            "Our latest publication presents an effective path loss modeling approach for 5G millimeter wave connectivity, advancing the field of next-generation telecommunications.",
            "As 5G networks continue to roll out globally, understanding and accurately predicting signal propagation in the millimeter wave spectrum is essential for network planning and optimization.",
            "The research introduces novel mathematical models that account for various environmental factors affecting mmWave signals, including atmospheric conditions, building materials, and urban density.",
            "Our approach provides more accurate predictions than existing models, enabling network operators to optimize base station placement and improve coverage in challenging environments.",
            "The findings have significant implications for smart city development, where reliable high-speed connectivity is fundamental to IoT applications, autonomous vehicles, and other emerging technologies.",
            "This work represents Professor Ouahada's continued leadership in telecommunications research, contributing to South Africa's position in the global 5G ecosystem."
        ]
    }
};

const NewsDetailPage = () => {
    const { slug } = useParams<{ slug: string }>();
    const article = slug ? newsData[slug] : null;

    if (!article) {
        return (
            <div className="min-h-screen">
                <Header />
                <main className="pt-20">
                    <div className="container mx-auto px-4 py-20 text-center">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">Article Not Found</h1>
                        <p className="text-gray-600 mb-8">The article you're looking for doesn't exist.</p>
                        <Link to="/news">
                            <Button className="bg-gray-900 hover:bg-gray-800 text-white">
                                <ArrowLeft className="mr-2 w-4 h-4" />
                                Back to News
                            </Button>
                        </Link>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            <Header />
            <main className="pt-20">
                <article className="py-16 md:py-24">
                    <div className="container mx-auto px-4">
                        {/* Back Link */}
                        <Link to="/news" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors">
                            <ArrowLeft className="w-4 h-4" />
                            <span className="font-medium">Back to News</span>
                        </Link>

                        {/* Article Header */}
                        <div className="max-w-3xl mx-auto">
                            <div className="mb-6">
                                <span className="bg-purple-100 text-purple-700 px-4 py-1.5 rounded-full text-sm font-semibold">
                                    {article.category}
                                </span>
                            </div>

                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                                {article.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-12 pb-8 border-b border-gray-200">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-5 h-5" />
                                    <span>{article.date}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <User className="w-5 h-5" />
                                    <span>{article.author}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <BookOpen className="w-5 h-5" />
                                    <span>{article.content.length} min read</span>
                                </div>
                            </div>

                            {/* Article Content */}
                            <div className="prose prose-lg max-w-none">
                                {article.content.map((paragraph, index) => (
                                    <p key={index} className="text-gray-700 leading-relaxed mb-6 text-lg">
                                        {paragraph}
                                    </p>
                                ))}
                            </div>

                            {/* Author Card */}
                            <div className="mt-12 p-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl">
                                <div className="flex items-start gap-6">
                                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                                        <User className="w-8 h-8 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">{article.author}</h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            Full Professor in Electrical and Electronic Engineering Science at the University of Johannesburg.
                                            Expert in AI, Telecommunications, and Smart Technologies with over 184 publications.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
            </main>
            <Footer />
        </div>
    );
};

export default NewsDetailPage;
