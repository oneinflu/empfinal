import { Mentorship } from "./types";
import { Star01 } from "@untitledui/icons";

export const MentorshipContent = ({ mentorship }: { mentorship: Mentorship }) => {
    return (
        <div className="space-y-10">
            {/* About */}
            <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">About Me</h2>
                <div className="prose prose-blue max-w-none text-gray-700 whitespace-pre-line leading-relaxed">
                    {mentorship.mentor.about}
                </div>
            </section>

            {/* Expertise */}
            <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">I can help you with</h2>
                <div className="flex flex-wrap gap-2">
                    {mentorship.expertise.map((skill, i) => (
                        <div key={i} className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full font-medium text-sm border border-blue-100">
                            {skill}
                        </div>
                    ))}
                </div>
            </section>

            {/* Reviews */}
            <section>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">What mentees say</h2>
                    <div className="text-sm font-medium text-blue-600 hover:underline cursor-pointer">View all reviews</div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                    {mentorship.reviews.map((review, i) => (
                        <div key={i} className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600">
                                    {review.user[0]}
                                </div>
                                <div>
                                    <div className="font-bold text-gray-900 text-sm">{review.user}</div>
                                    <div className="flex text-yellow-400">
                                        {[...Array(5)].map((_, r) => (
                                            <Star01 key={r} className={`w-3 h-3 ${r < Math.floor(review.rating) ? "fill-current" : ""}`} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <p className="text-sm text-gray-600 italic">"{review.comment}"</p>
                            <div className="mt-3 text-xs text-gray-400">{review.date}</div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};
