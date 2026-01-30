"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star01, Briefcase01, Building02, Calendar, ArrowRight, CurrencyRupee, VideoRecorder, Clock, CheckCircle, ShieldTick } from "@untitledui/icons";
import { cx } from "@/utils/cx";
import { AvatarProfilePhoto } from "@/components/base/avatar/avatar-profile-photo";

interface Mentor {
    id: string | number;
    name: string;
    role: string;
    company: string;
    companyLogo: string;
    image: string;
    rating: number;
    reviews: number;
    experience: string;
    skills: string[];
    price: string;
    sessionType: string;
    availability: string;
    coverColor: string;
}

const MENTORS: Mentor[] = [
    {
        id: 1,
        name: "Sarah Jenkins",
        role: "Senior Product Manager",
        company: "Google",
        companyLogo: "/logos/5.webp",
        image: "/featured/1.webp", // Placeholder, ideally use a person image
        rating: 4.9,
        reviews: 120,
        experience: "8+ years",
        skills: ["Product Strategy", "Roadmapping", "Leadership"],
        price: "₹2,000",
        sessionType: "1:1 Video Call",
        availability: "Weekends",
        coverColor: "bg-blue-100"
    },
    {
        id: 2,
        name: "David Ross",
        role: "Staff Software Engineer",
        company: "Netflix",
        companyLogo: "/logos/6.webp",
        image: "/featured/2.png",
        rating: 5.0,
        reviews: 85,
        experience: "10+ years",
        skills: ["System Design", "Backend", "Scalability"],
        price: "₹3,500",
        sessionType: "Mock Interview",
        availability: "Tue, Thu",
        coverColor: "bg-purple-100"
    },
    {
        id: 3,
        name: "Emily Chen",
        role: "Design Lead",
        company: "Airbnb",
        companyLogo: "/logos/7.webp",
        image: "/featured/3.webp",
        rating: 4.8,
        reviews: 210,
        experience: "6+ years",
        skills: ["UX Research", "UI Design", "Design Systems"],
        price: "₹2,500",
        sessionType: "Portfolio Review",
        availability: "Flexible",
        coverColor: "bg-rose-100"
    },
    {
        id: 4,
        name: "Michael Brown",
        role: "Engineering Manager",
        company: "Uber",
        companyLogo: "/logos/1.webp",
        image: "/featured/1.webp",
        rating: 4.9,
        reviews: 95,
        experience: "12+ years",
        skills: ["Career Growth", "Management", "Hiring"],
        price: "₹4,000",
        sessionType: "Career Guidance",
        availability: "Sat, Sun",
        coverColor: "bg-amber-100"
    }
];

export const MentorshipSection = () => {
    return (
        <section className="py-20 bg-white border-b border-gray-100 relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />
            </div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="h-8 w-1.5 bg-purple-600 rounded-full" />
                            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Master your Craft with Mentors</h2>
                        </div>
                        <p className="text-lg text-gray-500 pl-4.5">
                            Book 1:1 sessions with industry experts who have been in your shoes.
                        </p>
                    </div>

                    <Link 
                        href="/mentorships"
                        className="hidden md:flex items-center gap-2 text-base font-semibold text-brand-600 hover:text-brand-700 transition-colors group"
                    >
                        Explore all mentors
                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                {/* Mentors Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {MENTORS.map((mentor) => (
                        <div 
                            key={mentor.id}
                            className="group relative flex flex-col bg-white rounded-2xl border border-gray-200 hover:border-brand-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
                        >
                            {/* Header Gradient */}
                            <div className={cx("h-24 transition-colors duration-300", mentor.coverColor)} />
                            
                            {/* Avatar & Company */}
                            <div className="px-5 -mt-12 flex justify-between items-end">
                                <AvatarProfilePhoto 
                                    size="md" 
                                    src={mentor.image} 
                                    alt={mentor.name}
                                    className="border-4 border-white shadow-md bg-white"
                                />
                                <div className="mb-2 h-10 w-10 rounded-lg border border-gray-100 bg-white p-1.5 shadow-sm">
                                    <div className="relative w-full h-full">
                                        <Image
                                            src={mentor.companyLogo}
                                            alt={mentor.company}
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-5 pt-3 flex flex-col flex-1">
                                {/* Name & Role */}
                                <div className="mb-4">
                                    <div className="flex items-center justify-between mb-0.5">
                                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-brand-600 transition-colors">
                                            {mentor.name}
                                        </h3>
                                        <div className="flex items-center gap-1 text-xs font-semibold text-gray-700 bg-gray-50 px-2 py-0.5 rounded-full border border-gray-100">
                                            <Star01 className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                                            {mentor.rating}
                                        </div>
                                    </div>
                                    <p className="text-sm font-medium text-gray-500 line-clamp-1">{mentor.role}</p>
                                    <p className="text-xs text-gray-400">at {mentor.company}</p>
                                </div>

                                {/* Skills */}
                                <div className="flex flex-wrap gap-1.5 mb-6">
                                    {mentor.skills.slice(0, 2).map(skill => (
                                        <span key={skill} className="px-2 py-1 text-[10px] font-medium text-gray-600 bg-gray-50 rounded-md border border-gray-100">
                                            {skill}
                                        </span>
                                    ))}
                                    <span className="px-2 py-1 text-[10px] font-medium text-gray-400 bg-gray-50 rounded-md border border-gray-100">
                                        +{mentor.skills.length - 2} more
                                    </span>
                                </div>

                                {/* Footer Info */}
                                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">Starting at</span>
                                        <div className="flex items-center gap-0.5 text-gray-900 font-bold">
                                            {mentor.price}
                                            <span className="text-xs font-normal text-gray-500">/session</span>
                                        </div>
                                    </div>
                                    
                                    <button className="rounded-lg bg-gray-900 px-3 py-2 text-xs font-semibold text-white transition-all hover:bg-brand-600 shadow-sm hover:shadow-brand-200">
                                        Book Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 md:hidden flex justify-center">
                    <Link 
                        href="/mentorships"
                        className="flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700"
                    >
                        Explore all mentors
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
};
