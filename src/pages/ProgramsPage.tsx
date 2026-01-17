import { GraduationCap, HeartPulse, Home, Droplets, ArrowRight, TrendingUp } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";

const ProgramsPage = () => {
    const programs = [
        {
            icon: GraduationCap,
            title: "Education & Literacy",
            description: "Building schools, providing scholarships, and ensuring quality education for children in underserved communities.",
            stats: "15,000+ students supported",
            gradient: "from-purple-500 to-purple-600",
            bgGradient: "from-purple-50 to-purple-100"
        },
        {
            icon: HeartPulse,
            title: "Healthcare Access",
            description: "Mobile clinics, medical supplies, and health awareness programs bringing care to remote areas.",
            stats: "30,000+ patients treated annually",
            gradient: "from-orange-500 to-orange-600",
            bgGradient: "from-orange-50 to-orange-100"
        },
        {
            icon: Home,
            title: "Housing & Shelter",
            description: "Safe housing initiatives and emergency shelter for families affected by crisis and displacement.",
            stats: "5,000+ homes built",
            gradient: "from-gray-700 to-gray-800",
            bgGradient: "from-gray-50 to-gray-100"
        },
        {
            icon: Droplets,
            title: "Clean Water Projects",
            description: "Installing water wells, purification systems, and sanitation facilities in water-scarce regions.",
            stats: "200+ wells established",
            gradient: "from-purple-600 to-orange-500",
            bgGradient: "from-purple-50 to-orange-50"
        }
    ];

    return (
        <div className="min-h-screen">
            <Header />
            <main className="pt-20">
                <section className="py-20 md:py-28 bg-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-purple-100/30 rounded-full blur-3xl -z-10"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-100/30 rounded-full blur-3xl -z-10"></div>

                    <div className="container mx-auto px-4">
                        <div className="section-header">
                            <div className="inline-block mb-4">
                                <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-semibold">
                                    What We Do
                                </span>
                            </div>
                            <h2 className="section-title">Our Programs & Projects</h2>
                            <p className="section-description">
                                We focus on sustainable, community-driven initiatives that create lasting impact across multiple sectors.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 mb-16">
                            {programs.map((program, index) => {
                                const Icon = program.icon;
                                return (
                                    <Card
                                        key={program.title}
                                        className="card-elevated border border-gray-100 hover:border-transparent group relative overflow-hidden"
                                        style={{ animationDelay: `${index * 100}ms` }}
                                    >
                                        <div className={`absolute inset-0 bg-gradient-to-br ${program.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`}></div>
                                        <div className="relative z-10">
                                            <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${program.gradient} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                                                <Icon className="w-10 h-10 text-white" />
                                            </div>
                                            <h3 className="text-2xl font-bold text-gray-900 mb-4">{program.title}</h3>
                                            <p className="text-gray-600 mb-6 leading-relaxed">{program.description}</p>
                                            <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                                                <div className="flex items-center gap-2">
                                                    <TrendingUp className="w-5 h-5 text-green-600" />
                                                    <span className="text-sm font-semibold text-green-600">{program.stats}</span>
                                                </div>
                                                <ArrowRight className="w-6 h-6 text-gray-400 group-hover:text-gray-900 group-hover:translate-x-2 transition-all duration-300" />
                                            </div>
                                        </div>
                                    </Card>
                                );
                            })}
                        </div>

                        <div className="text-center">
                            <Button size="lg" variant="outline" className="border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white font-semibold px-8 py-6 rounded-xl">
                                View All Programs
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

export default ProgramsPage;
