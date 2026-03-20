/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import ManagementTable from "@/components/shared/ManagementTable";
import { deleteSubscription } from "@/services/admin/subscriptionManagement";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import SubscriptionViewDialog from "./SubscriptionViewDialog";
import { subscriptionColumns } from "./subscriptionColumns";
import SubscriptionFormDialog from "./SubscriptionFormDialog";


interface SubscriptionTableProps {
  subscriptions: any[];
}

const SubscriptionTable = ({ subscriptions }: SubscriptionTableProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();

  const [deletingSubscription, setDeletingSubscription] = useState<any | null>(null);
  const [viewingSubscription, setViewingSubscription] = useState<any | null>(null);
  const [editingSubscription, setEditingSubscription] = useState<any | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleView = (subscription: any) => {
    setViewingSubscription(subscription);
  };

  const handleEdit = (subscription: any) => {
    setEditingSubscription(subscription);
  };

  const handleDelete = (subscription: any) => {
    setDeletingSubscription(subscription);
  };

  const confirmDelete = async () => {
    if (!deletingSubscription) return;

    setIsDeleting(true);
    const result = await deleteSubscription(deletingSubscription.id);
    setIsDeleting(false);

    if (result.success) {
      toast.success(result.message || "Subscription deleted successfully");
      setDeletingSubscription(null);
      handleRefresh();
    } else {
      toast.error(result.message || "Failed to delete subscription");
    }
  };

  return (
    <>
      <div className="bg-white/80 rounded-lg">
        <ManagementTable
          data={subscriptions}
          columns={subscriptionColumns}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
          getRowKey={(subscription) => subscription.id}
          emptyMessage="No subscriptions found"
        />
      </div>

      {/* Edit Doctor Form Dialog */}
      <SubscriptionFormDialog
        open={!!editingSubscription}
        onClose={() => setEditingSubscription(null)}
        subscription={editingSubscription}
        onSuccess={() => {
          setEditingSubscription(null);
          handleRefresh();
        }}
      />

      {/* View Subscription Dialog */}
      <SubscriptionViewDialog
        open={!!viewingSubscription}
        onClose={() => setViewingSubscription(null)}
        subscription={viewingSubscription}
      />

      {/* Delete Confirmation */}
      <DeleteConfirmationDialog
        open={!!deletingSubscription}
        onOpenChange={(open) => !open && setDeletingSubscription(null)}
        onConfirm={confirmDelete}
        title="Delete Subscription"
        description={`Are you sure you want to delete this subscription? This action cannot be undone.`}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default SubscriptionTable;