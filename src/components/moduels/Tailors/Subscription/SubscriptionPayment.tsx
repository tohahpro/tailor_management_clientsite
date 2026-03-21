"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Upay_Qr from "@/assets/Images/Upay_QR.png";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import {
    CreditCard,
    Smartphone,
    QrCode,
    CheckCircle2,
    Loader2,
    Info,
} from "lucide-react";
import { useRouter } from "next/navigation";


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

export default function SubscriptionPayment({ plan }: Props) {

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter()

    const handlePayment = async () => {

        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
            router.push('/dashboard/my-subscription')
        }, 1500);
    };

    return (
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-6">

            {/* LEFT SIDE - PAYMENT */}
            <Card className="shadow-lg border rounded-2xl">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <CreditCard className="h-5 w-5" />
                        Payment Method
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-6">

                    <div className="flex flex-wrap gap-3">
                        {/* Nogod Info */}
                        <div className="flex-1 p-4 border rounded-xl bg-gray-50 space-y-2">
                            <div className="flex items-center gap-2 font-medium">
                                <Smartphone className="h-4 w-4" />
                                Nogod Payment
                            </div>

                            <p className="text-sm text-muted-foreground">
                                Send money to this number:
                            </p>

                            <p className="font-semibold text-lg text-green-600">
                                01955387188
                            </p>
                        </div>
                        <div className="flex-1 p-4 border rounded-xl bg-gray-50 space-y-2">
                            <div className="flex items-center gap-2 font-medium">
                                <Smartphone className="h-4 w-4" />
                                Upay Payment
                            </div>

                            <p className="text-sm text-muted-foreground">
                                Send money to this number:
                            </p>

                            <p className="font-semibold text-lg text-green-600">
                                01955387188
                            </p>
                        </div>
                    </div>

                    {/* QR Code */}
                    <div className="p-4 border rounded-xl flex flex-col items-center gap-3">
                        <div className="flex items-center gap-2 font-medium">
                            <QrCode className="h-4 w-4" />
                            UPAY Scan QR
                        </div>

                        <Image
                            src={Upay_Qr}
                            alt="QR Code"
                            width={150}
                            height={150}
                            className="rounded-md border"
                        />
                    </div>

                    {/* Inputs */}
                    <div className="flex items-start gap-3 p-3 rounded-xl border border-yellow-200 bg-yellow-50 text-yellow-800">
                        <Info className="h-5 w-5 mt-0.5 text-yellow-600" />

                        <p className="text-sm leading-relaxed">
                            Please include your <span className="font-bold">login email</span> in the
                            payment reference. This is required to verify your subscription.
                        </p>
                    </div>

                    {/* Button */}
                    <Button
                        onClick={handlePayment}
                        disabled={isLoading}
                        className="w-full"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="animate-spin mr-2 h-4 w-4" />
                                Processing...
                            </>
                        ) : (
                            <>
                                <CheckCircle2 className="mr-2 h-4 w-4" />
                                Confirm Payment
                            </>
                        )}
                    </Button>
                </CardContent>
            </Card>

            {/* RIGHT SIDE - PLAN SUMMARY */}
            <Card className="shadow-lg border rounded-2xl">
                <CardHeader>
                    <CardTitle>Plan Summary</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">

                    <div>
                        <h2 className="text-xl font-bold">{plan.name}</h2>
                        <p className="text-sm text-muted-foreground">
                            {plan.description}
                        </p>
                    </div>

                    <Separator />

                    <div className="space-y-2 text-sm">
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

                    <div className="bg-blue-50 border rounded-lg p-4">
                        <div className="flex justify-between items-center">
                            <span className="font-medium">Total Price</span>
                            <span className="text-2xl font-bold text-blue-600">
                                ৳{plan.baseprice}
                            </span>
                        </div>
                    </div>

                </CardContent>
            </Card>
        </div>
    );
}