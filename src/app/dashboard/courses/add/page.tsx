"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { 
    ChevronRight, 
    BookOpen01, 
    CoinsStacked01, 
    List,
    GraduationHat01,
    ArrowLeft,
    UploadCloud02,
    Plus,
    Trash01,
    XClose
} from "@untitledui/icons";
import { useListData } from "react-stately";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { Input } from "@/components/base/input/input";
import { TextArea } from "@/components/base/textarea/textarea";
import { Select, SelectItemType } from "@/components/base/select/select";
import { SelectItem } from "@/components/base/select/select-item";
import { MultiSelectBase } from "@/components/base/select/multi-select";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { cx } from "@/utils/cx";

const API_BASE_URL = "https://empnodeapis-6f68i.ondigitalocean.app/api";

const COURSE_LEVELS = [
    { id: "Beginner", label: "Beginner" },
    { id: "Intermediate", label: "Intermediate" },
    { id: "Advanced", label: "Advanced" },
];

const COURSE_FORMATS = [
    { id: "Online - Self Paced", label: "Online - Self Paced" },
    { id: "Online - Live", label: "Online - Live" },
    { id: "Hybrid", label: "Hybrid" },
    { id: "In-Person", label: "In-Person" },
];

const STEPS = [
    { id: 1, title: "Basic Info", icon: BookOpen01 },
    { id: 2, title: "Curriculum", icon: List },
    { id: 3, title: "Details & Price", icon: CoinsStacked01 },
    { id: 4, title: "Growth & Audience", icon: GraduationHat01 },
];

export default function AddCoursePage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    // Data Sources
    const [companies, setCompanies] = useState<SelectItemType[]>([]);
    const [allSkills, setAllSkills] = useState<SelectItemType[]>([]);
    const [bannerPreview, setBannerPreview] = useState<string | null>(null);
    const [bannerFile, setBannerFile] = useState<File | null>(null);
    
    // Form State
    const [formData, setFormData] = useState({
        companyId: "", // Optional override
        title: "",
        level: "Beginner",
        format: "Online - Self Paced",
        duration: "",
        shortDescription: "",
        description: "",
        price: "", 
        originalPrice: "",
        
        modules: [] as { 
            title: string; 
            description: string; 
            estimatedTime: string; 
            lessons: { title: string; duration: string; type: string }[] 
        }[],
        
        outcomes: [] as string[],
        prerequisites: [] as string[],
        targetAudience: [] as string[],
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
            const response = await fetch(`${API_BASE_URL}/company-profiles`);
            if (response.ok) {
                const data = await response.json();
                const list = Array.isArray(data) ? data : (data.data || data.companies || []);
                setCompanies(list.map((c: any) => ({
                    id: c._id,
                    label: c.companyName || c.user?.name || "Unknown Company",
                })));
            }
        } catch (error) {
            console.error("Error fetching companies:", error);
        }
    };

    const fetchSkills = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/skills`);
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

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setBannerFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setBannerPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    // Helper for simple arrays (outcomes, prerequisites, targetAudience)
    const addSimpleItem = (field: 'outcomes' | 'prerequisites' | 'targetAudience', value: string) => {
        if (!value.trim()) return;
        setFormData(prev => ({
            ...prev,
            [field]: [...prev[field], value]
        }));
    };

    const removeSimpleItem = (field: 'outcomes' | 'prerequisites' | 'targetAudience', index: number) => {
        setFormData(prev => ({
            ...prev,
            [field]: prev[field].filter((_, i) => i !== index)
        }));
    };

    // Helper for Modules
    const addModule = () => {
        setFormData(prev => ({
            ...prev,
            modules: [...prev.modules, { title: "", description: "", estimatedTime: "", lessons: [] }]
        }));
    };

    const updateModule = (index: number, field: string, value: any) => {
        setFormData(prev => {
            const newModules = [...prev.modules];
            newModules[index] = { ...newModules[index], [field]: value };
            return { ...prev, modules: newModules };
        });
    };

    const removeModule = (index: number) => {
        setFormData(prev => ({
            ...prev,
            modules: prev.modules.filter((_, i) => i !== index)
        }));
    };

    // Helper for Lessons inside Modules
    const addLesson = (moduleIndex: number) => {
        setFormData(prev => {
            const newModules = [...prev.modules];
            newModules[moduleIndex].lessons.push({ title: "", duration: "", type: "video" });
            return { ...prev, modules: newModules };
        });
    };

    const updateLesson = (moduleIndex: number, lessonIndex: number, field: string, value: any) => {
        setFormData(prev => {
            const newModules = [...prev.modules];
            const newLessons = [...newModules[moduleIndex].lessons];
            newLessons[lessonIndex] = { ...newLessons[lessonIndex], [field]: value };
            newModules[moduleIndex].lessons = newLessons;
            return { ...prev, modules: newModules };
        });
    };

    const removeLesson = (moduleIndex: number, lessonIndex: number) => {
        setFormData(prev => {
            const newModules = [...prev.modules];
            newModules[moduleIndex].lessons = newModules[moduleIndex].lessons.filter((_, i) => i !== lessonIndex);
            return { ...prev, modules: newModules };
        });
    };

    const handleSubmit = async () => {
        try {
            setIsLoading(true);
            const data = new FormData();
            
            if (bannerFile) {
                data.append('banner', bannerFile);
            }

            // Append basic fields
            data.append('title', formData.title);
            data.append('level', formData.level);
            data.append('format', formData.format);
            data.append('duration', formData.duration);
            data.append('shortDescription', formData.shortDescription);
            data.append('description', formData.description);
            data.append('price', formData.price);
            if (formData.originalPrice) data.append('originalPrice', formData.originalPrice);
            if (formData.companyId) data.append('company', formData.companyId); // Backend likely expects 'company' or 'companyId'

            // Append complex fields as JSON
            data.append('modules', JSON.stringify(formData.modules));
            data.append('outcomes', JSON.stringify(formData.outcomes));
            data.append('prerequisites', JSON.stringify(formData.prerequisites));
            data.append('targetAudience', JSON.stringify(formData.targetAudience));
            data.append('skills', JSON.stringify(selectedSkills.items.map(s => s.id)));

            const response = await fetch(`${API_BASE_URL}/admin/courses/add`, {
                method: "POST",
                body: data,
                // Do NOT set Content-Type header for multipart/form-data
            });

            if (!response.ok) throw new Error("Failed to create course");
            router.push("/dashboard/courses");
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
                    Back to Courses
                </button>
                
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-display-sm font-semibold text-primary">Add New Course</h1>
                        <p className="text-md text-tertiary">Create a new course offering.</p>
                    </div>
                    <div className="flex gap-3">
                        <Button color="secondary" onClick={() => router.back()}>Cancel</Button>
                        {currentStep < 4 ? (
                            <Button color="primary" onClick={() => setCurrentStep(c => c + 1)}>
                                Next 
                            </Button>
                        ) : (
                            <Button color="primary" onClick={handleSubmit} isLoading={isLoading}>
                                Create Course
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
                        <div className="md:col-span-2">
                            <label className="text-sm font-medium text-primary mb-2 block">Course Banner</label>
                            <div 
                                className="border-2 border-dashed border-secondary rounded-xl p-8 flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-gray-50 transition-colors"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                {bannerPreview ? (
                                    <div className="relative w-full h-48 rounded-lg overflow-hidden">
                                        <img src={bannerPreview} alt="Preview" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                            <span className="text-white font-medium">Change Image</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center gap-2 text-center">
                                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-tertiary">
                                            <UploadCloud02 className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <span className="text-brand-solid font-medium">Click to upload</span>
                                            <span className="text-tertiary"> or drag and drop</span>
                                        </div>
                                        <p className="text-xs text-tertiary">SVG, PNG, JPG or GIF (max. 800x400px)</p>
                                    </div>
                                )}
                                <input 
                                    ref={fileInputRef}
                                    type="file" 
                                    accept="image/*" 
                                    className="hidden" 
                                    onChange={handleFileChange}
                                />
                            </div>
                        </div>

                        <Input
                            label="Course Title"
                            placeholder="e.g. Advanced React Patterns"
                            value={formData.title}
                            onChange={(value) => setFormData({...formData, title: value})}
                            className="md:col-span-2"
                        />

                        <Select
                            label="Company (Optional Override)"
                            selectedKey={formData.companyId}
                            onSelectionChange={(key) => setFormData({...formData, companyId: key as string})}
                            items={companies}
                            placeholder="Select Company"
                        >
                            {(item) => <SelectItem {...item} />}
                        </Select>

                        <Select
                            label="Level"
                            selectedKey={formData.level}
                            onSelectionChange={(key) => setFormData({...formData, level: key as string})}
                            items={COURSE_LEVELS}
                        >
                            {(item) => <SelectItem {...item} />}
                        </Select>

                        <Select
                            label="Format"
                            selectedKey={formData.format}
                            onSelectionChange={(key) => setFormData({...formData, format: key as string})}
                            items={COURSE_FORMATS}
                        >
                            {(item) => <SelectItem {...item} />}
                        </Select>

                        <Input
                            label="Duration"
                            placeholder="e.g. 8 weeks"
                            value={formData.duration}
                            onChange={(value) => setFormData({...formData, duration: value})}
                        />
                    </div>
                )}

                {/* Step 2: Curriculum */}
                {currentStep === 2 && (
                    <div className="flex flex-col gap-8">
                        {formData.modules.map((module, mIdx) => (
                            <div key={mIdx} className="flex flex-col gap-4 p-4 border border-secondary rounded-xl bg-gray-50">
                                <div className="flex justify-between items-start">
                                    <h3 className="text-sm font-semibold text-primary">Module {mIdx + 1}</h3>
                                    <ButtonUtility 
                                        icon={Trash01} 
                                        color="tertiary" 
                                        onClick={() => removeModule(mIdx)}
                                    />
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Input
                                        label="Module Title"
                                        value={module.title}
                                        onChange={(val) => updateModule(mIdx, 'title', val)}
                                        className="md:col-span-2"
                                    />
                                    <TextArea
                                        label="Description"
                                        value={module.description}
                                        onChange={(val) => updateModule(mIdx, 'description', val)}
                                        rows={2}
                                        className="md:col-span-2"
                                    />
                                    <Input
                                        label="Est. Time"
                                        placeholder="e.g. 2 hours"
                                        value={module.estimatedTime}
                                        onChange={(val) => updateModule(mIdx, 'estimatedTime', val)}
                                    />
                                </div>

                                {/* Lessons */}
                                <div className="flex flex-col gap-3 pl-4 border-l-2 border-gray-200 mt-2">
                                    <label className="text-xs font-semibold text-tertiary uppercase">Lessons</label>
                                    {module.lessons.map((lesson, lIdx) => (
                                        <div key={lIdx} className="flex gap-2 items-start">
                                            <Input
                                                placeholder="Lesson Title"
                                                value={lesson.title}
                                                onChange={(val) => updateLesson(mIdx, lIdx, 'title', val)}
                                                className="flex-1"
                                                wrapperClassName="w-full"
                                            />
                                            <Input
                                                placeholder="Duration"
                                                value={lesson.duration}
                                                onChange={(val) => updateLesson(mIdx, lIdx, 'duration', val)}
                                                className="w-24"
                                                wrapperClassName="w-24 shrink-0"
                                            />
                                            <ButtonUtility 
                                                icon={XClose} 
                                                color="tertiary" 
                                                onClick={() => removeLesson(mIdx, lIdx)}
                                                className="mt-1"
                                            />
                                        </div>
                                    ))}
                                    <Button 
                                        size="sm" 
                                        color="secondary" 
                                        iconLeading={Plus} 
                                        onClick={() => addLesson(mIdx)}
                                        className="w-fit"
                                    >
                                        Add Lesson
                                    </Button>
                                </div>
                            </div>
                        ))}

                        <Button 
                            color="secondary" 
                            iconLeading={Plus} 
                            onClick={addModule}
                            className="w-full justify-center border-dashed"
                        >
                            Add Module
                        </Button>
                    </div>
                )}

                {/* Step 3: Details & Price */}
                {currentStep === 3 && (
                    <div className="flex flex-col gap-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 border border-secondary rounded-lg bg-gray-50">
                            <h3 className="md:col-span-2 text-sm font-semibold text-primary">Pricing</h3>
                            <Input
                                label="Price (Display)"
                                placeholder="e.g. $499 or Free"
                                value={formData.price}
                                onChange={(value) => setFormData({...formData, price: value})}
                            />
                            <Input
                                label="Original Price (Optional)"
                                placeholder="e.g. $999"
                                value={formData.originalPrice}
                                onChange={(value) => setFormData({...formData, originalPrice: value})}
                            />
                        </div>

                        <TextArea
                            label="Short Description"
                            placeholder="Brief overview for cards..."
                            value={formData.shortDescription}
                            onChange={(value) => setFormData({...formData, shortDescription: value})}
                            rows={3}
                        />

                        <TextArea
                            label="Full Description"
                            placeholder="Detailed course description..."
                            value={formData.description}
                            onChange={(value) => setFormData({...formData, description: value})}
                            rows={6}
                        />

                        <MultiSelectBase
                            label="Skills Learned"
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
                    </div>
                )}

                {/* Step 4: Growth & Audience */}
                {currentStep === 4 && (
                    <div className="flex flex-col gap-6">
                        {/* Outcomes */}
                        <div className="flex flex-col gap-4">
                            <label className="text-sm font-medium text-primary">Learning Outcomes</label>
                            {formData.outcomes.map((item, idx) => (
                                <div key={idx} className="flex gap-2 items-center">
                                    <Input 
                                        value={item} 
                                        onChange={(val) => {
                                            const newArr = [...formData.outcomes];
                                            newArr[idx] = val;
                                            setFormData({...formData, outcomes: newArr});
                                        }}
                                        className="flex-1"
                                        wrapperClassName="w-full"
                                    />
                                    <ButtonUtility 
                                        icon={Trash01} 
                                        color="tertiary" 
                                        onClick={() => removeSimpleItem('outcomes', idx)}
                                    />
                                </div>
                            ))}
                            <Button 
                                size="sm" 
                                color="secondary" 
                                iconLeading={Plus} 
                                onClick={() => addSimpleItem('outcomes', '')}
                                className="w-fit"
                            >
                                Add Outcome
                            </Button>
                        </div>

                        {/* Prerequisites */}
                        <div className="flex flex-col gap-4">
                            <label className="text-sm font-medium text-primary">Prerequisites</label>
                            {formData.prerequisites.map((item, idx) => (
                                <div key={idx} className="flex gap-2 items-center">
                                    <Input 
                                        value={item} 
                                        onChange={(val) => {
                                            const newArr = [...formData.prerequisites];
                                            newArr[idx] = val;
                                            setFormData({...formData, prerequisites: newArr});
                                        }}
                                        className="flex-1"
                                        wrapperClassName="w-full"
                                    />
                                    <ButtonUtility 
                                        icon={Trash01} 
                                        color="tertiary" 
                                        onClick={() => removeSimpleItem('prerequisites', idx)}
                                    />
                                </div>
                            ))}
                            <Button 
                                size="sm" 
                                color="secondary" 
                                iconLeading={Plus} 
                                onClick={() => addSimpleItem('prerequisites', '')}
                                className="w-fit"
                            >
                                Add Prerequisite
                            </Button>
                        </div>

                        {/* Target Audience */}
                        <div className="flex flex-col gap-4">
                            <label className="text-sm font-medium text-primary">Target Audience</label>
                            {formData.targetAudience.map((item, idx) => (
                                <div key={idx} className="flex gap-2 items-center">
                                    <Input 
                                        value={item} 
                                        onChange={(val) => {
                                            const newArr = [...formData.targetAudience];
                                            newArr[idx] = val;
                                            setFormData({...formData, targetAudience: newArr});
                                        }}
                                        className="flex-1"
                                        wrapperClassName="w-full"
                                    />
                                    <ButtonUtility 
                                        icon={Trash01} 
                                        color="tertiary" 
                                        onClick={() => removeSimpleItem('targetAudience', idx)}
                                    />
                                </div>
                            ))}
                            <Button 
                                size="sm" 
                                color="secondary" 
                                iconLeading={Plus} 
                                onClick={() => addSimpleItem('targetAudience', '')}
                                className="w-fit"
                            >
                                Add Audience
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
