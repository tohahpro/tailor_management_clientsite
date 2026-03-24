"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { format } from "date-fns";
import MySubscriptionViewDialog from "../MySubscriptionManagement/MySubscriptionViewDialog";
import Link from "next/link";

interface Props {
    subscriptions: any[];
}

const getStatusStyle = (status: string) => {
    switch (status) {
        case "ACTIVE":
            return "bg-green-100 text-green-700";
        case "EXPIRED":
            return "bg-gray-100 text-gray-700";
        case "LIMIT_EXPIRED":
            return "bg-yellow-100 text-yellow-700";
        case "CANCELLED":
            return "bg-red-100 text-red-700";
        default:
            return "bg-blue-100 text-blue-700";
    }
};

export default function MySubscriptionCards({ subscriptions }: Props) {
    const [viewingSubscription, setViewingSubscription] = useState<any | null>(null);

    return (
        <>
            {/* Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {subscriptions.map((sub) => (
                    <Card
                        key={sub.id}
                        className="relative p-5 rounded-3xl border border-gray-100 bg-white/70 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-300 group overflow-hidden"
                    >
                        {/* 🔥 Top Gradient Glow */}
                        <div className="absolute top-0 left-0 w-full h-20 bg-linear-to-r from-[#8f43ec]/20 via-[#8545d3]/20 to-[#4e1e8a]/20 opacity-70 group-hover:opacity-100 transition" />

                        {/* Header */}
                        <div className="flex justify-between items-start mb-4 relative z-10">
                            <div>
                                <h2 className="text-lg font-bold text-gray-800">
                                    {sub.plan?.name || "N/A"}
                                </h2>
                                <p className="text-xs text-gray-500 mt-0.5">
                                    {sub.plan?.duration}
                                </p>
                            </div>

                            <Badge className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${getStatusStyle(sub.status)}`}>
                                {sub.status}
                            </Badge>
                        </div>

                        {/* 💰 Price */}
                        <div className="relative z-10">
                            <p className="text-3xl font-extrabold bg-linear-to-r from-[#8f43ec] to-[#4e1e8a] bg-clip-text text-transparent">
                                ৳{sub.totalPrice}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                                Total Payment
                            </p>
                        </div>

                        {/* 📊 Info */}
                        <div className="space-y-1 text-sm relative z-10">
                            <div className="flex justify-between bg-gray-50 px-3 py-1.5 rounded-md">
                                <span className="text-gray-600">Max Orders</span>
                                <span className="font-medium">{sub.maxOrderLimit}</span>
                            </div>

                            <div className="flex justify-between bg-gray-50 px-3 py-1.5 rounded-md">
                                <span className="text-gray-600">Start</span>
                                <span>
                                    {format(new Date(sub.startDate), "dd MMM yyyy")}
                                </span>
                            </div>

                            <div className="flex justify-between bg-gray-50 px-3 py-1.5 rounded-md">
                                <span className="text-gray-600">End</span>
                                <span>
                                    {format(new Date(sub.endDate), "dd MMM yyyy")}
                                </span>
                            </div>
                        </div>

                        {/* ⚡ Action */}
                        <div className="flex gap-3 relative z-10">
                            <Button
                                variant="outline"
                                className="flex-1 flex items-center justify-center gap-2 rounded-md hover:bg-gray-100 transition"
                                onClick={() => setViewingSubscription(sub)}
                            >
                                <Eye className="h-4 w-4" />
                                View
                            </Button>

                            {sub.status === "DEACTIVED" && (
                                <Link href={`/plans/payment/${sub.plan?.id}`} className="flex-1">
                                    <Button
                                        className="w-full flex items-center justify-center gap-2 rounded-md bg-linear-to-r from-[#8f43ec] to-[#4e1e8a] text-white hover:opacity-90 transition"
                                    >
                                        Payment
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </Card>
                ))}
            </div>

            {/* Empty */}
            {subscriptions.length === 0 && (
                <div className="text-center py-10 text-muted-foreground">
                    No subscriptions found
                </div>
            )}

            {/* Dialog */}
            <MySubscriptionViewDialog
                open={!!viewingSubscription}
                onClose={() => setViewingSubscription(null)}
                subscription={viewingSubscription}
            />
        </>
    );
}