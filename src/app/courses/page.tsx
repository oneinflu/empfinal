"use client";

import { useState } from "react";
import { PageHero } from "@/components/marketing/page-hero";
import { Laptop01, Code02, Clock, Terminal, Monitor01, Settings01 } from "@untitledui/icons";
import { LevelFilter } from "@/components/marketing/level-filter";
import { CategorySection } from "@/components/marketing/category-section";
import { Course } from "@/components/marketing/category-course-card";

// --- Mock Data Helpers ---

const getThumbnail = (index: number) => `/courses/${(index % 8) + 1}.webp`;

const generateCourseList = (
    baseId: number, 
    category: string, 
    topic: string, 
    titles: string[]
): Course[] => {
    return Array.from({ length: 8 }).map((_, i) => {
        const title = titles[i] || `${topic} Mastery Level ${i + 1}`;
        const level = i % 3 === 0 ? "Beginner" : i % 3 === 1 ? "Intermediate" : "Advanced";
        return {
            id: baseId + i,
            title: title,
            description: `Master ${topic} with our comprehensive curriculum. Learn fundamental and advanced concepts of ${topic} with ease!`,
            thumbnail: getThumbnail(i),
            level: level as "Beginner" | "Intermediate" | "Advanced",
            modules: 8 + (i * 2),
            price: level === "Beginner" ? "Free" : `₹${499 + (i * 100)}`,
            slug: `${category}-${topic}-${i}`.toLowerCase().replace(/\s+/g, '-')
        };
    });
};

// --- Coding Courses ---

const JAVA_TITLES = [
    "Java Programming with AI",
    "Java Basics with AI",
    "Java Intermediate with AI",
    "Java DSA with AI",
    "Advanced Java Patterns",
    "Java Spring Boot Masterclass",
    "Java Microservices Architecture",
    "Java for Android Development"
];

const PYTHON_TITLES = [
    "Python for Beginners",
    "Python Data Science Bootcamp",
    "Advanced Python Concepts",
    "Python AI & Machine Learning",
    "Python Web Scraping & Automation",
    "Django Full Stack Developer",
    "FastAPI for Modern Web APIs",
    "Python for Finance & Algorithmic Trading"
];

const CPP_TITLES = [
    "C++ Fundamentals & Pointers",
    "C++ STL Library Mastery",
    "Game Development with C++",
    "System Programming with C++",
    "C++ OOPs Concepts Deep Dive",
    "Competitive Programming with C++",
    "Embedded Systems with C++",
    "High Performance Computing C++"
];

const WEB_TITLES = [
    "HTML & CSS Mastery",
    "JavaScript Essentials",
    "React.js Deep Dive 2024",
    "Node.js Backend Developer",
    "Full Stack MERN Bootcamp",
    "Web Performance Optimization",
    "Next.js Enterprise Applications",
    "TypeScript for Large Scale Apps"
];

const CODING_COURSES: Course[] = [
    ...generateCourseList(100, "coding", "Java", JAVA_TITLES),
    ...generateCourseList(200, "coding", "Python", PYTHON_TITLES),
    ...generateCourseList(300, "coding", "C++", CPP_TITLES),
    ...generateCourseList(400, "coding", "Web", WEB_TITLES),
];

// --- Management Courses ---

const PM_TITLES = [
    "Product Management 101",
    "User Research Methods",
    "Product Roadmap Strategy",
    "Agile for Product Managers",
    "Metrics & Analytics for PMs",
    "Product Design Basics",
    "Growth Product Management",
    "Technical PM Fundamentals"
];

const LEADERSHIP_TITLES = [
    "Leadership Fundamentals",
    "High-Performance Team Building",
    "Conflict Resolution Strategies",
    "Executive Presence & Speaking",
    "Change Management Masterclass",
    "Emotional Intelligence at Work",
    "Strategic Decision Making",
    "Coaching & Mentoring Skills"
];

const STRATEGY_TITLES = [
    "Strategic Thinking for Leaders",
    "Business Model Innovation",
    "Competitive Strategy Analysis",
    "Corporate Strategy & M&A",
    "Go-to-Market Strategy",
    "Digital Transformation Strategy",
    "Blue Ocean Strategy",
    "Sustainability Strategy"
];

const MANAGEMENT_COURSES: Course[] = [
    ...generateCourseList(1000, "management", "PM", PM_TITLES),
    ...generateCourseList(1100, "management", "Leadership", LEADERSHIP_TITLES),
    ...generateCourseList(1200, "management", "Strategy", STRATEGY_TITLES),
];

// --- Accounting Courses ---

const ACCOUNTING_TITLES = [
    "Accounting Basics & Principles",
    "Financial Accounting Standards",
    "Managerial Accounting",
    "Taxation Principles & GST",
    "Auditing Fundamentals",
    "QuickBooks & Xero Mastery",
    "Forensic Accounting",
    "International Financial Reporting"
];

const FINANCE_TITLES = [
    "Personal Finance Mastery",
    "Corporate Finance Essentials",
    "Investment Banking & Valuation",
    "Financial Modeling in Excel",
    "Risk Management Strategies",
    "Stock Market Investing Basics",
    "Cryptocurrency & Blockchain",
    "Venture Capital Fundamentals"
];

const ACCOUNTING_COURSES: Course[] = [
    ...generateCourseList(2000, "accounting", "Accounting", ACCOUNTING_TITLES),
    ...generateCourseList(2100, "accounting", "Finance", FINANCE_TITLES),
];

// --- Category Structure ---

const CATEGORIES_DATA = [
    {
        id: "coding",
        title: "Coding",
        description: "Learn fundamental and advanced concepts of high-demand programming languages with ease!",
        color: "blue" as const,
        subCategories: [
            { label: "Java", courses: CODING_COURSES.filter(c => c.title.includes("Java")) },
            { label: "Python", courses: CODING_COURSES.filter(c => c.title.includes("Python") || c.title.includes("Django") || c.title.includes("FastAPI")) },
            { label: "C++", courses: CODING_COURSES.filter(c => c.title.includes("C++")) },
            { label: "Web Development", courses: CODING_COURSES.filter(c => ["HTML", "JavaScript", "React", "Node", "MERN", "Web", "Next.js", "TypeScript"].some(k => c.title.includes(k))) }
        ]
    },
    {
        id: "management",
        title: "Management",
        description: "Develop the leadership and strategic skills needed to excel in modern business environments.",
        color: "yellow" as const,
        subCategories: [
            { label: "Product Management", courses: MANAGEMENT_COURSES.filter(c => c.title.includes("Product") || c.title.includes("PM") || c.title.includes("User Research")) },
            { label: "Leadership", courses: MANAGEMENT_COURSES.filter(c => c.title.includes("Leadership") || c.title.includes("Team") || c.title.includes("Conflict") || c.title.includes("Executive") || c.title.includes("Change") || c.title.includes("Emotional") || c.title.includes("Coaching")) },
            { label: "Strategy", courses: MANAGEMENT_COURSES.filter(c => c.title.includes("Strategy") || c.title.includes("Strategic") || c.title.includes("Business Model") || c.title.includes("Digital Transformation")) }
        ]
    },
    {
        id: "accounting",
        title: "Accounting & Finance",
        description: "Master the language of business and make informed financial decisions.",
        color: "green" as const,
        subCategories: [
            { label: "Accounting", courses: ACCOUNTING_COURSES.filter(c => c.title.includes("Accounting") || c.title.includes("Taxation") || c.title.includes("Auditing") || c.title.includes("QuickBooks")) },
            { label: "Finance", courses: ACCOUNTING_COURSES.filter(c => c.title.includes("Finance") || c.title.includes("Banking") || c.title.includes("Risk") || c.title.includes("Stock") || c.title.includes("Cryptocurrency") || c.title.includes("Venture")) }
        ]
    }
];

import { FAQSection } from "@/components/marketing/faq-section";

const COURSE_FAQS = [
    {
        question: "On what devices can I access the course?",
        answer: "The course can be accessed on any device with an active internet connection. However, a laptop or PC will be required for attempting select projects and assignments."
    },
    {
        question: "For how long can I access the course after purchasing it?",
        answer: "Once purchased, you have lifetime access to the course content, including any future updates or additions to the curriculum."
    },
    {
        question: "What do I receive after completing a course?",
        answer: "Upon successful completion of all modules and assignments, you will receive a verified industry-recognized certificate that you can share on your LinkedIn profile."
    },
    {
        question: "What mode of payment options are available for purchasing a course?",
        answer: "We accept all major credit/debit cards, UPI, Net Banking, and popular wallets. EMI options are also available for select premium courses."
    },
    {
        question: "I have made payment for the course but I still cannot access it. What should I do?",
        answer: "Please check your email for a confirmation receipt. If you haven't received it within 30 minutes, contact our support team at support@empedia.com with your transaction ID."
    }
];

export default function CoursesPage() {
    const [selectedLevel, setSelectedLevel] = useState<"Beginner" | "Intermediate" | "Advanced">("Beginner");

    return (
        <main className="min-h-screen bg-gray-50 pb-20">
            <PageHero
                titlePrefix=""
                highlightedTitle=""
                description="From tech to non-tech, discover courses to upskill and advance your career!"
                customTitle={
                    <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-4 tracking-tight">
                        <span className="text-gray-500">Unlock</span> Courses
                    </h1>
                }
                topTag={
                    <div className="flex items-center gap-2 text-blue-600 font-bold mb-4">
                        <span className="text-xl">😎</span> 
                        <span className="tracking-wide">#BeUnstoppable</span>
                    </div>
                }
                rightContent={
                    <img 
                        src="/course.avif" 
                        alt="Courses" 
                        className="w-[500px] h-auto object-contain"
                    />
                }
                categories={[
                    { label: "Software Tools", icon: <Laptop01 className="w-6 h-6" />, color: "blue" },
                    { label: "Coding", icon: <Code02 className="w-6 h-6" />, color: "purple" },
                    { label: "Aptitude", icon: <Clock className="w-6 h-6" />, color: "yellow" },
                    { label: "Full Stack Web dev", icon: <Terminal className="w-6 h-6" />, color: "orange" },
                    { label: "Interview Plus", icon: <Monitor01 className="w-6 h-6" />, color: "purple" },
                    { label: "Management", icon: <Settings01 className="w-6 h-6" />, color: "yellow" },
                ]}
            />

            <div className="mt-12">
                <LevelFilter selectedLevel={selectedLevel} onSelect={setSelectedLevel} />
                
                <div className="flex flex-col gap-12">
                    {CATEGORIES_DATA.map((category) => (
                        <CategorySection
                            key={category.id}
                            title={category.title}
                            description={category.description}
                            color={category.color}
                            subCategories={category.subCategories}
                            selectedLevel={selectedLevel}
                        />
                    ))}
                </div>
            </div>

            <div className="mt-20">
                <FAQSection items={COURSE_FAQS} />
            </div>
        </main>
    );
}
