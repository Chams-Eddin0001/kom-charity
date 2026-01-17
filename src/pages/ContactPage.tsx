import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Send } from "lucide-react";
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useToast } from "../hooks/use-toast";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";

const ContactPage = () => {
    const { toast } = useToast();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: "Message Sent!",
            description: "Thank you for reaching out. We'll get back to you soon.",
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
    };

    const contactInfo = [
        { icon: Mail, title: "Email Us", detail: "kouahada@uj.ac.za", gradient: "from-purple-500 to-purple-600", bgLight: "bg-purple-50" },
        { icon: Phone, title: "Call Us", detail: "+27 11 559 3864", gradient: "from-gray-700 to-gray-800", bgLight: "bg-gray-50" },
        { icon: MapPin, title: "Visit Us", detail: "University of Johannesburg, Auckland Park Campus, South Africa", gradient: "from-orange-500 to-orange-600", bgLight: "bg-orange-50" }
    ];

    const socialLinks = [
        { icon: Facebook, href: "#", label: "Facebook", color: "hover:bg-blue-600" },
        { icon: Twitter, href: "#", label: "Twitter", color: "hover:bg-sky-500" },
        { icon: Instagram, href: "#", label: "Instagram", color: "hover:bg-pink-600" },
        { icon: Linkedin, href: "#", label: "LinkedIn", color: "hover:bg-blue-700" }
    ];

    return (
        <div className="min-h-screen">
            <Header />
            <main className="pt-20">
                <section className="py-20 md:py-28 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl"></div>

                    <div className="container mx-auto px-4">
                        <div className="section-header">
                            <div className="inline-block mb-4">
                                <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-semibold">
                                    Contact Us
                                </span>
                            </div>
                            <h2 className="section-title">Get In Touch</h2>
                            <p className="section-description">
                                Have questions or want to learn more about our work? We'd love to hear from you.
                            </p>
                        </div>

                        <div className="grid lg:grid-cols-3 gap-8">
                            <div className="space-y-6">
                                {contactInfo.map((info) => {
                                    const Icon = info.icon;
                                    return (
                                        <Card key={info.title} className="card-elevated border border-gray-100 group relative overflow-hidden">
                                            <div className={`absolute inset-0 ${info.bgLight} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                                            <div className="relative z-10">
                                                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${info.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-md`}>
                                                    <Icon className="w-7 h-7 text-white" />
                                                </div>
                                                <h3 className="font-bold text-gray-900 mb-2 text-lg">{info.title}</h3>
                                                <p className="text-gray-600 text-sm">{info.detail}</p>
                                            </div>
                                        </Card>
                                    );
                                })}

                                <Card className="card-elevated border border-gray-100">
                                    <h3 className="font-bold text-gray-900 mb-4 text-lg">Follow Us</h3>
                                    <div className="flex gap-3">
                                        {socialLinks.map((social) => {
                                            const Icon = social.icon;
                                            return (
                                                <a key={social.label} href={social.href} className={`w-12 h-12 rounded-xl bg-gray-100 text-gray-700 hover:text-white flex items-center justify-center transition-all ${social.color} hover:scale-110`}>
                                                    <Icon className="w-5 h-5" />
                                                </a>
                                            );
                                        })}
                                    </div>
                                </Card>
                            </div>

                            <Card className="lg:col-span-2 p-8 md:p-10 card-elevated border border-gray-100">
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">Send us a message</h3>
                                <p className="text-gray-600 mb-8">Fill out the form below and we'll get back to you soon.</p>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">Your Name *</label>
                                            <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="John Doe" required className="input-field h-12" />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">Email Address *</label>
                                            <Input id="email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="john@example.com" required className="input-field h-12" />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="subject" className="block text-sm font-semibold text-gray-900 mb-2">Subject *</label>
                                        <Input id="subject" value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} placeholder="How can we help?" required className="input-field h-12" />
                                    </div>
                                    <div>
                                        <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2">Message *</label>
                                        <Textarea id="message" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="Tell us more..." rows={6} required className="textarea-field" />
                                    </div>
                                    <Button type="submit" size="lg" className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-6 rounded-xl border-0">
                                        Send Message
                                        <Send className="ml-2 w-5 h-5" />
                                    </Button>
                                </form>
                            </Card>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default ContactPage;
