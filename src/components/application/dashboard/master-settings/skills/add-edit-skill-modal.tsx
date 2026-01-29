"use client";

import { useState, useEffect } from "react";
import { Cube01, XClose } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { Input } from "@/components/base/input/input";
import { Select } from "@/components/base/select/select";
import { SelectItem } from "@/components/base/select/select-item";
import { ModalOverlay, Modal, Dialog } from "@/components/application/modals/modal";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { BackgroundPattern } from "@/components/shared-assets/background-patterns";
import type { SelectItemType } from "@/components/base/select/select";

interface AddEditSkillModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (skill: { name: string; parent: string | null }) => void;
    initialData?: { name: string; parent: string | null };
    parentOptions: SelectItemType[];
}

export const AddEditSkillModal = ({ isOpen, onClose, onSave, initialData, parentOptions }: AddEditSkillModalProps) => {
    const [name, setName] = useState("");
    const [parent, setParent] = useState<string | null>(null);

    useEffect(() => {
        if (isOpen) {
            setName(initialData?.name || "");
            setParent(initialData?.parent || null);
        } else {
            setName("");
            setParent(null);
        }
    }, [isOpen, initialData]);

    const handleSave = () => {
        if (name) {
            onSave({ name, parent });
            onClose();
        }
    };

    return (
        <ModalOverlay isOpen={isOpen} onOpenChange={onClose}>
            <Modal className="w-full max-w-[400px]">
                <Dialog className="relative flex flex-col p-6 rounded-xl bg-primary shadow-xl outline-none overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute top-0 left-0 pointer-events-none -translate-x-1/4 -translate-y-1/4">
                        <BackgroundPattern pattern="circle" className="text-brand-tertiary/40 w-[400px] h-[400px]" />
                    </div>

                    <div className="relative z-10 flex flex-col">
                        <div className="flex items-start justify-between">
                            <FeaturedIcon icon={Cube01} color="brand" theme="modern" size="lg" />
                            <ButtonUtility 
                                icon={XClose} 
                                color="tertiary" 
                                onClick={onClose} 
                                aria-label="Close"
                                className="-mr-2 -mt-2"
                            />
                        </div>
                        
                        <div className="flex flex-col gap-1 mt-4">
                            <h3 className="text-lg font-semibold text-primary">
                                {initialData ? "Edit Skill" : "Add Skill"}
                            </h3>
                            <p className="text-sm text-tertiary">
                                {initialData ? "Update the details of the selected skill." : "Please enter the details for the new skill."}
                            </p>
                        </div>

                        <div className="flex flex-col gap-4 mt-5">
                            <Input
                                label="Skill Name"
                                placeholder="e.g. Website design"
                                value={name}
                                onChange={setName}
                            />

                            <Select
                                label="Parent Category"
                                placeholder="Select a parent"
                                items={parentOptions}
                                selectedKey={parent}
                                onSelectionChange={(key) => setParent(key as string)}
                            >
                                {(item) => <SelectItem id={item.id} textValue={item.label}>{item.label}</SelectItem>}
                            </Select>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mt-8">
                            <Button color="secondary" size="lg" onClick={onClose} className="w-full justify-center">Cancel</Button>
                            <Button color="primary" size="lg" onClick={handleSave} className="w-full justify-center">
                                {initialData ? "Save Changes" : "Confirm"}
                            </Button>
                        </div>
                    </div>
                </Dialog>
            </Modal>
        </ModalOverlay>
    );
};
