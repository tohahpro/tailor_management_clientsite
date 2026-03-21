/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Badge } from "@/components/ui/badge";



export default function SubscriptionStatus({ status }: any) {

  const getColor = (s: any) => {
    switch (s) {
      case "ACTIVE":
        return "bg-green-500 text-white";
      case "DEACTIVED":
        return "bg-gray-200 text-black";
      case "EXPIRED":
        return "bg-[#E36A6A] text-white";
      case "LIMIT_EXPIRED":
        return "bg-[#FFB000] text-white";
      case "CANCELLED":
        return "bg-[#9F8772] text-white";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  return (
    <Badge
      className={`px-2 py-1 rounded-full text-xs font-medium ${getColor(status)}`}
    >
      {status}
    </Badge>
  );
}