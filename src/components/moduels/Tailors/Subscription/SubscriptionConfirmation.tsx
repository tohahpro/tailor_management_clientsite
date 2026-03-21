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
    DollarSign,
    ArrowLeft,
} from "lucide-react";
import { createSubscription } from "@/services/tailors/subscriptionManagement";

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

    // ✅ SUCCESS SCREEN
    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white">
                <Card className="max-w-md w-full border-green-200 shadow-xl rounded-2xl">
                    <CardContent className="pt-8 text-center space-y-4">
                        <CheckCircle2 className="h-16 w-16 text-green-600 mx-auto" />
                        <h2 className="text-2xl font-bold text-green-800">
                            Subscription Successful!
                        </h2>
                        <p className="text-green-700">
                            Your plan has been activated successfully
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
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white px-4 py-8">
            <div className="max-w-5xl mx-auto space-y-6">

                {/* 🔙 Header */}
                <div className="flex items-center gap-3">
                    {/* <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button> */}

                    <div className="mx-auto">
                        <h1 className="text-3xl font-bold">Confirm Subscription</h1>
                        <p className="text-muted-foreground text-sm">
                            Review and customize your plan before subscribing
                        </p>
                    </div>
                </div>

                {/* 🔥 Main Grid */}
                <div className="grid lg:grid-cols-2 gap-6">

                    {/* 📦 Plan Card */}
                    <Card className="rounded-2xl shadow-md border bg-white">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Package className="h-5 w-5" />
                                Plan Details
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="space-y-4">

                            <div>
                                <h2 className="text-xl font-bold">{plan.name}</h2>
                                <p className="text-muted-foreground text-sm">
                                    {plan.description}
                                </p>
                            </div>

                            <Separator />

                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span>Base Price</span>
                                    <span className="font-medium">৳{plan.baseprice}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Duration</span>
                                    <span>{plan.duration}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Max Orders</span>
                                    <span>{plan.maximumOder}</span>
                                </div>
                            </div>

                            <Separator />

                            {/* 🎛 Customization */}
                            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                                <p className="text-sm font-medium mb-2">
                                    Customize Order Limit
                                </p>

                                <input
                                    type="number"
                                    min={plan.maximumOder}
                                    value={maxOrderLimit}
                                    onChange={(e) =>
                                        setMaxOrderLimit(Number(e.target.value))
                                    }
                                    className="w-full border rounded-md px-3 py-2 text-sm"
                                />

                                {extraOrders > 0 && (
                                    <p className="text-xs text-muted-foreground mt-2">
                                        Extra {extraOrders} orders → ৳{extraPrice}
                                    </p>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* 💳 Payment Summary */}
                    <Card className="rounded-2xl shadow-md border bg-white">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <DollarSign className="h-5 w-5" />
                                Payment Summary
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="space-y-4">

                            <div className="bg-muted p-4 rounded-xl space-y-2">
                                <div className="flex justify-between">
                                    <span>Plan Price</span>
                                    <span>৳{plan.baseprice}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Extra Orders</span>
                                    <span>৳{extraPrice}</span>
                                </div>

                                <Separator />

                                <div className="flex justify-between text-lg font-bold">
                                    <span>Total</span>
                                    <span className="text-primary">৳{totalPrice}</span>
                                </div>
                            </div>

                            {/* 🔘 Actions */}
                            <div className="space-y-3 pt-2 flex gap-4">

                                
                                    <Button
                                        onClick={handleSubscribe}
                                        disabled={isLoading}
                                        className="flex-1"
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
                                                Booked Subscription
                                            </>
                                        )}
                                    </Button>                                    
                                

                                <Button
                                    variant="outline"
                                    onClick={() => router.back()}
                                    className="flex-1"
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