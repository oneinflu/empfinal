import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, PlayCircle } from "@untitledui/icons";
import { cx } from "@/utils/cx";

export interface Course {
    id: string | number;
    title: string;
    description: string;
    thumbnail: string;
    level: "Beginner" | "Intermediate" | "Advanced";
    modules: number;
    price: string; // "Free" for beginner
    slug: string;
}

interface CategoryCourseCardProps {
    course: Course;
}

export const CategoryCourseCard = ({ course }: CategoryCourseCardProps) => {
    return (
        <div className="group flex flex-col bg-white rounded-2xl border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-blue-200 h-full">
            {/* Thumbnail */}
            <div className="relative aspect-[16/9] w-full bg-gray-100 overflow-hidden">
                <Image
                    src={course.thumbnail}
                    alt={course.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Level Badge (Optional, since we filter by level, but good for context) */}
                <div className="absolute top-3 right-3">
                    <span className={cx(
                        "px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-sm border border-white/20",
                        course.level === "Beginner" ? "bg-green-500/90 text-white" :
                        course.level === "Intermediate" ? "bg-blue-500/90 text-white" : 
                        "bg-purple-500/90 text-white"
                    )}>
                        {course.level}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-5">
                {/* Modules Count */}
                <div className="flex items-center gap-2 text-gray-500 mb-3">
                    <PlayCircle className="w-4 h-4" />
                    <span className="text-xs font-medium">{course.modules} Modules</span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {course.title}
                </h3>
                
                <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                    {course.description}
                </p>

                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-900">
                        View Course
                    </span>
                    <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                </div>
            </div>
        </div>
    );
};
