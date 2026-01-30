"use client";

import Image from "next/image";
import { cx } from "@/utils/cx";

const LOGOS = [
    "/logos/1.webp",
    "/logos/2.webp",
    "/logos/3.webp",
    "/logos/4.webp",
    "/logos/5.webp",
    "/logos/6.webp",
    "/logos/7.webp",
    "/logos/8.webp",
    "/logos/9.webp",
];

export const TrustedBySection = () => {
    return (
        <section className="py-12 bg-white border-y border-gray-100/50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                        <span className="text-brand-600">Trusted</span> by Industry Veterans
                    </h2>
                </div>

                <div className="relative w-full overflow-hidden mask-gradient">
                    {/* Gradient Masks for smooth fade effect */}
                    <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
                    <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />

                    {/* Marquee Container */}
                    <div className="flex w-full">
                        <div className="flex animate-marquee items-center gap-12 pr-12">
                            {LOGOS.map((logo, index) => (
                                <div key={`logo-1-${index}`} className="relative h-12 w-32 shrink-0 grayscale opacity-60 transition-all duration-300 hover:grayscale-0 hover:opacity-100">
                                    <Image
                                        src={logo}
                                        alt={`Trusted Company ${index + 1}`}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            ))}
                        </div>
                        {/* Duplicate for seamless loop */}
                        <div className="flex animate-marquee items-center gap-12 pr-12" aria-hidden="true">
                            {LOGOS.map((logo, index) => (
                                <div key={`logo-2-${index}`} className="relative h-12 w-32 shrink-0 grayscale opacity-60 transition-all duration-300 hover:grayscale-0 hover:opacity-100">
                                    <Image
                                        src={logo}
                                        alt={`Trusted Company ${index + 1}`}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .animate-marquee {
                    animation: marquee 30s linear infinite;
                }
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-100%); }
                }
            `}</style>
        </section>
    );
};
