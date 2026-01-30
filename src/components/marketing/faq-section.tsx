"use client";

import { useState } from "react";
import { Plus, Minus } from "@untitledui/icons";
import { cx } from "@/utils/cx";

export interface FAQItem {
    question: string;
    answer: string;
}

interface FAQSectionProps {
    items: FAQItem[];
    title?: string;
}

export const FAQSection = ({ items, title = "Frequently Asked Questions" }: FAQSectionProps) => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex items-center gap-4 mb-12">
                    <div className="w-1.5 h-8 bg-green-600 rounded-full" />
                    <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
                </div>

                {/* Accordion */}
                <div className="space-y-4 max-w-7xl mx-auto">
                    {items.map((item, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <div 
                                key={index}
                                className={cx(
                                    "rounded-2xl overflow-hidden transition-all duration-200 border",
                                    isOpen 
                                        ? "bg-green-50 border-green-100" 
                                        : "bg-gray-50 border-transparent hover:bg-gray-100"
                                )}
                            >
                                <button
                                    onClick={() => toggle(index)}
                                    className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                                >
                                    <span className={cx(
                                        "text-lg font-semibold pr-8",
                                        isOpen ? "text-gray-900" : "text-gray-700"
                                    )}>
                                        {item.question}
                                    </span>
                                    <span className={cx(
                                        "flex-shrink-0 ml-4 p-1 rounded-full transition-colors",
                                        isOpen ? "bg-green-200/50 text-green-700" : "bg-gray-200 text-gray-500"
                                    )}>
                                        {isOpen ? (
                                            <Minus className="w-5 h-5" />
                                        ) : (
                                            <Plus className="w-5 h-5" />
                                        )}
                                    </span>
                                </button>
                                
                                <div 
                                    className={cx(
                                        "overflow-hidden transition-all duration-300 ease-in-out",
                                        isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                                    )}
                                >
                                    <div className="p-6 pt-0 text-gray-600 leading-relaxed">
                                        {item.answer}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
