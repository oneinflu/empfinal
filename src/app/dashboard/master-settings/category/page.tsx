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
import { AddEditCategoryModal } from "@/components/application/dashboard/master-settings/category/add-edit-category-modal";
import { DeleteConfirmationModal } from "@/components/application/dashboard/master-settings/category/delete-confirmation-modal";
import type { SelectItemType } from "@/components/base/select/select";

const columns = [
    { name: "Name", id: "name", isRowHeader: true },
    { name: "Parent Group", id: "parent" },
    { name: "", id: "actions" },
];

import { authenticatedFetch } from "@/utils/api";

interface Category {
    _id: string;
    name: string;
    parentId?: {
        _id: string;
        name: string;
    } | null;
}

const ITEMS_PER_PAGE = 10;

export default function CategoryPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isAddEditOpen, setIsAddEditOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Search, Filter, Pagination State
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedParent, setSelectedParent] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            setIsLoading(true);
            const response = await authenticatedFetch(`/categories`);
            if (response.ok) {
                const data = await response.json();
                setCategories(data);
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAdd = () => {
        setEditingCategory(null);
        setIsAddEditOpen(true);
    };

    const handleEdit = (category: Category) => {
        setEditingCategory(category);
        setIsAddEditOpen(true);
    };

    const handleDelete = (category: Category) => {
        setCategoryToDelete(category);
        setIsDeleteOpen(true);
    };

    const handleSaveCategory = async (data: { name: string; parent: string | null }) => {
        try {
            if (editingCategory) {
                // Update Category
                const payload = {
                    name: data.name,
                    parentId: data.parent || undefined // API expects ID or undefined
                };
                
                const response = await authenticatedFetch(`/categories/${editingCategory._id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                });
                
                if (response.ok) {
                    fetchCategories();
                }
            } else {
                // Create Category
                const payload = {
                    name: data.name,
                    parentId: data.parent || undefined
                };
                
                const response = await authenticatedFetch(`/categories`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                });
                
                if (response.ok) {
                    fetchCategories();
                }
            }
        } catch (error) {
            console.error("Error saving category:", error);
        }
    };

    const confirmDelete = async () => {
        if (!categoryToDelete) return;
        
        try {
            const response = await authenticatedFetch(`/categories/${categoryToDelete._id}`, {
                method: "DELETE",
            });
            
            if (response.ok) {
                fetchCategories();
            }
        } catch (error) {
            console.error("Error deleting category:", error);
        }
    };

    // Derived parent options for filter and modal
    const parentOptions: SelectItemType[] = categories
        .filter(c => !c.parentId) // Maybe only root categories can be parents? Or any? Let's assume any.
        // Actually, user example showed "Web Development" (child) -> "Technology" (parent).
        // Let's allow any category to be a parent, excluding self.
        .map(c => ({
            id: c._id,
            label: c.name,
        }));

    // Filter Logic
    const filteredCategories = categories.filter((category) => {
        const matchesSearch = category.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesParent = selectedParent ? category.parentId?._id === selectedParent : true;
        return matchesSearch && matchesParent;
    });

    // Pagination Logic
    const totalPages = Math.ceil(filteredCategories.length / ITEMS_PER_PAGE);
    const paginatedCategories = filteredCategories.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

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
        { id: "all", label: "All Groups" },
        ...parentOptions
    ];

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                 <div className="flex flex-col gap-1">
                    <h1 className="text-display-sm font-semibold text-primary">Category</h1>
                    <p className="text-md text-tertiary">Manage your categories and their hierarchy.</p>
                 </div>
                 <Button color="primary" iconLeading={Plus} onClick={handleAdd}>Add Category</Button>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
                <Input 
                    placeholder="Search categories..." 
                    icon={SearchLg} 
                    value={searchQuery}
                    onChange={handleSearchChange}
                    wrapperClassName="w-full sm:max-w-xs"
                />
                <div className="w-full sm:max-w-xs">
                    <Select
                        placeholder="Filter by group"
                        items={filterOptions}
                        selectedKey={selectedParent || "all"}
                        onSelectionChange={(key) => handleParentFilterChange(key as string)}
                    >
                        {(item) => <SelectItem id={item.id} textValue={item.label}>{item.label}</SelectItem>}
                    </Select>
                </div>
            </div>

            <TableCard.Root>
                <Table aria-label="Categories table">
                    <Table.Header columns={columns}>
                        {(column) => <Table.Head isRowHeader={column.isRowHeader}>{column.name}</Table.Head>}
                    </Table.Header>
                    <Table.Body items={paginatedCategories}>
                        {(item) => (
                            <Table.Row id={item._id}>
                                <Table.Cell>{item.name}</Table.Cell>
                                <Table.Cell>{item.parentId?.name || "-"}</Table.Cell>
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
                
                {filteredCategories.length > 0 ? (
                    <PaginationCardMinimal
                        page={currentPage}
                        total={totalPages}
                        onPageChange={setCurrentPage}
                    />
                ) : (
                    <div className="p-6 text-center text-tertiary">
                        {isLoading ? "Loading categories..." : "No categories found matching your criteria."}
                    </div>
                )}
            </TableCard.Root>

            <AddEditCategoryModal
                isOpen={isAddEditOpen}
                onClose={() => setIsAddEditOpen(false)}
                onSave={handleSaveCategory}
                initialData={editingCategory ? { name: editingCategory.name, parent: editingCategory.parentId?._id || null } : undefined}
                parentOptions={categories.map(c => ({ id: c._id, label: c.name })).filter(c => c.id !== editingCategory?._id)}
            />

            <DeleteConfirmationModal
                isOpen={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                onConfirm={confirmDelete}
                title="Delete Category"
                description={`Are you sure you want to delete "${categoryToDelete?.name}"? This action cannot be undone.`}
            />
        </div>
    );
}
