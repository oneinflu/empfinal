import { ArrowRight } from "@untitledui/icons";
import Image from "next/image";
import Link from "next/link";

const COMPANIES = [
  { name: "Snapdeal", logo: "/logos/1.webp", mentors: 12 },
  { name: "Samsung", logo: "/logos/2.webp", mentors: 8 },
  { name: "Pepsico", logo: "/logos/3.webp", mentors: 15 },
  { name: "Reliance", logo: "/logos/4.webp", mentors: 6 },
  { name: "Flipkart", logo: "/logos/5.webp", mentors: 10 },
];

export function MentorsCompanies() {
  return (
    <section className="py-20 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl">
                <h2 className="text-3xl font-bold text-gray-900 tracking-tight sm:text-4xl">Mentors from Top Companies</h2>
                <p className="mt-4 text-lg text-gray-500">Learn from industry experts who have built world-class products at the most innovative companies.</p>
            </div>
            <Link href="/mentorships/companies" className="hidden md:flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors group">
                View all companies <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {COMPANIES.map((company) => (
            <div key={company.name} className="group relative flex flex-col items-center justify-center p-8 bg-white rounded-2xl border border-gray-100 hover:border-blue-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 cursor-pointer">
              <div className="relative w-16 h-16 mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1">
                 <Image src={company.logo} alt={company.name} fill className="object-contain" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">{company.name}</h3>
              <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-300">
                  <span className="inline-flex items-center text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-75">
                    {company.mentors} Mentors
                  </span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-10 md:hidden flex justify-center">
            <Link href="/mentorships/companies" className="flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors group">
                View all companies <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
        </div>
      </div>
    </section>
  );
}
