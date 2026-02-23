/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import OrderFormDialog from "./OrderFormDialog";
import { getAllCategories } from "@/services/tailors/category.service";

const OrderManagementHeader = () => {
    const router = useRouter();
    const [, startTransition] = useTransition();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [categories, setCategories] = useState<any[]>([]); // cloth categories with measurements

    useEffect(() => {
        async function fetchCategories() {
            const result = await getAllCategories(); // must return [{ id, name, measurements: [{ id, name }] }]
            setCategories(result);
        }
        fetchCategories();
    }, []);

    const handleSuccess = () => {
        startTransition(() => {
            router.refresh();
        });
    };
    return (
        <>
            <OrderFormDialog
                categories={categories || []}
                open={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                onSuccess={handleSuccess}
            />

            <ManagementPageHeader
                title="Order Management"
                description="Manage Category information and details"
                action={{
                    label: "Create Order",
                    icon: Plus,
                    onClick: () => setIsDialogOpen(true),
                }}
            />
        </>
    );
};

export default OrderManagementHeader;