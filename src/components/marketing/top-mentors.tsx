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

        {/* List */}
        <div 
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
            {MENTORS.map((mentor) => (
                <Link 
                    href={`/mentorships/${mentor.id}`} 
                    key={mentor.id}
                    className="min-w-[280px] md:min-w-[320px] snap-start group"
                >
                    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl hover:border-blue-100 transition-all duration-300 h-full flex flex-col">
                        <div className="relative h-48 overflow-hidden">
                            <img 
                                src={mentor.image} 
                                alt={mentor.name} 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 text-xs font-semibold shadow-sm">
                                <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                                {mentor.rating}
                            </div>
                        </div>
                        
                        <div className="p-5 flex-1 flex flex-col">
                            <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{mentor.name}</h3>
                            <p className="text-sm text-gray-600 mb-4">{mentor.role} at {mentor.company}</p>
                            
                            <div className="space-y-2 mb-6 flex-1">
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <GraduationHat01 className="w-4 h-4 text-gray-400" />
                                    <span className="truncate">{mentor.education}</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <Briefcase01 className="w-4 h-4 text-gray-400" />
                                    <span>{mentor.reviews} sessions completed</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                                <span className="text-sm font-semibold text-gray-900">View Profile</span>
                                <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                                    <ArrowRight className="w-4 h-4" />
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
      </div>
    </section>
  );
}
