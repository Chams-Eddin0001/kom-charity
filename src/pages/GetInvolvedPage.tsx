import { Heart, Users, Handshake, ArrowRight, Sparkles } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";

const GetInvolvedPage = () => {
    const ways = [
        {
            icon: Heart,
            title: "Make a Donation",
            description: "Your financial support helps us expand our programs and reach more communities in need.",
            cta: "Donate Now",
            gradient: "from-orange-500 to-orange-600",
            bgLight: "from-orange-50 to-orange-100"
        },
        {
            icon: Users,
            title: "Volunteer With Us",
            description: "Join our team of dedicated volunteers and contribute your time and skills to causes that matter.",
            cta: "Join Us",
            gradient: "from-gray-700 to-gray-800",
            bgLight: "from-gray-50 to-gray-100"
        },
        {
            icon: Handshake,
            title: "Partner With Us",
            description: "Corporate partnerships and collaborations help amplify our impact. Let's work together.",
            cta: "Become a Partner",
            gradient: "from-purple-500 to-purple-600",
            bgLight: "from-purple-50 to-purple-100"
        }
    ];

    return (
        <div className="min-h-screen">
            <Header />
            <main className="pt-20">
                <section className="py-20 md:py-28 bg-white relative overflow-hidden">
                    <div className="absolute top-10 right-10 w-96 h-96 bg-purple-100/30 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 left-10 w-96 h-96 bg-orange-100/30 rounded-full blur-3xl"></div>

                    <div className="container mx-auto px-4">
                        <div className="section-header">
                            <div className="inline-block mb-4">
                                <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 w-fit mx-auto">
                                    <Sparkles className="w-4 h-4" />
                                    Join Our Mission
                                </span>
                            </div>
                            <h2 className="section-title">Get Involved</h2>
                            <p className="section-description">
                                There are many ways you can support our mission and help create lasting change.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8 mb-20">
                            {ways.map((way) => {
                                const Icon = way.icon;
                                return (
                                    <Card key={way.title} className="card-elevated text-center group border border-gray-100 relative overflow-hidden">
                                        <div className={`absolute inset-0 bg-gradient-to-br ${way.bgLight} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                                        <div className="relative z-10">
                                            <div className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${way.gradient} flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform shadow-xl`}>
                                                <Icon className="w-12 h-12 text-white" />
                                            </div>
                                            <h3 className="text-2xl font-bold text-gray-900 mb-4">{way.title}</h3>
                                            <p className="text-gray-600 mb-8 leading-relaxed">{way.description}</p>
                                            <Button className={`bg-gradient-to-r ${way.gradient} text-white font-semibold w-full py-6 rounded-xl border-0`}>
                                                {way.cta}
                                                <ArrowRight className="ml-2 w-5 h-5" />
                                            </Button>
                                        </div>
                                    </Card>
                                );
                            })}
                        </div>

                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-900 rounded-3xl blur-2xl opacity-20"></div>
                            <div className="relative bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 rounded-3xl p-10 md:p-16 text-center text-white shadow-2xl overflow-hidden">
                                <div className="relative z-10">
                                    <Sparkles className="w-12 h-12 mx-auto mb-6 animate-pulse" />
                                    <h3 className="text-3xl md:text-4xl font-bold mb-6">Your Support Creates Real Impact</h3>
                                    <p className="text-xl mb-10 max-w-3xl mx-auto text-gray-300">
                                        Every donation, every volunteer hour, and every partnership helps us transform lives.
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                        <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 font-semibold py-6 px-8 rounded-xl border-0">
                                            Start Making a Difference
                                            <Heart className="ml-2 w-5 h-5" fill="currentColor" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default GetInvolvedPage;
