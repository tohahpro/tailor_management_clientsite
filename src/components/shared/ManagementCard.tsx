/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Eye, Edit, Trash } from "lucide-react";
import { DateOnlyCell } from "./cell/DateCell";
import OrderStatusBadgeDropdown from "../moduels/Tailors/OrderManagement/OrderStatus";

export interface Column<T> {
    header: string;
    accessor: keyof T | ((row: T) => React.ReactNode);
    className?: string;
    sortKey?: string;
}

interface ManagementCardProps<T> {
    data: any[];
    onView?: (row: T) => void;
    onEdit?: (row: T) => void;
    onDelete?: (row: T) => void;
    getRowKey: (row: T) => string;
    emptyMessage?: string;
}

function ManagementCard<T>({
    data,
    onView,
    onEdit,
    onDelete,
    getRowKey,
    emptyMessage = "No records found",
}: ManagementCardProps<T>) {

    if (data.length === 0) {
        return (
            <p className="text-center text-muted-foreground py-8">
                {emptyMessage}
            </p>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {data.map((item) => (
                <div
                    key={getRowKey(item)}
                    className="group relative"
                >
                    {/* Glow Background */}
                    <div className="absolute -inset-0.5 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>

                    {/* Card */}
                    <div className="relative bg-white rounded-3xl p-6 shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-2xl">

                        {/* Top Decorative Gradient */}
                        <div className="absolute top-0 left-0 w-full h-20 bg-linear-to-br from-indigo-100 via-purple-100 to-pink-100 opacity-70"></div>

                        {/* HEADER */}
                        <div className="relative flex justify-between items-start mb-4">
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-widest">
                                    Order
                                </p>
                                <h2 className="text-2xl font-extrabold text-gray-800 tracking-tight">
                                    #{item.orderNumber < 10 ? `0${item.orderNumber}` : item.orderNumber}
                                </h2>
                            </div>

                            {/* Status Pill */}
                            <OrderStatusBadgeDropdown orderId={item.id} currentStatus={item.status} />
                        </div>

                        {/* BODY */}
                        <div className="relative space-y-4 text-sm">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-400">👤 Customer</span>
                                <span className="font-semibold text-gray-800">
                                    {item.customerName}
                                </span>
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="text-gray-400">📞 Phone</span>
                                <span className="font-semibold text-gray-800">
                                    {item.phoneNumber}
                                </span>
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="text-gray-400">📅 Delivery</span>
                                <span className="font-semibold text-indigo-600">
                                    <DateOnlyCell date={item.createdAt} />
                                </span>
                            </div>
                        </div>

                        {/* Amount Block */}
                        <div className="mt-2">
                            <div className="flex justify-between text-xs text-gray-400 mb-1">
                                <span>Payment</span>
                                <span>
                                    ৳ {item.paidAmount || 0} / {item.totalAmount}
                                </span>
                            </div>

                            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className="h-full rounded-full animate-gradientMove"
                                    style={{
                                        width: `${Math.min(
                                            100,
                                            ((item.paidAmount || 0) / item.totalAmount) * 100
                                        )}%`,
                                        background: "linear-gradient(270deg, #8f43ec, #8545d3, #4e1e8a)",
                                        backgroundSize: "200% 200%",
                                    }}
                                />
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="relative my-3 h-0.5 bg-linear-to-r from-transparent via-gray-200 to-transparent" />

                        {/* FOOTER */}
                        <div className="relative flex justify-between items-center">
                            {/* Floating Actions */}
                            <div className="flex gap-2">
                                {onView && (
                                    <button
                                        onClick={() => onView(item)}
                                        className="p-2 cursor-pointer rounded-full bg-white shadow hover:shadow-md hover:scale-110 transition"
                                    >
                                        <Eye className="w-4 h-4 text-gray-600" />
                                    </button>
                                )}

                                {onEdit && (
                                    <button
                                        onClick={() => onEdit(item)}
                                        className="p-2 cursor-pointer rounded-full bg-indigo-50 hover:bg-indigo-100 transition hover:scale-110"
                                    >
                                        <Edit className="w-4 h-4 text-indigo-600" />
                                    </button>
                                )}

                                {onDelete && (
                                    <button
                                        onClick={() => onDelete(item)}
                                        className="p-2 cursor-pointer rounded-full bg-red-50 hover:bg-red-100 transition hover:scale-110"
                                    >
                                        <Trash className="w-4 h-4 text-red-500" />
                                    </button>
                                )}
                            </div>

                        </div>

                    </div>
                </div>
            ))}
        </div>
    );
}

export default ManagementCard;