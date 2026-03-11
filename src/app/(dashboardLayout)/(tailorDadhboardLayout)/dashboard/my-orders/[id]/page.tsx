/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import OrderStatusSelect from "@/components/moduels/Tailors/OrderManagement/OrderStatus";
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
            setOrder(data);
        }
        load();
    }, [orderId]);

    if (!order) return <p>Loading...</p>;


    return (
        <div className="p-6 space-y-6">
            <h1 className="text-3xl font-extrabold text-purple-700 mb-4">
                🧵 Order Details
            </h1>

            {/* Basic Info */}
            <div className="grid md:grid-cols-2 gap-4 bg-white shadow-md rounded-lg p-5">
                <p><strong>Order Number:</strong> {order.data.orderNumber}</p>
                <p><strong>Customer Name:</strong> {order.data.customerName}</p>
                <p><strong>Phone:</strong> {order.data.phoneNumber}</p>
                <p>
                    <strong>Delivery Date:</strong>{" "}
                    {new Date(order.data.deliveryDate).toLocaleDateString()}
                </p>
                <p><strong>Total Amount:</strong> ${order.data.totalAmount}</p>
                <p><strong>Paid Amount:</strong> ${order.data.paidAmount}</p>
                <p><strong>Due Amount:</strong> ${order.data.dueAmount}</p>
                <p className="flex items-center">
                    <strong>Status:</strong>
                    <OrderStatusSelect
                        orderId={order.data.id}
                        currentStatus={order.data.status}
                    />
                </p>
            </div>

            {/* Items */}
            <h2 className="text-2xl font-bold text-purple-600">Items</h2>
            <div className="grid gap-6">
                {order.data.items.map((item: any) => (
                    <div
                        key={item.id}
                        className="bg-white rounded-xl shadow-lg p-5 hover:shadow-2xl transition-shadow duration-300 animate-fadeIn"
                    >
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="text-xl font-semibold">{item.clothCategory.name}</h3>
                            <p className="font-medium">Qty: {item.quantity}</p>
                        </div>

                        {/* Measurements Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-3">
                            {item.measurements.map((m: any) => (
                                <div
                                    key={m.id}
                                    className="flex items-center justify-around bg-purple-50 rounded-md p-3 text-center shadow-sm hover:shadow-md transition-shadow duration-200"
                                >
                                    <p className="font-semibold">{m.measurement.name}</p>
                                    <p className="text-purple-700 font-bold">{m.value}</p>
                                </div>
                            ))}
                        </div>

                        {/* Notes */}
                        {item.notes?.length > 0 && (
                            <div className="mt-3 bg-yellow-50 p-3 rounded-md border-l-4 border-yellow-400">
                                <h4 className="font-semibold mb-1">Notes:</h4>
                                <ul className="list-disc pl-5 space-y-1">
                                    {item.notes.map((n: any) => (
                                        <li key={n.id}>{n.content}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}