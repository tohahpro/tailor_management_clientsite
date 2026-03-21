"use client";

import { Column } from "@/components/shared/ManagementTable";
import { capitalizeText } from "@/lib/formatters";
import { format } from "date-fns";
import SubscriptionStatus from "./SubscriptionStatus";
import { ISubscription } from "../../../../../types/subscription.interface";


export const mySubscriptionColumns: Column<ISubscription>[] = [
    {
        header: "Plan Name",
        accessor: (subscription) => (
            <div className="flex flex-col">
                <span className="font-medium">
                    {subscription.plan?.name}
                </span>
                <span className="text-xs text-muted-foreground">
                    {capitalizeText(subscription.plan?.duration)}
                </span>

            </div>
        )
    },
    {
        header: "Max Orders",
        accessor: (sub) => sub.plan?.maximumOder ?? "-",
    },
    {
        header: "Start Date",
        accessor: (sub) => format(new Date(sub.startDate), "dd MMM yyyy"),
    },
    {
        header: "End Date",
        accessor: (sub) => format(new Date(sub.endDate), "dd MMM yyyy"),
    },
    {
        header: "Plan Price",
        accessor: (sub) => `$${sub.planPrice.toFixed(2)}`,
    },
    {
        header: "Total Price",
        accessor: (sub) => `$${sub.totalPrice.toFixed(2)}`,
    },
    {
        header: "Status",
        accessor: (sub) => (
            <SubscriptionStatus status={sub.status} />
        ),
    },
    {
        header: "Created At",
        accessor: (sub) => format(new Date(sub.createdAt), "dd MMM yyyy"),
    },
];