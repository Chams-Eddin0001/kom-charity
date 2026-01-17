import { Target, Eye, Award, Users, GraduationCap } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Card } from "../components/ui/card";

const AboutPage = () => {
    const values = [
        {
            icon: Target,
            title: "Our Mission",
            description: "To empower communities through sustainable development, technology innovation, and engineering education that creates lasting positive change.",
            color: "purple"
        },
        {
            icon: Eye,
            title: "Our Vision",
            description: "Contributing to South Africa's economic development by nurturing highly skilled engineers and advancing smart communication technologies.",
            color: "orange"
        },
        {
            icon: Award,
            title: "Our Values",
            description: "Integrity, ethical values, compassion, and innovation guide our work as we support students and drive meaningful technological advancement.",
            color: "purple"
        },
        {
            icon: Users,
            title: "Our Approach",
            description: "Collaborative learning, mentorship, and international partnerships to create opportunities for growth and development.",
            color: "orange"
        }
    ];

    return (
        <div className="min-h-screen">
            <Header />
            <main className="pt-20">
                <section className="py-20 bg-gradient-to-b from-white to-gray-50">
                    <div className="container mx-auto px-4">
                        {/* Header */}
                        <div className="section-header">
                            <h2 className="section-title">About Us</h2>
                            <p className="section-description">
                                Kommunity Foundation is led by Professor Khmaies Ouahada, a distinguished academic and researcher
                                dedicated to empowering communities through education, technology, and sustainable development.
                            </p>
                        </div>

                        {/* Founder Section */}
                        <div className="mb-16 bg-white rounded-3xl p-8 md:p-12 shadow-lg border border-gray-100">
                            <div className="flex flex-col lg:flex-row gap-8 items-start">
                                <div className="flex-shrink-0">
                                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-500 to-orange-500 flex items-center justify-center shadow-lg">
                                        <GraduationCap className="w-12 h-12 text-white" />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Prof. Khmaies Ouahada</h3>
                                    <p className="text-purple-600 font-semibold mb-4">Founder & Chairman</p>
                                    <p className="text-gray-600 leading-relaxed mb-4">
                                        Professor Khmaies Ouahada is a Full Professor in the Department of Electrical and Electronic Engineering Science
                                        at the University of Johannesburg. He served as Head of Department from 2018 to 2021 and was awarded the
                                        Vice-Chancellor's Teaching and Learning Excellence Award in 2016.
                                    </p>
                                    <p className="text-gray-600 leading-relaxed mb-4">
                                        His research expertise spans Artificial Intelligence, Telecommunications, Power-Line Communications, Visible Light Communications,
                                        Smart Home technologies, Smart Grid, Smart Cities, and Renewable Energy. He is Chairman of the Smart Home Lab
                                        and co-founder of the Centre for Smart Communications Systems.
                                    </p>
                                    <div className="flex flex-wrap gap-3">
                                        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">DEng</span>
                                        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">MIng</span>
                                        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">BScEng</span>
                                        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">NRF-C3 Rated</span>
                                        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">IEEE Senior Member</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Values Grid */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {values.map((value) => {
                                const Icon = value.icon;
                                const isPurple = value.color === "purple";
                                return (
                                    <Card key={value.title} className="card-elevated text-center border border-gray-100 group">
                                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300 ${isPurple
                                            ? 'bg-gradient-to-br from-purple-100 to-purple-200'
                                            : 'bg-gradient-to-br from-orange-100 to-orange-200'
                                            }`}>
                                            <Icon className={`w-8 h-8 ${isPurple ? 'text-purple-600' : 'text-orange-500'}`} />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                                        <p className="text-gray-600 leading-relaxed text-sm">{value.description}</p>
                                    </Card>
                                );
                            })}
                        </div>

                        {/* Stats Section */}
                        <div className="mt-16 bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-8 md:p-12 shadow-2xl">
                            <div className="grid md:grid-cols-4 gap-8 text-center text-white">
                                <div>
                                    <div className="text-4xl md:text-5xl font-bold mb-2">184+</div>
                                    <div className="text-gray-300 text-sm">Research Publications</div>
                                </div>
                                <div>
                                    <div className="text-4xl md:text-5xl font-bold mb-2">2000+</div>
                                    <div className="text-gray-300 text-sm">Citations</div>
                                </div>
                                <div>
                                    <div className="text-4xl md:text-5xl font-bold mb-2">19+</div>
                                    <div className="text-gray-300 text-sm">Students Supervised</div>
                                </div>
                                <div>
                                    <div className="text-4xl md:text-5xl font-bold mb-2">15+</div>
                                    <div className="text-gray-300 text-sm">Years of Excellence</div>
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

export default AboutPage;
