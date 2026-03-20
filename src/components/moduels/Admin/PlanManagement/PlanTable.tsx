/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { deletePlan } from "@/services/admin/planManagement";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import ManagementTable from "@/components/shared/ManagementTable";
import { planColumns } from "./planColumns";
import PlanViewDialog from "./PlanViewDialog";
import PlanFormDialog from "./PlanFormDialog";


interface PlanTableProps {
  plans: any[];
}

const PlanTable = ({ plans }: PlanTableProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();

  const [deletingPlan, setDeletingPlan] = useState<any | null>(null);
  const [viewingPlan, setViewingPlan] = useState<any | null>(null);
  const [editingPlan, setEditingPlan] = useState<any | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleView = (plans: any) => {
    setViewingPlan(plans);
  };

  const handleEdit = (plans: any) => {
    setEditingPlan(plans);
  };

  const handleDelete = (plans: any) => {
    setDeletingPlan(plans);
  };

  const confirmDelete = async () => {
    if (!deletingPlan) return;

    setIsDeleting(true);
    const result = await deletePlan(deletingPlan.id);
    setIsDeleting(false);

    if (result.success) {
      toast.success(result.message || "Plan deleted successfully");
      setDeletingPlan(null);
      handleRefresh();
    } else {
      toast.error(result.message || "Failed to delete Plan");
    }
  };

  return (
    <>
      <div className="bg-white/80 rounded-lg">
        <ManagementTable
          data={plans}
          columns={planColumns}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
          getRowKey={(subscription) => subscription.id}
          emptyMessage="No plans found"
        />
      </div>

      {/* Edit Doctor Form Dialog */}
      <PlanFormDialog
        open={!!editingPlan}
        onClose={() => setEditingPlan(null)}
        plan={editingPlan}
        onSuccess={() => {
          setEditingPlan(null);
          handleRefresh();
        }}
      />

      {/* View Subscription Dialog */}
      <PlanViewDialog
        open={!!viewingPlan}
        onClose={() => setViewingPlan(null)}
        plan={viewingPlan}
      />

      {/* Delete Confirmation */}
      <DeleteConfirmationDialog
        open={!!deletingPlan}
        onOpenChange={(open) => !open && setDeletingPlan(null)}
        onConfirm={confirmDelete}
        title="Delete Plan"
        description={`Are you sure you want to delete this plan? This action cannot be undone.`}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default PlanTable;