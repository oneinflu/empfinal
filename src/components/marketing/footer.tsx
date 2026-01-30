"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ArrowRight, XClose } from "@untitledui/icons";
import { UntitledLogoMinimal } from "@/components/foundations/logo/untitledui-logo-minimal";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { cx } from "@/utils/cx";

// --- Data ---

const SOCIAL_LINKS = [
    { name: "X (Twitter)", icon: <SocialXIcon />, href: "#" },
    { name: "Instagram", icon: <SocialInstagramIcon />, href: "#" },
    { name: "LinkedIn", icon: <SocialLinkedInIcon />, href: "#" },
    { name: "Facebook", icon: <SocialFacebookIcon />, href: "#" },
    { name: "Telegram", icon: <SocialTelegramIcon />, href: "#" },
    { name: "Discord", icon: <SocialDiscordIcon />, href: "#" },
    { name: "YouTube", icon: <SocialYouTubeIcon />, href: "#" },
];

const FUTURE_LINKS = [
    // Products
    { label: "Brand & Engage", href: "#" },
    { label: "Source", href: "#" },
    { label: "Screen", href: "#" },
    { label: "Assess", href: "#" },
    { label: "Interview", href: "#" },
    { label: "Hiring Automation", href: "#" },
    // Participate
    { label: "Assessments", href: "#" },
    { label: "Hackathons", href: "#" },
    { label: "Workshops & Webinars", href: "#" },
    { label: "Conferences", href: "#" },
    { label: "Cultural Events", href: "#" },
    { label: "College Festivals", href: "#" },
    // Practice
    { label: "5 Days Interview Prep", href: "#" },
    { label: "Code & Ace Hiring Assessments", href: "#" },
    { label: "100-Day of Coding Sprint", href: "#" },
    // Others
    { label: "Rewards Program", href: "#" },
    { label: "Refer & Earn", href: "#" },
    { label: "Campus Ambassador Program", href: "#" },
    { label: "Request a Feature", href: "#" },
    // Our Properties
    { label: "Talent Awards 2026", href: "#" },
    { label: "Talent Meet 2026", href: "#" },
    { label: "Talent Report 2025", href: "#" },
    { label: "Education Loan EMI Calculator", href: "#" },
    { label: "Igniters Club", href: "#" },
    { label: "Online Quizzing Festival", href: "#" },
];

const FOOTER_COLUMNS = [
    {
        title: "Platform",
        links: [
            { label: "Internships", href: "/internships" },
            { label: "Jobs", href: "/jobs" },
            { label: "Mentorships", href: "/mentorships" },
            { label: "Courses", href: "/courses" },
            { label: "Competitions", href: "/competitions" },
        ],
    },
    {
        title: "Company",
        links: [
            { label: "About Us", href: "#" },
            { label: "Careers", href: "#" },
            { label: "Contact Us", href: "#" },
            { label: "Blog", href: "#" },
        ],
    },
    {
        title: "Legal",
        links: [
            { label: "Terms & Conditions", href: "#" },
            { label: "Privacy Policy", href: "#" },
            { label: "Sitemap", href: "#" },
        ],
    },
    {
        title: "For Business",
        links: [
            { label: "Hire Talent", href: "#" },
            { label: "Post a Job", href: "#" },
            { label: "Partners", href: "#" },
        ],
    },
];

const JOB_LOCATIONS = [
    "Jobs in Kolkata", "Jobs in Coimbatore", "Jobs in Lucknow", "Jobs in Indore", "Jobs in Ahmedabad", "Jobs in Nagpur",
    "Jobs in Chandigarh", "Jobs in Jaipur", "Jobs in Cochin", "Jobs in Surat", "Jobs in Bangalore", "Jobs in Delhi",
    "Jobs in Hyderabad", "Jobs in Mumbai", "Jobs in Pune", "Jobs in Chennai", "Jobs in Noida", "Jobs in Gurgaon"
];

export const MarketingFooter = () => {
    const currentYear = new Date().getFullYear();
    const [isLocationsExpanded, setIsLocationsExpanded] = useState(false);

    return (
        <footer className="bg-[#F9FAFB] border-t border-gray-200 font-sans">
            {/* --- Top Section: Logo & Socials --- */}
            <div className="bg-[#F2F8FF] py-6">
                 <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex flex-col md:flex-row items-center gap-4">
                        <Link href="/" className="flex items-center gap-2">
                             <UntitledLogoMinimal className="h-8 w-8 text-brand-600" />
                             <span className="text-2xl font-bold text-[#1D2939]">Empedia</span>
                        </Link>
                        <span className="hidden md:block text-gray-400">|</span>
                        <p className="text-sm text-gray-600 font-medium">
                            Built with ❤️ in India for the world
                        </p>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        {SOCIAL_LINKS.map((link) => (
                            <a 
                                key={link.name} 
                                href={link.href} 
                                className="text-gray-500 hover:text-brand-600 transition-colors"
                                aria-label={link.name}
                            >
                                {link.icon}
                            </a>
                        ))}
                    </div>
                 </div>
            </div>

            {/* --- Main Grid Section --- */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-8">
                    
                    {/* Columns Grid */}
                    <div className="flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 gap-y-12">
                        {FOOTER_COLUMNS.map((col) => (
                            <div key={col.title}>
                                <h3 className="text-sm font-bold text-gray-900 mb-4">{col.title}</h3>
                                <ul className="space-y-3">
                                    {col.links.map((link) => (
                                        <li key={link.label}>
                                            <a href={link.href} className="text-sm text-gray-500 hover:text-brand-600 hover:underline transition-colors">
                                                {link.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Right Column: CTA & Newsletter */}
                    <div className="w-full lg:w-72 flex flex-col gap-8 shrink-0">
                        {/* We're Hiring Badge */}
                        <div className="relative inline-block w-max">
                             <span className="bg-yellow-400 text-black font-extrabold text-xs px-2 py-1 transform -rotate-6 rounded-sm shadow-sm border border-black">
                                 We're Hiring!
                             </span>
                        </div>

                        <div className="flex flex-col gap-3">
                            <a href="#" className="flex items-center gap-2 text-sm font-bold text-gray-900 hover:text-brand-600 group">
                                Contact Us
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </a>
                            <a href="#" className="flex items-center gap-2 text-sm font-bold text-gray-900 hover:text-brand-600 group">
                                Share Your Story Now
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </a>
                        </div>

                        <div className="flex flex-col gap-3">
                            <h4 className="text-sm font-bold text-gray-900">Stay Updated</h4>
                            <p className="text-xs text-gray-500 leading-relaxed">
                                Get regular updates on opportunities/jobs to showcase your talent and get hired.
                            </p>
                            <div className="flex gap-2">
                                <Input 
                                    placeholder="Subscribe to our newsletter!" 
                                    className="bg-gray-100 border-gray-200 text-sm"
                                />
                                <Button className="bg-brand-600 hover:bg-brand-700 text-white px-3">
                                    <ArrowRight className="w-5 h-5" />
                                </Button>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <AppStoreButton type="google" />
                            <AppStoreButton type="apple" />
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Location Based Jobs Section --- */}
            <div className="border-t border-gray-200 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                     <h3 className="text-sm font-bold text-gray-900 mb-6">Location based jobs</h3>
                     
                     <div className={cx(
                         "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 transition-all duration-500 overflow-hidden",
                         isLocationsExpanded ? "max-h-[1000px]" : "max-h-[120px]"
                     )}>
                        {JOB_LOCATIONS.map((loc) => (
                            <a key={loc} href="#" className="text-xs text-gray-500 hover:text-brand-600 transition-colors">
                                {loc}
                            </a>
                        ))}
                     </div>
                     
                     <button 
                        onClick={() => setIsLocationsExpanded(!isLocationsExpanded)}
                        className="mt-6 flex items-center gap-2 text-sm font-medium text-gray-900 hover:text-brand-600"
                     >
                        {isLocationsExpanded ? "View Less" : "View More"}
                        <ChevronDown className={cx("w-4 h-4 transition-transform", isLocationsExpanded ? "rotate-180" : "")} />
                     </button>
                </div>
            </div>

            {/* --- Bottom Bar --- */}
            <div className="border-t border-gray-200 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 flex flex-col-reverse md:flex-row justify-between items-center gap-6">
                    <p className="text-xs text-gray-500">
                        Copyright © {currentYear} Empedia Consulting Pvt Ltd - All rights reserved.
                    </p>

                    <div className="flex flex-col md:items-end gap-2">
                         <p className="text-[10px] text-gray-400">Empedia Version: 1.29.{currentYear}.16.13</p>
                         <p className="text-[10px] text-gray-400">Best Viewed in Latest Versions of Edge, Mozilla, Chrome, Opera & Safari.</p>
                    </div>
                </div>
                
                {/* Badges Row */}
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-8 flex flex-wrap justify-center md:justify-start gap-4 items-center opacity-70 grayscale hover:grayscale-0 transition-all">
                     <BadgeSecure />
                     <BadgeRazorpay />
                     <BadgeVisa />
                     <BadgeUPI />
                     <BadgeMastercard />
                     <BadgeRuPay />
                     <BadgeISO />
                     <BadgeGDPR />
                </div>
            </div>
        </footer>
    );
};


// --- Icons & Helper Components ---

function SocialXIcon() {
    return <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>;
}
function SocialInstagramIcon() {
    return <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>;
}
function SocialLinkedInIcon() {
    return <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;
}
function SocialFacebookIcon() {
    return <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>;
}
function SocialTelegramIcon() {
    return <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.638z"/></svg>;
}
function SocialDiscordIcon() {
    return <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419z"/></svg>;
}
function SocialYouTubeIcon() {
    return <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>;
}

function AppStoreButton({ type }: { type: 'google' | 'apple' }) {
    if (type === 'google') {
        return (
            <div className="bg-black text-white px-2 py-1 rounded-md flex items-center gap-2 w-max cursor-pointer border border-transparent hover:border-gray-500 transition-colors">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M3.609 1.814L13.792 12 3.61 22.186a2.915 2.915 0 0 1-.952-2.285V4.098c0-.86.36-1.642.952-2.284zm11.75 11.621l-1.536-1.535-1.535 1.535 6.772 3.824c.712.402 1.173 1.144 1.173 1.992v.033l-4.874-5.849zm4.874-9.308c0 .848-.461 1.59-1.173 1.992l-6.772 3.824 3.07-3.071 4.875-2.745zM2.083 3.535L12.266 13.718 2.083 23.901A2.917 2.917 0 0 1 1 21.033V2.967c0-.987.419-1.877 1.083-2.532z" /></svg>
                <div className="flex flex-col leading-none">
                    <span className="text-[8px] uppercase">Get it on</span>
                    <span className="text-xs font-bold">Google Play</span>
                </div>
            </div>
        );
    }
    return (
        <div className="bg-black text-white px-2 py-1 rounded-md flex items-center gap-2 w-max cursor-pointer border border-transparent hover:border-gray-500 transition-colors">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74 1.18 0 2.45-1.64 3.98-1.54 1.29.08 2.2.61 2.9 1.5-2.6 1.63-2.24 6.44.56 7.69-.5 1.35-1.03 2.54-2.52 4.58zM12.03 5.31c-.26-1.54 1.05-2.96 2.37-3.06.33 1.66-1.38 3.31-2.37 3.06z" /></svg>
            <div className="flex flex-col leading-none">
                <span className="text-[8px] uppercase">Download on the</span>
                <span className="text-xs font-bold">App Store</span>
            </div>
        </div>
    );
}

// Placeholder for badges - In real app, these would be images or specific SVGs
const BadgeBase = ({ text, color = "bg-blue-600" }: { text: string, color?: string }) => (
    <div className={`h-6 px-2 rounded flex items-center justify-center text-[10px] font-bold text-white ${color}`}>
        {text}
    </div>
);

function BadgeSecure() { return <BadgeBase text="100% SECURE" color="bg-blue-500" />; }
function BadgeRazorpay() { return <BadgeBase text="Razorpay" color="bg-[#0c2d48]" />; }
function BadgeVisa() { return <BadgeBase text="VISA" color="bg-[#1a1f71]" />; }
function BadgeUPI() { return <BadgeBase text="UPI" color="bg-orange-500" />; }
function BadgeMastercard() { return <BadgeBase text="Mastercard" color="bg-[#eb001b]" />; }
function BadgeRuPay() { return <BadgeBase text="RuPay" color="bg-[#f37021]" />; }
function BadgeISO() { return <div className="h-8 w-8 rounded-full border-2 border-gray-400 flex items-center justify-center text-[8px] font-bold text-gray-500">ISO</div>; }
function BadgeGDPR() { return <div className="h-8 w-8 rounded-full border-2 border-gray-400 flex items-center justify-center text-[8px] font-bold text-gray-500">GDPR</div>; }
