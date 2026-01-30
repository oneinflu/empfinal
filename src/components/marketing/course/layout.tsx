import { Course } from "./types";
import { CourseHeader } from "./header";
import { CourseSidebar } from "./sidebar";
import { CourseContent } from "./content";

export const CourseDetailLayout = ({ course }: { course: Course }) => {
    return (
        <div className="min-h-screen bg-white pb-20">
            <CourseHeader course={course} />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
                <div className="grid lg:grid-cols-[1fr_360px] gap-12 relative">
                    {/* Main Content */}
                    <div>
                        <CourseContent course={course} />
                    </div>

                    {/* Sidebar */}
                    <div className="hidden lg:block">
                         <CourseSidebar course={course} />
                    </div>
                </div>
            </div>
        </div>
    );
};
