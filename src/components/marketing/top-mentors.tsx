"use client";

import { useRef } from "react";
import { ArrowRight, Star01 as Star, ChevronLeft, ChevronRight, Briefcase01, GraduationHat01 } from "@untitledui/icons";
import { cx } from "@/utils/cx";
import Link from "next/link";

const MENTORS = [
  {
    id: 1,
    name: "Palak Gupta",
    role: "Consulting Analyst",
    company: "Accenture",
    education: "MBA (Gold Medalist)",
    rating: 4.9,
    reviews: 152,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&h=400",
  },
  {
    id: 2,
    name: "Ankit Aggarwal",
    role: "Founder & CEO",
    company: "Unstop",
    education: "MBA @MDI Gurgaon",
    rating: 4.8,
    reviews: 150,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&h=400",
  },
  {
    id: 3,
    name: "Shiri Agarwal",
    role: "Product Manager",
    company: "Telstra",
    education: "MBA @MDI Gurgaon'24",
    rating: 4.9,
    reviews: 256,
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&h=400",
  },
  {
    id: 4,
    name: "Rutwik Borkar",
    role: "Strategy Lead",
    company: "Flipkart",
    education: "IIT Madras Gold Medalist",
    rating: 4.9,
    reviews: 274,
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&h=400",
  },
  {
    id: 5,
    name: "Sarah Chen",
    role: "Senior Designer",
    company: "Airbnb",
    education: "RISD Alum",
    rating: 5.0,
    reviews: 112,
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=400&h=400",
  },
];

export function TopMentors() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl">
                <h2 className="text-3xl font-bold text-gray-900 tracking-tight sm:text-4xl">Top Mentors</h2>
                <p className="mt-4 text-lg text-gray-500">Explore the highest-rated mentors recognized by the learner community.</p>
            </div>
          
            <div className="hidden md:flex gap-2">
                <button 
                    onClick={() => scroll("left")}
                    className="p-3 rounded-full border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <button 
                    onClick={() => scroll("right")}
                    className="p-3 rounded-full border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>
        </div>

        {/* Carousel */}
        <div 
            ref={scrollContainerRef}
            className="flex gap-5 overflow-x-auto pb-8 pt-2 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 snap-x"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {MENTORS.map((mentor) => (
            <div 
                key={mentor.id} 
                className="group relative flex-none w-[260px] bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 snap-center overflow-hidden"
            >
                <div className="p-5 flex flex-col items-center">
                    {/* Compact Avatar */}
                    <div className="relative mb-4">
                        <img 
                            src={mentor.image} 
                            alt={mentor.name} 
                            className="w-16 h-16 rounded-full object-cover ring-2 ring-gray-50 group-hover:ring-blue-50 transition-all"
                        />
                        <div className="absolute -bottom-1 -right-1 bg-white px-1.5 py-0.5 rounded-full shadow-sm border border-gray-100 flex items-center gap-0.5">
                             <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                             <span className="text-[10px] font-bold text-gray-900">{mentor.rating}</span>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="text-center w-full mb-4">
                        <h3 className="text-base font-bold text-gray-900 mb-1 truncate">{mentor.name}</h3>
                        <p className="text-xs font-medium text-blue-600 mb-2 truncate">{mentor.role} @{mentor.company}</p>
                        
                        <div className="flex items-center justify-center gap-1.5 text-xs text-gray-500 bg-gray-50 py-1.5 px-3 rounded-md w-full">
                            <GraduationHat01 className="w-3.5 h-3.5 flex-shrink-0" />
                            <span className="truncate">{mentor.education}</span>
                        </div>
                    </div>

                    {/* Premium Button */}
                    <button className="w-full py-2 rounded-lg text-sm font-semibold transition-all duration-200 border border-gray-200 text-gray-700 bg-white hover:bg-gray-900 hover:text-white hover:border-gray-900">
                        View Profile
                    </button>
                </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 flex justify-center md:hidden">
            <Link href="/mentors" className="text-sm font-semibold text-gray-900 hover:underline">
                View all mentors
            </Link>
        </div>
      </div>
    </section>
  );
}
