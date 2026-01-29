"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { User01, ArrowLeft, CheckCircle } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { Select } from "@/components/base/select/select";
import { SelectItem } from "@/components/base/select/select-item";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { cx } from "@/utils/cx";

const STEPS = [
    { id: 1, title: "Basic Info", description: "Personal details" },
    { id: 2, title: "Professional", description: "Work experience" },
    { id: 3, title: "Details", description: "Profile details" },
];

const API_BASE_URL = "https://empnodeapis-6f68i.ondigitalocean.app/api";

export default function EditMentorPage() {
    const router = useRouter();
    const params = useParams();
    const { id } = params;
    
    const [currentStep, setCurrentStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        // Password field removed for edit mode as per standard practice, unless explicitly requested to change password here
        phone: "",
        currentRole: "",
        currentCompany: "",
        industry: "",
        experienceYears: 0,
        domain: "",
        about: "",
        languages: [] as string[],
        quickCallPrice: 0,
        priceType: "session",
        studentsCount: 0,
        coursesCount: 0,
        rating: 0,
        isVerified: true,
    });

    useEffect(() => {
        if (id) {
            fetchMentorDetails();
        }
    }, [id]);

    const fetchMentorDetails = async () => {
        try {
            // Note: Using the list endpoint to filter by ID since a specific GET by ID endpoint wasn't explicitly provided,
            // but standard REST would be /mentor-profiles/:id or similar.
            // However, based on previous patterns, let's try to fetch all and find, or use a specific endpoint if available.
            // The user mentioned "prefilled with data".
            // Let's assume there is an endpoint to get mentor details. 
            // If not, we might need to rely on passed state or fetch list.
            // I'll try fetching the specific mentor profile.
            
            // Assuming the endpoint structure based on the list endpoint /mentor-profiles
            // It might be /mentor-profiles/:id or /admin/mentors/:id
            // Let's try /mentor-profiles first as it is a GET endpoint.
            
            // Actually, for now, let's fetch all and find the one. This is safer if we don't know the exact ID endpoint structure
            // but we know /mentor-profiles returns the list.
            const response = await fetch(`${API_BASE_URL}/mentor-profiles`);
            if (!response.ok) throw new Error("Failed to fetch mentor details");
            const data = await response.json();
            const mentors = Array.isArray(data) ? data : (data.data || data.mentors || []);
            const mentor = mentors.find((m: any) => m._id === id);

            if (mentor) {
                setFormData({
                    name: mentor.user?.name || "",
                    email: mentor.user?.email || "",
                    phone: mentor.user?.phone || "", // Assuming phone might be in user object or root
                    currentRole: mentor.currentRole || "",
                    currentCompany: mentor.currentCompany || "",
                    industry: mentor.industry || "",
                    experienceYears: mentor.experienceYears || 0,
                    domain: mentor.domain || "",
                    about: mentor.about || "",
                    languages: mentor.languages || [],
                    quickCallPrice: mentor.quickCallPrice || 0,
                    priceType: mentor.priceType || "session",
                    studentsCount: mentor.studentsCount || 0,
                    coursesCount: mentor.coursesCount || 0,
                    rating: mentor.rating || 0,
                    isVerified: mentor.isVerified ?? true,
                });
            } else {
                console.error("Mentor not found");
                // router.push("/dashboard/users/mentors");
            }
        } catch (error) {
            console.error("Error fetching mentor details:", error);
        } finally {
            setIsFetching(false);
        }
    };

    const updateField = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleNext = () => {
        if (currentStep < STEPS.length) {
            setCurrentStep(prev => prev + 1);
        } else {
            handleSubmit();
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(prev => prev - 1);
        } else {
            router.back();
        }
    };

    const handleSubmit = async () => {
        try {
            setIsLoading(true);
            
            const payload = {
                ...formData,
                values: [], 
                stories: [],
                experienceYears: Number(formData.experienceYears),
                quickCallPrice: Number(formData.quickCallPrice),
                studentsCount: Number(formData.studentsCount),
                coursesCount: Number(formData.coursesCount),
                rating: Number(formData.rating),
            };
            
            // Assuming PUT endpoint for update. User didn't specify but "edit mentor" implies update.
            // Using the same pattern as delete: /admin/mentors/:id
            // If not, it might be POST to add with ID? Unlikely.
            // I'll use PUT /admin/mentors/:id
            const response = await fetch(`${API_BASE_URL}/admin/mentors/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!response.ok) throw new Error("Failed to update mentor");

            router.push("/dashboard/users/mentors");
        } catch (error) {
            console.error("Error updating mentor:", error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isFetching) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-tertiary">Loading mentor details...</div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-8 max-w-3xl mx-auto w-full py-8 px-4 sm:px-6">
            {/* Header */}
            <div className="flex flex-col gap-6">
                <button 
                    onClick={() => router.back()} 
                    className="flex items-center gap-2 text-sm font-semibold text-tertiary hover:text-primary transition-colors w-fit"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Mentors
                </button>
                
                <div className="flex flex-col gap-2">
                    <h1 className="text-display-sm font-semibold text-primary">Edit Mentor</h1>
                    <p className="text-md text-tertiary">
                        Update the mentor profile details below.
                    </p>
                </div>

                {/* Steps Indicator */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-secondary pb-6">
                    <div className="flex gap-2 w-full">
                        {STEPS.map((step) => (
                            <div key={step.id} className="flex flex-col gap-2 flex-1">
                                <div 
                                    className={cx(
                                        "h-1 w-full rounded-full transition-colors",
                                        step.id <= currentStep ? "bg-brand-solid" : "bg-secondary"
                                    )}
                                />
                                <span className={cx(
                                    "text-xs font-medium",
                                    step.id <= currentStep ? "text-brand-secondary" : "text-tertiary"
                                )}>
                                    Step {step.id}: {step.title}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Form Body */}
            <div className="flex flex-col gap-6 bg-white rounded-xl shadow-sm border border-secondary p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-4">
                    <FeaturedIcon icon={User01} color="brand" theme="modern" size="md" />
                    <h2 className="text-lg font-semibold text-primary">
                        {STEPS[currentStep - 1].title}
                    </h2>
                </div>

                {currentStep === 1 && (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <Input
                            label="Full Name"
                            placeholder="e.g. Jane Doe"
                            value={formData.name}
                            onChange={(val) => updateField("name", val)}
                            wrapperClassName="col-span-1 sm:col-span-2"
                        />
                        <Input
                            label="Email Address"
                            placeholder="e.g. jane@example.com"
                            type="email"
                            value={formData.email}
                            onChange={(val) => updateField("email", val)}
                            wrapperClassName="col-span-1 sm:col-span-2"
                        />
                        {/* Password field hidden for edit */}
                        <Input
                            label="Phone"
                            placeholder="e.g. +1234567890"
                            value={formData.phone}
                            onChange={(val) => updateField("phone", val)}
                        />
                    </div>
                )}

                {currentStep === 2 && (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <Input
                            label="Current Role"
                            placeholder="e.g. Senior Engineer"
                            value={formData.currentRole}
                            onChange={(val) => updateField("currentRole", val)}
                        />
                        <Input
                            label="Current Company"
                            placeholder="e.g. Google"
                            value={formData.currentCompany}
                            onChange={(val) => updateField("currentCompany", val)}
                        />
                        <Input
                            label="Industry"
                            placeholder="e.g. Technology"
                            value={formData.industry}
                            onChange={(val) => updateField("industry", val)}
                        />
                        <Input
                            label="Domain"
                            placeholder="e.g. DevOps & Security"
                            value={formData.domain}
                            onChange={(val) => updateField("domain", val)}
                        />
                        <Input
                            label="Experience (Years)"
                            type="number"
                            placeholder="e.g. 10"
                            value={String(formData.experienceYears)}
                            onChange={(val) => updateField("experienceYears", val)}
                            wrapperClassName="col-span-1 sm:col-span-2"
                        />
                    </div>
                )}

                {currentStep === 3 && (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <Input
                            label="About"
                            placeholder="Brief bio..."
                            value={formData.about}
                            onChange={(val) => updateField("about", val)}
                            wrapperClassName="col-span-1 sm:col-span-2"
                        />
                        <Input
                            label="Languages (comma separated)"
                            placeholder="e.g. English, Spanish"
                            value={formData.languages.join(", ")}
                            onChange={(val) => updateField("languages", val.split(",").map((s: string) => s.trim()))}
                            wrapperClassName="col-span-1 sm:col-span-2"
                        />
                        <Input
                            label="Quick Call Price"
                            type="number"
                            placeholder="e.g. 500"
                            value={String(formData.quickCallPrice)}
                            onChange={(val) => updateField("quickCallPrice", val)}
                        />
                        <div className="w-full">
                            <label className="text-sm font-medium text-primary mb-1.5 block">Price Type</label>
                            <Select
                                placeholder="Select price type"
                                items={[
                                    { id: "session", label: "Session" },
                                    { id: "hour", label: "Hour" }
                                ]}
                                selectedKey={formData.priceType}
                                onSelectionChange={(key) => updateField("priceType", key as string)}
                            >
                                {(item) => <SelectItem id={item.id} textValue={item.label}>{item.label}</SelectItem>}
                            </Select>
                        </div>
                    </div>
                )}

                {/* Footer Actions */}
                <div className="flex justify-between pt-6 mt-2 border-t border-secondary">
                    <Button 
                        color="secondary" 
                        onClick={handleBack} 
                        isDisabled={isLoading}
                    >
                        {currentStep === 1 ? "Cancel" : "Back"}
                    </Button>
                    <Button 
                        color="primary" 
                        onClick={handleNext}
                        isDisabled={isLoading}
                    >
                        {currentStep === STEPS.length ? (isLoading ? "Save Changes" : "Save Changes") : "Next Step"}
                    </Button>
                </div>
            </div>
        </div>
    );
}
