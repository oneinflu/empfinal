"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User01, ArrowLeft, Building01, Link01 } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { Select } from "@/components/base/select/select";
import { SelectItem } from "@/components/base/select/select-item";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { cx } from "@/utils/cx";
import { authenticatedFetch } from "@/utils/api";
import { TextArea } from "@/components/base/textarea/textarea";

const STEPS = [
    { id: 1, title: "Company Info", description: "Basic details" },
    { id: 2, title: "Details", description: "Profile details" },
    { id: 3, title: "Online Presence", description: "Website & Socials" },
];

export default function AddCompanyPage() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        location: "",
        about: "",
        teamSize: "",
        headquartersLocation: "",
        companyType: "",
        website: "",
        linkedinUrl: "",
        twitterUrl: "",
    });

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
            
            // Construct social links array
            const socialLinks = [];
            if (formData.linkedinUrl) socialLinks.push({ platform: "LinkedIn", url: formData.linkedinUrl });
            if (formData.twitterUrl) socialLinks.push({ platform: "Twitter", url: formData.twitterUrl });

            const payload = {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                phone: formData.phone,
                location: formData.location,
                about: formData.about,
                teamSize: Number(formData.teamSize),
                headquartersLocation: formData.headquartersLocation,
                companyType: formData.companyType,
                website: formData.website,
                socialLinks: socialLinks
            };
            
            const response = await authenticatedFetch(`/admin/companies/add`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!response.ok) throw new Error("Failed to create company");

            router.push("/dashboard/users/companies");
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-8 max-w-3xl mx-auto w-full py-8 px-4 sm:px-6">
            {/* Header */}
            <div className="flex flex-col gap-6">
                <button 
                    onClick={() => router.back()} 
                    className="flex items-center gap-2 text-sm font-semibold text-tertiary hover:text-primary transition-colors w-fit"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Companies
                </button>
                
                <div className="flex flex-col gap-2">
                    <h1 className="text-display-sm font-semibold text-primary">Add New Company</h1>
                    <p className="text-md text-tertiary">
                        Fill in the details below to create a new company profile.
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
                    <FeaturedIcon icon={Building01} color="brand" theme="modern" size="md" />
                    <h2 className="text-lg font-semibold text-primary">
                        {STEPS[currentStep - 1].title}
                    </h2>
                </div>

                {currentStep === 1 && (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <Input
                            label="Company Name"
                            placeholder="e.g. Acme Corp"
                            value={formData.name}
                            onChange={(val) => updateField("name", val)}
                            wrapperClassName="col-span-1 sm:col-span-2"
                        />
                        <Input
                            label="Email Address"
                            placeholder="e.g. hiring@acmecorp.com"
                            type="email"
                            value={formData.email}
                            onChange={(val) => updateField("email", val)}
                            wrapperClassName="col-span-1 sm:col-span-2"
                        />
                        <Input
                            label="Password"
                            placeholder="Enter password"
                            type="password"
                            value={formData.password}
                            onChange={(val) => updateField("password", val)}
                        />
                        <Input
                            label="Phone"
                            placeholder="e.g. +1987654321"
                            value={formData.phone}
                            onChange={(val) => updateField("phone", val)}
                        />
                    </div>
                )}

                {currentStep === 2 && (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                         <div className="col-span-1 sm:col-span-2">
                            <TextArea
                                label="About Company"
                                placeholder="Brief description..."
                                value={formData.about}
                                onChange={(value) => updateField("about", value)}
                                rows={4}
                            />
                        </div>
                        <Input
                            label="Location"
                            placeholder="e.g. San Francisco, CA"
                            value={formData.location}
                            onChange={(val) => updateField("location", val)}
                        />
                         <Input
                            label="Headquarters"
                            placeholder="e.g. San Francisco, CA"
                            value={formData.headquartersLocation}
                            onChange={(val) => updateField("headquartersLocation", val)}
                        />
                        <Input
                            label="Team Size"
                            type="number"
                            placeholder="e.g. 500"
                            value={formData.teamSize}
                            onChange={(val) => updateField("teamSize", val)}
                        />
                        <div className="w-full">
                            <label className="text-sm font-medium text-primary mb-1.5 block">Company Type</label>
                            <Select
                                placeholder="Select type"
                                items={[
                                    { id: "Product", label: "Product" },
                                    { id: "Service", label: "Service" },
                                    { id: "Consulting", label: "Consulting" },
                                    { id: "Other", label: "Other" }
                                ]}
                                selectedKey={formData.companyType}
                                onSelectionChange={(key) => updateField("companyType", key as string)}
                            >
                                {(item) => <SelectItem id={item.id} textValue={item.label}>{item.label}</SelectItem>}
                            </Select>
                        </div>
                    </div>
                )}

                {currentStep === 3 && (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <Input
                            label="Website URL"
                            placeholder="https://acmecorp.com"
                            value={formData.website}
                            onChange={(val) => updateField("website", val)}
                            wrapperClassName="col-span-1 sm:col-span-2"
                        />
                        <Input
                            label="LinkedIn URL"
                            placeholder="https://linkedin.com/company/acmecorp"
                            value={formData.linkedinUrl}
                            onChange={(val) => updateField("linkedinUrl", val)}
                            wrapperClassName="col-span-1 sm:col-span-2"
                        />
                        <Input
                            label="Twitter URL"
                            placeholder="https://twitter.com/acmecorp"
                            value={formData.twitterUrl}
                            onChange={(val) => updateField("twitterUrl", val)}
                            wrapperClassName="col-span-1 sm:col-span-2"
                        />
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
                        {currentStep === STEPS.length ? (isLoading ? "Creating..." : "Create Company") : "Next Step"}
                    </Button>
                </div>
            </div>
        </div>
    );
}
