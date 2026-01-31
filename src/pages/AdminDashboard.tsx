import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Settings, FileText, BarChart3, Users, Newspaper,
    Home, Menu, LogOut, Save, Plus, Trash2, Image,
    Calendar, BookOpen, Heart, Globe, Mail, AlertTriangle, Loader2, RefreshCw
} from "lucide-react";
import { useAdminDataManager, generateId } from "../hooks/useAdminData";
import { ImageUpload } from "../components/ImageUpload";
import { supabase } from "../lib/supabase";
import type {
    SiteSettings, HeroContent, Stat, Program, NewsItem,
    TeamMember, Partner, AboutContent, NavItem, FooterSection,
    AnnualReport, ImpactStory, ContactSettings
} from "../types/admin";

// Admin username from env
const ADMIN_USERNAME = import.meta.env.VITE_ADMIN_USERNAME || "admin";

// Generate random math CAPTCHA
const generateMathCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1; // 1-10
    const num2 = Math.floor(Math.random() * 10) + 1; // 1-10
    const operators = ['+', '-', '×'] as const;
    const operator = operators[Math.floor(Math.random() * operators.length)];

    let answer: number;
    switch (operator) {
        case '+':
            answer = num1 + num2;
            break;
        case '-':
            answer = num1 - num2;
            break;
        case '×':
            answer = num1 * num2;
            break;
    }

    return { question: `${num1} ${operator} ${num2}`, answer };
};

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [remainingAttempts, setRemainingAttempts] = useState<number | null>(null);
    const [captcha, setCaptcha] = useState(generateMathCaptcha);
    const [captchaAnswer, setCaptchaAnswer] = useState("");
    const [activeTab, setActiveTab] = useState("settings");
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const { data, updateData, saveData, saveMessage } = useAdminDataManager();

    // Get auth token
    const getAuthToken = () => sessionStorage.getItem("admin_token");

    // Refresh CAPTCHA
    const refreshCaptcha = useCallback(() => {
        setCaptcha(generateMathCaptcha());
        setCaptchaAnswer("");
    }, []);

    // Verify existing session on mount
    useEffect(() => {
        const verifySession = async () => {
            const token = getAuthToken();
            if (!token) {
                setIsLoading(false);
                return;
            }

            try {
                const { data } = await supabase
                    .from('sessions')
                    .select('*')
                    .eq('token', token)
                    .single();

                if (data) {
                    const createdAt = new Date(data.created_at);
                    if (Date.now() - createdAt.getTime() < 24 * 60 * 60 * 1000) {
                        setIsAuthenticated(true);
                    } else {
                        await supabase.from('sessions').delete().eq('token', token);
                        sessionStorage.removeItem("admin_token");
                    }
                } else {
                    sessionStorage.removeItem("admin_token");
                }
            } catch {
                sessionStorage.removeItem("admin_token");
            }
            setIsLoading(false);
        };
        verifySession();
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        // Validate CAPTCHA first
        if (parseInt(captchaAnswer) !== captcha.answer) {
            setError("Incorrect CAPTCHA answer. Please try again.");
            refreshCaptcha();
            return;
        }

        setIsSubmitting(true);

        try {
            // Validate username
            if (username !== ADMIN_USERNAME) {
                setError("Invalid credentials");
                refreshCaptcha();
                setIsSubmitting(false);
                return;
            }

            // Create session in Supabase
            const token = crypto.randomUUID();
            const { error: insertError } = await supabase
                .from('sessions')
                .insert({ token, username, created_at: new Date().toISOString() });

            if (insertError) {
                console.error('Session error:', insertError);
                setError("Login failed. Check Supabase connection.");
                refreshCaptcha();
            } else {
                sessionStorage.setItem("admin_token", token);
                setIsAuthenticated(true);
                setRemainingAttempts(null);
            }
        } catch {
            setError("Connection error. Check Supabase configuration.");
            refreshCaptcha();
        }

        setIsSubmitting(false);
    };

    const handleLogout = async () => {
        const token = getAuthToken();
        if (token) {
            await supabase.from('sessions').delete().eq('token', token);
        }
        sessionStorage.removeItem("admin_token");
        setIsAuthenticated(false);
        navigate("/");
    };

    const tabs = [
        { id: "settings", name: "Site Settings", icon: Settings },
        { id: "hero", name: "Hero Content", icon: Home },
        { id: "stats", name: "Statistics", icon: BarChart3 },
        { id: "programs", name: "Programs", icon: FileText },
        { id: "news", name: "News & Events", icon: Newspaper },
        { id: "team", name: "Team Members", icon: Users },
        { id: "partners", name: "Partners", icon: Heart },
        { id: "about", name: "About Content", icon: BookOpen },
        { id: "navigation", name: "Navigation", icon: Globe },
        { id: "reports", name: "Annual Reports", icon: Calendar },
        { id: "stories", name: "Impact Stories", icon: Image },
        { id: "contact", name: "Contact Settings", icon: Mail },
        { id: "messages", name: "Messages", icon: Newspaper },
    ];

    // Loading state
    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#f7f7f7] flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-[#f7f7f7] flex items-center justify-center p-4">
                <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-black rounded-lg flex items-center justify-center mx-auto mb-4">
                            <span className="text-white font-serif text-3xl font-bold">K</span>
                        </div>
                        <h1 className="font-serif text-2xl">Admin Dashboard</h1>
                        <p className="text-gray-500 mt-2">Enter your credentials to continue</p>
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 flex items-start gap-2">
                            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                            <div>
                                <p className="font-medium">{error}</p>
                                {remainingAttempts !== null && remainingAttempts > 0 && (
                                    <p className="text-sm mt-1">Attempts remaining: {remainingAttempts}</p>
                                )}
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleLogin}>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-black"
                            disabled={isSubmitting}
                            required
                        />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-black"
                            disabled={isSubmitting}
                            required
                        />

                        {/* Math CAPTCHA */}
                        <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-gray-600">Verify you're human</span>
                                <button
                                    type="button"
                                    onClick={refreshCaptcha}
                                    className="p-1 hover:bg-gray-200 rounded transition-colors"
                                    title="New problem"
                                >
                                    <RefreshCw className="w-4 h-4 text-gray-500" />
                                </button>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-xl font-mono font-bold bg-white px-3 py-2 rounded border">
                                    {captcha.question} = ?
                                </span>
                                <input
                                    type="number"
                                    value={captchaAnswer}
                                    onChange={(e) => setCaptchaAnswer(e.target.value)}
                                    placeholder="Answer"
                                    className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black text-center"
                                    disabled={isSubmitting}
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Logging in...
                                </>
                            ) : (
                                "Login"
                            )}
                        </button>
                    </form>

                    <Link to="/" className="block text-center mt-4 text-gray-500 hover:text-black text-sm">
                        ← Back to Website
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f7f7f7] flex">
            {/* Sidebar */}
            <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-black text-white transition-all duration-300 flex flex-col shrink-0`}>
                <div className="p-4 border-b border-gray-800">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
                            <span className="text-white font-serif text-xl font-bold">K</span>
                        </div>
                        {sidebarOpen && (
                            <span className="font-serif text-lg">Admin</span>
                        )}
                    </div>
                </div>

                <nav className="flex-1 p-4 overflow-y-auto">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg mb-1 transition-colors ${activeTab === tab.id
                                    ? 'bg-white/20 text-white'
                                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                                    }`}
                            >
                                <Icon className="w-5 h-5 shrink-0" />
                                {sidebarOpen && <span className="text-sm">{tab.name}</span>}
                            </button>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-gray-800">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-3 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                    >
                        <LogOut className="w-5 h-5 shrink-0" />
                        {sidebarOpen && <span>Logout</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                {/* Header */}
                <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="p-2 hover:bg-gray-100 rounded-lg"
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                        <h1 className="font-serif text-xl">{tabs.find(t => t.id === activeTab)?.name}</h1>
                    </div>
                    {saveMessage && (
                        <span className="text-green-600 font-medium">{saveMessage}</span>
                    )}
                </header>

                {/* Content */}
                <div className="p-6">
                    {/* Site Settings */}
                    {activeTab === "settings" && (
                        <SettingsPanel
                            settings={data.settings}
                            onChange={(val) => updateData('settings', val)}
                            onSave={() => saveData()}
                        />
                    )}

                    {/* Hero Content */}
                    {activeTab === "hero" && (
                        <HeroPanel
                            hero={data.hero}
                            onChange={(val) => updateData('hero', val)}
                            onSave={() => saveData()}
                        />
                    )}

                    {/* Statistics */}
                    {activeTab === "stats" && (
                        <StatsPanel
                            stats={data.stats}
                            onChange={(val) => updateData('stats', val)}
                            onSave={() => saveData()}
                        />
                    )}

                    {/* Programs */}
                    {activeTab === "programs" && (
                        <ProgramsPanel
                            programs={data.programs}
                            onChange={(val) => updateData('programs', val)}
                            onSave={() => saveData()}
                        />
                    )}

                    {/* News & Events */}
                    {activeTab === "news" && (
                        <NewsPanel
                            news={data.news}
                            onChange={(val) => updateData('news', val)}
                            onSave={() => saveData()}
                        />
                    )}

                    {/* Team Members */}
                    {activeTab === "team" && (
                        <TeamPanel
                            team={data.team}
                            onChange={(val) => updateData('team', val)}
                            onSave={() => saveData()}
                        />
                    )}

                    {/* Partners */}
                    {activeTab === "partners" && (
                        <PartnersPanel
                            partners={data.partners}
                            onChange={(val) => updateData('partners', val)}
                            onSave={() => saveData()}
                        />
                    )}

                    {/* About Content */}
                    {activeTab === "about" && (
                        <AboutPanel
                            about={data.about}
                            onChange={(val) => updateData('about', val)}
                            onSave={() => saveData()}
                        />
                    )}

                    {/* Navigation */}
                    {activeTab === "navigation" && (
                        <NavigationPanel
                            navigation={data.navigation}
                            footer={data.footer}
                            onNavChange={(val) => updateData('navigation', val)}
                            onFooterChange={(val) => updateData('footer', val)}
                            onSave={() => saveData()}
                        />
                    )}

                    {/* Annual Reports */}
                    {activeTab === "reports" && (
                        <ReportsPanel
                            reports={data.reports}
                            onChange={(val) => updateData('reports', val)}
                            onSave={() => saveData()}
                        />
                    )}

                    {/* Impact Stories */}
                    {activeTab === "stories" && (
                        <StoriesPanel
                            stories={data.stories}
                            onChange={(val) => updateData('stories', val)}
                            onSave={() => saveData()}
                        />
                    )}

                    {/* Contact Settings */}
                    {activeTab === "contact" && (
                        <ContactPanel
                            contact={data.contact}
                            onChange={(val) => updateData('contact', val)}
                            onSave={() => saveData()}
                        />
                    )}

                    {/* Messages */}
                    {activeTab === "messages" && (
                        <MessagesPanel />
                    )}
                </div>
            </main>
        </div>
    );
};

// ============ Panel Components ============

interface PanelProps<T> {
    onChange: (value: T) => void;
    onSave: () => void;
}

// Settings Panel
const SettingsPanel = ({ settings, onChange, onSave }: PanelProps<SiteSettings> & { settings: SiteSettings }) => (
    <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="font-serif text-xl mb-6">Site Settings</h2>
        <div className="space-y-4 max-w-xl">
            <InputField label="Organization Name" value={settings.organizationName}
                onChange={(v) => onChange({ ...settings, organizationName: v })} />
            <InputField label="Tagline" value={settings.tagline}
                onChange={(v) => onChange({ ...settings, tagline: v })} />
            <InputField label="Contact Email" value={settings.contactEmail} type="email"
                onChange={(v) => onChange({ ...settings, contactEmail: v })} />
            <InputField label="Contact Phone" value={settings.contactPhone}
                onChange={(v) => onChange({ ...settings, contactPhone: v })} />
            <TextareaField label="Address" value={settings.address} rows={2}
                onChange={(v) => onChange({ ...settings, address: v })} />

            <h3 className="font-medium text-lg mt-6 pt-4 border-t">Social Links</h3>
            <InputField label="Facebook" value={settings.socialLinks.facebook || ''}
                onChange={(v) => onChange({ ...settings, socialLinks: { ...settings.socialLinks, facebook: v } })} />
            <InputField label="Twitter/X" value={settings.socialLinks.twitter || ''}
                onChange={(v) => onChange({ ...settings, socialLinks: { ...settings.socialLinks, twitter: v } })} />
            <InputField label="LinkedIn" value={settings.socialLinks.linkedin || ''}
                onChange={(v) => onChange({ ...settings, socialLinks: { ...settings.socialLinks, linkedin: v } })} />
            <InputField label="Instagram" value={settings.socialLinks.instagram || ''}
                onChange={(v) => onChange({ ...settings, socialLinks: { ...settings.socialLinks, instagram: v } })} />

            <SaveButton onClick={onSave} />
        </div>
    </div>
);

// Hero Panel
const HeroPanel = ({ hero, onChange, onSave }: PanelProps<HeroContent> & { hero: HeroContent }) => (
    <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="font-serif text-xl mb-6">Hero Content</h2>
        <div className="space-y-4 max-w-2xl">
            <TextareaField label="Main Headline" value={hero.headline} rows={3}
                onChange={(v) => onChange({ ...hero, headline: v })} />

            <ImageUpload
                value={hero.backgroundImage}
                onChange={(v) => onChange({ ...hero, backgroundImage: v })}
                label="Background Image (optional)"
            />

            <h3 className="font-medium text-lg mt-6 pt-4 border-t">Interest Dropdown Options</h3>
            {hero.interestOptions.map((opt, idx) => (
                <div key={idx} className="flex gap-2">
                    <input className="flex-1 px-3 py-2 border rounded-lg" placeholder="Value" value={opt.value}
                        onChange={(e) => {
                            const newOpts = [...hero.interestOptions];
                            newOpts[idx] = { ...opt, value: e.target.value };
                            onChange({ ...hero, interestOptions: newOpts });
                        }} />
                    <input className="flex-1 px-3 py-2 border rounded-lg" placeholder="Label" value={opt.label}
                        onChange={(e) => {
                            const newOpts = [...hero.interestOptions];
                            newOpts[idx] = { ...opt, label: e.target.value };
                            onChange({ ...hero, interestOptions: newOpts });
                        }} />
                    <button onClick={() => onChange({ ...hero, interestOptions: hero.interestOptions.filter((_, i) => i !== idx) })}
                        className="text-red-500 hover:text-red-700 p-2"><Trash2 className="w-4 h-4" /></button>
                </div>
            ))}
            <button onClick={() => onChange({ ...hero, interestOptions: [...hero.interestOptions, { value: '', label: '' }] })}
                className="btn-secondary text-sm"><Plus className="w-4 h-4" /> Add Option</button>

            <SaveButton onClick={onSave} />
        </div>
    </div>
);

// Stats Panel
const StatsPanel = ({ stats, onChange, onSave }: PanelProps<Stat[]> & { stats: Stat[] }) => (
    <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
            <h2 className="font-serif text-xl">Statistics</h2>
            <button onClick={() => onChange([...stats, { id: generateId(), number: "0", label: "New Stat", order: stats.length + 1 }])}
                className="btn-secondary text-sm"><Plus className="w-4 h-4" /> Add Stat</button>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
            {stats.map((stat, idx) => (
                <div key={stat.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                        <span className="text-sm text-gray-500">Stat {idx + 1}</span>
                        <button onClick={() => onChange(stats.filter(s => s.id !== stat.id))}
                            className="text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4" /></button>
                    </div>
                    <input className="w-full px-3 py-2 border rounded-lg mb-2 font-serif text-2xl" placeholder="Number" value={stat.number}
                        onChange={(e) => onChange(stats.map(s => s.id === stat.id ? { ...s, number: e.target.value } : s))} />
                    <input className="w-full px-3 py-2 border rounded-lg text-sm" placeholder="Label" value={stat.label}
                        onChange={(e) => onChange(stats.map(s => s.id === stat.id ? { ...s, label: e.target.value } : s))} />
                </div>
            ))}
        </div>
        <SaveButton onClick={onSave} className="mt-6" />
    </div>
);

// Programs Panel
const ProgramsPanel = ({ programs, onChange, onSave }: PanelProps<Program[]> & { programs: Program[] }) => (
    <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
            <h2 className="font-serif text-xl">Programs</h2>
            <button onClick={() => onChange([...programs, { id: generateId(), name: "New Program", description: "Description", order: programs.length + 1 }])}
                className="btn-secondary text-sm"><Plus className="w-4 h-4" /> Add Program</button>
        </div>
        <div className="space-y-4">
            {programs.map((program) => (
                <div key={program.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                        <input className="font-serif text-lg border-0 focus:outline-none p-0 flex-1" value={program.name}
                            onChange={(e) => onChange(programs.map(p => p.id === program.id ? { ...p, name: e.target.value } : p))} />
                        <button onClick={() => onChange(programs.filter(p => p.id !== program.id))}
                            className="text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4" /></button>
                    </div>
                    <textarea className="w-full px-3 py-2 border rounded-lg text-sm" rows={2} value={program.description}
                        onChange={(e) => onChange(programs.map(p => p.id === program.id ? { ...p, description: e.target.value } : p))} />
                    <ImageUpload
                        value={program.icon}
                        onChange={(url) => onChange(programs.map(p => p.id === program.id ? { ...p, icon: url } : p))}
                        label="Program Image"
                        className="mt-2"
                    />
                </div>
            ))}
        </div>
        <SaveButton onClick={onSave} className="mt-6" />
    </div>
);

// News Panel
const NewsPanel = ({ news, onChange, onSave }: PanelProps<NewsItem[]> & { news: NewsItem[] }) => (
    <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
            <h2 className="font-serif text-xl">News & Events</h2>
            <button onClick={() => onChange([...news, {
                id: generateId(), category: "News", title: "New Article", excerpt: "Brief description",
                slug: "new-article", date: new Date().toISOString().split('T')[0], featured: false
            }])} className="btn-secondary text-sm"><Plus className="w-4 h-4" /> Add News Item</button>
        </div>
        <div className="space-y-4">
            {news.map((item) => (
                <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                            <select value={item.category} className="text-sm bg-gray-100 rounded px-2 py-1"
                                onChange={(e) => onChange(news.map(n => n.id === item.id ? { ...n, category: e.target.value as any } : n))}>
                                <option value="Story">Story</option>
                                <option value="Event">Event</option>
                                <option value="News">News</option>
                            </select>
                            <label className="flex items-center gap-2 text-sm">
                                <input type="checkbox" checked={item.featured}
                                    onChange={(e) => onChange(news.map(n => n.id === item.id ? { ...n, featured: e.target.checked } : n))} />
                                Featured
                            </label>
                        </div>
                        <button onClick={() => onChange(news.filter(n => n.id !== item.id))}
                            className="text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4" /></button>
                    </div>
                    <input className="w-full px-3 py-2 border rounded-lg mb-2 font-medium" placeholder="Title" value={item.title}
                        onChange={(e) => onChange(news.map(n => n.id === item.id ? { ...n, title: e.target.value } : n))} />
                    <textarea className="w-full px-3 py-2 border rounded-lg text-sm mb-2" rows={2} placeholder="Excerpt" value={item.excerpt}
                        onChange={(e) => onChange(news.map(n => n.id === item.id ? { ...n, excerpt: e.target.value } : n))} />
                    <div className="grid grid-cols-2 gap-2">
                        <input className="px-3 py-2 border rounded-lg text-sm" placeholder="URL slug" value={item.slug}
                            onChange={(e) => onChange(news.map(n => n.id === item.id ? { ...n, slug: e.target.value } : n))} />
                        <input type="date" className="px-3 py-2 border rounded-lg text-sm" value={item.date}
                            onChange={(e) => onChange(news.map(n => n.id === item.id ? { ...n, date: e.target.value } : n))} />
                    </div>
                    <ImageUpload
                        value={item.image}
                        onChange={(url) => onChange(news.map(n => n.id === item.id ? { ...n, image: url } : n))}
                        label="News Image"
                        className="mt-2"
                    />
                </div>
            ))}
        </div>
        <SaveButton onClick={onSave} className="mt-6" />
    </div>
);

// Team Panel
const TeamPanel = ({ team, onChange, onSave }: PanelProps<TeamMember[]> & { team: TeamMember[] }) => (
    <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
            <h2 className="font-serif text-xl">Team Members</h2>
            <button onClick={() => onChange([...team, { id: generateId(), name: "New Member", role: "Role", bio: "Bio", order: team.length + 1 }])}
                className="btn-secondary text-sm"><Plus className="w-4 h-4" /> Add Team Member</button>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
            {team.map((member) => (
                <div key={member.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                        <span className="text-sm text-gray-500">Team Member</span>
                        <button onClick={() => onChange(team.filter(t => t.id !== member.id))}
                            className="text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4" /></button>
                    </div>
                    <input className="w-full px-3 py-2 border rounded-lg mb-2 font-medium" placeholder="Name" value={member.name}
                        onChange={(e) => onChange(team.map(t => t.id === member.id ? { ...t, name: e.target.value } : t))} />
                    <input className="w-full px-3 py-2 border rounded-lg mb-2 text-sm" placeholder="Role/Title" value={member.role}
                        onChange={(e) => onChange(team.map(t => t.id === member.id ? { ...t, role: e.target.value } : t))} />
                    <textarea className="w-full px-3 py-2 border rounded-lg text-sm mb-2" rows={2} placeholder="Bio" value={member.bio}
                        onChange={(e) => onChange(team.map(t => t.id === member.id ? { ...t, bio: e.target.value } : t))} />
                    <ImageUpload
                        value={member.image}
                        onChange={(url) => onChange(team.map(t => t.id === member.id ? { ...t, image: url } : t))}
                        label="Photo"
                    />
                </div>
            ))}
        </div>
        <SaveButton onClick={onSave} className="mt-6" />
    </div>
);

// Partners Panel
const PartnersPanel = ({ partners, onChange, onSave }: PanelProps<Partner[]> & { partners: Partner[] }) => (
    <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
            <h2 className="font-serif text-xl">Partners & Sponsors</h2>
            <button onClick={() => onChange([...partners, { id: generateId(), name: "New Partner", order: partners.length + 1 }])}
                className="btn-secondary text-sm"><Plus className="w-4 h-4" /> Add Partner</button>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
            {partners.map((partner) => (
                <div key={partner.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                        <span className="text-sm text-gray-500">Partner</span>
                        <button onClick={() => onChange(partners.filter(p => p.id !== partner.id))}
                            className="text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4" /></button>
                    </div>
                    <input className="w-full px-3 py-2 border rounded-lg mb-2" placeholder="Name" value={partner.name}
                        onChange={(e) => onChange(partners.map(p => p.id === partner.id ? { ...p, name: e.target.value } : p))} />
                    <ImageUpload
                        value={partner.logo}
                        onChange={(url) => onChange(partners.map(p => p.id === partner.id ? { ...p, logo: url } : p))}
                        label="Logo"
                    />
                    <input className="w-full px-3 py-2 border rounded-lg text-sm mt-2" placeholder="Website URL" value={partner.website || ''}
                        onChange={(e) => onChange(partners.map(p => p.id === partner.id ? { ...p, website: e.target.value } : p))} />
                </div>
            ))}
        </div>
        {partners.length === 0 && <p className="text-gray-500 text-center py-8">No partners added yet.</p>}
        <SaveButton onClick={onSave} className="mt-6" />
    </div>
);

// About Panel
const AboutPanel = ({ about, onChange, onSave }: PanelProps<AboutContent> & { about: AboutContent }) => (
    <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="font-serif text-xl mb-6">About Content</h2>
        <div className="space-y-4 max-w-2xl">
            <TextareaField label="Mission Statement" value={about.mission} rows={3}
                onChange={(v) => onChange({ ...about, mission: v })} />
            <TextareaField label="Vision Statement" value={about.vision} rows={3}
                onChange={(v) => onChange({ ...about, vision: v })} />
            <TextareaField label="History" value={about.history} rows={4}
                onChange={(v) => onChange({ ...about, history: v })} />

            <h3 className="font-medium text-lg mt-6 pt-4 border-t">Core Values</h3>
            {about.values.map((value, idx) => (
                <div key={idx} className="border rounded-lg p-3">
                    <div className="flex justify-between mb-2">
                        <input className="font-medium border-0 focus:outline-none" placeholder="Value Title" value={value.title}
                            onChange={(e) => {
                                const newValues = [...about.values];
                                newValues[idx] = { ...value, title: e.target.value };
                                onChange({ ...about, values: newValues });
                            }} />
                        <button onClick={() => onChange({ ...about, values: about.values.filter((_, i) => i !== idx) })}
                            className="text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4" /></button>
                    </div>
                    <textarea className="w-full px-3 py-2 border rounded-lg text-sm" rows={2} placeholder="Description" value={value.description}
                        onChange={(e) => {
                            const newValues = [...about.values];
                            newValues[idx] = { ...value, description: e.target.value };
                            onChange({ ...about, values: newValues });
                        }} />
                </div>
            ))}
            <button onClick={() => onChange({ ...about, values: [...about.values, { title: '', description: '' }] })}
                className="btn-secondary text-sm"><Plus className="w-4 h-4" /> Add Value</button>

            <SaveButton onClick={onSave} />
        </div>
    </div>
);

// Navigation Panel
const NavigationPanel = ({ navigation, footer, onNavChange, onFooterChange, onSave }: {
    navigation: NavItem[];
    footer: FooterSection[];
    onNavChange: (val: NavItem[]) => void;
    onFooterChange: (val: FooterSection[]) => void;
    onSave: () => void;
}) => (
    <div className="space-y-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h2 className="font-serif text-xl">Header Navigation</h2>
                <button onClick={() => onNavChange([...navigation, { id: generateId(), name: "New Link", href: "/", order: navigation.length + 1 }])}
                    className="btn-secondary text-sm"><Plus className="w-4 h-4" /> Add Link</button>
            </div>
            <div className="space-y-2">
                {navigation.map((item) => (
                    <div key={item.id} className="flex gap-2 items-center">
                        <input className="flex-1 px-3 py-2 border rounded-lg" placeholder="Name" value={item.name}
                            onChange={(e) => onNavChange(navigation.map(n => n.id === item.id ? { ...n, name: e.target.value } : n))} />
                        <input className="flex-1 px-3 py-2 border rounded-lg" placeholder="URL" value={item.href}
                            onChange={(e) => onNavChange(navigation.map(n => n.id === item.id ? { ...n, href: e.target.value } : n))} />
                        <button onClick={() => onNavChange(navigation.filter(n => n.id !== item.id))}
                            className="text-red-500 hover:text-red-700 p-2"><Trash2 className="w-4 h-4" /></button>
                    </div>
                ))}
            </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="font-serif text-xl mb-6">Footer Sections</h2>
            <p className="text-gray-500 text-sm mb-4">Footer links are organized into sections. Each section has a title and a list of links.</p>
            {footer.map((section) => (
                <div key={section.id} className="border rounded-lg p-4 mb-4">
                    <div className="flex justify-between items-center mb-3">
                        <input className="font-medium border-0 focus:outline-none text-lg" value={section.title}
                            onChange={(e) => onFooterChange(footer.map(f => f.id === section.id ? { ...f, title: e.target.value } : f))} />
                        <button onClick={() => onFooterChange(footer.filter(f => f.id !== section.id))}
                            className="text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4" /></button>
                    </div>
                    {section.links.map((link, idx) => (
                        <div key={idx} className="flex gap-2 mb-2">
                            <input className="flex-1 px-3 py-2 border rounded-lg text-sm" placeholder="Name" value={link.name}
                                onChange={(e) => {
                                    const newLinks = [...section.links];
                                    newLinks[idx] = { ...link, name: e.target.value };
                                    onFooterChange(footer.map(f => f.id === section.id ? { ...f, links: newLinks } : f));
                                }} />
                            <input className="flex-1 px-3 py-2 border rounded-lg text-sm" placeholder="URL" value={link.href}
                                onChange={(e) => {
                                    const newLinks = [...section.links];
                                    newLinks[idx] = { ...link, href: e.target.value };
                                    onFooterChange(footer.map(f => f.id === section.id ? { ...f, links: newLinks } : f));
                                }} />
                            <button onClick={() => {
                                const newLinks = section.links.filter((_, i) => i !== idx);
                                onFooterChange(footer.map(f => f.id === section.id ? { ...f, links: newLinks } : f));
                            }} className="text-red-500 hover:text-red-700 p-2"><Trash2 className="w-4 h-4" /></button>
                        </div>
                    ))}
                    <button onClick={() => {
                        const newLinks = [...section.links, { name: '', href: '' }];
                        onFooterChange(footer.map(f => f.id === section.id ? { ...f, links: newLinks } : f));
                    }} className="text-sm text-gray-500 hover:text-black">+ Add Link</button>
                </div>
            ))}
            <button onClick={() => onFooterChange([...footer, { id: generateId(), title: "New Section", links: [] }])}
                className="btn-secondary text-sm"><Plus className="w-4 h-4" /> Add Section</button>
        </div>

        <SaveButton onClick={onSave} />
    </div>
);

// Reports Panel
const ReportsPanel = ({ reports, onChange, onSave }: PanelProps<AnnualReport[]> & { reports: AnnualReport[] }) => (
    <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
            <h2 className="font-serif text-xl">Annual Reports</h2>
            <button onClick={() => onChange([...reports, {
                id: generateId(), year: new Date().getFullYear().toString(),
                title: "Annual Report", description: "Description"
            }])} className="btn-secondary text-sm"><Plus className="w-4 h-4" /> Add Report</button>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
            {reports.map((report) => (
                <div key={report.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                        <input className="w-20 px-2 py-1 border rounded text-sm font-medium" placeholder="Year" value={report.year}
                            onChange={(e) => onChange(reports.map(r => r.id === report.id ? { ...r, year: e.target.value } : r))} />
                        <button onClick={() => onChange(reports.filter(r => r.id !== report.id))}
                            className="text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4" /></button>
                    </div>
                    <input className="w-full px-3 py-2 border rounded-lg mb-2" placeholder="Title" value={report.title}
                        onChange={(e) => onChange(reports.map(r => r.id === report.id ? { ...r, title: e.target.value } : r))} />
                    <textarea className="w-full px-3 py-2 border rounded-lg text-sm mb-2" rows={2} placeholder="Description" value={report.description}
                        onChange={(e) => onChange(reports.map(r => r.id === report.id ? { ...r, description: e.target.value } : r))} />
                    <input className="w-full px-3 py-2 border rounded-lg text-sm" placeholder="PDF URL" value={report.pdfUrl || ''}
                        onChange={(e) => onChange(reports.map(r => r.id === report.id ? { ...r, pdfUrl: e.target.value } : r))} />
                </div>
            ))}
        </div>
        {reports.length === 0 && <p className="text-gray-500 text-center py-8">No reports added yet.</p>}
        <SaveButton onClick={onSave} className="mt-6" />
    </div>
);

// Stories Panel
const StoriesPanel = ({ stories, onChange, onSave }: PanelProps<ImpactStory[]> & { stories: ImpactStory[] }) => (
    <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
            <h2 className="font-serif text-xl">Impact Stories</h2>
            <button onClick={() => onChange([...stories, {
                id: generateId(), title: "New Story", excerpt: "Brief summary", content: "Full story content...",
                category: "Community", date: new Date().toISOString().split('T')[0], featured: false
            }])} className="btn-secondary text-sm"><Plus className="w-4 h-4" /> Add Story</button>
        </div>
        <div className="space-y-4">
            {stories.map((story) => (
                <div key={story.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                            <input className="px-2 py-1 border rounded text-sm" placeholder="Category" value={story.category}
                                onChange={(e) => onChange(stories.map(s => s.id === story.id ? { ...s, category: e.target.value } : s))} />
                            <label className="flex items-center gap-2 text-sm">
                                <input type="checkbox" checked={story.featured}
                                    onChange={(e) => onChange(stories.map(s => s.id === story.id ? { ...s, featured: e.target.checked } : s))} />
                                Featured
                            </label>
                        </div>
                        <button onClick={() => onChange(stories.filter(s => s.id !== story.id))}
                            className="text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4" /></button>
                    </div>
                    <input className="w-full px-3 py-2 border rounded-lg mb-2 font-medium" placeholder="Title" value={story.title}
                        onChange={(e) => onChange(stories.map(s => s.id === story.id ? { ...s, title: e.target.value } : s))} />
                    <textarea className="w-full px-3 py-2 border rounded-lg text-sm mb-2" rows={2} placeholder="Excerpt" value={story.excerpt}
                        onChange={(e) => onChange(stories.map(s => s.id === story.id ? { ...s, excerpt: e.target.value } : s))} />
                    <textarea className="w-full px-3 py-2 border rounded-lg text-sm mb-2" rows={4} placeholder="Full Content" value={story.content}
                        onChange={(e) => onChange(stories.map(s => s.id === story.id ? { ...s, content: e.target.value } : s))} />
                    <div className="grid grid-cols-2 gap-2">
                        <input type="date" className="px-3 py-2 border rounded-lg text-sm" value={story.date}
                            onChange={(e) => onChange(stories.map(s => s.id === story.id ? { ...s, date: e.target.value } : s))} />
                    </div>
                    <ImageUpload
                        value={story.image}
                        onChange={(url) => onChange(stories.map(s => s.id === story.id ? { ...s, image: url } : s))}
                        label="Story Image"
                        className="mt-2"
                    />
                </div>
            ))}
        </div>
        {stories.length === 0 && <p className="text-gray-500 text-center py-8">No stories added yet.</p>}
        <SaveButton onClick={onSave} className="mt-6" />
    </div>
);

// Contact Panel
const ContactPanel = ({ contact, onChange, onSave }: PanelProps<ContactSettings> & { contact: ContactSettings }) => (
    <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="font-serif text-xl mb-6">Contact Settings</h2>
        <div className="space-y-4 max-w-2xl">
            <label className="flex items-center gap-3">
                <input type="checkbox" checked={contact.formEnabled}
                    onChange={(e) => onChange({ ...contact, formEnabled: e.target.checked })} />
                <span>Enable contact form</span>
            </label>

            <InputField label="Office Hours" value={contact.officeHours}
                onChange={(v) => onChange({ ...contact, officeHours: v })} />

            <TextareaField label="Google Maps Embed URL (optional)" value={contact.mapEmbedUrl || ''} rows={2}
                onChange={(v) => onChange({ ...contact, mapEmbedUrl: v })} />

            <h3 className="font-medium text-lg mt-6 pt-4 border-t">Contact Departments</h3>
            {contact.departments.map((dept, idx) => (
                <div key={idx} className="border rounded-lg p-3">
                    <div className="flex justify-between mb-2">
                        <input className="font-medium border-0 focus:outline-none" placeholder="Department Name" value={dept.name}
                            onChange={(e) => {
                                const newDepts = [...contact.departments];
                                newDepts[idx] = { ...dept, name: e.target.value };
                                onChange({ ...contact, departments: newDepts });
                            }} />
                        <button onClick={() => onChange({ ...contact, departments: contact.departments.filter((_, i) => i !== idx) })}
                            className="text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4" /></button>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <input className="px-3 py-2 border rounded-lg text-sm" placeholder="Email" value={dept.email}
                            onChange={(e) => {
                                const newDepts = [...contact.departments];
                                newDepts[idx] = { ...dept, email: e.target.value };
                                onChange({ ...contact, departments: newDepts });
                            }} />
                        <input className="px-3 py-2 border rounded-lg text-sm" placeholder="Phone (optional)" value={dept.phone || ''}
                            onChange={(e) => {
                                const newDepts = [...contact.departments];
                                newDepts[idx] = { ...dept, phone: e.target.value };
                                onChange({ ...contact, departments: newDepts });
                            }} />
                    </div>
                </div>
            ))}
            <button onClick={() => onChange({ ...contact, departments: [...contact.departments, { name: '', email: '' }] })}
                className="btn-secondary text-sm"><Plus className="w-4 h-4" /> Add Department</button>

            <SaveButton onClick={onSave} />
        </div>
    </div>
);

// Messages Panel - displays contact form submissions
const MessagesPanel = () => {
    const [messages, setMessages] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchMessages = async () => {
            const { data, error } = await supabase
                .from('contact_messages')
                .select('*')
                .order('created_at', { ascending: false });

            if (!error && data) {
                setMessages(data);
            }
            setIsLoading(false);
        };
        fetchMessages();
    }, []);

    const handleDelete = async (id: string) => {
        await supabase.from('contact_messages').delete().eq('id', id);
        setMessages(messages.filter(m => m.id !== id));
    };

    if (isLoading) {
        return (
            <div className="bg-white rounded-lg p-6 shadow-sm">
                <h2 className="font-serif text-xl mb-6">Contact Messages</h2>
                <div className="flex justify-center py-8">
                    <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="font-serif text-xl mb-6">Contact Messages ({messages.length})</h2>
            {messages.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No messages yet</p>
            ) : (
                <div className="space-y-4">
                    {messages.map((msg) => (
                        <div key={msg.id} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h3 className="font-medium">{msg.name}</h3>
                                    <p className="text-sm text-gray-500">{msg.email}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-gray-400">
                                        {new Date(msg.created_at).toLocaleDateString()}
                                    </span>
                                    <button
                                        onClick={() => handleDelete(msg.id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                            {msg.subject && (
                                <p className="text-sm font-medium text-gray-700 mb-1">
                                    Subject: {msg.subject}
                                </p>
                            )}
                            <p className="text-sm text-gray-600 whitespace-pre-wrap">{msg.message}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

// ============ Helper Components ============

const InputField = ({ label, value, onChange, type = "text" }: {
    label: string; value: string; onChange: (v: string) => void; type?: string
}) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <input type={type} value={value} onChange={(e) => onChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black" />
    </div>
);

const TextareaField = ({ label, value, onChange, rows = 3 }: {
    label: string; value: string; onChange: (v: string) => void; rows?: number
}) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={rows}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black" />
    </div>
);

const SaveButton = ({ onClick, className = "" }: { onClick: () => void; className?: string }) => (
    <button onClick={onClick} className={`btn-primary mt-4 ${className}`}>
        <Save className="w-4 h-4" /> Save Changes
    </button>
);

export default AdminDashboard;
