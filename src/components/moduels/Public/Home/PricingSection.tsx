/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import PlanCard from "./PlanCard";
import { getAllActivePlans } from "@/services/admin/planManagement";

export default function PricingSection() {
  const [plans, setPlans] = useState<any[]>([]);

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
      }
    }

    fetchPlans();
  }, []);

  if (!plans.length) {
    return (
      <div className="text-center py-10 text-gray-500">
        No plans available
      </div>
    );
  }

  return (
    <section
      id="pricing"
      className="py-24 bg-linear-to-br from-[#8f43ec]/5 via-[#8545d3]/5 to-[#4e1e8a]/5 relative overflow-hidden"
    >
      <div className="container mx-auto px-5 relative z-10">

        {/* Background Glow */}
        <div className="absolute top-0 right-0 w-100 h-100 bg-[#8f43ec]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-87.5 h-87.5 bg-[#4e1e8a]/20 rounded-full blur-3xl pointer-events-none" />

        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-black mb-6">
            Simple & Transparent{" "}
            <span className="bg-linear-to-r from-[#8f43ec] via-[#8545d3] to-[#4e1e8a] bg-clip-text text-transparent">
              Pricing
            </span>
          </h2>

          <p className="text-lg text-slate-600">
            Choose the perfect plan for your tailoring business.
          </p>
        </div>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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
        
      </div>
    </section>
  );
}