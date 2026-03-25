"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Props {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  features: string[];
  popular?: boolean;
}

export default function PlanCard({
  id,
  name,
  description,
  price,
  duration,
  features,
  popular,
}: Props) {
  return (
    <Card
      className={`relative rounded-2xl p-0.5 transition-all duration-300
  ${popular
          ? "bg-linear-to-r from-[#8f43ec] via-[#8545d3] to-[#4e1e8a] shadow-2xl md:-mt-6 md:mb-6 scale-105"
          : "bg-white/40 backdrop-blur-md hover:shadow-xl"
        }`}
    >
      {/* Inner Content */}
      <div className="bg-white/95 backdrop-blur-md rounded-2xl p-8 h-full flex flex-col justify-between">

        {/* Popular Badge */}
        {popular && (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Badge className="bg-linear-to-r from-[#8f43ec] to-[#4e1e8a] text-white px-3 py-1 text-xs rounded-full shadow-lg">
              Most Popular
            </Badge>
          </div>
        )}

        {/* 📌 Title */}
        <div className="mb-6">
          <h2 className="text-2xl font-heading font-bold text-black">
            {name}
          </h2>
          <p className="text-sm text-slate-500 mt-1 h-10">
            {description}
          </p>
        </div>

        {/* 💰 Price */}
        <div className="mb-6">
          <div className="flex items-end gap-1">
            <span className="text-5xl font-extrabold text-black">
              ৳{price}
            </span>
            <span className="text-slate-500 text-sm mb-1">
              /{duration.toLowerCase()}
            </span>
          </div>
        </div>

        {/* ✅ Features */}
        <ul className="space-y-3 mb-8 min-h-32">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3">
              <div className="mt-1 flex items-center justify-center w-5 h-5 rounded-full bg-linear-to-br from-[#8f43ec]/10 to-[#4e1e8a]/10">
                <Check className="h-3.5 w-3.5 text-[#8f43ec]" />
              </div>
              <span className="text-sm text-slate-600">{feature}</span>
            </li>
          ))}
        </ul>

        {/* 🚀 Button */}
        {price > 0 && (
          <Link href={`/plans/${id}`}>
            <Button
              className={`w-full py-3 cursor-pointer rounded-lg font-medium transition-all
          ${popular
                  ? "bg-linear-to-r from-[#8f43ec] via-[#8545d3] to-[#4e1e8a] text-white hover:opacity-90 shadow-lg"
                  : "bg-slate-100 text-black hover:bg-slate-200"
                }`}
            >
              Premium Access
            </Button>
          </Link>
        )}
      </div>
    </Card>
  );
}