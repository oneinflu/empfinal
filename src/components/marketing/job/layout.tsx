"use client";

import { Opportunity } from "@/components/marketing/opportunity/types";
import { JobHeader } from "./header";
import { JobSidebar } from "./sidebar";
import { OpportunityContent } from "@/components/marketing/opportunity/content";
import { Zap, CheckCircle } from "@untitledui/icons";

export const JobDetailLayout = ({ opportunity }: { opportunity: Opportunity }) => {
    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <JobHeader opportunity={opportunity} />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
                <div className="grid lg:grid-cols-[1fr_360px] gap-8">
                    {/* Main Content */}
                    <div className="space-y-8">
                        {/* AI Fit Analysis (User Specific) - Premium Card */}
                        <div className="bg-white rounded-2xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden">
                            {/* Decorative gradient line */}
                            <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-green-400 to-emerald-600" />
                            
                            <div className="flex items-start justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 bg-green-50 rounded-xl">
                                        <Zap className="w-6 h-6 text-green-600 fill-current" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900">Why you're a good fit</h2>
                                        <p className="text-sm text-gray-500">Based on your profile analysis</p>
                                    </div>
                                </div>
                                <span className="bg-green-50 text-green-700 text-xs font-bold px-3 py-1.5 rounded-full border border-green-100 uppercase tracking-wide">
                                    Strong Match
                                </span>
                            </div>

                            <div className="grid sm:grid-cols-3 gap-4">
                                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                                    <div className="flex items-center gap-2 mb-2">
                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                        <span className="text-xs font-bold text-gray-900 uppercase">Skills</span>
                                    </div>
                                    <p className="text-sm text-gray-600 leading-snug">
                                        Your <strong>Engineering</strong> experience aligns perfectly.
                                    </p>
                                </div>
                                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                                    <div className="flex items-center gap-2 mb-2">
                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                        <span className="text-xs font-bold text-gray-900 uppercase">Experience</span>
                                    </div>
                                    <p className="text-sm text-gray-600 leading-snug">
                                        Matches <strong>3-8 Years</strong> requirement.
                                    </p>
                                </div>
                                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                                    <div className="flex items-center gap-2 mb-2">
                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                        <span className="text-xs font-bold text-gray-900 uppercase">Location</span>
                                    </div>
                                    <p className="text-sm text-gray-600 leading-snug">
                                        Matches <strong>{opportunity.location}</strong> preference.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <OpportunityContent opportunity={opportunity} />
                    </div>

                    {/* Sidebar */}
                    <div className="hidden lg:block relative">
                         <JobSidebar opportunity={opportunity} />
                    </div>
                </div>
            </div>
        </div>
    );
};
