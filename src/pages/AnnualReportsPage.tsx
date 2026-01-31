import { FileText, Download, TrendingUp, Users, BookOpen, Award, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";

const AnnualReportsPage = () => {
    const reports = [
        {
            year: "2024",
            title: "Annual Report 2024",
            description: "A year of remarkable growth in education support, technology innovation, and community empowerment. Highlights include expanded scholarship programs and new smart technology initiatives.",
            highlights: [
                "15 new scholarships awarded",
                "3 community tech labs established",
                "Smart Home Lab expansion completed"
            ],
            featured: true
        },
        {
            year: "2023",
            title: "Annual Report 2023",
            description: "Focused on sustainable development and renewable energy education, contributing to South Africa's economic growth through skilled engineering graduates.",
            highlights: [
                "12 scholarships awarded",
                "International research partnerships",
                "Renewable energy training programs"
            ],
            featured: false
        },
        {
            year: "2022",
            title: "Annual Report 2022",
            description: "Foundation year establishing key initiatives in telecommunications education and community outreach programs across Johannesburg.",
            highlights: [
                "Foundation officially registered",
                "First cohort of beneficiaries",
                "Smart Cities research launched"
            ],
            featured: false
        }
    ];

    const impactStats = [
        { icon: Users, value: "19+", label: "Students Supervised", color: "purple" },
        { icon: BookOpen, value: "186+", label: "Research Publications", color: "orange" },
        { icon: Award, value: "2100+", label: "Citations", color: "purple" },
        { icon: TrendingUp, value: "23", label: "H-Index", color: "orange" }
    ];

    return (
        <div className="min-h-screen bg-[var(--color-bg)]">
            <Header />
            <main className="pt-20">
                <section className="py-16 md:py-20 bg-[var(--color-bg)]">
                    <div className="container mx-auto px-4">
                        <div className="section-header">
                            <span className="inline-block bg-[var(--color-bg-alt)] text-[var(--color-text-secondary)] px-4 py-1.5 rounded-full text-sm font-medium mb-4">
                                Transparency & Accountability
                            </span>
                            <h1 className="section-title text-[var(--color-text)]">Annual Reports</h1>
                            <p className="section-description text-[var(--color-text-secondary)]">
                                Review our journey, achievements, and financial stewardship. We believe in complete transparency
                                with our donors and community partners.
                            </p>
                        </div>

                        {/* Featured Report */}
                        {reports.filter(r => r.featured).map((report) => (
                            <Card key={report.year} className="mb-10 border border-[var(--color-border)] rounded-xl shadow-sm bg-[var(--color-card)]">
                                <div className="p-6 md:p-8">
                                    <div className="flex flex-col md:flex-row gap-6 items-start">
                                        <div className="flex-shrink-0">
                                            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-orange-500 flex items-center justify-center shadow-md">
                                                <FileText className="w-8 h-8 text-white" />
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <span className="inline-block bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full text-xs font-medium mb-3">
                                                Latest Report
                                            </span>
                                            <h2 className="text-2xl font-bold text-[var(--color-text)] mb-2">{report.title}</h2>
                                            <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4">{report.description}</p>
                                            <div className="flex flex-wrap gap-2 mb-5">
                                                {report.highlights.map((highlight, idx) => (
                                                    <span key={idx} className="bg-[var(--color-bg-alt)] text-[var(--color-text-secondary)] px-3 py-1 rounded-full text-sm">
                                                        ✓ {highlight}
                                                    </span>
                                                ))}
                                            </div>
                                            <Button className="bg-[var(--color-text)] hover:opacity-90 text-[var(--color-bg)] font-medium px-5 py-2 rounded-lg shadow-sm hover:shadow-md transition-all">
                                                <Download className="w-4 h-4 mr-2" />
                                                Download PDF
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))}

                        {/* Previous Reports */}
                        <h3 className="text-xl font-bold text-[var(--color-text)] mb-6">Previous Reports</h3>
                        <div className="grid md:grid-cols-2 gap-6 mb-12">
                            {reports.filter(r => !r.featured).map((report) => (
                                <Card key={report.year} className="border border-[var(--color-border)] bg-[var(--color-card)] rounded-xl shadow-sm hover:shadow-md transition-all p-5">
                                    <div className="flex items-start gap-4 mb-3">
                                        <div className="w-12 h-12 rounded-xl bg-[var(--color-bg-alt)] flex items-center justify-center flex-shrink-0">
                                            <FileText className="w-6 h-6 text-[var(--color-text-muted)]" />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-semibold text-[var(--color-text)]">{report.title}</h4>
                                            <span className="text-sm text-[var(--color-text-muted)]">{report.year} Fiscal Year</span>
                                        </div>
                                    </div>
                                    <p className="text-[var(--color-text-secondary)] text-sm mb-4 leading-relaxed">{report.description}</p>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {report.highlights.slice(0, 2).map((highlight, idx) => (
                                            <span key={idx} className="bg-[var(--color-bg-alt)] text-[var(--color-text-muted)] px-2 py-1 rounded text-xs">
                                                {highlight}
                                            </span>
                                        ))}
                                    </div>
                                    <Button variant="outline" className="border border-[var(--color-border)] text-[var(--color-text)] hover:bg-[var(--color-bg-alt)] font-medium text-sm rounded-lg">
                                        <Download className="w-4 h-4 mr-2" />
                                        Download
                                    </Button>
                                </Card>
                            ))}
                        </div>

                        {/* Impact Stats */}
                        <div className="bg-[var(--color-text)] rounded-xl p-6 md:p-10 shadow-lg">
                            <h3 className="text-xl font-bold text-[var(--color-bg)] text-center mb-8">Cumulative Impact</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                                {impactStats.map((stat, index) => {
                                    const Icon = stat.icon;
                                    return (
                                        <div key={index}>
                                            <div className={`w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center ${stat.color === "purple" ? "bg-purple-500/20" : "bg-orange-500/20"
                                                }`}>
                                                <Icon className={`w-6 h-6 ${stat.color === "purple" ? "text-purple-400" : "text-orange-400"
                                                    }`} />
                                            </div>
                                            <div className="text-3xl md:text-4xl font-bold text-[var(--color-bg)] mb-1">{stat.value}</div>
                                            <div className="text-[var(--color-text-muted)] text-sm">{stat.label}</div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="mt-12 text-center">
                            <p className="text-[var(--color-text-secondary)] mb-4">Have questions about our reports or want to learn more?</p>
                            <Link to="/contact">
                                <Button variant="outline" className="border border-[var(--color-border)] text-[var(--color-text)] hover:bg-[var(--color-bg-alt)] font-medium px-6 py-2 rounded-lg">
                                    Contact Us
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

export default AnnualReportsPage;
