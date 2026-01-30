"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ChevronRight } from "@untitledui/icons";
import { cx } from "@/utils/cx";

export interface CategoryItem {
    label: string;
    icon: React.ReactNode;
    href?: string;
    color?: "blue" | "purple" | "orange" | "green" | "pink" | "yellow" | "red" | "teal";
}

export interface PageHeroProps {
    titlePrefix: string;
    highlightedTitle: string;
    titleSuffix?: string;
    description: string;
    categories: CategoryItem[];
    themeColor?: "blue" | "purple" | "orange" | "green" | "pink" | "yellow";
    topTag?: React.ReactNode;
    rightContent?: React.ReactNode;
    customTitle?: React.ReactNode;
}

const CATEGORY_COLORS = {
    blue: "bg-blue-50 text-blue-700 group-hover:bg-blue-100",
    purple: "bg-purple-50 text-purple-700 group-hover:bg-purple-100",
    orange: "bg-orange-50 text-orange-700 group-hover:bg-orange-100",
    green: "bg-green-50 text-green-700 group-hover:bg-green-100",
    pink: "bg-pink-50 text-pink-700 group-hover:bg-pink-100",
    yellow: "bg-yellow-50 text-yellow-700 group-hover:bg-yellow-100",
    red: "bg-red-50 text-red-700 group-hover:bg-red-100",
    teal: "bg-teal-50 text-teal-700 group-hover:bg-teal-100",
};

const THEME_STYLES = {
    blue: { text: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100", hover: "group-hover:text-blue-600", iconBg: "group-hover:bg-blue-100" },
    purple: { text: "text-purple-600", bg: "bg-purple-50", border: "border-purple-100", hover: "group-hover:text-purple-600", iconBg: "group-hover:bg-purple-100" },
    orange: { text: "text-orange-600", bg: "bg-orange-50", border: "border-orange-100", hover: "group-hover:text-orange-600", iconBg: "group-hover:bg-orange-100" },
    green: { text: "text-green-600", bg: "bg-green-50", border: "border-green-100", hover: "group-hover:text-green-600", iconBg: "group-hover:bg-green-100" },
    pink: { text: "text-pink-600", bg: "bg-pink-50", border: "border-pink-100", hover: "group-hover:text-pink-600", iconBg: "group-hover:bg-pink-100" },
    yellow: { text: "text-yellow-600", bg: "bg-yellow-50", border: "border-yellow-100", hover: "group-hover:text-yellow-600", iconBg: "group-hover:bg-yellow-100" },
};

export const PageHero = ({ 
    titlePrefix, 
    highlightedTitle, 
    titleSuffix = "", 
    description, 
    categories, 
    themeColor = "blue",
    topTag,
    rightContent,
    customTitle
}: PageHeroProps) => {
    const styles = THEME_STYLES[themeColor];
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
            const scrollAmount = 300;
            const newScrollLeft = scrollContainerRef.current.scrollLeft + (direction === "right" ? scrollAmount : -scrollAmount);
            scrollContainerRef.current.scrollTo({
                left: newScrollLeft,
                behavior: "smooth"
            });
        }
    };

    return (
        <section className="bg-white pt-12 pb-16 md:pt-16 md:pb-20 overflow-hidden">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-12">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                        {/* Left Content */}
                        <div className="flex flex-col items-start gap-6 max-w-3xl">
                            {topTag && (
                                <div className="mb-2">
                                    {topTag}
                                </div>
                            )}
                            
                            {/* Title & Description */}
                            <div>
                                {customTitle ? customTitle : (
                                    <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-4">
                                        {titlePrefix} <span className={styles.text}>{highlightedTitle}</span>{titleSuffix}
                                    </h1>
                                )}
                                <p className="text-lg text-gray-500 max-w-2xl">
                                    {description}
                                </p>
                            </div>
                        </div>

                        {/* Right Content */}
                        {rightContent && (
                            <div className="hidden lg:block">
                                {rightContent}
                            </div>
                        )}
                    </div>

                    {/* Categories Carousel */}
                    <div className="relative w-full">
                        {/* Scroll Buttons */}
                      
                        {/* Scrollable Container */}
                        <div 
                            ref={scrollContainerRef}
                            onScroll={checkScrollButtons}
                            className="flex gap-4 overflow-x-auto pb-4 pt-2 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0"
                            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                        >
                            {categories.map((cat, idx) => {
                                const Card = (
                                    <div className={cx(
                                        "group flex min-w-[160px] flex-col items-center justify-center gap-3 rounded-2xl border border-transparent p-6 transition-all duration-200 hover:shadow-lg cursor-pointer",
                                        "h-[140px]",
                                        cat.color ? CATEGORY_COLORS[cat.color].split(' ')[0] : "bg-gray-50/50 hover:bg-white hover:border-gray-200"
                                    )}>
                                        <div className={cx(
                                            "flex h-10 w-10 items-center justify-center rounded-lg transition-colors duration-200",
                                            cat.color ? "bg-white/60" : styles.iconBg,
                                            cat.color ? CATEGORY_COLORS[cat.color].split(' ').slice(1).join(' ') : "text-gray-600"
                                        )}>
                                            {cat.icon}
                                        </div>
                                        <span className={cx(
                                            "text-sm font-semibold group-hover:text-gray-900 text-center",
                                            cat.color ? "text-gray-800" : "text-gray-700"
                                        )}>
                                            {cat.label}
                                        </span>
                                    </div>
                                );

                                return cat.href ? (
                                    <Link key={idx} href={cat.href} className="outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 rounded-2xl">
                                        {Card}
                                    </Link>
                                ) : (
                                    <div key={idx} onClick={() => {}} role="button" tabIndex={0} className="outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 rounded-2xl">
                                        {Card}
                                    </div>
                                );
                            })}
                            
                            {/* View All Circle Button */}
                            <div className="flex min-w-[60px] items-center justify-center">
                                <button 
                                    onClick={() => scroll("right")} 
                                    className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm transition-transform hover:scale-105"
                                >
                                    <ChevronRight className="w-5 h-5 text-gray-600" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
