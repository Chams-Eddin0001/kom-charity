import { Target, Eye, Award, Users, GraduationCap, ArrowRight } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Card } from "../components/ui/card";
import { Link } from "react-router-dom";
import { useAdminData } from "../hooks/useAdminData";

const AboutPage = () => {
    const about = useAdminData('about');
    const team = useAdminData('team');
    const stats = useAdminData('stats');

    const valueIcons = [Target, Eye, Award, Users];

    return (
        <div className="min-h-screen">
            <Header />
            <main className="pt-28">
                {/* Hero Section */}
                <section className="py-16 md:py-24 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl">
                            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6">
                                About <span className="highlight-purple">Us</span>
                            </h1>
                            <p className="text-xl text-gray-600 leading-relaxed">
                                {about.mission}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Mission & Vision */}
                <section className="py-16 bg-[#f7f7f7]">
                    <div className="container mx-auto px-4">
                        <div className="grid md:grid-cols-2 gap-12">
                            <div className="bg-white p-8 rounded-lg">
                                <div className="w-16 h-16 bg-[#9333EA] rounded-lg flex items-center justify-center mb-6">
                                    <Target className="w-8 h-8 text-black" />
                                </div>
                                <h2 className="font-serif text-2xl mb-4">Our Mission</h2>
                                <p className="text-gray-600 leading-relaxed">{about.mission}</p>
                            </div>
                            <div className="bg-white p-8 rounded-lg">
                                <div className="w-16 h-16 bg-[#FF7A52] rounded-lg flex items-center justify-center mb-6">
                                    <Eye className="w-8 h-8 text-white" />
                                </div>
                                <h2 className="font-serif text-2xl mb-4">Our Vision</h2>
                                <p className="text-gray-600 leading-relaxed">{about.vision}</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* History */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto text-center">
                            <h2 className="font-serif text-3xl md:text-4xl mb-6">Our History</h2>
                            <p className="text-gray-600 leading-relaxed text-lg">{about.history}</p>
                        </div>
                    </div>
                </section>

                {/* Core Values */}
                {about.values.length > 0 && (
                    <section className="py-16 bg-[#f7f7f7]">
                        <div className="container mx-auto px-4">
                            <h2 className="font-serif text-3xl md:text-4xl mb-12 text-center">Our Values</h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {about.values.map((value, idx) => {
                                    const Icon = valueIcons[idx % valueIcons.length];
                                    return (
                                        <Card key={idx} className="p-6 bg-white text-center">
                                            <div className="w-14 h-14 bg-black rounded-lg flex items-center justify-center mx-auto mb-4">
                                                <Icon className="w-7 h-7 text-white" />
                                            </div>
                                            <h3 className="font-serif text-xl mb-3">{value.title}</h3>
                                            <p className="text-gray-600 text-sm">{value.description}</p>
                                        </Card>
                                    );
                                })}
                            </div>
                        </div>
                    </section>
                )}

                {/* Team Section */}
                {team.length > 0 && (
                    <section className="py-16 bg-white">
                        <div className="container mx-auto px-4">
                            <h2 className="font-serif text-3xl md:text-4xl mb-12 text-center">Our Team</h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {team.sort((a, b) => a.order - b.order).map((member) => (
                                    <div key={member.id} className="text-center">
                                        <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden">
                                            {member.image ? (
                                                <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full bg-gradient-to-br from-[#9333EA] to-[#FF7A52] flex items-center justify-center">
                                                    <GraduationCap className="w-12 h-12 text-white" />
                                                </div>
                                            )}
                                        </div>
                                        <h3 className="font-serif text-xl mb-1">{member.name}</h3>
                                        <p className="text-[#FF7A52] font-medium text-sm mb-3">{member.role}</p>
                                        <p className="text-gray-600 text-sm">{member.bio}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Stats Section */}
                <section className="py-16 bg-black text-white">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                            {stats.sort((a, b) => a.order - b.order).map((stat) => (
                                <div key={stat.id}>
                                    <div className="font-serif text-4xl md:text-5xl font-normal mb-2">{stat.number}</div>
                                    <div className="text-gray-400 text-sm uppercase tracking-wide">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="font-serif text-3xl md:text-4xl mb-6">Want to Learn More?</h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
                            Get in touch with us to learn more about our work and how you can get involved.
                        </p>
                        <Link to="/contact" className="btn-primary">
                            Contact Us
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default AboutPage;
