"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
    ChevronRight, 
    Briefcase01, 
    CoinsStacked01, 
    CheckCircle, 
    Building07, 
    List,
    Plus,
    Trash01,
    ArrowLeft
} from "@untitledui/icons";
import { useListData } from "react-stately";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { Input } from "@/components/base/input/input";
import { TextArea } from "@/components/base/textarea/textarea";
import { Select, SelectItemType } from "@/components/base/select/select";
import { SelectItem } from "@/components/base/select/select-item";
import { MultiSelectBase } from "@/components/base/select/multi-select";
import { Toggle } from "@/components/base/toggle/toggle";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { cx } from "@/utils/cx";
import { authenticatedFetch } from "@/utils/api";

const JOB_TYPES = [
    { id: "job", label: "Full-time Job" },
    { id: "internship", label: "Internship" },
    { id: "contract", label: "Contract" },
    { id: "freelance", label: "Freelance" },
];

const WORK_MODES = [
    { id: "On-site", label: "On-site" },
    { id: "Remote", label: "Remote" },
    { id: "Hybrid", label: "Hybrid" },
];

const CURRENCIES = [
    { id: "INR", label: "INR" },
    { id: "USD", label: "USD" },
    { id: "EUR", label: "EUR" },
];

const SALARY_PERIODS = [
    { id: "yearly", label: "Yearly" },
    { id: "monthly", label: "Monthly" },
    { id: "hourly", label: "Hourly" },
];

const STATUS_OPTIONS = [
    { id: "active", label: "Active" },
    { id: "inactive", label: "Inactive" },
    { id: "closed", label: "Closed" },
];

const STEPS = [
    { id: 1, title: "Basic Info", icon: Briefcase01 },
    { id: 2, title: "Salary & Desc", icon: CoinsStacked01 },
    { id: 3, title: "Requirements", icon: List },
    { id: 4, title: "Process & Growth", icon: Building07 },
];

export default function AddJobPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    
    // Data Sources
    const [companies, setCompanies] = useState<SelectItemType[]>([]);
    const [allSkills, setAllSkills] = useState<SelectItemType[]>([]);
    
    // Form State
    const [formData, setFormData] = useState({
        companyId: "",
        title: "",
        type: "job",
        status: "active",
        workMode: "On-site",
        location: "",
        minExperience: 0,
        applicationDeadline: "",
        externalApply: false,
        salary: {
            min: 0,
            max: 0,
            currency: "INR",
            period: "yearly",
            isStipend: false
        },
        description: "",
        shortDescription: "",
        responsibilities: [] as string[],
        overview: {
            summary: "",
            responsibilities: [] as string[],
            requiredSkills: [] as string[],
            preferredQualifications: [] as string[],
            techStack: [] as { name: string; logo: string }[]
        },
        growth: {
            careerPath: [] as { title: string; timeframe: string; salary: string; type: string }[]
        },
        applicationProcess: {
            steps: [] as { title: string; description: string; icon: string; color: string }[],
            timeline: {
                applicationClose: "30 days",
                processDuration: "2 weeks",
                joiningDate: "Immediate"
            }
        },
        // Company details override (optional, usually fetched from company profile)
        companyDetails: {
            description: "",
            founded: "",
            headquarters: "",
            employees: ""
        }
    });

    const selectedSkills = useListData<SelectItemType>({
        initialItems: [],
        getKey: (item) => item.id,
    });

    useEffect(() => {
        fetchCompanies();
        fetchSkills();
    }, []);

    const fetchCompanies = async () => {
        try {
            const response = await authenticatedFetch(`/company-profiles`);
            if (response.ok) {
                const data = await response.json();
                const list = Array.isArray(data) ? data : (data.data || data.companies || []);
                setCompanies(list.map((c: any) => ({
                    id: c._id,
                    label: c.companyName || c.user?.name || "Unknown Company",
                    avatarUrl: c.logoUrl || c.user?.avatarUrl
                })));
            }
        } catch (error) {
            console.error("Error fetching companies:", error);
        }
    };

    const fetchSkills = async () => {
        try {
            const response = await authenticatedFetch(`/skills`);
            if (response.ok) {
                const data = await response.json();
                const list = Array.isArray(data) ? data : (data.data || []);
                setAllSkills(list.map((s: any) => ({
                    id: s._id,
                    label: s.name
                })));
            }
        } catch (error) {
            console.error("Error fetching skills:", error);
        }
    };

    const updateNestedField = (path: string, value: any) => {
        setFormData(prev => {
            const newData = { ...prev };
            const keys = path.split('.');
            let current: any = newData;
            for (let i = 0; i < keys.length - 1; i++) {
                current = current[keys[i]];
            }
            current[keys[keys.length - 1]] = value;
            return newData;
        });
    };

    // Helper for dynamic arrays
    const addArrayItem = (path: string, item: any) => {
        setFormData(prev => {
            const newData = { ...prev };
            const keys = path.split('.');
            let current: any = newData;
            for (let i = 0; i < keys.length - 1; i++) {
                current = current[keys[i]];
            }
            current[keys[keys.length - 1]] = [...current[keys[keys.length - 1]], item];
            return newData;
        });
    };

    const removeArrayItem = (path: string, index: number) => {
        setFormData(prev => {
            const newData = { ...prev };
            const keys = path.split('.');
            let current: any = newData;
            for (let i = 0; i < keys.length - 1; i++) {
                current = current[keys[i]];
            }
            const arr = current[keys[keys.length - 1]];
            current[keys[keys.length - 1]] = arr.filter((_: any, i: number) => i !== index);
            return newData;
        });
    };

    const updateArrayItem = (path: string, index: number, field: string | null, value: any) => {
        setFormData(prev => {
            const newData = { ...prev };
            const keys = path.split('.');
            let current: any = newData;
            for (let i = 0; i < keys.length - 1; i++) {
                current = current[keys[i]];
            }
            const arr = [...current[keys[keys.length - 1]]];
            if (field) {
                arr[index] = { ...arr[index], [field]: value };
            } else {
                arr[index] = value;
            }
            current[keys[keys.length - 1]] = arr;
            return newData;
        });
    };

    const handleSubmit = async () => {
        try {
            setIsLoading(true);
            const payload = {
                ...formData,
                skills: selectedSkills.items.map(s => s.id),
                salary: {
                    ...formData.salary,
                    min: Number(formData.salary.min),
                    max: Number(formData.salary.max)
                },
                minExperience: Number(formData.minExperience)
            };

            const response = await authenticatedFetch(`/admin/jobs/add`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!response.ok) throw new Error("Failed to create job");
            router.push("/dashboard/jobs");
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
                    Back to Jobs
                </button>
                
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-display-sm font-semibold text-primary">Add New Job</h1>
                        <p className="text-md text-tertiary">Create a new job posting.</p>
                    </div>
                    <div className="flex gap-3">
                        <Button color="secondary" onClick={() => router.back()}>Cancel</Button>
                        {currentStep < 4 ? (
                            <Button color="primary" onClick={() => setCurrentStep(c => c + 1)}>
                                Next 
                            </Button>
                        ) : (
                            <Button color="primary" onClick={handleSubmit} isLoading={isLoading}>
                                Create Job
                            </Button>
                        )}
                    </div>
                </div>

                {/* Steps Indicator */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-secondary pb-6 overflow-x-auto">
                    <div className="flex gap-2 min-w-max sm:w-full">
                        {STEPS.map((step) => (
                            <div key={step.id} className="flex flex-col gap-2 w-32 sm:flex-1">
                                <div 
                                    className={cx(
                                        "h-1 w-full rounded-full transition-colors",
                                        step.id <= currentStep ? "bg-brand-solid" : "bg-secondary"
                                    )}
                                />
                                <span className={cx(
                                    "text-xs font-medium truncate",
                                    step.id <= currentStep ? "text-brand-secondary" : "text-tertiary"
                                )}>
                                    Step {step.id}: {step.title}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Form Content */}
            <div className="flex flex-col gap-6 bg-white rounded-xl shadow-sm border border-secondary p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-4">
                    <FeaturedIcon icon={STEPS[currentStep - 1].icon} color="brand" theme="modern" size="md" />
                    <h2 className="text-lg font-semibold text-primary">
                        {STEPS[currentStep - 1].title}
                    </h2>
                </div>
                
                {/* Step 1: Basic Info */}
                {currentStep === 1 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Select
                            label="Company"
                            selectedKey={formData.companyId}
                            onSelectionChange={(key) => setFormData({...formData, companyId: key as string})}
                            items={companies}
                            placeholder="Select Company"
                        >
                            {(item) => <SelectItem {...item} />}
                        </Select>

                        <Input
                            label="Job Title"
                            placeholder="e.g. Senior Backend Engineer"
                            value={formData.title}
                            onChange={(value) => setFormData({...formData, title: value})}
                        />

                        <Select
                            label="Type"
                            selectedKey={formData.type}
                            onSelectionChange={(key) => setFormData({...formData, type: key as string})}
                            items={JOB_TYPES}
                        >
                            {(item) => <SelectItem {...item} />}
                        </Select>

                        <Select
                            label="Status"
                            selectedKey={formData.status}
                            onSelectionChange={(key) => setFormData({...formData, status: key as string})}
                            items={STATUS_OPTIONS}
                        >
                            {(item) => <SelectItem {...item} />}
                        </Select>

                        <Select
                            label="Work Mode"
                            selectedKey={formData.workMode}
                            onSelectionChange={(key) => setFormData({...formData, workMode: key as string})}
                            items={WORK_MODES}
                        >
                            {(item) => <SelectItem {...item} />}
                        </Select>

                        <Input
                            label="Location"
                            placeholder="e.g. Bangalore, India"
                            value={formData.location}
                            onChange={(value) => setFormData({...formData, location: value})}
                        />

                        <Input
                            label="Min Experience (Years)"
                            type="number"
                            value={String(formData.minExperience)}
                            onChange={(value) => setFormData({...formData, minExperience: Number(value)})}
                        />

                        <Input
                            label="Application Deadline"
                            type="date"
                            value={formData.applicationDeadline}
                            onChange={(value) => setFormData({...formData, applicationDeadline: value})}
                        />
                        
                        <div className="flex items-center gap-2 md:col-span-2">
                             <Toggle 
                                size="sm" 
                                isSelected={formData.externalApply} 
                                onChange={(val) => setFormData({...formData, externalApply: val})} 
                            />
                            <span className="text-sm font-medium text-primary">External Apply</span>
                        </div>
                    </div>
                )}

                {/* Step 2: Salary & Description */}
                {currentStep === 2 && (
                    <div className="flex flex-col gap-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 border border-secondary rounded-lg bg-gray-50">
                            <h3 className="md:col-span-2 text-sm font-semibold text-primary">Salary Details</h3>
                            <Input
                                label="Min Salary"
                                type="number"
                                value={String(formData.salary.min)}
                                onChange={(value) => updateNestedField('salary.min', Number(value))}
                            />
                            <Input
                                label="Max Salary"
                                type="number"
                                value={String(formData.salary.max)}
                                onChange={(value) => updateNestedField('salary.max', Number(value))}
                            />
                            <Select
                                label="Currency"
                                selectedKey={formData.salary.currency}
                                onSelectionChange={(key) => updateNestedField('salary.currency', key)}
                                items={CURRENCIES}
                            >
                                {(item) => <SelectItem {...item} />}
                            </Select>
                            <Select
                                label="Period"
                                selectedKey={formData.salary.period}
                                onSelectionChange={(key) => updateNestedField('salary.period', key)}
                                items={SALARY_PERIODS}
                            >
                                {(item) => <SelectItem {...item} />}
                            </Select>
                        </div>

                        <TextArea
                            label="Short Description"
                            placeholder="Brief overview..."
                            value={formData.shortDescription}
                            onChange={(value) => setFormData({...formData, shortDescription: value})}
                            rows={3}
                        />

                        <TextArea
                            label="Full Description"
                            placeholder="Detailed job description..."
                            value={formData.description}
                            onChange={(value) => setFormData({...formData, description: value})}
                            rows={6}
                        />
                    </div>
                )}

                {/* Step 3: Requirements */}
                {currentStep === 3 && (
                    <div className="flex flex-col gap-6">
                        <MultiSelectBase
                            label="Skills"
                            items={allSkills}
                            selectedItems={selectedSkills}
                            onItemCleared={(key) => selectedSkills.remove(key)}
                            onItemInserted={(key) => {
                                const item = allSkills.find(s => s.id === key);
                                if (item) selectedSkills.append(item);
                            }}
                        >
                            {(item) => <SelectItem {...item} />}
                        </MultiSelectBase>

                        <TextArea
                            label="Overview Summary"
                            value={formData.overview.summary}
                            onChange={(value) => updateNestedField('overview.summary', value)}
                            rows={3}
                        />

                        {/* Dynamic Responsibilities */}
                        <div className="flex flex-col gap-4">
                            <label className="text-sm font-medium text-primary">Responsibilities</label>
                            {formData.responsibilities.map((resp, idx) => (
                                <div key={idx} className="flex gap-2 items-start">
                                    <Input 
                                        value={resp} 
                                        onChange={(value) => updateArrayItem('responsibilities', idx, null, value)}
                                        className="flex-1"
                                        wrapperClassName="w-full"
                                    />
                                    <ButtonUtility 
                                        icon={Trash01} 
                                        color="tertiary" 
                                        onClick={() => removeArrayItem('responsibilities', idx)}
                                        className="mt-1" 
                                    />
                                </div>
                            ))}
                            <Button size="sm" color="secondary" iconLeading={Plus} onClick={() => addArrayItem('responsibilities', "")} className="w-fit">
                                Add Responsibility
                            </Button>
                        </div>

                        {/* Tech Stack */}
                        <div className="flex flex-col gap-4 border-t border-secondary pt-4">
                            <label className="text-sm font-medium text-primary">Tech Stack</label>
                            {formData.overview.techStack.map((stack, idx) => (
                                <div key={idx} className="p-4 border border-secondary rounded-lg bg-gray-50 relative">
                                    <ButtonUtility 
                                        icon={Trash01} 
                                        color="tertiary" 
                                        onClick={() => removeArrayItem('overview.techStack', idx)}
                                        className="absolute top-4 right-4 text-error-500"
                                    />
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <Input 
                                            label="Name"
                                            placeholder="e.g. React"
                                            value={stack.name} 
                                            onChange={(value) => updateArrayItem('overview.techStack', idx, 'name', value)}
                                        />
                                        <Input 
                                            label="Logo URL"
                                            placeholder="https://..."
                                            value={stack.logo} 
                                            onChange={(value) => updateArrayItem('overview.techStack', idx, 'logo', value)}
                                        />
                                    </div>
                                </div>
                            ))}
                             <Button size="sm" color="secondary" iconLeading={Plus} onClick={() => addArrayItem('overview.techStack', { name: "", logo: "" })} className="w-fit">
                                Add Tech Stack
                            </Button>
                        </div>
                    </div>
                )}

                {/* Step 4: Process & Growth */}
                {currentStep === 4 && (
                    <div className="flex flex-col gap-6">
                        <div className="p-4 bg-brand-50 rounded-lg border border-brand-200">
                             <p className="text-sm text-brand-700">
                                This section is under development. You can skip it or add placeholder data.
                             </p>
                        </div>
                         {/* Placeholder for Process & Growth form fields if needed */}
                         <p className="text-tertiary text-sm">Additional configuration options for application process and career growth path will appear here.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
