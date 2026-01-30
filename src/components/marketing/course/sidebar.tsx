import { Button } from "@/components/base/buttons/button";
import { Course } from "./types";
import { 
    Play, 
    File02, 
    Infinity as InfinityIcon, 
    Trophy01, 
    Monitor01,
    Check,
    Clock
} from "@untitledui/icons";
import { cx } from "@/utils/cx";

export const CourseSidebar = ({ course }: { course: Course }) => {
    const getIconForFeature = (text: string) => {
        const t = text.toLowerCase();
        if (t.includes("video")) return <Play className="w-4 h-4" />;
        if (t.includes("exercise") || t.includes("code")) return <File02 className="w-4 h-4" />;
        if (t.includes("mobile") || t.includes("tv")) return <Monitor01 className="w-4 h-4" />;
        if (t.includes("lifetime")) return <InfinityIcon className="w-4 h-4" />;
        if (t.includes("certificate")) return <Trophy01 className="w-4 h-4" />;
        return <Check className="w-4 h-4" />;
    };

    return (
        <div className="sticky top-24 space-y-6">
            {/* Main Purchase Card */}
            <div className="bg-white rounded-2xl shadow-[0_2px_12px_-2px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden ring-1 ring-gray-900/5">
                {/* Header / Price */}
                <div className="p-6 border-b border-gray-50 bg-gradient-to-b from-white to-gray-50/50">
                    <div className="flex items-end gap-3 mb-2">
                        <div className="text-4xl font-bold text-gray-900 tracking-tight">
                            {course.price.currency}{course.price.current}
                        </div>
                        <div className="text-lg text-gray-400 line-through mb-1.5 font-medium">
                            {course.price.currency}{course.price.original}
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-700">
                            {course.price.discountPercentage}% Discount
                        </span>
                        <span className="text-sm text-red-600 font-medium flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            2 days left!
                        </span>
                    </div>
                </div>

                <div className="p-6 space-y-6">
                    {/* Actions */}
                    <div className="space-y-3">
                        <Button className="w-full justify-center text-lg h-12 font-semibold shadow-md shadow-indigo-500/20 transition-transform active:scale-[0.98]" size="lg" color="primary">
                            Add to Cart
                        </Button>
                        <Button 
                            className="w-full justify-center text-lg h-12 font-semibold bg-white border-2 border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-900 transition-colors" 
                            size="lg"
                        >
                            Buy Now
                        </Button>
                    </div>

                    <div className="text-center space-y-2">
                        <div className="text-xs font-medium text-gray-500">30-Day Money-Back Guarantee</div>
                        <div className="text-xs text-gray-400">Full Lifetime Access</div>
                    </div>

                    {/* Includes */}
                    <div className="pt-6 border-t border-gray-100">
                        <div className="font-bold text-gray-900 mb-4 text-xs uppercase tracking-wider text-gray-500">This course includes:</div>
                        <ul className="space-y-4">
                            {course.features.map((feature, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm text-gray-600 group">
                                    <div className="mt-0.5 min-w-4 text-indigo-600">
                                        {getIconForFeature(feature)}
                                    </div>
                                    <span className="leading-tight group-hover:text-gray-900 transition-colors">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            
            {/* Team/Business Promo */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-2">Training 5 or more people?</h3>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">Get your team access to 27,000+ top courses anytime, anywhere.</p>
                <Button className="w-full justify-center" size="md" color="secondary">
                    Try Empedia Business
                </Button>
            </div>
        </div>
    );
};
