"use client";

import { motion } from 'framer-motion'
export function StatsBar() {
  const stats = [
    {
      label: 'Tailors Worldwide',
      value: '10,000+',
    },
    {
      label: 'Orders Managed',
      value: '500K+',
    },
    {
      label: 'Countries Served',
      value: '50+',
    },
    {
      label: 'Platform Uptime',
      value: '99.9%',
    },
  ]
  return (
    <section className="bg-brand-navy py-16 border-y border-brand-indigo/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x-0 md:divide-x divide-brand-indigo/40">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              className="text-center px-4"
            >
              <div className="text-3xl md:text-4xl font-heading font-bold text-brand-gold mb-2">
                {stat.value}
              </div>
              <div className="text-sm md:text-base font-medium text-slate-300">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
