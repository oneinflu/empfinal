"use client";

import { HeroSection } from "@/components/marketing/hero";
import { FeaturedSection } from "@/components/marketing/featured";
import { TrustedBySection } from "@/components/marketing/trusted-by";
import { ContentSlider, InfoCardProps } from "@/components/marketing/content-slider";
import { CoursesSection } from "@/components/marketing/courses-section";
import { MentorshipSection } from "@/components/marketing/mentorship-section";
import { CurrencyRupee } from "@untitledui/icons";

// Mock Data Generators
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
    },
    {
        id: 4,
        title: "Business Analyst Intern",
        subtitle: "Deloitte",
        logo: "/logos/1.webp",
        theme: "blue",
        tags: [
            { text: "Stipend ₹35,000/mo", icon: <CurrencyRupee className="w-3.5 h-3.5" /> },
        ],
        meta: [
            { text: "Hyderabad" },
            { text: "6 Months" }
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
    },
    {
        id: 3,
        title: "Frontend Engineer",
        subtitle: "Swiggy",
        logo: "/logos/2.webp",
        theme: "orange",
        tags: [
            { text: "₹18-28 LPA", icon: <CurrencyRupee className="w-3.5 h-3.5" /> },
        ],
        meta: [
            { text: "Remote" },
            { text: "Full Time" }
        ]
    },
    {
        id: 4,
        title: "Data Scientist",
        subtitle: "Amazon",
        logo: "/logos/3.webp",
        theme: "purple",
        tags: [
            { text: "₹30-45 LPA", icon: <CurrencyRupee className="w-3.5 h-3.5" /> },
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

            <MentorshipSection />

            <CoursesSection />
            
            {/* Additional content can be added here in the future */}
           
        </main>
    );
};
