"use client";

import { ModalOverlay, Modal, Dialog } from "@/components/application/modals/modal";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { Trash01, XClose } from "@untitledui/icons";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { BackgroundPattern } from "@/components/shared-assets/background-patterns";

interface DeleteConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    description?: string;
    isLoading?: boolean;
}

export const DeleteConfirmationModal = ({
    isOpen,
    onClose,
    onConfirm,
    title = "Delete Course",
    description = "Are you sure you want to delete this course? This action cannot be undone.",
    isLoading = false,
}: DeleteConfirmationModalProps) => {
    return (
        <ModalOverlay isOpen={isOpen} onOpenChange={onClose}>
            <Modal className="w-full max-w-[400px]">
                <Dialog className="relative flex flex-col p-6 rounded-xl bg-primary shadow-xl outline-none overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute top-0 left-0 pointer-events-none -translate-x-1/4 -translate-y-1/4">
                        <BackgroundPattern pattern="circle" className="text-error-primary/40 w-[400px] h-[400px]" />
                    </div>

                    <div className="relative z-10 flex flex-col">
                        <div className="flex items-start justify-between">
                            <FeaturedIcon icon={Trash01} color="error" theme="modern" size="lg" />
                            <ButtonUtility 
                                icon={XClose} 
                                color="tertiary" 
                                onClick={onClose} 
                                aria-label="Close"
                                className="-mr-2 -mt-2"
                                isDisabled={isLoading}
                            />
                        </div>
                        
                        <div className="flex flex-col gap-1 mt-4">
                            <h3 className="text-lg font-semibold text-primary">{title}</h3>
                            <p className="text-sm text-tertiary">{description}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mt-8">
                            <Button 
                                color="secondary" 
                                size="lg" 
                                onClick={onClose} 
                                className="w-full justify-center"
                                isDisabled={isLoading}
                            >
                                Cancel
                            </Button>
                            <Button 
                                color="primary-destructive" 
                                size="lg" 
                                onClick={onConfirm} 
                                className="w-full justify-center"
                                isLoading={isLoading}
                            >
                                Delete
                            </Button>
                        </div>
                    </div>
                </Dialog>
            </Modal>
        </ModalOverlay>
    );
};
