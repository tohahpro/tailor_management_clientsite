/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import ManagementTable from "@/components/shared/ManagementTable";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { orderColumns } from "./orderColumns";
import { deleteOrder } from "@/services/tailors/order.service";

interface OrderTableProps {
    orders: any[];
}

const OrderTable = ({ orders }: OrderTableProps) => {
    const router = useRouter();
    const [, startTransition] = useTransition();
    const [viewingOrder, setViewingOrder] = useState<any | null>(null);
    const [editingOrder, setEditingOrder] = useState<any | null>(null);
    const [deletingOrder, setDeletingOrder] = useState<any | null>(null);


    const [isDeletingDialog, setIsDeletingDialog] = useState(false);

    const handleRefresh = () => {
        startTransition(() => {
            router.refresh();
        });
    };

    const handleView = (order: any) => {
        setViewingOrder(order);
    };

    const handleEdit = (order: any) => {
        setEditingOrder(order);
    };

    const handleSuccess = () => {
        startTransition(() => {
            router.refresh();
        });
    };

    const handleDelete = (order: any) => {
        setDeletingOrder(order);
    };

    const confirmDelete = async () => {
        if (!deletingOrder) return;

        setIsDeletingDialog(true);
        const result = await deleteOrder(deletingOrder.id);
        setIsDeletingDialog(false);
        if (result.success) {
            toast.success(result.message || "Order deleted successfully");
            setDeletingOrder(null);
            handleRefresh();
        } else {
            toast.error(result.message || "Failed to delete Order");
        }
    };

    return (
        <>
            <ManagementTable
                data={orders}
                columns={orderColumns}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
                className="bg-white/70 rounded-md"
                getRowKey={(Order) => Order.id}
                emptyMessage="No specialities found"
            />
            
            {/* Delete Confirmation Dialog */}
            <DeleteConfirmationDialog
                open={!!deletingOrder}
                onOpenChange={(open) => !open && setDeletingOrder(null)}
                onConfirm={confirmDelete}
                title="Delete Order"
                description={`Are you sure you want to delete ${deletingOrder?.name}? This action cannot be undone.`}
                isDeleting={isDeletingDialog}
            />
        </>
    );
};

export default OrderTable;