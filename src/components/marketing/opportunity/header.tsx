import Image from "next/image";
import { 
    Calendar, 
    Heart, 
    Share01, 
    MarkerPin01 as MarkerPin,
    Building01
} from "@untitledui/icons";

interface OpportunityHeaderProps {
    title: string;
    company: string;
    logo: string;
    location: string;
    type: string;
}

export const OpportunityHeader = ({ 
    title, 
    company, 
    logo, 
    location, 
    type 
}: OpportunityHeaderProps) => {
    return (
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 mb-6">
            <div className="flex flex-col md:flex-row justify-between gap-6">
                <div className="flex-1 space-y-4">
                    {/* Top Tag */}
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                        <Building01 className="w-4 h-4 text-orange-500" />
                        <span>{type}</span>
                    </div>

                    {/* Title & Company */}
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
                        <p className="text-lg text-gray-600 font-medium">{company}</p>
                    </div>

                    {/* Location Badge */}
                    <div className="inline-flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">
                        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                            <MarkerPin className="w-5 h-5" />
                        </div>
                        <div>
                            <div className="text-xs text-gray-500 font-medium">Location</div>
                            <div className="text-sm font-semibold text-gray-900">{location}</div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Actions & Logo */}
                <div className="flex flex-col items-end gap-6">
                    <div className="flex items-center gap-3">
                        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                            <Calendar className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                            <Heart className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                            <Share01 className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="w-20 h-20 relative rounded-xl overflow-hidden border border-gray-100 shadow-sm">
                        <Image
                            src={logo}
                            alt={company}
                            fill
                            className="object-contain p-2"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
