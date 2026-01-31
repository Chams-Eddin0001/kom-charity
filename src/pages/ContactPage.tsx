import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useToast } from "../hooks/use-toast";
import { useAdminData } from "../hooks/useAdminData";
import { supabase } from "../lib/supabase";

const ContactPage = () => {
    const { toast } = useToast();
    const settings = useAdminData('settings');
    const contact = useAdminData('contact');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!contact.formEnabled || isSubmitting) return;

        setIsSubmitting(true);

        try {
            const { error } = await supabase
                .from('contact_messages')
                .insert({
                    name: formData.name,
                    email: formData.email,
                    subject: formData.subject,
                    message: formData.message,
                    created_at: new Date().toISOString()
                });

            if (error) {
                toast({
                    title: "Error",
                    description: "Failed to send message. Please try again.",
                    variant: "destructive"
                });
            } else {
                toast({
                    title: "Message Sent!",
                    description: "Thank you for reaching out. We'll get back to you soon.",
                });
                setFormData({ name: "", email: "", subject: "", message: "" });
            }
        } catch {
            toast({
                title: "Error",
                description: "Failed to send message. Please try again.",
                variant: "destructive"
            });
        }

        setIsSubmitting(false);
    };

    return (
        <div className="min-h-screen">
            <Header />
            <main className="pt-28">
                {/* Hero Section */}
                <section className="py-16 md:py-24 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl">
                            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6">
                                Get In <span className="highlight-purple">Touch</span>
                            </h1>
                            <p className="text-xl text-gray-600 leading-relaxed">
                                Have questions or want to learn more about our work? We'd love to hear from you.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Contact Content */}
                <section className="py-16 bg-[#f7f7f7]">
                    <div className="container mx-auto px-4">
                        <div className="grid lg:grid-cols-3 gap-8">
                            {/* Contact Info Column */}
                            <div className="space-y-6">
                                {/* Email */}
                                <div className="bg-white p-6 rounded-lg">
                                    <div className="w-14 h-14 bg-[#9333EA] rounded-lg flex items-center justify-center mb-4">
                                        <Mail className="w-7 h-7 text-black" />
                                    </div>
                                    <h3 className="font-serif text-lg mb-2">Email Us</h3>
                                    <a href={`mailto:${settings.contactEmail}`} className="text-gray-600 hover:text-black transition-colors">
                                        {settings.contactEmail}
                                    </a>
                                </div>

                                {/* Phone */}
                                <div className="bg-white p-6 rounded-lg">
                                    <div className="w-14 h-14 bg-[#FF7A52] rounded-lg flex items-center justify-center mb-4">
                                        <Phone className="w-7 h-7 text-white" />
                                    </div>
                                    <h3 className="font-serif text-lg mb-2">Call Us</h3>
                                    <a href={`tel:${settings.contactPhone}`} className="text-gray-600 hover:text-black transition-colors">
                                        {settings.contactPhone}
                                    </a>
                                </div>

                                {/* Address */}
                                <div className="bg-white p-6 rounded-lg">
                                    <div className="w-14 h-14 bg-black rounded-lg flex items-center justify-center mb-4">
                                        <MapPin className="w-7 h-7 text-white" />
                                    </div>
                                    <h3 className="font-serif text-lg mb-2">Visit Us</h3>
                                    <p className="text-gray-600">{settings.address}</p>
                                    {contact.officeHours && (
                                        <p className="text-gray-500 text-sm mt-2">{contact.officeHours}</p>
                                    )}
                                </div>

                                {/* Departments */}
                                {contact.departments.length > 1 && (
                                    <div className="bg-white p-6 rounded-lg">
                                        <h3 className="font-serif text-lg mb-4">Departments</h3>
                                        <div className="space-y-3">
                                            {contact.departments.map((dept, idx) => (
                                                <div key={idx} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                                                    <p className="font-medium text-sm">{dept.name}</p>
                                                    <a href={`mailto:${dept.email}`} className="text-gray-500 text-sm hover:text-black">
                                                        {dept.email}
                                                    </a>
                                                    {dept.phone && (
                                                        <p className="text-gray-500 text-sm">{dept.phone}</p>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Contact Form */}
                            <div className="lg:col-span-2 bg-white p-8 rounded-lg">
                                <h2 className="font-serif text-2xl mb-2">Send us a message</h2>
                                <p className="text-gray-600 mb-8">Fill out the form below and we'll get back to you soon.</p>

                                {contact.formEnabled ? (
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                                    Your Name *
                                                </label>
                                                <input
                                                    id="name"
                                                    type="text"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    placeholder="John Doe"
                                                    required
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                                    Email Address *
                                                </label>
                                                <input
                                                    id="email"
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    placeholder="john@example.com"
                                                    required
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                                Subject *
                                            </label>
                                            <input
                                                id="subject"
                                                type="text"
                                                value={formData.subject}
                                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                                placeholder="How can we help?"
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                                Message *
                                            </label>
                                            <textarea
                                                id="message"
                                                value={formData.message}
                                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                placeholder="Tell us more..."
                                                rows={6}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black resize-none"
                                            />
                                        </div>
                                        <button type="submit" className="btn-primary w-full justify-center">
                                            Send Message
                                            <Send className="w-4 h-4" />
                                        </button>
                                    </form>
                                ) : (
                                    <div className="text-center py-12 text-gray-500">
                                        <p>Contact form is currently disabled.</p>
                                        <p className="mt-2">Please reach out via email or phone.</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Map */}
                        {contact.mapEmbedUrl && (
                            <div className="mt-12 rounded-lg overflow-hidden h-96">
                                <iframe
                                    src={contact.mapEmbedUrl}
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Location Map"
                                />
                            </div>
                        )}
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default ContactPage;
