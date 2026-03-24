"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
    CreditCard,
    CheckCircle2,
    Loader2,
    Info,
    Package,
} from "lucide-react";
import { useRouter } from "next/navigation";
import UpyLogo from '../../../../assets/Images/Upay-logo.png'
import NagadLogo from '../../../../assets/Images/Nagad-Logo.png'
import Image from "next/image";


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
        <div className="container mx-auto px-5 grid lg:grid-cols-2 gap-8">

            {/* 💳 LEFT SIDE - PAYMENT */}
            <Card className="relative rounded-3xl border border-gray-100 bg-white/70 backdrop-blur-xl shadow-xl overflow-hidden">

                {/* Top Glow */}
                <div className="absolute top-0 left-0 w-full h-24 bg-linear-to-r from-[#8f43ec]/20 via-[#8545d3]/20 to-[#4e1e8a]/20" />

                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                        <CreditCard className="h-5 w-5 text-[#8f43ec]" />
                        Payment Method
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-3 relative z-10">

                    {/* 🔥 Payment Options */}
                    <div className="grid sm:grid-cols-2 gap-4 pt-6">

                        {/* Nogod */}
                        <div className="p-4 rounded-2xl border bg-linear-to-br from-gray-50 to-white hover:shadow-md transition group">
                            <div className="flex items-center gap-2 font-semibold text-gray-800">
                                <Image
                                    src={NagadLogo}
                                    alt="Nagad Logo"
                                    width={20}
                                    height={20}
                                />
                                Nogod
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Send money to</p>
                            <p className="font-bold text-lg mt-1 bg-linear-to-r from-[#8f43ec] to-[#4e1e8a] bg-clip-text text-transparent">
                                01955387188
                            </p>
                        </div>

                        {/* Upay */}
                        <div className="p-4 rounded-2xl border bg-linear-to-br from-gray-50 to-white hover:shadow-md transition group">
                            <div className="flex items-center gap-2 font-semibold text-gray-800">
                                <Image
                                    src={UpyLogo}
                                    alt="Nagad Logo"
                                    width={20}
                                    height={20}
                                />
                                Upay
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Send money to</p>
                            <p className="font-bold text-lg mt-1 bg-linear-to-r from-[#8f43ec] to-[#4e1e8a] bg-clip-text text-transparent">
                                01955387188
                            </p>
                        </div>
                    </div>

                    {/* 📷 QR Code */}
                    {/* <div className="p-5 rounded-2xl border bg-white text-center space-y-3 shadow-sm">
                        <div className="flex items-center justify-center gap-2 font-medium text-gray-700">
                            <QrCode className="h-4 w-4 text-[#8f43ec]" />
                            Scan & Pay
                        </div>

                        <div className="p-2 rounded-xl border inline-block bg-gray-50">
                            <Image
                                src={Upay_Qr}
                                alt="QR Code"
                                width={150}
                                height={150}
                                className="rounded-md"
                            />
                        </div>
                    </div> */}

                    {/* ⚠️ Info */}
                    <div className="flex items-start gap-3 px-4 py-3 rounded-lg border border-yellow-200 bg-yellow-50 text-yellow-800">
                        <Info className="h-5 w-5 mt-0.5 text-yellow-600" />
                        <p className="text-sm leading-relaxed">
                            Please include your <span className="font-bold">login / register email</span> in the payment reference.
                        </p>
                    </div>

                    {/* 🚀 Button */}
                    <Button
                        onClick={handlePayment}
                        disabled={isLoading}
                        className="w-full rounded-lg h-12 text-base font-semibold bg-linear-to-r from-[#8f43ec] to-[#4e1e8a] text-white hover:opacity-90 transition"
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

            {/* 📦 RIGHT SIDE - PLAN SUMMARY */}
            <Card className="relative rounded-3xl border border-gray-100 bg-white/70 backdrop-blur-xl shadow-xl overflow-hidden">

                {/* Glow */}
                <div className="absolute top-0 left-0 w-full h-24 bg-linear-to-r from-indigo-100 to-purple-100" />

                <CardHeader>
                    <CardTitle className="flex items-center gap-1 text-lg font-semibold z-20">
                        <Package/>
                        {plan.name}
                    </CardTitle>
                    <CardDescription className="text-sm text-gray-500 z-20">
                        {plan.description}
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6 relative z-10 pt-7">
                    {/* Info List */}
                    <div className="space-y-1 text-sm">
                        <div className="flex justify-between bg-gray-50 px-3 py-2 rounded-lg">
                            <span>Duration</span>
                            <span className="font-medium">{plan.duration}</span>
                        </div>

                        <div className="flex justify-between bg-gray-50 px-3 py-2 rounded-lg">
                            <span>Max Orders</span>
                            <span>{plan.maximumOder}</span>
                        </div>
                    </div>

                    <Separator />

                    {/* 💰 Price */}
                    <div className="rounded-2xl p-5 bg-linear-to-r from-[#8f43ec]/10 to-[#4e1e8a]/10 border text-center">
                        <p className="text-sm text-gray-600">Total Price</p>
                        <p className="text-3xl font-extrabold bg-linear-to-r from-[#8f43ec] to-[#4e1e8a] bg-clip-text text-transparent mt-1">
                            ৳{plan.baseprice}
                        </p>
                    </div>

                </CardContent>
            </Card>

        </div>
    );
}