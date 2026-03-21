"use client";

import { Column } from "@/components/shared/ManagementTable";
import { DateOnlyCell } from "@/components/shared/cell/DateCell";
import { capitalizeText } from "@/lib/formatters";
import { IPlan } from "../../../../../types/plan.interface";
import PlanStatusBadge from "./PlanStatusBadge";
import { cn } from "@/lib/utils";


export const planColumns: Column<IPlan>[] = [
    {
        header: "Plan Name",
        accessor: (plan) => (
            <div className="flex flex-col">
                <span className="font-medium">{plan.name}</span>
                <span className="text-xs text-muted-foreground">
                    {capitalizeText(plan.duration)}
                </span>
            </div>
        ),
    },

    {
        header: "Price",
        accessor: (plan) => (
            <span className="font-medium">
                ৳ {plan.baseprice}
            </span>
        ),
    },

    {
        header: "Order Limit",
        accessor: (plan) => (
            <span className={cn(`${plan.maximumOder > 5000 && 'font-medium'}`)}>{plan.maximumOder > 5000 ? 'Unlimited' : plan.maximumOder}</span>
        ),
    },

    {
        header: "Trending",
        accessor: (plan) => (
            <span className="font-medium">
                {plan.tranding  ? "Yes" : "No"}
            </span>
        ),
    },

    {
        header: "Status",
        accessor: (plan) => (
            <PlanStatusBadge
                planId={plan.id}
                currentStatus={plan.isActive}
            />
        ),
    },

    {
        header: "Created At",
        accessor: (plan) => (
            <DateOnlyCell date={plan.createdAt} />
        ),
    },

    {
        header: "Description",
        accessor: (plan) => (
            <span className="text-sm text-wrap text-muted-foreground line-clamp-1">
                {plan.description}
            </span>
        ),
    },
];