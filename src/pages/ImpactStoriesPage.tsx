import { Users, GraduationCap, Lightbulb, Quote, ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Card } from "../components/ui/card";

const ImpactStoriesPage = () => {
    const featuredStory = {
        name: "Thabo Molefe",
        title: "From Scholarship to Smart City Researcher",
        quote: "The foundation didn't just fund my education—they believed in my potential when I couldn't see it myself. Today, I'm leading research on smart grid technologies that will power South Africa's future.",
        background: "Thabo grew up in Soweto with a passion for electronics but limited resources. Through the Kommunity Foundation scholarship program, he completed his undergraduate degree and is now pursuing his doctoral studies under Professor Ouahada's supervision.",
        outcome: "Currently a PhD candidate researching Smart Grid optimization, with 3 published papers",
        color: "purple"
    };

    const impactStories = [
        {
            name: "Nomvula Dlamini",
            title: "Engineering Education Pioneer",
            story: "After receiving textbook support and mentorship, Nomvula graduated top of her class in Telecommunications Engineering. She now mentors three junior students through the same program that supported her.",
            impact: "First-generation engineer in her family, now mentoring others",
            icon: GraduationCap,
            color: "orange"
        },
        {
            name: "James Ndlovu",
            title: "Smart Home Innovator",
            story: "Access to the Smart Home Lab allowed James to develop his thesis on visible light communications. His research is now being applied in rural schools to provide internet access without traditional infrastructure.",
            impact: "Research deployed in 5 rural schools",
            icon: Lightbulb,
            color: "purple"
        },
        {
            name: "Lindiwe Khumalo",
            title: "From Student to Supervisor",
            story: "Starting as an undergraduate scholarship recipient, Lindiwe's journey through the foundation's support led her to complete her Master's degree and become a postdoctoral researcher specializing in AI for medical imaging.",
            impact: "Co-authored 6 research papers on medical AI",
            icon: Star,
            color: "orange"
        },
        {
            name: "Community Tech Lab, Alexandra",
            title: "Bridging the Digital Divide",
            story: "The foundation established a technology learning center in Alexandra township, providing free access to computers, internet, and engineering workshops for local youth.",
            impact: "200+ young people trained in basic electronics",
            icon: Users,
            color: "purple"
        }
    ];

    return (
        <div className="min-h-screen bg-[var(--color-bg)]">
            <Header />
            <main className="pt-20">
                {/* Hero Section */}
                <section className="py-20 md:py-28 bg-[var(--color-bg)] relative overflow-hidden">
                    <div className="absolute top-20 left-0 w-72 h-72 bg-orange-200/10 dark:bg-orange-500/5 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 right-0 w-72 h-72 bg-purple-200/10 dark:bg-purple-500/5 rounded-full blur-3xl"></div>

                    <div className="container mx-auto px-4">
                        <div className="section-header">
                            <div className="inline-block mb-4">
                                <span className="bg-[var(--color-bg-alt)] text-[var(--color-text-secondary)] px-4 py-2 rounded-full text-sm font-semibold">
                                    Real Stories, Real Change
                                </span>
                            </div>
                            <h2 className="section-title text-[var(--color-text)]">Impact Stories</h2>
                            <p className="section-description text-[var(--color-text-secondary)]">
                                Behind every statistic is a person whose life has been transformed.
                                These stories showcase the real impact of education, mentorship, and community support.
                            </p>
                        </div>

                        {/* Featured Story */}
                        <Card className="mb-16 overflow-hidden border border-[var(--color-border)] bg-[var(--color-card)]">
                            <div className="p-8 md:p-12">
                                <div className="flex flex-col lg:flex-row gap-8 items-start">
                                    <div className="flex-shrink-0">
                                        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center shadow-lg">
                                            <Quote className="w-12 h-12 text-white" />
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <span className="inline-block bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full text-sm font-semibold mb-3">
                                            Featured Story
                                        </span>
                                        <h3 className="text-2xl md:text-3xl font-bold text-[var(--color-text)] mb-2">{featuredStory.title}</h3>
                                        <p className="text-purple-600 dark:text-purple-400 font-semibold mb-4">{featuredStory.name}</p>

                                        <blockquote className="text-xl text-[var(--color-text-secondary)] italic border-l-4 border-purple-500 pl-6 mb-6">
                                            "{featuredStory.quote}"
                                        </blockquote>

                                        <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4">{featuredStory.background}</p>

                                        <div className="bg-[var(--color-bg-alt)] rounded-xl p-4">
                                            <span className="font-semibold text-[var(--color-text)]">Outcome: </span>
                                            <span className="text-[var(--color-text-secondary)]">{featuredStory.outcome}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* More Stories Grid */}
                        <h3 className="text-2xl font-bold text-[var(--color-text)] mb-8">More Impact Stories</h3>
                        <div className="grid md:grid-cols-2 gap-8 mb-16">
                            {impactStories.map((story, index) => {
                                const Icon = story.icon;
                                const isPurple = story.color === "purple";
                                return (
                                    <Card key={index} className="card-interactive border border-[var(--color-border)] bg-[var(--color-card)]">
                                        <div className="flex items-start gap-4 mb-4">
                                            <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${isPurple
                                                ? "bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30"
                                                : "bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30"
                                                }`}>
                                                <Icon className={`w-7 h-7 ${isPurple ? "text-purple-600 dark:text-purple-400" : "text-orange-500 dark:text-orange-400"}`} />
                                            </div>
                                            <div>
                                                <h4 className="text-xl font-bold text-[var(--color-text)]">{story.title}</h4>
                                                <p className={`text-sm font-semibold ${isPurple ? "text-purple-600 dark:text-purple-400" : "text-orange-500 dark:text-orange-400"}`}>
                                                    {story.name}
                                                </p>
                                            </div>
                                        </div>
                                        <p className="text-[var(--color-text-secondary)] mb-4 leading-relaxed">{story.story}</p>
                                        <div className={`rounded-lg p-3 ${isPurple ? "bg-purple-50 dark:bg-purple-900/20" : "bg-orange-50 dark:bg-orange-900/20"
                                            }`}>
                                            <span className={`font-semibold text-sm ${isPurple ? "text-purple-700 dark:text-purple-300" : "text-orange-700 dark:text-orange-300"
                                                }`}>
                                                Impact: {story.impact}
                                            </span>
                                        </div>
                                    </Card>
                                );
                            })}
                        </div>

                        {/* CTA Section */}
                        <div className="text-center bg-[var(--color-bg-alt)] rounded-lg p-8 md:p-12">
                            <h3 className="font-serif text-2xl md:text-3xl text-[var(--color-text)] mb-4">Be Part of the Next Success Story</h3>
                            <p className="text-[var(--color-text-secondary)] mb-8 max-w-2xl mx-auto">
                                Your time and skills can help create more success stories. Join us as a volunteer or partner
                                to make a lasting difference in someone's life.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link to="/get-involved" className="btn-secondary">
                                    Get Involved
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                                <Link to="/contact" className="btn-primary">
                                    Contact Us
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default ImpactStoriesPage;
