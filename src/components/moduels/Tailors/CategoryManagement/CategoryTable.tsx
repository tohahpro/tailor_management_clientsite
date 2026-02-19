"use client";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import ManagementTable from "@/components/shared/ManagementTable";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { deleteCategory } from "@/services/tailors/category.service";
import { categoryColumns } from "./categoryColumns";
import { IClothCategoryTable } from "../../../../../types/category.interface";
import CategoryViewDetailDialog from "./CategoryViewDetailDialog";
import CategoryEditFormDialog from "./CategoryEditFormDialog";

interface CategoryTableProps {
    categories: IClothCategoryTable[];
}

const CategoryTable = ({ categories }: CategoryTableProps) => {
    const router = useRouter();
    const [, startTransition] = useTransition();
    const [viewingCategory, setViewingCategory] = useState<IClothCategoryTable | null>(null);
    const [editingCategory, setEditingCategory] = useState<IClothCategoryTable | null>(null);
    const [deletingCategory, setDeletingCategory] = useState<IClothCategoryTable | null>(null);


    const [isDeletingDialog, setIsDeletingDialog] = useState(false);

    const handleRefresh = () => {
        startTransition(() => {
            router.refresh();
        });
    };

    const handleView = (category: IClothCategoryTable) => {
        setViewingCategory(category);
    };

    const handleEdit = (category: IClothCategoryTable) => {
        setEditingCategory(category);
    };

    const handleSuccess = () => {
        startTransition(() => {
            router.refresh();
        });
    };

    const handleDelete = (category: IClothCategoryTable) => {
        setDeletingCategory(category);
    };

    const confirmDelete = async () => {
        if (!deletingCategory) return;

        setIsDeletingDialog(true);
        const result = await deleteCategory(deletingCategory.id);
        setIsDeletingDialog(false);
        if (result.success) {
            toast.success(result.message || "Category deleted successfully");
            setDeletingCategory(null);
            handleRefresh();
        } else {
            toast.error(result.message || "Failed to delete category");
        }
    };

    return (
        <>
            <ManagementTable
                data={categories}
                columns={categoryColumns}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
                getRowKey={(category) => category.id}
                emptyMessage="No specialities found"
            />
            {/* View Category Detail Dialog */}
            <CategoryViewDetailDialog
                open={!!viewingCategory}
                onClose={() => setViewingCategory(null)}
                category={viewingCategory}
            />
            {/* Edit Category Detail Dialog */}
            <CategoryEditFormDialog
                open={!!editingCategory}
                onClose={() => setEditingCategory(null)}
                category={editingCategory}
                onSuccess={handleSuccess}
            />
            {/* Delete Confirmation Dialog */}
            <DeleteConfirmationDialog
                open={!!deletingCategory}
                onOpenChange={(open) => !open && setDeletingCategory(null)}
                onConfirm={confirmDelete}
                title="Delete category"
                description={`Are you sure you want to delete ${deletingCategory?.name}? This action cannot be undone.`}
                isDeleting={isDeletingDialog}
            />
        </>
    );
};

export default CategoryTable;