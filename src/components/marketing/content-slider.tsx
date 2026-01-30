"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ChevronRight, Globe01, Trophy01, CurrencyRupee, Clock } from "@untitledui/icons";
import { cx } from "@/utils/cx";

export interface InfoCardProps {
    id: string | number;
    logo: string;
    title: string;
    subtitle: string;
    tags: { icon?: React.ReactNode; text: string; className?: string }[];
    meta: { icon?: React.ReactNode; text: string }[];
    theme?: "blue" | "green" | "purple" | "orange";
}

interface ContentSliderProps {
    title: string;
    description: string;
    viewAllLink: string;
    items: InfoCardProps[];
}

const THEME_STYLES = {
    blue: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-100" },
    green: { bg: "bg-green-50", text: "text-green-700", border: "border-green-100" },
    purple: { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-100" },
    orange: { bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-100" },
};

export const InfoCard = ({ logo, title, subtitle, tags, meta, theme = "blue" }: InfoCardProps) => {
    const styles = THEME_STYLES[theme];

    return (
        <div className="group relative flex h-[240px] w-[300px] shrink-0 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer">
            {/* Top Section with Theme Background */}
            <div className={cx("relative flex h-[120px] p-5", styles.bg)}>
                <div className="flex flex-1 flex-col justify-between gap-2">
                    {/* Tags */}
                    <div className="flex flex-col gap-1.5 items-start">
                        {tags.map((tag, idx) => (
                            <div key={idx} className={cx("flex items-center gap-1.5 text-xs font-semibold", tag.className || "text-gray-600")}>
                                {tag.icon}
                                <span>{tag.text}</span>
                            </div>
                        ))}
                    </div>
                    
                    {/* Meta Info (e.g. Online) */}
                    <div className="flex flex-wrap gap-2 mt-auto">
                        {meta.map((m, idx) => (
                            <div key={idx} className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
                                {m.icon || <Globe01 className="w-3.5 h-3.5" />}
                                <span>{m.text}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Logo Box */}
                <div className="absolute right-5 top-5 h-16 w-16 overflow-hidden rounded-lg border border-gray-200 bg-white p-1 shadow-sm">
                    <div className="relative h-full w-full">
                        <Image src={logo} alt={title} fill className="object-contain" />
                    </div>
                </div>
            </div>

            {/* Bottom Content */}
            <div className="flex flex-1 flex-col p-5">
                <h3 className="mb-1 text-base font-bold text-gray-900 line-clamp-1 group-hover:text-brand-600 transition-colors">
                    {title}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-2">
                    {subtitle}
                </p>
            </div>
        </div>
    );
};

export const ContentSlider = ({ title, description, viewAllLink, items }: ContentSliderProps) => {
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
            const scrollAmount = 320; 
            const newScrollLeft = scrollContainerRef.current.scrollLeft + (direction === "right" ? scrollAmount : -scrollAmount);
            scrollContainerRef.current.scrollTo({
                left: newScrollLeft,
                behavior: "smooth"
            });
        }
    };

    return (
        <section className="py-12 bg-white border-b border-gray-100">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex items-end justify-between mb-8">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-3">
                            <div className="h-8 w-1.5 bg-brand-600 rounded-full" />
                            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
                        </div>
                        <p className="text-gray-500 pl-4.5">{description}</p>
                    </div>

                    <Link 
                        href={viewAllLink}
                        className="hidden md:flex items-center gap-1.5 rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-100"
                    >
                        View All
                        <ChevronRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="relative">
                    {/* Navigation Buttons (Absolute centered vertically) */}
                    <div className="pointer-events-none absolute -left-4 -right-4 top-1/2 -translate-y-1/2 flex justify-between z-10 hidden md:flex">
                         <button 
                            onClick={() => scroll("left")}
                            disabled={!canScrollLeft}
                            className={cx(
                                "pointer-events-auto p-3 rounded-full border border-gray-200 bg-white shadow-lg transition-all duration-200",
                                canScrollLeft 
                                    ? "text-gray-700 hover:text-brand-600 hover:scale-110" 
                                    : "opacity-0 cursor-default"
                            )}
                            aria-label="Scroll left"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                         <button 
                            onClick={() => scroll("right")}
                            disabled={!canScrollRight}
                            className={cx(
                                "pointer-events-auto p-3 rounded-full border border-gray-200 bg-white shadow-lg transition-all duration-200",
                                canScrollRight 
                                    ? "text-gray-700 hover:text-brand-600 hover:scale-110" 
                                    : "opacity-0 cursor-default"
                            )}
                            aria-label="Scroll right"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Slider */}
                    <div 
                        ref={scrollContainerRef}
                        onScroll={checkScrollButtons}
                        className="flex gap-6 overflow-x-auto pb-4 pt-2 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0"
                        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                    >
                        {items.map((item) => (
                            <div key={item.id} className="snap-start">
                                <InfoCard {...item} />
                            </div>
                        ))}
                    </div>
                    
                    <div className="mt-6 md:hidden flex justify-center">
                         <Link 
                            href={viewAllLink}
                            className="flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700"
                        >
                            View All {title}
                            <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};
