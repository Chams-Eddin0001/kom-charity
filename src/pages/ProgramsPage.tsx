import { ArrowRight } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { useAdminData } from "../hooks/useAdminData";

const ProgramsPage = () => {
    const programs = useAdminData('programs');

    const colors = [
        { bg: "bg-[#9333EA]", text: "text-white" },
        { bg: "bg-[#FF7A52]", text: "text-white" },
        { bg: "bg-[var(--color-text)]", text: "text-[var(--color-bg)]" },
        { bg: "bg-gray-700", text: "text-white" },
    ];

    return (
        <div className="min-h-screen bg-[var(--color-bg)]">
            <Header />
            <main className="pt-28">
                {/* Hero Section */}
                <section className="py-16 md:py-24 bg-[var(--color-bg)]">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl">
                            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6 text-[var(--color-text)]">
                                Our <span className="highlight-coral">Programs</span>
                            </h1>
                            <p className="text-xl text-[var(--color-text-secondary)] leading-relaxed">
                                We work across key areas to create lasting, sustainable impact in communities.
                                Explore our focus areas and initiatives below.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Programs Grid */}
                <section className="py-16 bg-[var(--color-bg-alt)]">
                    <div className="container mx-auto px-4">
                        <div className="grid md:grid-cols-2 gap-8">
                            {programs.sort((a, b) => a.order - b.order).map((program, idx) => {
                                const color = colors[idx % colors.length];
                                return (
                                    <div
                                        key={program.id}
                                        className="bg-[var(--color-card)] rounded-lg overflow-hidden group hover:shadow-lg transition-all"
                                    >
                                        <div className={`${color.bg} p-8`}>
                                            <h2 className={`font-serif text-2xl md:text-3xl ${color.text}`}>
                                                {program.name}
                                            </h2>
                                        </div>
                                        <div className="p-8">
                                            <p className="text-[var(--color-text-secondary)] leading-relaxed mb-6">
                                                {program.description}
                                            </p>
                                            <Link
                                                to="/contact"
                                                className="group inline-flex items-center gap-2 font-medium text-[var(--color-text)] hover:text-[var(--color-accent-purple)] transition-colors"
                                            >
                                                Learn More
                                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </Link>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 bg-[var(--color-text)] text-[var(--color-bg)]">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="font-serif text-3xl md:text-4xl mb-6">
                            Want to Get Involved?
                        </h2>
                        <p className="text-[var(--color-text-muted)] text-lg max-w-2xl mx-auto mb-8">
                            Join us in our mission to create lasting positive change. There are many ways to contribute.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/get-involved" className="btn-secondary">
                                Get Involved
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                            <Link to="/contact" className="btn-primary bg-[var(--color-bg)] text-[var(--color-text)] hover:opacity-90">
                                Contact Us
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default ProgramsPage;
