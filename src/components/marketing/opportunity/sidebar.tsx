import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/base/buttons/button";
import { RelatedOpportunity } from "./types";
import { ArrowRight, Share01 } from "@untitledui/icons";

interface OpportunitySidebarProps {
    deadline: string; // e.g., "14 Days Left"
    featuredOpportunities: RelatedOpportunity[];
}

const getOpportunityLink = (type: string, id: string) => {
    switch (type.toLowerCase()) {
        case 'course':
            return `/courses/${id}`;
        case 'mentorship':
            return `/mentorships/${id}`;
        case 'internship':
            return `/internships/${id}`;
        case 'job':
        default:
            return `/jobs/${id}`;
    }
};

export const OpportunitySidebar = ({ deadline, featuredOpportunities }: OpportunitySidebarProps) => {
    return (
        <div className="space-y-6">
            {/* Quick Apply Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden">
                {/* Deadline Badge */}
                <div className="absolute top-0 left-0 bg-black text-white text-xs font-bold px-4 py-1.5 rounded-br-xl z-10">
                    {deadline}
                </div>

                <div className="mt-6 flex items-start gap-3 mb-6">
                    <div className="text-2xl">👋</div>
                    <div>
                        <h3 className="font-bold text-gray-900">Hi Welcome!</h3>
                        <p className="text-sm text-gray-500">Please register below.</p>
                    </div>
                </div>

                <Button className="w-full justify-center" size="lg">
                    Quick Apply
                </Button>
            </div>

            {/* Refer & Win Banner (Placeholder) */}
            <div className="relative aspect-[3/1] w-full bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 flex items-center justify-between px-6 overflow-hidden">
                <div>
                    <div className="font-bold text-blue-900">Refer & Win</div>
                    <div className="text-xs text-blue-600">Invite friends & earn rewards</div>
                </div>
                <Button size="sm" color="secondary" className="shadow-sm text-xs">
                    Refer now
                </Button>
            </div>

            {/* Featured Section */}
            <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="font-bold text-gray-900 mb-4">Featured</h3>
                <div className="space-y-4">
                    {featuredOpportunities.map((opp) => (
                        <Link 
                            key={opp.id} 
                            href={getOpportunityLink(opp.type, opp.id)}
                            className="block bg-white p-4 rounded-xl border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
                        >
                            <div className="flex gap-3">
                                <div className="w-10 h-10 relative rounded-lg overflow-hidden border border-gray-100 flex-shrink-0">
                                    <Image
                                        src={opp.logo}
                                        alt={opp.company}
                                        fill
                                        className="object-contain p-1"
                                    />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-gray-900 line-clamp-2 leading-tight mb-1">
                                        {opp.title}
                                    </h4>
                                    <p className="text-xs text-gray-500">{opp.type}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};
