import { Calendar, ArrowLeft, User, ArrowRight } from "lucide-react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAdminData } from "../hooks/useAdminData";

const NewsDetailPage = () => {
    const { slug } = useParams<{ slug: string }>();
    const news = useAdminData('news');
    const article = news.find(n => n.slug === slug);

    if (!article) {
        return (
            <div className="min-h-screen">
                <Header />
                <main className="pt-28">
                    <div className="container mx-auto px-4 py-20 text-center">
                        <h1 className="font-serif text-3xl mb-4">Article Not Found</h1>
                        <p className="text-gray-600 mb-8">The article you're looking for doesn't exist.</p>
                        <Link to="/news" className="btn-primary">
                            <ArrowLeft className="w-4 h-4" />
                            Back to News
                        </Link>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    // Get related articles (same category, excluding current)
    const relatedArticles = news
        .filter(n => n.category === article.category && n.id !== article.id)
        .slice(0, 3);

    return (
        <div className="min-h-screen">
            <Header />
            <main className="pt-28">
                <article>
                    {/* Hero with Image */}
                    <section className="relative h-[40vh] md:h-[50vh] bg-gray-100">
                        {article.image ? (
                            <img
                                src={article.image}
                                alt={article.title}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-[#9333EA] to-[#FF7A52]" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                        {/* Back Link */}
                        <div className="absolute top-8 left-0 right-0">
                            <div className="container mx-auto px-4">
                                <Link to="/news" className="inline-flex items-center gap-2 text-white hover:text-gray-200 transition-colors">
                                    <ArrowLeft className="w-4 h-4" />
                                    <span className="font-medium">Back to News</span>
                                </Link>
                            </div>
                        </div>

                        {/* Title Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 pb-12">
                            <div className="container mx-auto px-4">
                                <span className="inline-block bg-white text-black px-3 py-1 rounded text-sm font-medium mb-4">
                                    {article.category}
                                </span>
                                <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white max-w-4xl">
                                    {article.title}
                                </h1>
                            </div>
                        </div>
                    </section>

                    {/* Article Meta */}
                    <section className="py-8 border-b border-gray-200">
                        <div className="container mx-auto px-4">
                            <div className="flex flex-wrap items-center gap-6 text-gray-600">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-5 h-5" />
                                    <span>{article.date}</span>
                                </div>
                                {article.author && (
                                    <div className="flex items-center gap-2">
                                        <User className="w-5 h-5" />
                                        <span>{article.author}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>

                    {/* Article Content */}
                    <section className="py-12">
                        <div className="container mx-auto px-4">
                            <div className="max-w-3xl mx-auto">
                                <p className="text-xl text-gray-600 leading-relaxed mb-8">
                                    {article.excerpt}
                                </p>
                                {article.content && (
                                    <div
                                        className="prose prose-lg max-w-none text-gray-700"
                                        dangerouslySetInnerHTML={{ __html: article.content }}
                                    />
                                )}
                            </div>
                        </div>
                    </section>

                    {/* Related Articles */}
                    {relatedArticles.length > 0 && (
                        <section className="py-16 bg-[#f7f7f7]">
                            <div className="container mx-auto px-4">
                                <h2 className="font-serif text-2xl md:text-3xl mb-8">Related Articles</h2>
                                <div className="grid md:grid-cols-3 gap-8">
                                    {relatedArticles.map((related) => (
                                        <Link
                                            key={related.id}
                                            to={`/news/${related.slug}`}
                                            className="group bg-white rounded-lg overflow-hidden hover:shadow-lg transition-all"
                                        >
                                            <div className="aspect-[4/3] relative overflow-hidden bg-gray-100">
                                                {related.image ? (
                                                    <img
                                                        src={related.image}
                                                        alt={related.title}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-gradient-to-br from-[#9333EA] to-[#FF7A52]" />
                                                )}
                                            </div>
                                            <div className="p-6">
                                                <h3 className="font-serif text-lg group-hover:text-gray-600 transition-colors">
                                                    {related.title}
                                                </h3>
                                                <span className="inline-flex items-center gap-1 text-sm text-gray-500 mt-2">
                                                    Read More
                                                    <ArrowRight className="w-3 h-3" />
                                                </span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}
                </article>
            </main>
            <Footer />
        </div>
    );
};

export default NewsDetailPage;
