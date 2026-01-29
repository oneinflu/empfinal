"use client";

import { useState, useEffect } from "react";
import { Plus, Edit01, Trash01, SearchLg } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { Input } from "@/components/base/input/input";
import { Select } from "@/components/base/select/select";
import { SelectItem } from "@/components/base/select/select-item";
import { Table, TableCard } from "@/components/application/table/table";
import { PaginationCardMinimal } from "@/components/application/pagination/pagination";
import { AddEditSkillModal } from "@/components/application/dashboard/master-settings/skills/add-edit-skill-modal";
import { DeleteConfirmationModal } from "@/components/application/dashboard/master-settings/skills/delete-confirmation-modal";
import type { SelectItemType } from "@/components/base/select/select";

const columns = [
    { name: "Name", id: "name", isRowHeader: true },
    { name: "Parent", id: "parent" },
    { name: "", id: "actions" },
];

const API_BASE_URL = "https://empnodeapis-6f68i.ondigitalocean.app/api";

interface Skill {
    _id: string;
    name: string;
    parent?: {
        _id: string;
        name: string;
    } | null;
}

const ITEMS_PER_PAGE = 10;

export default function SkillsPage() {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [isAddEditOpen, setIsAddEditOpen] = useState(false);
    const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [skillToDelete, setSkillToDelete] = useState<Skill | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Search, Filter, Pagination State
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedParent, setSelectedParent] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetchSkills();
    }, []);

    const fetchSkills = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`${API_BASE_URL}/skills`);
            if (response.ok) {
                const data = await response.json();
                setSkills(data);
            }
        } catch (error) {
            console.error("Error fetching skills:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAdd = () => {
        setEditingSkill(null);
        setIsAddEditOpen(true);
    };

    const handleEdit = (skill: Skill) => {
        setEditingSkill(skill);
        setIsAddEditOpen(true);
    };

    const handleDelete = (skill: Skill) => {
        setSkillToDelete(skill);
        setIsDeleteOpen(true);
    };

    const handleSaveSkill = async (data: { name: string; parent: string | null }) => {
        try {
            if (editingSkill) {
                // Update Skill
                const payload = {
                    name: data.name,
                    parent: data.parent || undefined // API expects ID or undefined
                };
                
                const response = await fetch(`${API_BASE_URL}/skills/${editingSkill._id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                });
                
                if (response.ok) {
                    fetchSkills();
                }
            } else {
                // Create Skill
                const payload = {
                    name: data.name,
                    parent: data.parent || undefined
                };
                
                const response = await fetch(`${API_BASE_URL}/skills`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                });
                
                if (response.ok) {
                    fetchSkills();
                }
            }
        } catch (error) {
            console.error("Error saving skill:", error);
        }
    };

    const confirmDelete = async () => {
        if (!skillToDelete) return;
        
        try {
            const response = await fetch(`${API_BASE_URL}/skills/${skillToDelete._id}`, {
                method: "DELETE",
            });
            
            if (response.ok) {
                fetchSkills();
            }
        } catch (error) {
            console.error("Error deleting skill:", error);
        }
    };

    // Derived parent options for filter and modal
    // Filter out children from parent options to avoid deep nesting issues if API doesn't support it,
    // or simply use all skills as potential parents.
    // Based on user input: "Update Skill ( PUT /api/skills/:id ) : Now accepts parent in the body"
    // So any skill can be a parent.
    const parentOptions: SelectItemType[] = skills
        .filter(s => !s.parent) // Only root skills can be parents? Or any skill? 
        // User example shows: React.js (child) -> JavaScript (parent).
        // It implies a hierarchy. Let's assume any skill can be a parent, 
        // BUT for simplicity in UI, maybe avoid circular deps or deep nesting for now?
        // Let's just list all skills as potential parents, excluding the one being edited.
        .map(s => ({
            id: s._id,
            label: s.name,
        }));

    // Filter Logic
    const filteredSkills = skills.filter((skill) => {
        const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesParent = selectedParent ? skill.parent?._id === selectedParent : true;
        return matchesSearch && matchesParent;
    });

    // Pagination Logic
    const totalPages = Math.ceil(filteredSkills.length / ITEMS_PER_PAGE);
    const paginatedSkills = filteredSkills.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    // Reset page when filters change
    const handleSearchChange = (value: string) => {
        setSearchQuery(value);
        setCurrentPage(1);
    };

    const handleParentFilterChange = (key: string) => {
        setSelectedParent(key === "all" ? null : key);
        setCurrentPage(1);
    };

    const filterOptions = [
        { id: "all", label: "All Categories" },
        ...parentOptions
    ];

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                 <div className="flex flex-col gap-1">
                    <h1 className="text-display-sm font-semibold text-primary">Skills</h1>
                    <p className="text-md text-tertiary">Manage your skills and their hierarchy.</p>
                 </div>
                 <Button color="primary" iconLeading={Plus} onClick={handleAdd}>Add Skill</Button>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
                <Input 
                    placeholder="Search skills..." 
                    icon={SearchLg} 
                    value={searchQuery}
                    onChange={handleSearchChange}
                    wrapperClassName="w-full sm:max-w-xs"
                />
                <div className="w-full sm:max-w-xs">
                    <Select
                        placeholder="Filter by parent"
                        items={filterOptions}
                        selectedKey={selectedParent || "all"}
                        onSelectionChange={(key) => handleParentFilterChange(key as string)}
                    >
                        {(item) => <SelectItem id={item.id} textValue={item.label}>{item.label}</SelectItem>}
                    </Select>
                </div>
            </div>

            <TableCard.Root>
                <Table aria-label="Skills table">
                    <Table.Header columns={columns}>
                        {(column) => <Table.Head isRowHeader={column.isRowHeader}>{column.name}</Table.Head>}
                    </Table.Header>
                    <Table.Body items={paginatedSkills}>
                        {(item) => (
                            <Table.Row id={item._id}>
                                <Table.Cell>{item.name}</Table.Cell>
                                <Table.Cell>{item.parent?.name || "-"}</Table.Cell>
                                <Table.Cell>
                                    <div className="flex justify-end gap-2">
                                        <ButtonUtility 
                                            icon={Edit01} 
                                            aria-label="Edit" 
                                            color="tertiary" 
                                            onClick={() => handleEdit(item)}
                                        />
                                        <ButtonUtility 
                                            icon={Trash01} 
                                            aria-label="Delete" 
                                            color="tertiary" 
                                            onClick={() => handleDelete(item)}
                                            className="text-error-500 hover:text-error-600 hover:bg-error-50"
                                        />
                                    </div>
                                </Table.Cell>
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table>
                
                {filteredSkills.length > 0 ? (
                    <PaginationCardMinimal
                        page={currentPage}
                        total={totalPages}
                        onPageChange={setCurrentPage}
                    />
                ) : (
                    <div className="p-6 text-center text-tertiary">
                        {isLoading ? "Loading skills..." : "No skills found matching your criteria."}
                    </div>
                )}
            </TableCard.Root>

            <AddEditSkillModal
                isOpen={isAddEditOpen}
                onClose={() => setIsAddEditOpen(false)}
                onSave={handleSaveSkill}
                initialData={editingSkill ? { name: editingSkill.name, parent: editingSkill.parent?._id || null } : undefined}
                parentOptions={skills.map(s => ({ id: s._id, label: s.name })).filter(s => s.id !== editingSkill?._id)}
            />

            <DeleteConfirmationModal
                isOpen={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                onConfirm={confirmDelete}
                title="Delete Skill"
                description={`Are you sure you want to delete "${skillToDelete?.name}"? This action cannot be undone.`}
            />
        </div>
    );
}
