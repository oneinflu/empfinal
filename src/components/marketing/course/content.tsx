"use client";

import { useRef, useState, useMemo } from "react";
import { Course } from "./types";
import { Check, ChevronDown, ChevronUp, PlayCircle, Star01, BookOpen01, Briefcase01, Users01, ChevronLeft, ChevronRight } from "@untitledui/icons";
import { cx } from "@/utils/cx";
import Image from "next/image";
import Link from "next/link";
import { Avatar } from "@/components/base/avatar/avatar";
import { Button } from "@/components/base/buttons/button";
import { useParams } from "next/navigation";

export const CourseContent = ({ course }: { course: Course }) => {
    const [expandedSections, setExpandedSections] = useState<number[]>([0]);
    const params = useParams<{ slug: string }>();

    const toggleSection = (index: number) => {
        setExpandedSections(prev => 
            prev.includes(index) 
                ? prev.filter(i => i !== index)
                : [...prev, index]
        );
    };

   
    const totalLectures = course.curriculum.reduce((acc, curr) => acc + curr.lectures.length, 0);

    return (
        <div className="space-y-12">
            
            {/* What you'll learn */}
            <div className="border border-gray-100 p-8 rounded-2xl bg-white shadow-sm ring-1 ring-gray-900/5">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">What you'll learn</h2>
                <div className="grid md:grid-cols-2 gap-y-4 gap-x-8">
                    {course.learningOutcomes.map((outcome, i) => (
                        <div key={i} className="flex gap-3 items-start">
                            <div className="mt-1 p-1 rounded-full bg-green-50 text-green-600 flex-shrink-0">
                                <Check className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-gray-600 text-sm leading-relaxed">{outcome}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Curriculum */}
            <div>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Course Content</h2>
                    <div className="text-sm text-gray-500 font-medium">
                        {course.curriculum.length} sections • {totalLectures} lectures • {course.totalHours}h total length
                    </div>
                </div>
                
                <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm">
                    {course.curriculum.map((section, index) => {
                        const isExpanded = expandedSections.includes(index);
                        return (
                            <div key={index} className="border-b border-gray-100 last:border-0">
                                <button 
                                    onClick={() => toggleSection(index)}
                                    className={cx(
                                        "w-full flex items-center justify-between p-5 transition-colors text-left group",
                                        isExpanded ? "bg-gray-50/50" : "hover:bg-gray-50"
                                    )}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={cx(
                                            "transition-transform duration-200",
                                            isExpanded ? "rotate-180" : ""
                                        )}>
                                            <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
                                        </div>
                                        <span className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                                            {section.title}
                                        </span>
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        {section.lectures.length} lectures • {section.duration}
                                    </div>
                                </button>
                                
                                {isExpanded && (
                                    <div className="bg-white border-t border-gray-100">
                                        {section.lectures.map((lecture, lIndex) => (
                                            <div key={lIndex} className="flex items-center justify-between py-3 px-5 pl-14 hover:bg-gray-50 transition-colors group/item">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-1.5 rounded bg-gray-100 text-gray-400 group-hover/item:text-indigo-600 group-hover/item:bg-indigo-50 transition-colors">
                                                        <PlayCircle className="w-4 h-4" />
                                                    </div>
                                                    <span className="text-sm text-gray-600 group-hover/item:text-gray-900 transition-colors">
                                                        {lecture.title}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    {lecture.isPreview && (
                                                        <Link 
                                                            href={`/courses/${params.slug}/lesson/${index}/${lIndex}`}
                                                            className="text-xs text-indigo-600 font-bold bg-indigo-50 px-2 py-1 rounded cursor-pointer hover:bg-indigo-100 transition-colors"
                                                        >
                                                            Preview
                                                        </Link>
                                                    )}
                                                    <span className="text-sm text-gray-400 tabular-nums">{lecture.duration}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Requirements */}
            <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Requirements</h2>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <ul className="space-y-3">
                        {course.requirements.map((req, i) => (
                            <li key={i} className="flex gap-3 items-start text-gray-600">
                                <div className="mt-2 w-1.5 h-1.5 rounded-full bg-gray-300 flex-shrink-0" />
                                <span>{req}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Description */}
            <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Description</h2>
                <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                    <div 
                        className="prose prose-indigo max-w-none text-gray-600 prose-headings:text-gray-900 prose-strong:text-gray-900" 
                        dangerouslySetInnerHTML={{ __html: course.description }} 
                    />
                </div>
            </div>

            {/* Instructor */}
            <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Instructor</h2>
                <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                    <div>
                        <div className="text-xl font-bold text-indigo-600 underline mb-2 decoration-2 underline-offset-4 cursor-pointer hover:text-indigo-700">
                            {course.instructor.name}
                        </div>
                        <div className="text-gray-500 mb-6 font-medium">{course.instructor.role}</div>
                        
                        <div className="flex gap-6 mb-8">
                            <div className="w-28 h-28 rounded-full overflow-hidden relative border-4 border-gray-50 shadow-inner flex-shrink-0">
                                <Avatar size="lg" alt={course.instructor.name} src={course.instructor.image} initials={course.instructor.name.split(' ').map(n=>n[0]).join('').slice(0,2)} />
                            </div>
                            <div className="space-y-3 text-sm text-gray-600 py-2">
                                <div className="flex items-center gap-3">
                                    <Star01 className="w-5 h-5 text-yellow-400 fill-current" />
                                    <span className="font-semibold text-gray-900">{course.instructor.rating} Rating</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-5 h-5 flex items-center justify-center text-gray-400">
                                        <span className="font-bold text-lg leading-none">S</span>
                                    </div>
                                    <div className="flex gap-1">
                                        <span className="font-bold text-gray-900">{course.instructor.students.toLocaleString()}</span>
                                        <span>Students</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <PlayCircle className="w-5 h-5 text-gray-400" />
                                    <div className="flex gap-1">
                                        <span className="font-bold text-gray-900">{course.instructor.courses}</span>
                                        <span>Courses</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="text-gray-600 leading-relaxed text-sm">
                            {course.instructor.bio}
                        </div>
                    </div>
                </div>
            </div>

            {/* Reviews */}
            <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Reviews</h2>
                <div className="space-y-4">
                    {course.reviews.map((review, i) => (
                        <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                            <div className="flex gap-4">
                                <Avatar size="md" alt={review.user} src={review.avatar} initials={review.user.split(' ').map(n=>n[0]).join('').slice(0,2)} />
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="font-bold text-gray-900">{review.user}</div>
                                        <span className="text-sm text-gray-400">{review.date}</span>
                                    </div>
                                    <div className="flex items-center gap-1 mb-3">
                                        {[...Array(5)].map((_, r) => (
                                            <Star01 key={r} className={cx(
                                                "w-4 h-4",
                                                r < Math.floor(review.rating) ? "text-yellow-400 fill-current" : "text-gray-200"
                                            )} />
                                        ))}
                                    </div>
                                    <p className="text-gray-600 leading-relaxed">{review.comment}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Related Sections */}
            <div className="space-y-10">
                {/* Related Internships */}
                <div>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-1.5 h-6 bg-blue-600 rounded-full" />
                        <h2 className="text-xl font-bold text-gray-900">Related Internships</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { title: "Frontend Intern", company: "StartupX", location: "Remote" },
                            { title: "Backend Intern", company: "TechCore", location: "Bangalore" },
                            { title: "Full Stack Intern", company: "DevWorks", location: "Pune" },
                        ].map((item, i) => {
                            const slug = `${item.company}-${item.title}`.toLowerCase().replace(/[^a-z0-9]+/g, "-");
                            return (
                                <Link key={i} href={`/internships/${slug}`} className="block bg-white p-5 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-md transition">
                                    <div className="flex items-center gap-3 mb-2 text-blue-600">
                                        <Briefcase01 className="w-5 h-5" />
                                        <span className="font-bold">{item.title}</span>
                                    </div>
                                    <div className="text-sm text-gray-600">{item.company} • {item.location}</div>
                                </Link>
                            );
                        })}
                    </div>
                </div>

                {/* Related Jobs */}
                <div>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-1.5 h-6 bg-orange-600 rounded-full" />
                        <h2 className="text-xl font-bold text-gray-900">Related Jobs</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { title: "Junior React Developer", company: "Appify", location: "Hyderabad" },
                            { title: "Node.js Developer", company: "CloudNest", location: "Remote" },
                            { title: "Full Stack Engineer", company: "AlphaTech", location: "Gurgaon" },
                        ].map((item, i) => {
                            const slug = `${item.company}-${item.title}`.toLowerCase().replace(/[^a-z0-9]+/g, "-");
                            return (
                                <Link key={i} href={`/jobs/${slug}`} className="block bg-white p-5 rounded-2xl border border-gray-100 hover:border-orange-200 hover:shadow-md transition">
                                    <div className="flex items-center gap-3 mb-2 text-orange-600">
                                        <Briefcase01 className="w-5 h-5" />
                                        <span className="font-bold">{item.title}</span>
                                    </div>
                                    <div className="text-sm text-gray-600">{item.company} • {item.location}</div>
                                </Link>
                            );
                        })}
                    </div>
                </div>

                {/* Related Mentorships */}
                <div>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-1.5 h-6 bg-purple-600 rounded-full" />
                        <h2 className="text-xl font-bold text-gray-900">Related Mentorships</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { title: "Frontend Career Guidance", mentor: "Ananya Gupta" },
                            { title: "Backend System Design", mentor: "Rohan Mehta" },
                            { title: "Full Stack Roadmap", mentor: "Priya Sharma" },
                        ].map((item, i) => {
                            const slug = `${item.mentor}-${item.title}`.toLowerCase().replace(/[^a-z0-9]+/g, "-");
                            return (
                                <Link key={i} href={`/mentorships/${slug}`} className="block bg-white p-5 rounded-2xl border border-gray-100 hover:border-purple-200 hover:shadow-md transition">
                                    <div className="flex items-center gap-3 mb-2 text-purple-600">
                                        <Users01 className="w-5 h-5" />
                                        <span className="font-bold">{item.title}</span>
                                    </div>
                                    <div className="text-sm text-gray-600">Mentor: {item.mentor}</div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

function formatTime(seconds: number) {
    const s = Math.floor(seconds % 60);
    const m = Math.floor((seconds / 60) % 60);
    const h = Math.floor(seconds / 3600);
    const pad = (n: number) => n.toString().padStart(2, "0");
    return h > 0 ? `${pad(h)}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
}
