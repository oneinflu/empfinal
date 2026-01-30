import { Mentorship } from "./types";
import { MarkerPin01, Globe01, Star01 } from "@untitledui/icons";
import Image from "next/image";

export const MentorshipHeader = ({ mentorship }: { mentorship: Mentorship }) => {
    return (
        <div className="bg-white border-b border-gray-200 pt-12 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                    {/* Profile Image */}
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-lg overflow-hidden relative flex-shrink-0">
                        <Image 
                            src={mentorship.mentor.image} 
                            alt={mentorship.mentor.name} 
                            fill 
                            className="object-cover"
                        />
                    </div>
                    
                    <div className="flex-1 space-y-4 pt-2">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-1">{mentorship.mentor.name}</h1>
                            <div className="text-lg text-gray-600 font-medium flex items-center gap-2">
                                {mentorship.mentor.role} at {mentorship.mentor.company}
                                <div className="w-6 h-6 relative rounded overflow-hidden border border-gray-100">
                                    <Image src={mentorship.mentor.companyLogo} alt={mentorship.mentor.company} fill className="object-contain" />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-6 text-sm text-gray-500">
                            <div className="flex items-center gap-2 bg-yellow-50 px-3 py-1 rounded-full border border-yellow-100 text-yellow-800">
                                <Star01 className="w-4 h-4 fill-current" />
                                <span className="font-bold">{mentorship.stats.rating}</span>
                                <span>({mentorship.stats.reviews} reviews)</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Globe01 className="w-4 h-4" />
                                <span>Speaks {mentorship.mentor.languages.join(", ")}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-gray-900">{mentorship.stats.experienceYears}+ Years</span>
                                <span>Experience</span>
                            </div>
                        </div>

                        {/* Social/Bio Links could go here */}
                    </div>
                </div>
            </div>
        </div>
    );
};
