import { Opportunity } from "@/components/marketing/opportunity/types";
import { Building01, MarkerPin01, Share01, Bookmark } from "@untitledui/icons";
import Image from "next/image";
import { Button } from "@/components/base/buttons/button";

export const JobHeader = ({ opportunity }: { opportunity: Opportunity }) => {
    return (
        <div className="bg-slate-900 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-10" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 relative z-10">
                <div className="flex flex-col lg:flex-row gap-8 items-start justify-between">
                    <div className="flex gap-6 items-start">
                        <div className="w-24 h-24 relative rounded-2xl overflow-hidden bg-white flex-shrink-0 shadow-lg">
                            <Image 
                                src={opportunity.logo} 
                                alt={opportunity.company} 
                                fill 
                                className="object-contain p-3"
                            />
                        </div>
                        <div className="space-y-4">
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold leading-tight text-white mb-2">
                                    {opportunity.title}
                                </h1>
                                <div className="flex flex-wrap items-center gap-4 text-slate-300 text-sm font-medium">
                                    <div className="flex items-center gap-1.5">
                                        <Building01 className="w-4 h-4" />
                                        <span>{opportunity.company}</span>
                                    </div>
                                    <div className="w-1 h-1 rounded-full bg-slate-600" />
                                    <div className="flex items-center gap-1.5">
                                        <MarkerPin01 className="w-4 h-4" />
                                        <span>{opportunity.location}</span>
                                    </div>
                                    <div className="w-1 h-1 rounded-full bg-slate-600" />
                                    <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-blue-400 border border-slate-700 text-xs">
                                        {opportunity.type}
                                    </span>
                                </div>
                            </div>
                            
                            <div className="flex gap-3">
                                <Button color="secondary" size="sm" className="bg-white/10 text-white border-transparent hover:bg-white/20">
                                    <Share01 className="w-4 h-4 mr-2" />
                                    Share
                                </Button>
                                <Button color="secondary" size="sm" className="bg-white/10 text-white border-transparent hover:bg-white/20">
                                    <Bookmark className="w-4 h-4 mr-2" />
                                    Save
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Match Score Badge - Glassmorphism */}
                    <div className="flex items-center gap-5 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-5 hover:bg-white/15 transition-colors">
                        <div className="relative w-14 h-14 flex items-center justify-center">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle cx="28" cy="28" r="24" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-white/10" />
                                <circle cx="28" cy="28" r="24" stroke="currentColor" strokeWidth="4" fill="transparent" strokeDasharray={150.7} strokeDashoffset={150.7 * (1 - 0.92)} className="text-green-400" />
                            </svg>
                            <span className="absolute text-sm font-bold text-white">92%</span>
                        </div>
                        <div>
                            <div className="font-bold text-white text-lg">Great Match</div>
                            <div className="text-sm text-slate-300">Top 2% of applicants</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
