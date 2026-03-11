/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import OrderFormDialog from "./OrderFormDialog";
import { getAllCategories } from "@/services/tailors/category.service";
import { getAllOrders } from "@/services/tailors/order.service";

const OrderManagementHeader = () => {
    const router = useRouter();
    const [, startTransition] = useTransition();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [categories, setCategories] = useState<any[]>([]);
    const [orders, setOrders] = useState<any[]>([]);

    useEffect(() => {
        async function fetchData() {
            const categoriesResult = await getAllCategories();
            setCategories(categoriesResult);

            const ordersResult = await getAllOrders();
            setOrders(ordersResult); 
        }
        fetchData();
    }, []);

    const handleSuccess = () => {
        startTransition(() => {
            router.refresh();
        });
    };
    return (
        <>
            <OrderFormDialog
                orders={orders || []}
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