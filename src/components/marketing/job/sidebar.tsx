import { Button } from "@/components/base/buttons/button";
import { Opportunity } from "@/components/marketing/opportunity/types";
import { AlertCircle, CheckCircle, ArrowRight, Zap } from "@untitledui/icons";
import Link from "next/link";

export const JobSidebar = ({ opportunity }: { opportunity: Opportunity }) => {
    return (
        <div className="space-y-6">
            {/* Application Card - Floating & High Elevation */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 relative overflow-hidden">
                {/* Decorative background blur */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl opacity-50 -mr-16 -mt-16 pointer-events-none" />

                <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <span className="block text-sm font-medium text-gray-500 mb-1">Application Deadline</span>
                            <span className="text-lg font-bold text-gray-900">{opportunity.deadline}</span>
                        </div>
                        <span className="bg-red-50 text-red-700 text-xs font-bold px-3 py-1 rounded-full border border-red-100">
                            Closing Soon
                        </span>
                    </div>
                    
                    <Button className="w-full justify-center text-lg py-7 mb-4 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all transform hover:-translate-y-0.5" size="lg">
                        Apply Now
                    </Button>
                    
                    <div className="text-center text-sm text-gray-500 mb-6 flex items-center justify-center gap-2">
                        <div className="flex -space-x-2">
                            {[1,2,3].map(i => (
                                <div key={i} className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white" />
                            ))}
                        </div>
                        <span><span className="font-bold text-gray-900">3,402</span> applicants</span>
                    </div>

                    <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                        <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <div>
                                <span className="font-bold text-green-900 block mb-0.5">Top Candidate</span>
                                <p className="text-green-700 text-xs">Your profile is in the top 5% of applicants.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Skill Gap Analysis - Cleaner Look */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                    <div className="p-2 bg-orange-100 rounded-lg">
                        <Zap className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900 leading-tight">Skill Match Analysis</h3>
                        <p className="text-xs text-gray-500">1 critical skill missing</p>
                    </div>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 mb-4">
                    <div className="text-sm text-gray-700 mb-1">
                        Required skill: <span className="font-bold text-gray-900">System Design</span>
                    </div>
                    <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-orange-500 w-3/4" />
                    </div>
                </div>
                
                <Link href="/courses/system-design" className="block group">
                    <div className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors border border-transparent hover:border-gray-100">
                        <div className="w-12 h-12 bg-gray-200 rounded-lg flex-shrink-0" /> {/* Placeholder for course thumb */}
                        <div className="flex-1 min-w-0">
                            <div className="text-xs font-bold text-blue-600 mb-0.5 uppercase tracking-wide">Recommended</div>
                            <div className="font-bold text-gray-900 truncate">System Design Interview</div>
                            <div className="text-xs text-gray-500">By Ex-Google Lead • 4.9 ⭐</div>
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                    </div>
                </Link>
            </div>

            {/* Mentorship Promo - Gradient Card */}
            <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden group cursor-pointer">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-3xl opacity-10 -mr-10 -mt-10 group-hover:opacity-20 transition-opacity" />
                 
                 <h3 className="font-bold text-lg mb-2 relative z-10">Crack the Interview</h3>
                 <p className="text-indigo-100 text-sm mb-6 relative z-10">
                     Book a mock interview with an Industry Expert from {opportunity.company}.
                 </p>
                 <Link href="/mentorships/m1">
                    <Button size="sm" className="w-full justify-center bg-white text-indigo-600 hover:bg-indigo-50 border-transparent relative z-10 font-bold">
                        Book Session
                    </Button>
                 </Link>
            </div>
        </div>
    );
};
