"use client";

import { useState, useEffect } from "react";
import { User01, XClose } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { Input } from "@/components/base/input/input";
import { Select } from "@/components/base/select/select";
import { SelectItem } from "@/components/base/select/select-item";
import { ModalOverlay, Modal, Dialog } from "@/components/application/modals/modal";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { BackgroundPattern } from "@/components/shared-assets/background-patterns";
import type { SelectItemType } from "@/components/base/select/select";

interface AddEditTeamModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: any) => void;
    initialData?: { name: string; email: string; role: string } | null;
}

const roleOptions: SelectItemType[] = [
    { id: "superadmin", label: "Super Admin" },
    { id: "admin", label: "Admin" },
    { id: "hr", label: "HR" },
];

export const AddEditTeamModal = ({ isOpen, onClose, onSave, initialData }: AddEditTeamModalProps) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState<string | null>(null);

    useEffect(() => {
        if (isOpen) {
            setName(initialData?.name || "");
            setEmail(initialData?.email || "");
            setRole(initialData?.role || null);
            setPassword(""); // Always reset password
        } else {
            setName("");
            setEmail("");
            setRole(null);
            setPassword("");
        }
    }, [isOpen, initialData]);

    const handleSave = () => {
        if (name && email && role) {
            const payload: any = { name, email, role };
            // Only include password if we are adding a new user (no initialData)
            // or if we want to allow password updates in edit (not requested but harmless if handled by backend)
            // User requested specific add-team payload with password.
            if (!initialData) {
                if (password) {
                    payload.password = password;
                } else {
                    // Password is required for new users? Assuming yes.
                    // For now, let's allow it to be empty if the UI doesn't strictly validate, 
                    // but typically it's required.
                }
            }
            onSave(payload);
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
                            <FeaturedIcon icon={User01} color="brand" theme="modern" size="lg" />
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
                                {initialData ? "Edit Team Member" : "Add Team Member"}
                            </h3>
                            <p className="text-sm text-tertiary">
                                {initialData ? "Update the details of the selected team member." : "Please enter the details for the new team member."}
                            </p>
                        </div>

                        <div className="flex flex-col gap-4 mt-5">
                            <Input
                                label="Full Name"
                                placeholder="e.g. John Doe"
                                value={name}
                                onChange={setName}
                            />
                            
                            <Input
                                label="Email Address"
                                placeholder="e.g. john@example.com"
                                type="email"
                                value={email}
                                onChange={setEmail}
                            />

                            {!initialData && (
                                <Input
                                    label="Password"
                                    placeholder="Enter password"
                                    type="password"
                                    value={password}
                                    onChange={setPassword}
                                />
                            )}

                            <Select
                                label="Role"
                                placeholder="Select a role"
                                items={roleOptions}
                                selectedKey={role}
                                onSelectionChange={(key) => setRole(key as string)}
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
