import { PageHero } from "@/components/marketing/page-hero";
import { MentorsCompanies } from "@/components/marketing/mentors-companies";
import { MentorshipCTA } from "@/components/marketing/mentorship-cta";
import { TopMentors } from "@/components/marketing/top-mentors";
import { FAQSection } from "@/components/marketing/faq-section";
import { File02, GraduationHat01, Trophy01, Briefcase01, MessageChatCircle, Compass, User01 } from "@untitledui/icons";

const MENTORSHIP_FAQS = [
    {
        question: "How do I choose the right mentor?",
        answer: "Browse through our list of mentors, filter by industry, expertise, and company. Read their profiles and reviews to find someone whose experience aligns with your career goals."
    },
    {
        question: "What happens during a mentorship session?",
        answer: "Sessions are typically 1:1 video calls where you can discuss your career goals, ask for advice, get resume feedback, or conduct mock interviews. The agenda is set by you."
    },
    {
        question: "Can I book multiple sessions with the same mentor?",
        answer: "Yes, you can book recurring sessions or follow-up calls with the same mentor to track your progress and get continuous guidance."
    },
    {
        question: "What if I need to reschedule a session?",
        answer: "You can reschedule a session up to 24 hours in advance through your dashboard. Late cancellations or no-shows may not be refundable depending on the mentor's policy."
    },
    {
        question: "Are the mentors verified professionals?",
        answer: "Yes, all mentors on our platform go through a verification process to ensure they are currently working at the companies listed and have the relevant expertise."
    }
];

export default function MentorshipsPage() {
    return (
        <main className="min-h-screen bg-gray-50">
            <PageHero
                titlePrefix=""
                highlightedTitle=""
                description="Get guidance from expert mentors and turn your career goals into reality."
                customTitle={
                    <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-4 tracking-tight">
                        <span className="text-gray-500">Unlock</span> Mentorship
                    </h1>
                }
                topTag={
                    <div className="flex items-center gap-2 text-blue-600 font-bold mb-4">
                        <span className="text-xl">😎</span> 
                        <span className="tracking-wide">#BeUnstoppable</span>
                    </div>
                }
                rightContent={
                    <img 
                        src="/mentorship.avif" 
                        alt="Mentorship" 
                        className="w-[500px] h-auto object-contain"
                    />
                }
                categories={[
                    { label: "CV Review", icon: <File02 className="w-6 h-6" />, color: "blue" },
                    { label: "MBA Preparation", icon: <GraduationHat01 className="w-6 h-6" />, color: "purple" },
                    { label: "Case Competition", icon: <Trophy01 className="w-6 h-6" />, color: "yellow" },
                    { label: "Placement Support", icon: <Briefcase01 className="w-6 h-6" />, color: "orange" },
                    { label: "Interview Preparation", icon: <MessageChatCircle className="w-6 h-6" />, color: "blue" },
                    { label: "Career Guidance", icon: <Compass className="w-6 h-6" />, color: "purple" },
                    { label: "Personal Branding", icon: <User01 className="w-6 h-6" />, color: "yellow" },
                ]}
            />
            
            <MentorsCompanies />
            <TopMentors />
            <MentorshipCTA />
            <FAQSection items={MENTORSHIP_FAQS} />
        </main>
    );
}
