"use client";

import { useState } from "react";
import { Button } from "@/components/base/buttons/button";
import { FilterFunnel01, ChevronDown, SwitchVertical01 } from "@untitledui/icons";
import { FilterModal } from "@/components/marketing/filter-modal";

export const FilterBar = () => {
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState("Categories");

    const handleOpenModal = (category: string) => {
        setActiveCategory(category);
        setIsFilterModalOpen(true);
    };

    return (
        <>
            <div className="flex flex-wrap items-center gap-3 py-4 w-full">
                <Button 
                    color="secondary" 
                    size="sm" 
                    className="rounded-full px-4 border-gray-300 text-gray-700 shadow-sm hover:bg-gray-50"
                    iconLeading={<FilterFunnel01 className="w-4 h-4 text-gray-500" />}
                    onClick={() => handleOpenModal("Quick Filters")}
                >
                    <span className="inline-flex items-center">
                        Filters
                        <span className="ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-brand-600 text-[10px] font-bold text-white">2</span>
                    </span>
                </Button>

                
                <Button 
                    color="secondary" 
                    size="sm" 
                    className="rounded-full px-4 border-gray-300 text-gray-700 shadow-sm hover:bg-gray-50"
                    iconTrailing={<ChevronDown className="w-4 h-4 text-gray-500" />}
                    onClick={() => handleOpenModal("Type")}
                >
                    Type
                </Button>
                
                <Button 
                    color="secondary" 
                    size="sm" 
                    className="rounded-full px-4 border-gray-300 text-gray-700 shadow-sm hover:bg-gray-50"
                    iconTrailing={<ChevronDown className="w-4 h-4 text-gray-500" />}
                    onClick={() => handleOpenModal("Locations")}
                >
                    Location
                </Button>
                
                <Button 
                    color="secondary" 
                    size="sm" 
                    className="rounded-full px-4 border-gray-300 text-gray-700 shadow-sm hover:bg-gray-50"
                    iconTrailing={<ChevronDown className="w-4 h-4 text-gray-500" />}
                    onClick={() => handleOpenModal("Categories")}
                >
                    <span className="inline-flex items-center">
                        Categories
                        <span className="ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-brand-600 text-[10px] font-bold text-white">6</span>
                    </span>
                </Button>

                
                <Button 
                    color="secondary" 
                    size="sm" 
                    className="rounded-full px-4 border-gray-300 text-gray-700 shadow-sm hover:bg-gray-50 ml-auto"
                    iconLeading={<SwitchVertical01 className="w-4 h-4 text-gray-500" />}
                >
                    Sort By
                </Button>
            </div>

            <FilterModal 
                isOpen={isFilterModalOpen} 
                onClose={() => setIsFilterModalOpen(false)} 
                initialCategory={activeCategory}
            />
        </>
    );
};

