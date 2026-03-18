/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { deleteOrder } from "@/services/tailors/order.service";
import ManagementCard from "@/components/shared/ManagementCard";

interface OrderCardProps {
    orders: any[];
}

const OrderCard = ({ orders }: OrderCardProps) => {
    const router = useRouter();
    const [, startTransition] = useTransition();
    const [deletingOrder, setDeletingOrder] = useState<any | null>(null);
    const [isDeletingDialog, setIsDeletingDialog] = useState(false);

    const handleRefresh = () => {
        startTransition(() => {
            router.refresh();
        });
    };

    const handleView = (order: any) => {
        router.push(`/dashboard/my-orders/${order.id}`);
    };

    const handleEdit = (order: any) => {
        router.push(`/dashboard/my-orders/${order.id}/edit`);
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
            <div>
                <ManagementCard
                    data={orders}                    
                    onView={handleView}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    getRowKey={(Order) => Order.id}
                    emptyMessage="No Orders found"
                />
            </div>

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

export default OrderCard;