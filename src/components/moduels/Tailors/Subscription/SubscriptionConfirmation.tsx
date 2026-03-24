"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
    CheckCircle2,
    CreditCard,
    Loader2,
    Package,
    DollarSign
} from "lucide-react";
import { createSubscription } from "@/services/tailors/subscriptionManagement";
import { capitalizeText } from "@/lib/formatters";

interface Plan {
    id: string;
    name: string;
    duration: string;
    baseprice: number;
    maximumOder: number;
    description: string;
}

interface Props {
    plan: Plan;
}

export default function SubscriptionConfirmation({ plan }: Props) {
    const router = useRouter();

    const [maxOrderLimit, setMaxOrderLimit] = useState(plan.maximumOder);
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const extraOrders = Math.max(0, maxOrderLimit - plan.maximumOder);
    const extraPrice = extraOrders * 2;
    const totalPrice = plan.baseprice + extraPrice;

    const handleSubscribe = async () => {
        setIsLoading(true);

        try {
            const formData = new FormData();
            formData.append("planId", plan.id);
            formData.append("maxOrderLimit", String(maxOrderLimit));

            const result = await createSubscription(formData);

            if (result.success) {
                setSuccess(true);
                toast.success("Subscription created successfully!");

                setTimeout(() => {
                    router.push("/dashboard/my-subscription");
                }, 2000);
            } else {
                toast.error(result.message || "Subscription failed");
                setIsLoading(false);
            }
        } catch (error: any) {
            toast.error(error.message || "Something went wrong");
            setIsLoading(false);
        }
    };

    // SUCCESS SCREEN
    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-green-50 to-white">
                <Card className="max-w-md w-full border-green-200 shadow-xl rounded-2xl">
                    <CardContent className="pt-8 text-center space-y-4">
                        <CheckCircle2 className="h-16 w-16 text-green-600 mx-auto" />
                        <h2 className="text-2xl font-bold text-green-800">
                            Subscription Booked Successful!
                        </h2>
                        <p className="text-green-700">
                            Please Payment For Subscription Plan Activation
                        </p>
                        <p className="text-sm text-green-600">
                            Redirecting to dashboard...
                        </p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-100 px-4 py-10">
            <div className="max-w-6xl mx-auto space-y-8">

                {/* HEADER */}
                <h1 className="relative text-2xl md:text-4xl font-extrabold tracking-tight text-transparent bg-clip-text text-center">
                    <span
                        className="animate-gradientMove"
                        style={{
                            background: "linear-gradient(270deg, #8f43ec, #8545d3, #4e1e8a)",
                            backgroundSize: "200% 200%",
                            WebkitBackgroundClip: "text",
                            color: "transparent",
                        }}
                    >
                        Confirm Your Subscription
                    </span>

                    <span
                        className="absolute inset-0 blur-xl opacity-30 animate-gradientMove"
                        style={{
                            background: "linear-gradient(270deg, #8f43ec, #8545d3, #4e1e8a)",
                            backgroundSize: "200% 200%",
                        }}
                    />
                </h1>

                {/* MAIN GRID */}
                <div className="grid lg:grid-cols-2 gap-8">

                    {/* 📦 PLAN CARD */}
                    <Card className="relative rounded-3xl border border-gray-100 shadow-xl bg-white/80 backdrop-blur-xl overflow-hidden">

                        {/* Top Gradient Glow */}
                        <div className="absolute top-0 left-0 w-full h-19 bg-linear-to-r from-indigo-100 via-purple-100 to-pink-100 opacity-60" />

                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                                <Package className="h-5 w-5 text-indigo-500" />
                                Plan Details
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="space-y-6 relative">

                            {/* Plan Info */}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">{plan.name}</h2>
                                <p className="text-gray-500 text-sm mt-1">
                                    {plan.description}
                                </p>
                            </div>

                            {/* Info Box */}
                            <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span>Base Price</span>
                                    <span className="font-semibold">৳{plan.baseprice}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Duration</span>
                                    <span className="font-semibold">
                                        {capitalizeText(plan.duration)}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Max Orders</span>
                                    <span>{plan.maximumOder}</span>
                                </div>
                            </div>

                            {/* CUSTOMIZATION */}
                            <div className="rounded-xl border border-indigo-100 bg-indigo-50/60 p-4 space-y-3">
                                <p className="text-sm font-semibold text-indigo-700">
                                    Customize Order Limit
                                </p>

                                <input
                                    type="number"
                                    min={plan.maximumOder}
                                    value={maxOrderLimit}
                                    onChange={(e) =>
                                        setMaxOrderLimit(Number(e.target.value))
                                    }
                                    className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                />

                                {extraOrders > 0 && (
                                    <p className="text-xs text-indigo-600">
                                        +{extraOrders} extra orders → ৳{extraPrice}
                                    </p>
                                )}
                            </div>

                        </CardContent>
                    </Card>

                    {/* 💳 PAYMENT CARD */}
                    <Card className="relative rounded-3xl border border-gray-100 shadow-xl bg-white/80 backdrop-blur-xl overflow-hidden">

                        {/* Glow */}
                        <div className="absolute top-0 left-0 w-full h-19 bg-linear-to-r from-green-100 to-emerald-100 opacity-60" />

                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                                <DollarSign className="h-5 w-5 text-green-600" />
                                Payment Summary
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="space-y-6 relative">

                            {/* Price Box */}
                            <div className="bg-gray-50 rounded-xl p-4 space-y-3 text-sm">

                                <div className="flex justify-between">
                                    <span>Plan Price</span>
                                    <span>৳{plan.baseprice}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Extra Orders</span>
                                    <span>৳{extraPrice}</span>
                                </div>

                                <Separator />

                                <div className="flex justify-between text-xl font-bold">
                                    <span>Total</span>
                                    <span className="bg-linear-to-r from-green-600 to-emerald-400 bg-clip-text text-transparent">
                                        ৳{totalPrice}
                                    </span>
                                </div>
                            </div>

                            {/* ACTION BUTTONS */}
                            <div className="flex gap-3">

                                <Button
                                    onClick={handleSubscribe}
                                    disabled={isLoading}
                                    className="flex-1 rounded-lg cursor-pointer py-3 text-base font-semibold bg-linear-to-r from-indigo-600 to-purple-500 hover:opacity-90 transition"
                                    size="lg"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            <CreditCard className="mr-2 h-4 w-4" />
                                            Booked Confirm
                                        </>
                                    )}
                                </Button>

                                <Button
                                    variant="outline"
                                    onClick={() => router.back()}
                                    className="flex-1 rounded-lg cursor-pointer py-3"
                                >
                                    Cancel
                                </Button>

                            </div>

                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}