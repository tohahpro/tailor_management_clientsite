/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { FinancialSummary } from "@/components/moduels/Tailors/OrderManagement/OrderDetails/FinancialSummary";
import { OrderHeader } from "@/components/moduels/Tailors/OrderManagement/OrderDetails/orderHeader";
import { OrderItemCard } from "@/components/moduels/Tailors/OrderManagement/OrderDetails/OrderItemCard";

import { getOrderById } from "@/services/tailors/order.service";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function OrderDetailsPage() {
    const params = useParams();
    const orderId = params.id;
    const [order, setOrder] = useState<any | null>(null);

    useEffect(() => {
        async function load() {
            const data = await getOrderById(orderId as string);
            setOrder(data.data);
        }
        load();
    }, [orderId]);

    if (!order) return <p>Loading...</p>;

    console.log(order)
    return (
        <div className="min-h-screen bg-stone-50 text-stone-900 font-sans selection:bg-amber-200 selection:text-amber-900">
            {/* Main Content */}
            <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-stone-900 mb-2">
                        Order Details
                    </h1>
                    <p className="text-stone-500">
                        Manage order information, measurements, and financial status.
                    </p>
                </div>

                <OrderHeader order={order} />

                <FinancialSummary order={order} />

                <div className="mt-10">
                    <h2 className="text-xl font-bold text-stone-900 mb-6 flex items-center gap-2">
                        Order Items
                        <span className="bg-stone-200 text-stone-700 text-xs py-0.5 px-2.5 rounded-full">
                            {order.items.length}
                        </span>
                    </h2>

                    <div className="space-y-6">
                        {order.items.map((item: any, index: any) => (
                            <OrderItemCard key={item.id} item={item} index={index} />
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}