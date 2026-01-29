"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useListData } from "react-stately";
import { User01, ArrowLeft, BookOpen01, Briefcase01, GraduationHat01, Plus, Trash01 } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { Input } from "@/components/base/input/input";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { TextArea } from "@/components/base/textarea/textarea";
import { MultiSelect } from "@/components/base/select/multi-select";
import { SelectItem } from "@/components/base/select/select-item";
import type { SelectItemType } from "@/components/base/select/select";
import { cx } from "@/utils/cx";

const STEPS = [
    { id: 1, title: "Personal Info", description: "Basic details" },
    { id: 2, title: "Education", description: "Academic history" },
    { id: 3, title: "Experience", description: "Internships & work" },
    { id: 4, title: "Skills", description: "Skills & Resume" },
];

const API_BASE_URL = "https://empnodeapis-6f68i.ondigitalocean.app/api";

export default function AddStudentPage() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [availableSkills, setAvailableSkills] = useState<SelectItemType[]>([]);

    // Skills Selection State
    const selectedSkills = useListData<SelectItemType>({
        initialItems: [],
        getKey: (item) => item.id,
    });

    useEffect(() => {
        fetchSkills();
    }, []);

    const fetchSkills = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/skills`);
            if (response.ok) {
                const data = await response.json();
                const formattedSkills = data.map((skill: any) => ({
                    id: skill._id,
                    label: skill.name,
                    value: skill,
                }));
                setAvailableSkills(formattedSkills);
            }
        } catch (error) {
            console.error("Error fetching skills:", error);
        }
    };

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        educations: [{ institutionName: "", level: "University", degree: "", yearOfPassing: "" }],
        internships: [{ organization: "", role: "", startDate: "", endDate: "", description: "" }],
        resumeUrl: "",
    });

    const updateField = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    // Dynamic List Handlers
    const updateEducation = (index: number, field: string, value: any) => {
        const newEducations = [...formData.educations];
        newEducations[index] = { ...newEducations[index], [field]: value };
        updateField("educations", newEducations);
    };

    const addEducation = () => {
        updateField("educations", [...formData.educations, { institutionName: "", level: "University", degree: "", yearOfPassing: "" }]);
    };

    const removeEducation = (index: number) => {
        const newEducations = formData.educations.filter((_, i) => i !== index);
        updateField("educations", newEducations);
    };

    const updateInternship = (index: number, field: string, value: any) => {
        const newInternships = [...formData.internships];
        newInternships[index] = { ...newInternships[index], [field]: value };
        updateField("internships", newInternships);
    };

    const addInternship = () => {
        updateField("internships", [...formData.internships, { organization: "", role: "", startDate: "", endDate: "", description: "" }]);
    };

    const removeInternship = (index: number) => {
        const newInternships = formData.internships.filter((_, i) => i !== index);
        updateField("internships", newInternships);
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
            
            // Parse skills
            const skillIds = selectedSkills.items.map(s => s.id);

            const payload = {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                phone: formData.phone,
                educations: formData.educations.map(e => ({
                    ...e,
                    yearOfPassing: Number(e.yearOfPassing)
                })).filter(e => e.institutionName), // Filter out empty entries
                internships: formData.internships.filter(i => i.organization), // Filter out empty entries
                skills: skillIds,
                // resumeUrl: formData.resumeUrl // API might not support this in JSON body if it expects file, but prompt example showed JSON body.
            };
            
            const response = await fetch(`${API_BASE_URL}/admin/students/add`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!response.ok) throw new Error("Failed to create student");

            router.push("/dashboard/users/students");
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
                    Back to Students
                </button>
                
                <div className="flex flex-col gap-2">
                    <h1 className="text-display-sm font-semibold text-primary">Add New Student</h1>
                    <p className="text-md text-tertiary">
                        Fill in the details below to create a new student profile.
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
                    <FeaturedIcon icon={currentStep === 1 ? User01 : currentStep === 2 ? GraduationHat01 : currentStep === 3 ? Briefcase01 : BookOpen01} color="brand" theme="modern" size="md" />
                    <h2 className="text-lg font-semibold text-primary">
                        {STEPS[currentStep - 1].title}
                    </h2>
                </div>

                {currentStep === 1 && (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <Input
                            label="Full Name"
                            placeholder="e.g. John Student"
                            value={formData.name}
                            onChange={(val) => updateField("name", val)}
                            wrapperClassName="col-span-1 sm:col-span-2"
                        />
                        <Input
                            label="Email Address"
                            placeholder="e.g. john@example.com"
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
                            placeholder="e.g. +1234567890"
                            value={formData.phone}
                            onChange={(val) => updateField("phone", val)}
                        />
                    </div>
                )}

                {currentStep === 2 && (
                    <div className="flex flex-col gap-6">
                        {formData.educations.map((edu, index) => (
                            <div key={index} className="p-4 border border-secondary rounded-lg bg-gray-50 relative">
                                {formData.educations.length > 1 && (
                                    <ButtonUtility 
                                        icon={Trash01} 
                                        color="tertiary" 
                                        onClick={() => removeEducation(index)}
                                        className="absolute top-4 right-4 text-error-500"
                                        aria-label="Remove"
                                    />
                                )}
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <Input
                                        label="Institution Name"
                                        placeholder="e.g. MIT"
                                        value={edu.institutionName}
                                        onChange={(val) => updateEducation(index, "institutionName", val)}
                                        wrapperClassName="col-span-1 sm:col-span-2"
                                    />
                                    <Input
                                        label="Degree"
                                        placeholder="e.g. B.Tech CS"
                                        value={edu.degree}
                                        onChange={(val) => updateEducation(index, "degree", val)}
                                    />
                                    <Input
                                        label="Year of Passing"
                                        placeholder="e.g. 2024"
                                        type="number"
                                        value={edu.yearOfPassing}
                                        onChange={(val) => updateEducation(index, "yearOfPassing", val)}
                                    />
                                </div>
                            </div>
                        ))}
                        <Button color="secondary" iconLeading={Plus} onClick={addEducation} className="w-fit">Add Education</Button>
                    </div>
                )}

                {currentStep === 3 && (
                    <div className="flex flex-col gap-6">
                        {formData.internships.map((intern, index) => (
                            <div key={index} className="p-4 border border-secondary rounded-lg bg-gray-50 relative">
                                {formData.internships.length > 1 && (
                                    <ButtonUtility 
                                        icon={Trash01} 
                                        color="tertiary" 
                                        onClick={() => removeInternship(index)}
                                        className="absolute top-4 right-4 text-error-500"
                                        aria-label="Remove"
                                    />
                                )}
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <Input
                                        label="Organization"
                                        placeholder="e.g. Google"
                                        value={intern.organization}
                                        onChange={(val) => updateInternship(index, "organization", val)}
                                    />
                                    <Input
                                        label="Role"
                                        placeholder="e.g. SDE Intern"
                                        value={intern.role}
                                        onChange={(val) => updateInternship(index, "role", val)}
                                    />
                                    <Input
                                        label="Start Date"
                                        type="date"
                                        value={intern.startDate}
                                        onChange={(val) => updateInternship(index, "startDate", val)}
                                    />
                                    <Input
                                        label="End Date"
                                        type="date"
                                        value={intern.endDate}
                                        onChange={(val) => updateInternship(index, "endDate", val)}
                                    />
                                    <div className="col-span-1 sm:col-span-2">
                                        <TextArea
                                            label="Description"
                                            placeholder="Describe your role..."
                                            value={intern.description}
                                            onChange={(val) => updateInternship(index, "description", val)}
                                            rows={3}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                        <Button color="secondary" iconLeading={Plus} onClick={addInternship} className="w-fit">Add Internship</Button>
                    </div>
                )}

                {currentStep === 4 && (
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                             <label className="text-sm font-medium text-primary">Skills</label>
                             <p className="text-sm text-tertiary">Select relevant skills from the list.</p>
                             <MultiSelect
                                label="Skills"
                                placeholder="Select skills..."
                                items={availableSkills}
                                selectedItems={selectedSkills}
                                onSelectionChange={(key) => {}}
                            >
                                {(item) => <SelectItem id={item.id} textValue={item.label}>{item.label}</SelectItem>}
                            </MultiSelect>
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
                        {currentStep === STEPS.length ? (isLoading ? "Saving..." : "Create Student") : "Next Step"}
                    </Button>
                </div>
            </div>
        </div>
    );
}
