import { ArrowRight, Heart } from "lucide-react";
import heroImage from "@/assets/hero-charity.jpg";
import { Button } from "./ui/button";

const Hero = () => {
    return (
        <section id="home" className="pt-28 pb-16 md:pt-36 md:pb-24 bg-gradient-to-b from-gray-50 to-white">
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Content */}
                    <div className="text-center lg:text-left space-y-6 animate-fade-in">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium">
                            <Heart className="w-4 h-4 text-purple-500" fill="currentColor" />
                            <span>Empowering Through Innovation</span>
                        </div>

                        {/* Heading */}
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                            Engineering a Brighter{" "}
                            <span className="text-gradient-accent">Future</span>
                        </h1>

                        {/* Description */}
                        <p className="text-lg md:text-xl text-gray-600 max-w-xl leading-relaxed">
                            Led by Professor Khmaies Ouahada, we're advancing smart technologies, nurturing future engineers, and creating sustainable solutions for communities.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
                            <Button
                                size="lg"
                                className="bg-gray-900 hover:bg-gray-800 text-white font-medium px-6 py-3 text-sm rounded-lg shadow-md hover:shadow-lg transition-all group"
                            >
                                Get Involved
                                <Heart className="ml-2 w-4 h-4 group-hover:scale-105 transition-transform" fill="currentColor" />
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium px-6 py-3 text-sm rounded-lg"
                            >
                                Learn More
                                <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
                            <div className="text-center lg:text-left">
                                <div className="text-3xl md:text-4xl font-bold text-gray-900">
                                    2000+
                                </div>
                                <div className="text-sm text-gray-500 mt-1">Citations</div>
                            </div>
                            <div className="text-center lg:text-left">
                                <div className="text-3xl md:text-4xl font-bold text-gray-900">
                                    184+
                                </div>
                                <div className="text-sm text-gray-500 mt-1">Publications</div>
                            </div>
                            <div className="text-center lg:text-left">
                                <div className="text-3xl md:text-4xl font-bold text-gray-900">
                                    15+
                                </div>
                                <div className="text-sm text-gray-500 mt-1">Years Experience</div>
                            </div>
                        </div>
                    </div>

                    {/* Image */}
                    <div className="relative animate-fade-in">
                        <div className="rounded-xl overflow-hidden shadow-lg">
                            <img
                                src={heroImage}
                                alt="Community support and charitable giving"
                                className="w-full h-auto object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;