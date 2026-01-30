"use client";

import { HeroSection } from "@/components/marketing/hero";
import { FeaturedSection } from "@/components/marketing/featured";
import { TrustedBySection } from "@/components/marketing/trusted-by";
import { ContentSlider, InfoCardProps } from "@/components/marketing/content-slider";
import { CoursesSection } from "@/components/marketing/courses-section";
import { Trophy01, Briefcase01, BookOpen01, Target05, CurrencyRupee, Clock, CheckCircle } from "@untitledui/icons";

// Mock Data Generators
const COMPETITIONS: InfoCardProps[] = [
    {
        id: 1,
        title: "Strike & Reign",
        subtitle: "Sri Guru Gobind Singh College of Commerce (SGGSCC), Delhi",
        logo: "/logos/1.webp",
        theme: "blue",
        tags: [
            { text: "Simulation Game +4", icon: <Target05 className="w-3.5 h-3.5" /> },
        ],
        meta: [
            { text: "Online" },
            { text: "Free" }
        ]
    },
    {
        id: 2,
        title: "Omnia'26",
        subtitle: "Xavier School of Management (XLRI), Delhi",
        logo: "/logos/2.webp",
        theme: "green",
        tags: [
             { text: "Prizes worth ₹25,000", icon: <CurrencyRupee className="w-3.5 h-3.5" />, className: "text-green-700" },
        ],
        meta: [
            { text: "Online" }
        ]
    },
    {
        id: 3,
        title: "The Hive Strategy Conclave",
        subtitle: "Hive School of Business",
        logo: "/logos/3.webp",
        theme: "purple",
        tags: [
            { text: "Business Plan +3", icon: <Briefcase01 className="w-3.5 h-3.5" /> },
        ],
        meta: [
            { text: "Online" }
        ]
    },
     {
        id: 4,
        title: "HUL L.I.M.E. Season 16",
        subtitle: "Hindustan Unilever Limited (HUL)",
        logo: "/logos/4.webp",
        theme: "orange",
        tags: [
            { text: "Case Study", icon: <BookOpen01 className="w-3.5 h-3.5" /> },
        ],
        meta: [
            { text: "Online" },
            { text: "PPI Opportunity" }
        ]
    }
];

const INTERNSHIPS: InfoCardProps[] = [
    {
        id: 1,
        title: "Software Development Intern",
        subtitle: "Microsoft India",
        logo: "/logos/5.webp",
        theme: "blue",
        tags: [
            { text: "Stipend ₹1.2L/mo", icon: <CurrencyRupee className="w-3.5 h-3.5" /> },
        ],
        meta: [
            { text: "Bangalore" },
            { text: "2 Months" }
        ]
    },
    {
        id: 2,
        title: "Product Design Intern",
        subtitle: "Cred",
        logo: "/logos/6.webp",
        theme: "purple",
        tags: [
            { text: "Stipend ₹80,000/mo", icon: <CurrencyRupee className="w-3.5 h-3.5" /> },
        ],
        meta: [
            { text: "Bangalore" },
            { text: "6 Months" }
        ]
    },
    {
        id: 3,
        title: "Marketing Intern",
        subtitle: "Zomato",
        logo: "/logos/7.webp",
        theme: "orange",
        tags: [
            { text: "Stipend ₹45,000/mo", icon: <CurrencyRupee className="w-3.5 h-3.5" /> },
        ],
        meta: [
            { text: "Gurgaon" },
            { text: "3 Months" }
        ]
    }
];

const JOBS: InfoCardProps[] = [
    {
        id: 1,
        title: "SDE-II (Backend)",
        subtitle: "Flipkart",
        logo: "/logos/8.webp",
        theme: "blue",
        tags: [
            { text: "₹24-35 LPA", icon: <CurrencyRupee className="w-3.5 h-3.5" /> },
        ],
        meta: [
            { text: "Bangalore" },
            { text: "Full Time" }
        ]
    },
    {
        id: 2,
        title: "Senior Product Manager",
        subtitle: "Razorpay",
        logo: "/logos/9.webp",
        theme: "green",
        tags: [
            { text: "₹40-55 LPA", icon: <CurrencyRupee className="w-3.5 h-3.5" /> },
        ],
        meta: [
            { text: "Bangalore" },
            { text: "Full Time" }
        ]
    }
];

export const HomeScreen = () => {
    return (
        <main className="flex min-h-screen flex-col bg-white">
            <HeroSection />
            <FeaturedSection />
            <TrustedBySection />
            
           

            <ContentSlider 
                title="Internships" 
                description="Apply to premium internships at top companies."
                viewAllLink="/internships"
                items={INTERNSHIPS}
            />

            <ContentSlider 
                title="Jobs" 
                description="Explore exclusive job opportunities for you."
                viewAllLink="/jobs"
                items={JOBS}
            />

            <CoursesSection />
             <ContentSlider 
                title="Competitions" 
                description="Uncover the most talked-about competitions today."
                viewAllLink="/competitions"
                items={COMPETITIONS}
            />
            
            {/* Additional content can be added here in the future */}
           
        </main>
    );
};
