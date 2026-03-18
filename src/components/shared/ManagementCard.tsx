/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import OrderStatusSelect from "../moduels/Tailors/OrderManagement/OrderStatus";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Eye, Edit, Trash, MoreHorizontal } from "lucide-react";
import { DateOnlyCell } from "./cell/DateCell";
import SubmitButton from "./SubmitButton";

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

    const hasActions = onView || onEdit || onDelete;

    if (data.length === 0) {
        return (
            <p className="text-center text-muted-foreground py-8">
                {emptyMessage}
            </p>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-center">
            {data.map((item) => (
                <Card
                    key={getRowKey(item)}
                    className="bg-white/70 backdrop-blur-md border border-gray-200 rounded-3xl p-6 hover:shadow-xl "
                >
                    {/* Header */}
                    <CardHeader className="flex items-center justify-between pb-4">
                        <CardTitle className="text-2xl font-extrabold tracking-wide text-gray-800">
                            #{item.orderNumber < 10 ? `0${item.orderNumber}` : item.orderNumber}
                        </CardTitle>

                        <OrderStatusSelect
                            orderId={item.id}
                            currentStatus={item.status}
                        />
                    </CardHeader>

                    {/* Body */}
                    <CardContent className="space-y-2 text-gray-700 text-sm">
                        <div className="space-x-2">
                            <span className="font-semibold text-gray-900">গ্রাহকের নাম :</span>
                            <span>{item.customerName}</span>
                        </div>

                        <div className="space-x-1">
                            <span className="font-semibold text-gray-900">ফোন নম্বর :</span>
                            <span>{item.phoneNumber}</span>
                        </div>

                        <div className="space-x-1">
                            <span className="font-semibold text-gray-900">ডেলিভারির তারিখ :</span>
                            <span className="text-indigo-700 font-bold">
                                <DateOnlyCell date={item.createdAt} />
                            </span>
                        </div>

                        <div className="space-x-1">
                            <span className="font-semibold text-gray-900">Total :</span>
                            <span className="text-indigo-700 font-bold">
                               ৳ {item.totalAmount.toLocaleString()}
                            </span>
                        </div>
                    </CardContent>

                    {/* Actions */}
                    {hasActions && (
                        <CardFooter className="">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <SubmitButton
                                        title="Details"
                                        className="h-8 px-5 rounded-md"
                                    />

                                </DropdownMenuTrigger>

                                <DropdownMenuContent align="center" className="shadow-lg border border-gray-100">
                                    {onView && (
                                        <DropdownMenuItem onClick={() => onView(item)}>
                                            <Eye className="mr-2 h-4 w-4 text-gray-600" />
                                            View
                                        </DropdownMenuItem>
                                    )}
                                    {onEdit && (
                                        <DropdownMenuItem onClick={() => onEdit(item)}>
                                            <Edit className="mr-2 h-4 w-4 text-gray-600" />
                                            Edit
                                        </DropdownMenuItem>
                                    )}
                                    {onDelete && (
                                        <DropdownMenuItem
                                            onClick={() => onDelete(item)}
                                            className="text-destructive"
                                        >
                                            <Trash className="mr-2 h-4 w-4 text-red-500" />
                                            Delete
                                        </DropdownMenuItem>
                                    )}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </CardFooter>
                    )}
                </Card>
            ))}
        </div>
    );
}

export default ManagementCard;