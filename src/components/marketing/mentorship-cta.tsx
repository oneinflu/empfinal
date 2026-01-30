"use client";

import { ArrowRight } from "@untitledui/icons";
import Link from "next/link";

export function MentorshipCTA() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="relative isolate">
          {/* Background & Decoration Container */}
          <div className="absolute inset-0 bg-gray-900 rounded-3xl overflow-hidden -z-20 shadow-2xl">
              {/* Decorative Patterns */}
              <div className="absolute top-0 right-0 -mt-10 -mr-10 h-64 w-64 rounded-full bg-gray-800/50 blur-3xl"></div>
              <div className="absolute bottom-0 left-0 -mb-10 -ml-10 h-64 w-64 rounded-full bg-blue-900/30 blur-3xl"></div>
              
              {/* Abstract Grid Pattern Background */}
               <svg viewBox="0 0 1024 1024" className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]" aria-hidden="true">
                  <circle cx="512" cy="512" r="512" fill="url(#gradient)" fillOpacity="0.7" />
                  <defs>
                    <radialGradient id="gradient">
                      <stop stopColor="#1d4ed8" />
                      <stop offset="1" stopColor="#1e40af" />
                    </radialGradient>
                  </defs>
                </svg>
          </div>

          {/* Content Wrapper */}
          <div className="relative px-6 py-12 sm:px-12 sm:py-16 lg:flex lg:items-center lg:justify-between lg:px-16 overflow-visible">
            
            {/* Text Content */}
            <div className="relative max-w-2xl z-10">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Become a Mentor & <br/>
                <span className="text-blue-400">Guide Unstoppable Talent!</span>
              </h2>
              <p className="mt-4 text-lg leading-8 text-gray-300">
                Join the clan of 2000+ Mentors & guide talent to help them create a difference.
              </p>
              
              <div className="mt-8 flex items-center gap-x-6">
                <Link
                  href="/become-mentor"
                  className="group flex items-center gap-2 rounded-full bg-white px-8 py-3 text-base font-semibold text-gray-900 shadow-sm hover:bg-gray-100 transition-all duration-200"
                >
                  Become a Mentor <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Right Side Visual - Pop-out Image */}
            <div className="hidden lg:block absolute bottom-0 right-0 xl:right-12 w-[450px] xl:w-[520px] h-[145%] pointer-events-none z-10">
                 <img 
                   src="/become.webp" 
                   alt="Become a Mentor" 
                   className="w-full h-full object-contain object-bottom drop-shadow-2xl"
                 />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
