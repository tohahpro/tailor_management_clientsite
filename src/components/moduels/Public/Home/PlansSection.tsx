/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import PlanCard from "./PlanCard";
import { getAllActivePlans } from "@/services/admin/planManagement";

export default function PlansSection() {
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPlans() {
      try {
        const res = await getAllActivePlans();

        if (res?.success) {
          const data = res.data || [];

          const sortedPlans = [...data];
          const trendingIndex = sortedPlans.findIndex(
            (p) => p.tranding === true
          );

          if (trendingIndex !== -1) {
            const [trendingPlan] = sortedPlans.splice(trendingIndex, 1);

            // 👉 insert middle (index 1)
            sortedPlans.splice(1, 0, trendingPlan);
          }

          setPlans(sortedPlans);
        }
      } catch (error) {
        console.error("Failed to fetch plans:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPlans();
  }, []);

  if (loading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-75 rounded-3xl bg-gray-100 animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (!plans.length) {
    return (
      <div className="text-center py-10 text-gray-500">
        No plans available
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {plans.map((plan: any) => (
        <PlanCard
          key={plan.id}
          id={plan.id}
          name={plan.name}
          description={plan.description}
          price={plan.baseprice}
          duration={plan.duration}
          popular={plan.tranding}
          features={[
            `Max ${plan.maximumOder} orders`,
            "User-friendly system",
            "Secure data",
            "24/7 support",
          ]}
        />
      ))}
    </div>
  );
}