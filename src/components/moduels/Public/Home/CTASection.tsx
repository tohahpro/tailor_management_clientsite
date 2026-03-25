"use client";

import { motion } from 'framer-motion'
export function CTASection() {
  return (
    <section className="relative py-24 bg-brand-navy overflow-hidden container mx-auto px-5">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-textile-pattern opacity-10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg-brand-indigo/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.h2
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
          className="text-4xl md:text-5xl font-heading font-bold text-white mb-6"
        >
          Ready to Transform Your Tailoring Business?
        </motion.h2>

        <motion.p
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
            delay: 0.1,
          }}
          className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto"
        >
          Join thousands of tailors who have modernized their workflow,
          delighted their customers, and grown their revenue.
        </motion.p>

        <motion.div
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
            delay: 0.2,
          }}
          className="flex flex-col items-center gap-4"
        >
          <a
            href="#"
            className="px-8 py-4 bg-brand-gold hover:bg-brand-gold-dark text-white rounded-md font-medium text-lg transition-all shadow-lg shadow-brand-gold/20 hover:-translate-y-0.5"
          >
            Start Your Free Trial
          </a>
          <p className="text-sm text-slate-400">
            No credit card required • Setup in minutes
          </p>
        </motion.div>
      </div>
    </section>
  )
}
