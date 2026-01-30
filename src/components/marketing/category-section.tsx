"use client";

import { useState, useRef } from "react";
import { CategoryCourseCard, Course } from "./category-course-card";
import { cx } from "@/utils/cx";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "@untitledui/icons";
import Link from "next/link";

interface SubCategory {
    label: string;
    courses: Course[];
}

interface CategorySectionProps {
    title: string;
    description: string;
    color: "blue" | "purple" | "orange" | "green" | "pink" | "yellow" | "red" | "teal";
    subCategories: SubCategory[];
    selectedLevel: "Beginner" | "Intermediate" | "Advanced";
}

const THEME_COLORS = {
    blue: "bg-blue-600",
    purple: "bg-purple-600",
    orange: "bg-orange-600",
    green: "bg-green-600",
    pink: "bg-pink-600",
    yellow: "bg-yellow-500", 
    red: "bg-red-600",
    teal: "bg-teal-600",
};

export const CategorySection = ({ 
    title, 
    description, 
    color, 
    subCategories, 
    selectedLevel 
}: CategorySectionProps) => {
    const [activeSubCategory, setActiveSubCategory] = useState(subCategories[0]?.label);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const activeSubData = subCategories.find(s => s.label === activeSubCategory);
    
    // Filter courses by the global level selection
    const filteredCourses = activeSubData?.courses.filter(c => c.level === selectedLevel) || [];

    const checkScrollButtons = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    const scroll = (direction: "left" | "right") => {
        if (scrollContainerRef.current) {
            const scrollAmount = 400;
            const newScrollLeft = scrollContainerRef.current.scrollLeft + (direction === "right" ? scrollAmount : -scrollAmount);
            scrollContainerRef.current.scrollTo({
                left: newScrollLeft,
                behavior: "smooth"
            });
        }
    };

    return (
        <section className="py-12 border-b border-gray-100 last:border-0 overflow-hidden">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className={cx("w-1.5 h-8 rounded-full", THEME_COLORS[color])} />
                            <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
                        </div>
                        <p className="text-gray-500 text-lg max-w-2xl pl-4.5">
                            {description}
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Scroll Controls (Only show if needed) */}
                        {filteredCourses.length > 3 && (
                            <div className="hidden md:flex gap-2">
                                <button 
                                    onClick={() => scroll("left")}
                                    disabled={!canScrollLeft}
                                    className={cx(
                                        "p-2 rounded-full border border-gray-200 bg-white transition-all duration-200",
                                        canScrollLeft ? "hover:bg-gray-50 text-gray-700 shadow-sm" : "opacity-50 cursor-not-allowed text-gray-300"
                                    )}
                                >
                                    <ArrowLeft className="w-5 h-5" />
                                </button>
                                <button 
                                    onClick={() => scroll("right")}
                                    disabled={!canScrollRight}
                                    className={cx(
                                        "p-2 rounded-full border border-gray-200 bg-white transition-all duration-200",
                                        canScrollRight ? "hover:bg-gray-50 text-gray-700 shadow-sm" : "opacity-50 cursor-not-allowed text-gray-300"
                                    )}
                                >
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Subcategories Pills */}
                <div className="flex flex-wrap gap-3 mb-8 pl-4.5">
                    {subCategories.map((sub) => (
                        <button
                            key={sub.label}
                            onClick={() => setActiveSubCategory(sub.label)}
                            className={cx(
                                "px-5 py-2 rounded-full text-sm font-semibold border transition-all duration-200",
                                activeSubCategory === sub.label
                                    ? "bg-gray-900 text-white border-gray-900"
                                    : "bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                            )}
                        >
                            {sub.label}
                        </button>
                    ))}
                </div>

                {/* Courses Slider */}
                <div className="pl-4.5 relative">
                    {filteredCourses.length > 0 ? (
                        <div 
                            ref={scrollContainerRef}
                            onScroll={checkScrollButtons}
                            className="flex gap-6 overflow-x-auto pb-8 -mb-8 scrollbar-hide snap-x snap-mandatory"
                            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                        >
                            {filteredCourses.map((course) => (
                                <div key={course.id} className="min-w-[280px] sm:min-w-[320px] snap-start">
                                    <CategoryCourseCard course={course} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="py-12 flex flex-col items-center justify-center text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                            <p className="text-gray-500 font-medium">
                                No {selectedLevel.toLowerCase()} courses available for {activeSubCategory} yet.
                            </p>
                            <p className="text-sm text-gray-400 mt-1">
                                Check back later or try another category!
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};
