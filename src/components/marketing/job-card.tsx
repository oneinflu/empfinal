import Image from "next/image";
import { Briefcase01, Clock, MarkerPin01, Share04 } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";

export interface JobCardProps {
    title: string;
    company: string;
    logoUrl?: string;
    type: string;
    location: string;
    locationType: "Remote" | "On-site" | "Hybrid";
    tags: string[];
    pills: string[];
    postedDate: string;
    daysLeft: number;
    salary?: string;
    experience: string;
}

export const JobCard = ({
    title,
    company,
    logoUrl,
    type,
    location,
    locationType,
    tags,
    pills,
    postedDate,
    daysLeft,
    salary,
    experience
}: JobCardProps) => {
    return (
        <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-xl font-bold text-gray-900">{title}</h3>
                    <p className="text-md font-medium text-gray-600 mt-1">{company}</p>
                </div>
                <div className="h-12 w-12 flex-shrink-0 rounded-lg border border-gray-100 bg-white p-2">
                    {logoUrl ? (
                        <Image src={logoUrl} alt={company} width={48} height={48} className="h-full w-full object-contain" />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gray-50 text-gray-400 font-bold text-xl rounded">
                            {company.charAt(0)}
                        </div>
                    )}
                </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">
                <div className="flex items-center gap-1.5">
                    <Briefcase01 className="w-4 h-4" />
                    <span>{experience}</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    <span>{type}</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <MarkerPin01 className="w-4 h-4" />
                    <span>{locationType} {location && `| ${location}`}</span>
                </div>
            </div>

            <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                {tags.map((tag, index) => (
                    <span key={index} className="flex items-center">
                        {tag}
                        {index < tags.length - 1 && <span className="mx-2 text-gray-300">•</span>}
                    </span>
                ))}
                {tags.length > 3 && <span className="text-gray-500">+{tags.length - 3}</span>}
            </div>

            <div className="flex flex-wrap gap-2 mt-2">
                {pills.map((pill, index) => (
                    <span key={index} className="px-3 py-1 rounded-full bg-gray-100 text-xs font-medium text-gray-600">
                        {pill}
                    </span>
                ))}
                
                {salary && (
                     <div className="ml-auto flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                        {salary}
                     </div>
                )}
            </div>

            <div className="flex items-center justify-between pt-4 mt-2 border-t border-gray-100">
                <div className="flex items-center gap-4 text-sm font-medium">
                    <span className="text-blue-600">Posted {postedDate}</span>
                    <span className="flex items-center gap-1 text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                        <span className="text-xs">⌛</span> {daysLeft} days left
                    </span>
                </div>
                <div className="flex gap-2">
                    <Button color="tertiary" size="sm" className="!p-2 text-gray-400 hover:text-gray-600">
                        <Share04 className="w-5 h-5" />
                    </Button>
                    <Button color="primary" size="sm">
                        Apply Now
                    </Button>
                </div>
            </div>
        </div>
    );
};
