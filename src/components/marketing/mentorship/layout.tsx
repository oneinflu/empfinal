import { Mentorship } from "./types";
import { MentorshipHeader } from "./header";
import { MentorshipSidebar } from "./sidebar";
import { MentorshipContent } from "./content";

export const MentorshipDetailLayout = ({ mentorship }: { mentorship: Mentorship }) => {
    return (
        <div className="min-h-screen bg-white pb-20">
            <MentorshipHeader mentorship={mentorship} />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
                <div className="grid lg:grid-cols-[1fr_380px] gap-12 relative">
                    {/* Main Content */}
                    <div>
                        <MentorshipContent mentorship={mentorship} />
                    </div>

                    {/* Sidebar */}
                    <div className="hidden lg:block">
                         <MentorshipSidebar mentorship={mentorship} />
                    </div>
                </div>
            </div>
        </div>
    );
};
