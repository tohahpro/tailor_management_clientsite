"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Props {
    name: string;
    description: string;
    price: number;
    duration: string;
    features: string[];
    popular?: boolean;
}

export default function PlanCard({
    name,
    description,
    price,
    duration,
    features,
    popular,
}: Props) {
    return (
        <Card className="relative rounded-3xl p-3 shadow-lg bg-[#f7f0f0] border border-gray-200 hover:shadow-2xl transition-all">

            <div className="bg-[#FFFFFF] rounded-2xl p-3">
                {/* Trending Badge */}
                {popular && (
                    <Badge className="absolute top-5 right-5 bg-red-500 text-white px-2 rounded-full">
                        Polular
                    </Badge>
                )}

                {/* Icon */}
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gray-100 shadow-sm mb-4">
                    ✿
                </div>

                {/* Title */}
                <h2 className="text-xl font-semibold mb-1">{name}</h2>
                <p className="text-sm text-gray-500 mb-4">{description}</p>

                {/* Price */}
                <div className="mb-4">
                    <span className="text-4xl font-bold">৳{price}</span>
                    <span className="text-gray-500 text-sm"> /{duration.toLowerCase()}</span>
                </div>

                {/* Button */}
                {
                    price > 0 &&
                    <Link href="" >
                        <Button className="w-full hover:cursor-pointer bg-black text-white py-2 rounded-full font-medium hover:bg-gray-900 transition">
                            Premium Access
                        </Button>
                    </Link>
                }

            </div>



            {/* Features */}
            <div className="mt-6 space-y-3 text-sm">
                {features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-black" />
                        <span>{feature}</span>
                    </div>
                ))}
            </div>
        </Card>
    );
}