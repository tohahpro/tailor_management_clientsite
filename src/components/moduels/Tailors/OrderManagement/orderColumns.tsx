"use client";

import { Column } from "@/components/shared/ManagementTable";
import { DateOnlyCell } from "@/components/shared/cell/DateCell";
import { IOrder } from "../../../../../types/order.interface";
import OrderStatusSelect from "./OrderStatus";

export const orderColumns: Column<IOrder>[] = [
    {
        header: "Order #",
        accessor: (order) => (
            <span className="font-medium">#{order.orderNumber}</span>
        ),
        sortKey: "orderNumber",
    },

    {
        header: "Customer",
        accessor: (order) => (
            <div className="flex flex-col">
                <span className="font-medium">{order.customerName}</span>
            </div>
        ),
        sortKey: "customerName",
    },
    {
        header: "Phone",
        accessor: (order) => (
            <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">
                    {order.phoneNumber}
                </span>
            </div>
        ),
        sortKey: "customerName",
    },

    {
        header: "Items",
        accessor: (order) => (
            <div className="flex flex-wrap gap-1 max-w-xs">
                {order.items.map((item) => (
                    <span
                        key={item.id}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
                    >
                        {item.clothCategory.name} × {item.quantity}
                    </span>
                ))}
            </div>
        ),
    },

    {
        header: "Delivery Date",
        accessor: (order) => (
            <DateOnlyCell date={order.deliveryDate} />
        ),
        sortKey: "deliveryDate",
    },

    {
        header: "Amount",
        accessor: (order) => (
            <div className="text-sm">
                <div>৳{order.totalAmount}</div>
            </div>
        ),
    },

    {
        header: "Status",
        accessor: (order) => (
            <OrderStatusSelect
                orderId={order.id}
                currentStatus={order.status}
            />
        ),
        sortKey: "status",
    },

    {
        header: "Created",
        accessor: (order) => (
            <DateOnlyCell date={order.createdAt} />
        ),
        sortKey: "createdAt",
    },
];