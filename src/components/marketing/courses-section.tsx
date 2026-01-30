"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Clock, Star01, BookOpen01, CheckCircle } from "@untitledui/icons";
import { cx } from "@/utils/cx";
import { Button } from "@/components/base/buttons/button";

type CourseLevel = "Beginner" | "Intermediate" | "Advanced";

interface Course {
    id: string | number;
    title: string;
    instructor: string;
    thumbnail: string;
    level: CourseLevel;
    rating: number;
    students: string;
    price: string;
    originalPrice?: string;
    duration: string;
    lectures: number;
}

const COURSES: Course[] = [
    {
        id: 1,
        title: "Complete Python Bootcamp: Go from zero to hero in Python 3",
        instructor: "Jose Portilla",
        thumbnail: "/featured/1.webp", // Using placeholder
        level: "Beginner",
        rating: 4.6,
        students: "1.2k",
        price: "₹499",
        originalPrice: "₹3,499",
        duration: "22h 15m",
        lectures: 155
    },
    {
        id: 2,
        title: "The Web Developer Bootcamp 2026",
        instructor: "Colt Steele",
        thumbnail: "/featured/2.png",
        level: "Beginner",
        rating: 4.8,
        students: "850",
        price: "₹599",
        originalPrice: "₹4,000",
        duration: "64h",
        lectures: 402
    },
    {
        id: 3,
        title: "React - The Complete Guide (incl Hooks, React Router, Redux)",
        instructor: "Maximilian Schwarzmüller",
        thumbnail: "/featured/3.webp",
        level: "Intermediate",
        rating: 4.7,
        students: "2.1k",
        price: "₹699",
        originalPrice: "₹3,200",
        duration: "48h 30m",
        lectures: 320
    },
    {
        id: 4,
        title: "Advanced CSS and Sass: Flexbox, Grid, Animations and More!",
        instructor: "Jonas Schmedtmann",
        thumbnail: "/featured/1.webp",
        level: "Advanced",
        rating: 4.9,
        students: "500",
        price: "₹450",
        originalPrice: "₹2,500",
        duration: "28h",
        lectures: 120
    },
     {
        id: 5,
        title: "Machine Learning A-Z™: AI, Python & R + ChatGPT Prize [2026]",
        instructor: "Kirill Eremenko",
        thumbnail: "/featured/2.png",
        level: "Intermediate",
        rating: 4.5,
        students: "10k+",
        price: "₹499",
        originalPrice: "₹3,499",
        duration: "42h",
        lectures: 280
    },
    {
        id: 6,
        title: "The Complete Digital Marketing Course - 12 Courses in 1",
        instructor: "Rob Percival",
        thumbnail: "/featured/3.webp",
        level: "Beginner",
        rating: 4.5,
        students: "750k",
        price: "Free",
        originalPrice: "₹3,499",
        duration: "22h",
        lectures: 140
    },
    {
        id: 7,
        title: "Adobe XD to Webflow: The Complete Guide",
        instructor: "Vako Shvili",
        thumbnail: "/featured/1.webp",
        level: "Intermediate",
        rating: 4.8,
        students: "12k",
        price: "₹599",
        originalPrice: "₹2,000",
        duration: "14h",
        lectures: 85
    },
    {
        id: 8,
        title: "Docker and Kubernetes: The Complete Guide",
        instructor: "Stephen Grider",
        thumbnail: "/featured/2.png",
        level: "Advanced",
        rating: 4.7,
        students: "250k",
        price: "₹699",
        originalPrice: "₹4,000",
        duration: "21h",
        lectures: 110
    }
];

const TABS: { label: string; value: "All" | CourseLevel }[] = [
    { label: "All Courses", value: "All" },
    { label: "Beginner", value: "Beginner" },
    { label: "Intermediate", value: "Intermediate" },
    { label: "Advanced", value: "Advanced" },
];

export const CoursesSection = () => {
    const [activeTab, setActiveTab] = useState<"All" | CourseLevel>("All");

    const filteredCourses = activeTab === "All" 
        ? COURSES 
        : COURSES.filter(c => c.level === activeTab);

    return (
        <section className="py-16 bg-gray-50 border-b border-gray-200">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header & Tabs */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                    <div>
                         <div className="flex items-center gap-3 mb-2">
                            <div className="h-8 w-1.5 bg-yellow-500 rounded-full" />
                            <h2 className="text-2xl font-bold text-gray-900">Upskill with Courses</h2>
                        </div>
                        <p className="text-gray-500 pl-4.5 max-w-xl">
                            World-class learning for anyone, anywhere. Start learning today!
                        </p>
                    </div>

                    {/* Tabs */}
                    <div className="flex p-1 bg-white rounded-xl border border-gray-200 shadow-sm overflow-x-auto scrollbar-hide">
                        {TABS.map((tab) => (
                            <button
                                key={tab.value}
                                onClick={() => setActiveTab(tab.value)}
                                className={cx(
                                    "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap",
                                    activeTab === tab.value
                                        ? "bg-gray-900 text-white shadow-sm"
                                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                )}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Courses Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredCourses.map((course) => (
                        <Link 
                            key={course.id}
                            href={`/courses/${course.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                            className="group flex flex-col bg-white rounded-2xl border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-brand-200 cursor-pointer h-full"
                        >
                            {/* Thumbnail */}
                            <div className="relative aspect-video w-full bg-gray-100 overflow-hidden">
                                <Image
                                    src={course.thumbnail}
                                    alt={course.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute top-3 left-3">
                                    <span className={cx(
                                        "px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur-sm shadow-sm",
                                        course.level === "Beginner" ? "text-green-700" :
                                        course.level === "Intermediate" ? "text-blue-700" : "text-purple-700"
                                    )}>
                                        {course.level}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex flex-1 flex-col p-4">
                                <h3 className="text-base font-bold text-gray-900 line-clamp-2 mb-1 group-hover:text-brand-600 transition-colors">
                                    {course.title}
                                </h3>
                                <p className="text-xs text-gray-500 mb-3">
                                    By {course.instructor}
                                </p>

                                {/* Rating & Stats */}
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="flex items-center gap-1">
                                        <span className="text-sm font-bold text-orange-500">{course.rating}</span>
                                        <div className="flex text-orange-400">
                                            {[...Array(5)].map((_, i) => (
                                                <Star01 key={i} className={cx("w-3 h-3 fill-current", i < Math.floor(course.rating) ? "text-orange-400" : "text-gray-300")} />
                                            ))}
                                        </div>
                                    </div>
                                    <span className="text-xs text-gray-400">({course.students})</span>
                                </div>

                                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-2">
                                            <span className="text-lg font-bold text-gray-900">{course.price}</span>
                                            {course.originalPrice && (
                                                <span className="text-xs text-gray-400 line-through">{course.originalPrice}</span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-1 text-[10px] text-gray-500">
                                            <Clock className="w-3 h-3" /> {course.duration} • {course.lectures} lectures
                                        </div>
                                    </div>
                                    
                                    <span className="h-8 w-8 flex items-center justify-center rounded-full bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                                        <ChevronRight className="w-5 h-5" />
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Empty State */}
                {filteredCourses.length === 0 && (
                    <div className="py-20 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                            <BookOpen01 className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">No courses found</h3>
                        <p className="text-gray-500">Check back later for {activeTab} courses.</p>
                    </div>
                )}

                <div className="mt-12 text-center">
                    <Link href="/courses">
                        <Button color="secondary" size="lg" className="rounded-full px-8">
                            Explore All Courses
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};
