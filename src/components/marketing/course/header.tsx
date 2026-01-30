 "use client";
 
import { 
    Star01, 
    Share04, 
    Heart, 
    LayersTwo01, 
    CodeBrowser, 
    Clock, 
    Download01, 
    Award01
} from "@untitledui/icons";
import { Course } from "./types";
import Image from "next/image";
import { cx } from "@/utils/cx";
import { Avatar } from "@/components/base/avatar/avatar";

export const CourseHeader = ({ course }: { course: Course }) => {
    return (
        <div className="relative bg-slate-900">
            {/* Top Section: White with rounded bottom */}
            <div className="bg-white relative z-10 rounded-b-[40px] overflow-hidden">
                {/* Background Pattern - Optional subtle touch */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        {/* Left Column: Content */}
                        <div className="space-y-8 relative">
                            {/* Breadcrumbs */}
                            <div className="flex items-center gap-2 text-sm font-medium">
                                <span className="text-gray-500 hover:text-gray-900 transition-colors cursor-pointer">Courses</span>
                                <span className="text-gray-300">/</span>
                                <span className="text-gray-500 hover:text-gray-900 transition-colors cursor-pointer">Development</span>
                                <span className="text-gray-300">/</span>
                                <span className="text-gray-900 truncate max-w-[200px]">{course.title}</span>
                            </div>

                            <div className="space-y-6">
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.1]">
                                    {course.title}
                                </h1>
                                
                                <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
                                    {course.subtitle}
                                </p>

                                {/* Meta Row: Rating & Students */}
                                <div className="flex flex-wrap items-center gap-6">
                                    <div className="flex items-center gap-2 bg-yellow-50 px-3 py-1.5 rounded-full border border-yellow-100">
                                        <span className="font-bold text-yellow-700">{course.rating}</span>
                                        <div className="flex text-yellow-400">
                                            {[...Array(5)].map((_, i) => (
                                                <Star01 key={i} className={cx(
                                                    "w-4 h-4",
                                                    i < Math.floor(course.rating) ? "fill-current" : "text-yellow-200"
                                                )} />
                                            ))}
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-3">
                                        <div className="flex -space-x-3">
                                            {["Sarah Jenkins","Michael Chen","Aarav Singh"].map((name, i) => (
                                                <div key={i} className="border-2 border-white rounded-full">
                                                    <Avatar size="sm" alt={name} initials={name.split(' ').map(n=>n[0]).join('').slice(0,2)} src={`https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`} />
                                                </div>
                                            ))}
                                        </div>
                                        <span className="text-gray-700 font-semibold">
                                            ~{course.students.toLocaleString()} <span className="text-gray-500 font-normal">Enrolled Learners</span>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-wrap items-center gap-4 pt-2">
                                <button className="flex items-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-indigo-200 transition-all hover:scale-[1.02] active:scale-[0.98]">
                                    <span>Enroll Now</span>
                                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-sm font-semibold bg-white/15">
                                        {course.price.currency}{course.price.current}
                                    </span>
                                </button>
                                
                                <button className="p-4 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">
                                    <Share04 className="w-5 h-5" />
                                </button>
                                
                                <button className="p-4 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-red-500 hover:border-red-100 transition-colors group">
                                    <Heart className="w-5 h-5 group-hover:fill-current" />
                                </button>
                            </div>
                        </div>

                        {/* Right Column: Hero Image */}
                        <div className="relative hidden lg:block">
                            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-500 border-4 border-white">
                                <Image 
                                    src={course.thumbnail} 
                                    alt={course.title} 
                                    fill 
                                    className="object-cover" 
                                />
                            </div>
                            
                            {/* Decorative Background Blur */}
                            <div className="absolute -inset-4 bg-indigo-500/20 blur-3xl -z-10 rounded-full" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Section: Stats Grid */}
            <div className="relative z-0 pt-16 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
                        <StatsCard 
                            icon={LayersTwo01}
                            value={course.totalModules}
                            label="Total Modules"
                            color="text-purple-400"
                            bg="bg-purple-500/10"
                        />
                        <StatsCard 
                            icon={CodeBrowser}
                            value={course.totalHandsOnExercises}
                            label="Hands-On Exercises"
                            color="text-blue-400"
                            bg="bg-blue-500/10"
                        />
                        <StatsCard 
                            icon={Clock}
                            value={course.totalHours}
                            label="Hours of Content"
                            color="text-orange-400"
                            bg="bg-orange-500/10"
                        />
                        <StatsCard 
                            icon={Download01}
                            value={course.totalResources.toString().padStart(2, '0')}
                            label="Resources"
                            color="text-green-400"
                            bg="bg-green-500/10"
                        />
                        <StatsCard 
                            icon={Award01}
                            value={course.certificateAvailable ? "Yes" : "No"}
                            label="Certification"
                            subLabel="of Completion"
                            color="text-pink-400"
                            bg="bg-pink-500/10"
                            isText
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

const StatsCard = ({ 
    icon: Icon, 
    value, 
    label, 
    subLabel,
    color, 
    bg,
    isText = false
}: { 
    icon: any, 
    value: string | number, 
    label: string, 
    subLabel?: string,
    color: string, 
    bg: string,
    isText?: boolean
}) => (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center text-center group hover:bg-white/10 transition-all duration-300 hover:-translate-y-1">
        <div className={cx("w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110", bg, color)}>
            <Icon className="w-6 h-6" />
        </div>
        <div className={cx("font-bold text-white mb-1", isText ? "text-lg" : "text-2xl")}>
            {value}
        </div>
        <div className="text-sm text-gray-400 font-medium">
            {label}
            {subLabel && <div className="text-xs opacity-75">{subLabel}</div>}
        </div>
    </div>
);
