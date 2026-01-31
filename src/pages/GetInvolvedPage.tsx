import { Users, Handshake, ArrowRight, Calendar, Mail } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const GetInvolvedPage = () => {
    const ways = [
        {
            icon: Users,
            title: "Volunteer With Us",
            description: "Join our team of dedicated volunteers and contribute your time and skills to causes that matter.",
            cta: "Join Our Team",
            bgColor: "bg-[#9333EA]"
        },
        {
            icon: Handshake,
            title: "Partner With Us",
            description: "Corporate partnerships and collaborations help amplify our impact. Let's work together to create lasting change.",
            cta: "Become a Partner",
            bgColor: "bg-[#FF7A52]"
        },
        {
            icon: Calendar,
            title: "Attend Our Events",
            description: "Join us at community events, workshops, and gatherings to connect with our mission and fellow supporters.",
            cta: "View Events",
            bgColor: "bg-[var(--color-text)]"
        }
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
                                Get <span className="highlight-purple">Involved</span>
                            </h1>
                            <p className="text-xl text-[var(--color-text-secondary)] leading-relaxed">
                                There are many ways you can support our mission and help create lasting change in communities around the world.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Ways to Get Involved */}
                <section className="py-16 bg-[var(--color-bg-alt)]">
                    <div className="container mx-auto px-4">
                        <div className="grid md:grid-cols-3 gap-8">
                            {ways.map((way) => {
                                const Icon = way.icon;
                                return (
                                    <div key={way.title} className="bg-[var(--color-card)] p-8 rounded-lg group hover:shadow-md transition-all">
                                        <div className={`w-16 h-16 ${way.bgColor} rounded-lg flex items-center justify-center mb-6`}>
                                            <Icon className="w-8 h-8 text-white" />
                                        </div>
                                        <h3 className="font-serif text-2xl mb-4 text-[var(--color-text)]">{way.title}</h3>
                                        <p className="text-[var(--color-text-secondary)] mb-6 leading-relaxed">{way.description}</p>
                                        <Link
                                            to="/contact"
                                            className="group inline-flex items-center gap-2 font-medium text-[var(--color-text)] hover:text-[var(--color-accent-purple)] transition-colors"
                                        >
                                            {way.cta}
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Volunteer Opportunities */}
                <section className="py-20 bg-[var(--color-bg)]">
                    <div className="container mx-auto px-4">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="font-serif text-3xl md:text-4xl mb-6 text-[var(--color-text)]">
                                    Your Time Makes a <span className="highlight-coral">Difference</span>
                                </h2>
                                <p className="text-[var(--color-text-secondary)] text-lg mb-6 leading-relaxed">
                                    Whether you can spare a few hours a week or want to commit to a longer-term project,
                                    your skills and dedication can help transform lives.
                                </p>
                                <ul className="space-y-4 mb-8">
                                    <li className="flex items-start gap-3">
                                        <span className="w-2 h-2 bg-[#9333EA] rounded-full mt-2"></span>
                                        <span className="text-[var(--color-text-secondary)]">Mentorship and tutoring programs</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="w-2 h-2 bg-[#9333EA] rounded-full mt-2"></span>
                                        <span className="text-[var(--color-text-secondary)]">Community event organization</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="w-2 h-2 bg-[#9333EA] rounded-full mt-2"></span>
                                        <span className="text-[var(--color-text-secondary)]">Technical skills workshops</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="w-2 h-2 bg-[#9333EA] rounded-full mt-2"></span>
                                        <span className="text-[var(--color-text-secondary)]">Research and documentation</span>
                                    </li>
                                </ul>
                                <Link
                                    to="/contact"
                                    className="btn-primary"
                                >
                                    Apply to Volunteer
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                            <div className="bg-[var(--color-bg-alt)] aspect-square rounded-lg"></div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 bg-[var(--color-text)] text-[var(--color-bg)]">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="font-serif text-3xl md:text-4xl mb-6">
                            Ready to Make an Impact?
                        </h2>
                        <p className="text-[var(--color-text-muted)] text-lg max-w-2xl mx-auto mb-8">
                            Get in touch with us to learn more about how you can contribute to our mission.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/contact"
                                className="btn-secondary"
                            >
                                <Mail className="w-4 h-4" />
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default GetInvolvedPage;
