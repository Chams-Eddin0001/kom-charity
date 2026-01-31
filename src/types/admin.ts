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
        tagline: "Unlocking Human Potential Through Education & Research",
        contactEmail: "kouahada@uj.ac.za",
        contactPhone: "+27 11 559 3864",
        address: "Department of Electrical and Electronic Engineering Science, Faculty of Engineering and the Built Environment, University of Johannesburg, South Africa",
        socialLinks: {
            linkedin: "https://www.linkedin.com/in/khmaies-ouahada/",
        }
    },
    hero: {
        headline: "At the heart of everything we do is the knowledge that our future lies in unlocking the most precious resource of all—human potential through education, research, and innovation.",
        highlightWords: [
            { text: "unlocking", type: "mint" },
            { text: "human potential", type: "coral" }
        ],
        interestOptions: [
            { value: "programs", label: "Our Programs" },
            { value: "education", label: "Education Initiatives" },
            { value: "research", label: "Research & Innovation" },
            { value: "smart-tech", label: "Smart Technologies" },
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
        { id: "1", number: "186+", label: "Research Publications", order: 1 },
        { id: "2", number: "2100+", label: "Citations", order: 2 },
        { id: "3", number: "19+", label: "Postgraduate Students", order: 3 },
        { id: "4", number: "23", label: "H-Index", order: 4 }
    ],
    programs: [
        { id: "1", name: "Telecommunications & 5G Research", description: "Advancing wireless and wired communication technologies including 5G millimeter wave connectivity, power-line communications, and visible light communications.", order: 1 },
        { id: "2", name: "Artificial Intelligence & Machine Learning", description: "AI-driven solutions for medical imaging, drug-target interaction prediction, and intelligent systems for healthcare and education.", order: 2 },
        { id: "3", name: "Smart Home & Smart Cities", description: "Research on smart grid technologies, energy demand management, renewable energy, and sustainable intelligent infrastructure through the Smart Home Lab.", order: 3 },
        { id: "4", name: "Engineering Education", description: "Innovative pedagogical methods to enhance the training of future engineers with focus on constructivism and peer collaborative learning.", order: 4 }
    ],
    news: [
        { id: "1", category: "News", title: "Machine Learning for Medical Image Analysis", excerpt: "New research on transformer-inspired training principles for breast cancer prediction, combining EfficientNetB0 and ResNet50 architectures.", slug: "machine-learning-medical-image", date: "2025-01-15", featured: true, author: "Prof. Khmaies Ouahada" },
        { id: "2", category: "News", title: "Large Language Models in Education", excerpt: "A comprehensive review published on LLMs: addressing issues and solutions in learning environments for improved educational outcomes.", slug: "llm-education", date: "2024-12-10", featured: true, author: "Prof. Khmaies Ouahada" },
        { id: "3", category: "News", title: "5G Millimeter Wave Connectivity", excerpt: "New effective path loss modeling approach for 5G millimeter wave connectivity published, advancing telecommunications research.", slug: "5g-millimeter-wave", date: "2024-11-20", featured: false, author: "Prof. Khmaies Ouahada" }
    ],
    team: [
        { id: "1", name: "Prof. Khmaies Ouahada", role: "Founder & Director", bio: "Full Professor in the Department of Electrical and Electronic Engineering Science at the University of Johannesburg. Former Head of Department (2018-2021), Vice-Chancellor's Teaching and Learning Excellence Award recipient (2016), NRF-rated researcher (C3), IEEE Senior Member, and Chairman of the Smart Home Lab. DEng, MIng, BScEng.", order: 1 }
    ],
    partners: [
        { id: "1", name: "University of Johannesburg", website: "https://www.uj.ac.za", order: 1 },
        { id: "2", name: "IEEE", website: "https://www.ieee.org", order: 2 },
        { id: "3", name: "South African Institute of Electrical Engineers (SAIEE)", website: "https://www.saiee.org.za", order: 3 },
        { id: "4", name: "National Research Foundation (NRF)", website: "https://www.nrf.ac.za", order: 4 }
    ],
    about: {
        mission: "To unlock human potential through education, research, and innovation in electrical engineering, telecommunications, and smart technologies, contributing to South Africa's economic development by educating highly skilled engineers.",
        vision: "A world where every individual has access to quality education and the opportunity to contribute to technological advancement and sustainable development.",
        history: "Founded by Professor Khmaies Ouahada, a distinguished academic and researcher at the University of Johannesburg who completed his M.Eng. with distinction (2002) and D.Eng. (2009) degrees. With extensive experience in the telecommunications industry and over 186 research publications, Professor Ouahada established the Kommunity Foundation to extend his commitment to education and community development beyond academia. He serves as Chairman of the Smart Home Lab and is the founder and Co-Chairman of the Centre for Smart Communications Systems at UJ.",
        values: [
            { title: "Academic Excellence", description: "Striving for the highest standards in teaching, research, and innovation as demonstrated by numerous awards and recognition." },
            { title: "Integrity & Ethics", description: "Acting with honesty, transparency, and ethical values in all academic and community endeavors." },
            { title: "Mentorship", description: "Dedicated supervision and guidance of postdoctoral researchers, doctoral students, and master's students to foster the next generation of engineers." },
            { title: "Community Impact", description: "Going beyond traditional teaching by supporting students facing difficulties and ensuring access to essential academic resources." }
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
                { name: "Impact Stories", href: "/impact-stories" },
                { name: "Google Scholar", href: "https://scholar.google.com/citations?user=edQN5XwAAAAJ&hl=en" },
                { name: "Scopus Profile", href: "https://www.scopus.com/authid/detail.uri?authorId=13806775600" }
            ]
        }
    ],
    reports: [],
    stories: [],
    contact: {
        formEnabled: true,
        officeHours: "Monday - Friday: 8:00 AM - 5:00 PM",
        departments: [
            { name: "General Inquiries", email: "kouahada@uj.ac.za", phone: "+27 11 559 3864" },
            { name: "Smart Home Lab", email: "kouahada@uj.ac.za" },
            { name: "Centre for Smart Communications Systems", email: "kouahada@uj.ac.za" }
        ]
    }
};
