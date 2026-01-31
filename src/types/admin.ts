// Admin content types for localStorage-based CMS

export interface SiteSettings {
    organizationName: string;
    tagline: string;
    contactEmail: string;
    contactPhone: string;
    address: string;
    socialLinks: {
        facebook?: string;
        twitter?: string;
        linkedin?: string;
        instagram?: string;
        youtube?: string;
    };
}

export interface HeroContent {
    headline: string;
    highlightWords: { text: string; type: 'mint' | 'coral' }[];
    interestOptions: { value: string; label: string }[];
    quickLinks: { name: string; href: string }[];
    backgroundImage?: string;
}

export interface Stat {
    id: string;
    number: string;
    label: string;
    order: number;
}

export interface Program {
    id: string;
    name: string;
    description: string;
    icon?: string;
    order: number;
}

export interface NewsItem {
    id: string;
    category: 'Story' | 'Event' | 'News';
    title: string;
    excerpt: string;
    content?: string;
    slug: string;
    date: string;
    image?: string;
    author?: string;
    featured: boolean;
}

export interface TeamMember {
    id: string;
    name: string;
    role: string;
    bio: string;
    image?: string;
    order: number;
}

export interface Partner {
    id: string;
    name: string;
    logo?: string;
    website?: string;
    order: number;
}

export interface AboutContent {
    mission: string;
    vision: string;
    history: string;
    values: { title: string; description: string }[];
}

export interface NavItem {
    id: string;
    name: string;
    href: string;
    children?: NavItem[];
    order: number;
}

export interface FooterSection {
    id: string;
    title: string;
    links: { name: string; href: string }[];
}

export interface AnnualReport {
    id: string;
    year: string;
    title: string;
    description: string;
    pdfUrl?: string;
    coverImage?: string;
}

export interface ImpactStory {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    image?: string;
    category: string;
    date: string;
    featured: boolean;
}

export interface ContactSettings {
    formEnabled: boolean;
    mapEmbedUrl?: string;
    officeHours: string;
    departments: { name: string; email: string; phone?: string }[];
}

// Helper type for all admin data
export interface AdminData {
    settings: SiteSettings;
    hero: HeroContent;
    stats: Stat[];
    programs: Program[];
    news: NewsItem[];
    team: TeamMember[];
    partners: Partner[];
    about: AboutContent;
    navigation: NavItem[];
    footer: FooterSection[];
    reports: AnnualReport[];
    stories: ImpactStory[];
    contact: ContactSettings;
}

// Default data
export const defaultAdminData: AdminData = {
    settings: {
        organizationName: "Kommunity Foundation",
        tagline: "Unlocking Human Potential",
        contactEmail: "info@kommunity.org",
        contactPhone: "+27 11 123 4567",
        address: "University of Johannesburg, South Africa",
        socialLinks: {}
    },
    hero: {
        headline: "At the heart of everything we do is the knowledge that our future lies in unlocking the most precious resource of all—human potential.",
        highlightWords: [
            { text: "unlocking", type: "mint" },
            { text: "human potential", type: "coral" }
        ],
        interestOptions: [
            { value: "programs", label: "Our Programs" },
            { value: "education", label: "Education Initiatives" },
            { value: "community", label: "Community Development" },
            { value: "research", label: "Research & Innovation" },
            { value: "stories", label: "Impact Stories" }
        ],
        quickLinks: [
            { name: "About Us", href: "/about" },
            { name: "Programs", href: "/programs" },
            { name: "News", href: "/news" },
            { name: "Impact Stories", href: "/impact-stories" }
        ]
    },
    stats: [
        { id: "1", number: "15+", label: "Years of Impact", order: 1 },
        { id: "2", number: "50+", label: "Programs", order: 2 },
        { id: "3", number: "10K+", label: "Lives Touched", order: 3 },
        { id: "4", number: "25", label: "Communities", order: 4 }
    ],
    programs: [
        { id: "1", name: "Education", description: "Building foundations for lifelong learning", order: 1 },
        { id: "2", name: "Community Development", description: "Strengthening local communities", order: 2 },
        { id: "3", name: "Research & Innovation", description: "Advancing knowledge for impact", order: 3 },
        { id: "4", name: "Youth Empowerment", description: "Nurturing tomorrow's leaders", order: 4 }
    ],
    news: [
        { id: "1", category: "Story", title: "Empowering Communities Through Education", excerpt: "How our programs are transforming lives across communities.", slug: "empowering-communities", date: "2026-01-15", featured: true },
        { id: "2", category: "Event", title: "Annual Community Summit 2026", excerpt: "Join us for our flagship event bringing together changemakers.", slug: "annual-summit-2026", date: "2026-03-20", featured: true }
    ],
    team: [
        { id: "1", name: "Prof. Khmaies Ouahada", role: "Founder & Director", bio: "Leading the foundation with vision and dedication.", order: 1 }
    ],
    partners: [],
    about: {
        mission: "To unlock human potential through education, research, and community development.",
        vision: "A world where every individual has the opportunity to reach their full potential.",
        history: "Founded with a vision to create lasting change in communities.",
        values: [
            { title: "Excellence", description: "Striving for the highest standards in everything we do." },
            { title: "Integrity", description: "Acting with honesty and transparency." },
            { title: "Impact", description: "Focusing on meaningful, measurable outcomes." }
        ]
    },
    navigation: [
        { id: "1", name: "About", href: "/about", order: 1 },
        { id: "2", name: "Programs", href: "/programs", order: 2 },
        { id: "3", name: "News", href: "/news", order: 3 },
        { id: "4", name: "Contact", href: "/contact", order: 4 }
    ],
    footer: [
        {
            id: "1", title: "Kommunity Foundation", links: [
                { name: "About", href: "/about" },
                { name: "Programs", href: "/programs" },
                { name: "News", href: "/news" },
                { name: "Contact", href: "/contact" }
            ]
        },
        {
            id: "2", title: "Get Involved", links: [
                { name: "Volunteer", href: "/get-involved" },
                { name: "Partner With Us", href: "/get-involved" },
                { name: "Events", href: "/news" }
            ]
        },
        {
            id: "3", title: "Resources", links: [
                { name: "Annual Reports", href: "/annual-reports" },
                { name: "Impact Stories", href: "/impact-stories" }
            ]
        }
    ],
    reports: [],
    stories: [],
    contact: {
        formEnabled: true,
        officeHours: "Monday - Friday: 8:00 AM - 5:00 PM",
        departments: [
            { name: "General Inquiries", email: "info@kommunity.org" }
        ]
    }
};
