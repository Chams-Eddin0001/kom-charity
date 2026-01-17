import { ArrowRight, Heart, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-charity.jpg";
import { Button } from "./ui/button";

const Hero = () => {
    return (
        <section id="home" className="relative pt-24 pb-12 md:pt-32 md:pb-20 overflow-hidden">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 -z-10" />

            {/* Animated Decorative Blobs */}
            <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-purple-400/10 rounded-full blur-3xl animate-pulse -z-10"></div>
            <div className="absolute bottom-20 left-0 w-[500px] h-[500px] bg-orange-400/10 rounded-full blur-3xl animate-pulse -z-10" style={{ animationDelay: '1s' }}></div>

            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Content */}
                    <div className="text-center lg:text-left space-y-8 animate-fade-in">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 px-5 py-2.5 rounded-full text-sm font-semibold shadow-sm border border-gray-200/50">
                            <Heart className="w-4 h-4 text-purple-600" fill="currentColor" />
                            <span>Empowering Through Innovation</span>
                            <Sparkles className="w-4 h-4 text-orange-500" />
                        </div>

                        {/* Heading */}
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-[1.1]">
                            Engineering a
                            <br />
                            Brighter{" "}
                            <span className="text-gradient-accent">Future</span>
                        </h1>

                        {/* Description */}
                        <p className="text-xl md:text-2xl text-gray-600 max-w-2xl leading-relaxed">
                            Led by Professor Khmaies Ouahada, we're advancing smart technologies, nurturing future engineers, and creating sustainable solutions for communities.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                            <Button
                                size="lg"
                                className="bg-gray-900 hover:bg-gray-800 text-white font-semibold px-8 py-6 text-lg shadow-lg hover:shadow-xl group transition-all duration-300 rounded-xl"
                            >
                                Get Involved
                                <Heart className="ml-2 w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" />
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white font-semibold px-8 py-6 text-lg shadow-md group transition-all duration-300 rounded-xl"
                            >
                                Learn More
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
                            <div className="text-center lg:text-left">
                                <div className="text-4xl md:text-5xl font-bold text-gray-900">
                                    2000+
                                </div>
                                <div className="text-sm md:text-base text-gray-600 mt-1 font-medium">Citations</div>
                            </div>
                            <div className="text-center lg:text-left">
                                <div className="text-4xl md:text-5xl font-bold text-gray-900">
                                    184+
                                </div>
                                <div className="text-sm md:text-base text-gray-600 mt-1 font-medium">Publications</div>
                            </div>
                            <div className="text-center lg:text-left">
                                <div className="text-4xl md:text-5xl font-bold text-gray-900">
                                    15+
                                </div>
                                <div className="text-sm md:text-base text-gray-600 mt-1 font-medium">Years Experience</div>
                            </div>
                        </div>
                    </div>

                    {/* Image */}
                    <div className="relative animate-scale-in">
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] transition-shadow duration-500">
                            <img
                                src={heroImage}
                                alt="Community support and charitable giving"
                                className="w-full h-auto object-cover"
                            />
                            {/* Overlay gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        </div>
                        {/* Floating decorative elements */}
                        <div className="absolute -bottom-8 -right-8 w-72 h-72 bg-gradient-to-br from-purple-400/20 to-purple-600/20 rounded-full blur-3xl -z-10 opacity-60" />
                        <div className="absolute -top-8 -left-8 w-72 h-72 bg-gradient-to-br from-orange-400/20 to-orange-600/20 rounded-full blur-3xl -z-10 opacity-60" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;