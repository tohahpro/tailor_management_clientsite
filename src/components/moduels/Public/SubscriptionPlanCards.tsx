"use client";

import { useEffect, useState } from "react";
import { getAllActivePlans } from "@/services/admin/planManagement";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { formatCurrency } from "@/lib/formatters";

interface IPlan {
  id: string;
  name: string;
  duration: string;
  baseprice: number;
  maximumOder: number;
  description?: string;
}

export default function SubscriptionPlanCards() {
  const [plans, setPlans] = useState<IPlan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPlans() {
      setLoading(true);
      try {
        const PlanResult = await getAllActivePlans();
        if (PlanResult.success) {
          setPlans(PlanResult.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchPlans();
  }, []);

  console.log(plans)

  if (loading) return <p className="text-center py-10">Loading plans...</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {plans.map((plan) => (
        <Card
          key={plan.id}
          className="bg-linear-to-tr from-white to-gray-50 shadow-lg hover:shadow-2xl transition-all rounded-3xl border border-gray-200 overflow-hidden"
        >
          <CardHeader
            className={`p-6 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 text-white`}
          >
            <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
            <CardDescription className="text-sm">
              {plan.duration} Plan
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6 flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 text-sm font-medium">Base Price</span>
              <span className="font-semibold">{formatCurrency(plan.baseprice)}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600 text-sm font-medium">Max Orders</span>
              <span className="font-semibold">{plan.maximumOder}</span>
            </div>

            {plan.description && (
              <p className="text-gray-700 text-sm mt-2 line-clamp-3">
                {plan.description}
              </p>
            )}

            <div className="mt-4 flex justify-end">
              <Badge
                variant="default"
                className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full"
              >
                {plan.duration.toUpperCase()}
              </Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}