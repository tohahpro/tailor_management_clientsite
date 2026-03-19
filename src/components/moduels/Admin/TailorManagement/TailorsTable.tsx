/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import ManagementTable from "@/components/shared/ManagementTable";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { ITailor } from "../../../../../types/tailor.interface";
import { tailorColumns } from "./tailorsColumns";
import TailorFormDialog from "./TailorFormDialog";
import TailorViewDetailDialog from "./TailorViewDetailDialog";


interface TailrosTableProps {
    tailors: any[];
}

const TailrosTable = ({ tailors }: TailrosTableProps) => {

    const router = useRouter();
    const [, startTransition] = useTransition();
    const [viewingTailor, setViewingTailor] = useState<ITailor | null>(null);
    const [editingTailor, setEditingTailor] = useState<ITailor | null>(null);

    const handleRefresh = () => {
        startTransition(() => {
            router.refresh();
        });
    };

    const handleView = (tailor: ITailor) => {
        setViewingTailor(tailor);
    };

    const handleEdit = (tailor: ITailor) => {
        setEditingTailor(tailor);
    };


    return (
        <>
            <div className="bg-white/80 rounded-lg">
                <ManagementTable
                    data={tailors}
                    columns={tailorColumns}
                    onView={handleView}
                    onEdit={handleEdit}
                    className=""
                    getRowKey={(doctor) => doctor.id!}
                    emptyMessage="No tailors found"
                />
            </div>
            {/* Edit Doctor Form Dialog */}
            <TailorFormDialog
                open={!!editingTailor}
                onClose={() => setEditingTailor(null)}
                tailor={editingTailor!}
                onSuccess={() => {
                    setEditingTailor(null);
                    handleRefresh();
                }}
            />

            {/* View Tailor Detail Dialog */}
            <TailorViewDetailDialog
                open={!!viewingTailor}
                onClose={() => setViewingTailor(null)}
                tailor={viewingTailor as any}
            />

        </>
    );
};

export default TailrosTable;