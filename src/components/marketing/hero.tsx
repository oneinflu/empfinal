"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Zap } from "@untitledui/icons";
import { cx } from "@/utils/cx";

const CATEGORIES = [
    { 
        title: "Internships", 
        icon: "/icons/internships.avif", 
        href: "/internships",
        description: "Find your first break",
        accent: "group-hover:text-blue-600",
        bg: "group-hover:bg-blue-50"
    },
    { 
        title: "Jobs", 
        icon: "/icons/jobs.avif", 
        href: "/jobs",
        description: "Explore premium roles",
        accent: "group-hover:text-purple-600",
        bg: "group-hover:bg-purple-50"
    },
    { 
        title: "Mentorships", 
        icon: "/icons/mock-interviews.avif", 
        href: "/mentorships",
        description: "Learn from experts",
        accent: "group-hover:text-pink-600",
        bg: "group-hover:bg-pink-50"
    },
    { 
        title: "Courses", 
        icon: "/icons/courses.avif", 
        href: "/courses",
        description: "Upskill yourself",
        accent: "group-hover:text-yellow-600",
        bg: "group-hover:bg-yellow-50"
    },
];

export const HeroSection = () => {
    return (
        <section className="relative overflow-hidden bg-white">
            {/* Background Decoration */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-50/50 via-white to-white" />
            
            <div className="relative mx-auto max-w-7xl px-4 pt-16 pb-24 sm:px-6 lg:px-8 lg:pt-24">
                {/* Header Content */}
                <div className="flex flex-col items-center text-center">
                    {/* Floating Badge */}
                    <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-purple-100 bg-purple-50 px-4 py-1.5 shadow-sm transition-transform hover:scale-105">
                        <div className="flex size-5 items-center justify-center rounded-full bg-purple-600 text-white">
                            <Zap className="size-3" />
                        </div>
                        <span className="text-sm font-medium text-purple-900">
                            28Mn+ talent inspired to <span className="font-bold text-purple-700">#BeUnstoppable</span>
                        </span>
                    </div>

                    {/* Main Heading */}
                    <h1 className="mb-6 max-w-4xl text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl md:text-7xl">
                        Unlock Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-blue-600">Career!</span>
                    </h1>
                    
                    <p className="mb-12 max-w-2xl text-lg text-gray-600 md:text-xl">
                        Explore opportunities from across the globe to learn, showcase skills, gain CV points, and get hired by your dream company.
                    </p>
                </div>

                {/* Categories Grid/Scroll */}
                <div className="relative mx-auto max-w-6xl">
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                        {CATEGORIES.map((category) => (
                            <Link 
                                key={category.title}
                                href={category.href}
                                className={cx(
                                    "group relative flex flex-col items-center rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300",
                                    "hover:-translate-y-1 hover:border-transparent hover:shadow-xl",
                                    category.bg
                                )}
                            >
                                <div className="mb-4 relative size-16 transition-transform duration-300 group-hover:scale-110">
                                    <Image 
                                        src={category.icon} 
                                        alt={category.title}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <h3 className={cx("mb-1 text-lg font-bold text-gray-900 transition-colors text-center", category.accent)}>
                                    {category.title}
                                </h3>
                                <p className="text-xs font-medium text-gray-500 text-center">
                                    {category.description}
                                </p>
                                
                                {/* Hover Arrow */}
                                <div className={cx(
                                    "absolute bottom-4 opacity-0 transition-all duration-300 group-hover:opacity-100",
                                    category.accent
                                )}>
                                    <ArrowRight className="size-4" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
