"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Heart, Users01, Calendar, Trophy01 } from "@untitledui/icons";
import { cx } from "@/utils/cx";

const FEATURED_ITEMS = [
    {
        id: 1,
        title: "L&T OutThink 2026: PPIs and Cash Prize worth INR 2.25 Lakh!",
        image: "/featured/1.webp",
        tags: ["Online", "Free"],
        company: "L&T",
        registered: "12,453",
        daysLeft: "12 days left",
        prizes: "₹2.25 Lakhs"
    },
    {
        id: 2,
        title: "Spark-Wars 4.0 - Global Databricks Hackathon",
        image: "/featured/2.png",
        tags: ["Online", "Free"],
        company: "Databricks",
        registered: "8,921",
        daysLeft: "5 days left",
        prizes: "₹10 Lakhs"
    },
    {
        id: 3,
        title: "Hero Campus Challenge Season 10: PPIs & Prizes Worth ₹25 Lakhs",
        image: "/featured/3.webp",
        tags: ["Online", "Free"],
        company: "Hero MotoCorp",
        registered: "25,102",
        daysLeft: "20 days left",
        prizes: "₹25 Lakhs"
    },
    {
        id: 4,
        title: "Polycab Hiring Challenge 2026",
        image: "/featured/1.webp",
        tags: ["In Office", "Free"],
        company: "Polycab",
        registered: "5,300",
        daysLeft: "2 days left",
        prizes: "PPIs"
    },
     {
        id: 5,
        title: "TechGig Code Gladiators 2026",
        image: "/featured/3.webp",
        tags: ["Online", "Free"],
        company: "TechGig",
        registered: "1.2L",
        daysLeft: "45 days left",
        prizes: "₹50 Lakhs"
    }
];

export const FeaturedSection = () => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScrollButtons = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    const scroll = (direction: "left" | "right") => {
        if (scrollContainerRef.current) {
            const scrollAmount = 340; 
            const newScrollLeft = scrollContainerRef.current.scrollLeft + (direction === "right" ? scrollAmount : -scrollAmount);
            scrollContainerRef.current.scrollTo({
                left: newScrollLeft,
                behavior: "smooth"
            });
        }
    };

    return (
        <section className="py-16 bg-white relative group/section">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-10">
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-1.5 bg-brand-600 rounded-full" />
                        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Featured Opportunities</h2>
                    </div>
                    
                    {/* Desktop Navigation */}
                    <div className="hidden md:flex gap-3">
                        <button 
                            onClick={() => scroll("left")}
                            disabled={!canScrollLeft}
                            className={cx(
                                "p-3 rounded-full border border-gray-200 transition-all duration-200",
                                canScrollLeft 
                                    ? "text-gray-700 hover:border-brand-600 hover:text-brand-600 hover:bg-brand-50 cursor-pointer shadow-sm" 
                                    : "text-gray-300 cursor-not-allowed bg-gray-50"
                            )}
                            aria-label="Scroll left"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <button 
                            onClick={() => scroll("right")}
                            disabled={!canScrollRight}
                            className={cx(
                                "p-3 rounded-full border border-gray-200 transition-all duration-200",
                                canScrollRight 
                                    ? "text-gray-700 hover:border-brand-600 hover:text-brand-600 hover:bg-brand-50 cursor-pointer shadow-sm" 
                                    : "text-gray-300 cursor-not-allowed bg-gray-50"
                            )}
                            aria-label="Scroll right"
                        >
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Slider */}
                <div 
                    ref={scrollContainerRef}
                    onScroll={checkScrollButtons}
                    className="flex gap-6 overflow-x-auto pb-12 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                    {FEATURED_ITEMS.map((item) => (
                        <div 
                            key={item.id}
                            className="snap-start shrink-0 w-[240px] md:w-[280px] flex flex-col group cursor-pointer"
                        >
                            {/* Card Image Container */}
                            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-gray-100 shadow-sm border border-gray-100 transition-all duration-300 group-hover:shadow-xl group-hover:border-brand-100">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                
                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-70" />

                                {/* Top Badges */}
                                <div className="absolute top-4 left-4 flex gap-2">
                                    {item.tags.map(tag => (
                                        <span key={tag} className="px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-sm text-[10px] font-bold uppercase tracking-wider text-gray-900 shadow-sm">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Like Button */}
                                <button className="absolute top-4 right-4 p-2 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white hover:text-red-500 transition-all duration-200 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0">
                                    <Heart className="w-5 h-5" />
                                </button>

                                {/* Register Button Overlay */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
                                    <span className="bg-brand-600 text-white font-semibold text-sm py-3 px-8 rounded-full shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300 hover:bg-brand-700">
                                        Register Now
                                    </span>
                                </div>

                                {/* Bottom Info on Image */}
                                <div className="absolute bottom-4 left-4 right-4 text-white">
                                    <div className="flex items-center gap-4 text-xs font-medium text-white/90 mb-1">
                                        <div className="flex items-center gap-1.5">
                                            <Calendar className="w-3.5 h-3.5" />
                                            {item.daysLeft}
                                        </div>
                                        {item.prizes && (
                                            <div className="flex items-center gap-1.5">
                                                <Trophy01 className="w-3.5 h-3.5 text-yellow-400" />
                                                {item.prizes}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Content Below Image */}
                            <div className="mt-4 flex flex-col gap-2 px-1">
                                <h3 className="text-lg font-bold text-gray-900 leading-snug line-clamp-2 group-hover:text-brand-600 transition-colors">
                                    {item.title}
                                </h3>
                                
                                <div className="flex items-center justify-between mt-1">
                                    <p className="text-sm font-medium text-gray-500">
                                        {item.company}
                                    </p>
                                    <div className="flex items-center gap-1.5 text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-full border border-gray-100">
                                        <Users01 className="w-3.5 h-3.5" />
                                        {item.registered} Registered
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
