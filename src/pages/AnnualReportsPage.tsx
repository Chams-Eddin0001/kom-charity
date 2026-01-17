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
        { icon: BookOpen, value: "184+", label: "Research Publications", color: "orange" },
        { icon: Award, value: "2000+", label: "Citations", color: "purple" },
        { icon: TrendingUp, value: "15+", label: "Years of Excellence", color: "orange" }
    ];

    return (
        <div className="min-h-screen">
            <Header />
            <main className="pt-20">
                {/* Hero Section */}
                <section className="py-20 md:py-28 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
                    <div className="absolute top-20 left-0 w-72 h-72 bg-purple-200/20 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 right-0 w-72 h-72 bg-orange-200/20 rounded-full blur-3xl"></div>

                    <div className="container mx-auto px-4">
                        <div className="section-header">
                            <div className="inline-block mb-4">
                                <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-semibold">
                                    Transparency & Accountability
                                </span>
                            </div>
                            <h2 className="section-title">Annual Reports</h2>
                            <p className="section-description">
                                Review our journey, achievements, and financial stewardship. We believe in complete transparency
                                with our donors and community partners.
                            </p>
                        </div>

                        {/* Featured Report */}
                        {reports.filter(r => r.featured).map((report) => (
                            <Card key={report.year} className="mb-12 overflow-hidden border border-gray-100 bg-gradient-to-br from-white to-gray-50">
                                <div className="p-8 md:p-12">
                                    <div className="flex flex-col lg:flex-row gap-8 items-start">
                                        <div className="flex-shrink-0">
                                            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-500 to-orange-500 flex items-center justify-center shadow-lg">
                                                <FileText className="w-12 h-12 text-white" />
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <span className="inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold mb-3">
                                                Latest Report
                                            </span>
                                            <h3 className="text-3xl font-bold text-gray-900 mb-2">{report.title}</h3>
                                            <p className="text-gray-600 leading-relaxed mb-6">{report.description}</p>
                                            <div className="flex flex-wrap gap-2 mb-6">
                                                {report.highlights.map((highlight, idx) => (
                                                    <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                                                        ✓ {highlight}
                                                    </span>
                                                ))}
                                            </div>
                                            <Button className="bg-gray-900 hover:bg-gray-800 text-white font-semibold px-6 py-3 rounded-xl shadow-lg">
                                                <Download className="w-5 h-5 mr-2" />
                                                Download PDF
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))}

                        {/* Previous Reports Grid */}
                        <h3 className="text-2xl font-bold text-gray-900 mb-8">Previous Reports</h3>
                        <div className="grid md:grid-cols-2 gap-8 mb-16">
                            {reports.filter(r => !r.featured).map((report) => (
                                <Card key={report.year} className="card-interactive border border-gray-100">
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                                            <FileText className="w-7 h-7 text-gray-600" />
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold text-gray-900">{report.title}</h4>
                                            <span className="text-sm text-gray-500">{report.year} Fiscal Year</span>
                                        </div>
                                    </div>
                                    <p className="text-gray-600 mb-4 leading-relaxed">{report.description}</p>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {report.highlights.slice(0, 2).map((highlight, idx) => (
                                            <span key={idx} className="bg-gray-50 text-gray-600 px-2 py-1 rounded text-xs">
                                                {highlight}
                                            </span>
                                        ))}
                                    </div>
                                    <Button variant="outline" className="border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white font-semibold rounded-xl">
                                        <Download className="w-4 h-4 mr-2" />
                                        Download
                                    </Button>
                                </Card>
                            ))}
                        </div>

                        {/* Impact Stats */}
                        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-8 md:p-12 shadow-2xl">
                            <h3 className="text-2xl font-bold text-white text-center mb-8">Cumulative Impact</h3>
                            <div className="grid md:grid-cols-4 gap-8 text-center">
                                {impactStats.map((stat, index) => {
                                    const Icon = stat.icon;
                                    return (
                                        <div key={index}>
                                            <div className={`w-14 h-14 rounded-xl mx-auto mb-4 flex items-center justify-center ${stat.color === "purple"
                                                ? "bg-purple-500/20"
                                                : "bg-orange-500/20"
                                                }`}>
                                                <Icon className={`w-7 h-7 ${stat.color === "purple"
                                                    ? "text-purple-400"
                                                    : "text-orange-400"
                                                    }`} />
                                            </div>
                                            <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</div>
                                            <div className="text-gray-300 text-sm">{stat.label}</div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* CTA Section */}
                        <div className="mt-16 text-center">
                            <p className="text-gray-600 mb-6">Have questions about our reports or want to learn more about our programs?</p>
                            <Link to="/contact">
                                <Button size="lg" variant="outline" className="border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white font-semibold px-8 py-6 rounded-xl">
                                    Contact Us
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

export default AnnualReportsPage;
