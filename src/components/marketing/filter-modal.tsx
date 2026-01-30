"use client";

import { useState, useEffect } from "react";
import { XClose, SearchLg } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { ModalOverlay, Modal, Dialog } from "@/components/application/modals/modal";
import { Input } from "@/components/base/input/input";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { cx } from "@/utils/cx";

interface FilterModalProps {
    isOpen: boolean;
    onClose: () => void;
    type?: "internships" | "jobs";
    initialCategory?: string;
}

const CATEGORIES = [
    "Quick Filters",
    "Categories",
    "Locations",
    "Type",
    "Date Posted",
    "Working Days",
    "Timing",
    "Skills",
    "User Type",
    "Domain",
    "Status"
];

const MOCK_DATA: Record<string, string[]> = {
    "Quick Filters": [
        "Remote", 
        "Internship", 
        "Full Time", 
        "Part Time", 
        "Work from Home",
        "Urgent Hiring",
        "Early Applicant",
        "Stipend > 10k",
        "PPO Available"
    ],
    "Categories": [
        "3D Modeling & Rendering",
        "Account Management & Client Relationship Management",
        "Accounting Management & Client Relationship Management",
        "Administrative Support & Data Entry",
        "Advocacy & Support",
        "Aerospace & Aeronautical Engineering",
        "Agriculture & Farming",
        "AI & Machine Learning",
        "Animation & Multimedia",
        "Architecture & Interior Design",
        "Backend Development",
        "Big Data & Analytics",
        "Blockchain & Crypto",
        "Brand Management",
        "Business Development",
        "Civil Engineering",
        "Content Writing",
        "Customer Service",
        "Data Science",
        "Digital Marketing",
        "Electrical Engineering",
        "Finance",
        "Game Design & Development",
        "Graphic Design",
        "Human Resources (HR)",
        "Legal",
        "Logistics & Supply Chain",
        "Marketing & Sales",
        "Mobile App Development",
        "Product Management",
        "Quality Assurance (QA)",
        "Sales",
        "Software Testing",
        "UI/UX Design",
        "Video Editing",
        "Web Development"
    ],
    "Locations": [
        "Bangalore", 
        "Mumbai", 
        "Delhi NCR", 
        "Hyderabad", 
        "Pune", 
        "Chennai", 
        "Remote", 
        "Kolkata", 
        "Ahmedabad", 
        "Jaipur", 
        "Chandigarh", 
        "Lucknow", 
        "Indore", 
        "Surat", 
        "Nagpur",
        "Kochi",
        "Coimbatore"
    ],
    "Type": [
        "Full Time", 
        "Part Time", 
        "Contract", 
        "Internship", 
        "Freelance",
        "Volunteer",
        "Temporary"
    ],
    "Date Posted": [
        "Any Time", 
        "Past 24 hours", 
        "Past 3 Days", 
        "Past Week", 
        "Past Month"
    ],
    "Working Days": [
        "5 Days", 
        "6 Days", 
        "Flexible",
        "Weekend Only"
    ],
    "Timing": [
        "Flexible", 
        "9am - 5pm", 
        "Night Shift", 
        "US Shift", 
        "UK Shift", 
        "Morning Shift"
    ],
    "Skills": [
        "Python", 
        "React", 
        "Node.js", 
        "Java", 
        "Design", 
        "Communication", 
        "Marketing",
        "SQL",
        "Excel",
        "PowerPoint",
        "Figma",
        "Adobe XD",
        "Photoshop",
        "Illustrator",
        "AWS",
        "Azure",
        "Docker",
        "Kubernetes",
        "C++",
        "C#",
        "TypeScript",
        "JavaScript",
        "HTML/CSS"
    ],
    "User Type": [
        "Student", 
        "Professional", 
        "Fresher", 
        "Experienced"
    ],
    "Domain": [
        "IT Services", 
        "Product", 
        "E-commerce", 
        "EdTech", 
        "FinTech", 
        "HealthTech", 
        "Media & Entertainment", 
        "Real Estate", 
        "Automotive", 
        "Banking & Insurance"
    ],
    "Status": [
        "Active", 
        "Closed", 
        "Draft",
        "Expiring Soon"
    ]
};


export const FilterModal = ({ isOpen, onClose, type = "internships", initialCategory = "Categories" }: FilterModalProps) => {
    const [selectedCategory, setSelectedCategory] = useState(initialCategory);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});

    useEffect(() => {
        if (isOpen) {
            setSelectedCategory(initialCategory);
        }
    }, [isOpen, initialCategory]);


    const handleCategoryClick = (category: string) => {
        setSelectedCategory(category);
        setSearchQuery(""); // Reset search when changing category
    };

    const handleFilterToggle = (category: string, option: string) => {
        setSelectedFilters(prev => {
            const current = prev[category] || [];
            const isSelected = current.includes(option);
            
            if (isSelected) {
                return {
                    ...prev,
                    [category]: current.filter(item => item !== option)
                };
            } else {
                return {
                    ...prev,
                    [category]: [...current, option]
                };
            }
        });
    };

    const handleClearAll = () => {
        setSelectedFilters({});
    };

    const getFilteredOptions = () => {
        const options = MOCK_DATA[selectedCategory] || [];
        if (!searchQuery) return options;
        return options.filter(opt => opt.toLowerCase().includes(searchQuery.toLowerCase()));
    };

    const getSelectedCount = (category: string) => {
        return selectedFilters[category]?.length || 0;
    };

    if (!isOpen) return null;

    return (
        <ModalOverlay isOpen={isOpen} onOpenChange={onClose}>
            <Modal className="w-full max-w-[900px]">
                <Dialog className="flex flex-col items-stretch h-[600px] rounded-xl bg-white shadow-xl outline-none overflow-hidden">
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-900">All Filters</h2>
                        <ButtonUtility 
                            icon={XClose} 
                            color="tertiary" 
                            onClick={onClose} 
                            aria-label="Close"
                        />
                    </div>


                    {/* Body */}
                    <div className="flex flex-1 overflow-hidden">
                        {/* Sidebar */}
                        <div className="w-64 shrink-0 border-r border-gray-200 overflow-y-auto bg-gray-50/50">
                            {CATEGORIES.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => handleCategoryClick(category)}
                                    className={cx(
                                        "flex w-full items-center justify-between px-4 py-3 text-sm font-medium transition-colors hover:bg-gray-100",
                                        selectedCategory === category 
                                            ? "bg-white text-brand-600 border-l-2 border-brand-600" 
                                            : "text-gray-600 border-l-2 border-transparent"
                                    )}
                                >
                                    <span>{category}</span>
                                    {getSelectedCount(category) > 0 && (
                                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-100 text-xs font-medium text-brand-600">
                                            {getSelectedCount(category)}
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Content */}
                        <div className="flex-1 flex flex-col bg-white">
                            <div className="p-4 border-b border-gray-100">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-md font-semibold text-gray-900">{selectedCategory}</h3>
                                    {selectedFilters[selectedCategory]?.length > 0 && (
                                        <button 
                                            onClick={() => setSelectedFilters(prev => ({ ...prev, [selectedCategory]: [] }))}
                                            className="text-sm font-medium text-red-600 hover:text-red-700"
                                        >
                                            Clear
                                        </button>
                                    )}
                                </div>
                                <Input
                                    placeholder={`Search ${selectedCategory}`}

                                    icon={SearchLg}
                                    value={searchQuery}
                                    onChange={setSearchQuery}
                                    className="w-full"
                                />
                            </div>

                            <div className="flex-1 overflow-y-auto p-4">
                                <div className="flex flex-col gap-3">
                                    {getFilteredOptions().map((option) => (
                                        <div key={option} className="flex items-center">
                                            {selectedCategory === "Categories" ? (
                                                <div 
                                                    className={cx(
                                                        "cursor-pointer px-4 py-2 rounded-full border text-sm transition-all",
                                                        selectedFilters[selectedCategory]?.includes(option)
                                                            ? "border-brand-600 bg-brand-50 text-brand-700 font-medium"
                                                            : "border-gray-200 text-gray-600 hover:border-gray-300"
                                                    )}
                                                    onClick={() => handleFilterToggle(selectedCategory, option)}
                                                >
                                                    {option}
                                                </div>
                                            ) : (
                                                <Checkbox
                                                    isSelected={selectedFilters[selectedCategory]?.includes(option)}
                                                    onChange={() => handleFilterToggle(selectedCategory, option)}
                                                    label={option}
                                                />
                                            )}
                                        </div>
                                    ))}

                                    
                                    {getFilteredOptions().length === 0 && (
                                        <div className="flex flex-col items-center justify-center py-8 text-center text-gray-500">
                                            <p>No options found matching "{searchQuery}"</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 bg-white">
                        <Button 
                            color="tertiary-destructive" 
                            onClick={handleClearAll}
                        >
                            Clear All
                        </Button>
                        <Button 
                            color="primary" 
                            className="min-w-[120px]"
                            onClick={onClose}
                        >
                            Show Result
                        </Button>
                    </div>
                </Dialog>
            </Modal>
        </ModalOverlay>
    );
};
