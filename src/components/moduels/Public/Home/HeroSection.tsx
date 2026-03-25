/* eslint-disable react/no-unescaped-entities */
"use client";

import { motion } from 'framer-motion'
import { PlayCircleIcon } from 'lucide-react'
export function HeroSection() {
    return (
        <section className="pt-32 pb-20 lg:pt-48 lg:pb-32 bg-linear-to-br from-[#8f43ec]/10 via-[#8545d3]/10 to-[#4e1e8a]/10 relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="container mx-auto px-5">
                <div className="absolute inset-0 bg-textile-pattern opacity-40 pointer-events-none" />
                <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-200 h-200 bg-[#8f43ec]/20 rounded-full blur-3xl pointer-events-none" />

                <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-150 h-150 bg-[#4e1e8a]/20 rounded-full blur-3xl pointer-events-none" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center max-w-4xl mx-auto">
                        <motion.div
                            initial={{
                                opacity: 0,
                                y: 20,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            transition={{
                                duration: 0.6,
                            }}
                        >
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full 
                                        bg-linear-to-r from-[#8f43ec]/10 via-[#8545d3]/10 to-[#4e1e8a]/10 
                                        text-[#4e1e8a] text-sm font-semibold tracking-wide 
                                        border border-[#8f43ec]/20 backdrop-blur-md shadow-sm">
                                <span className="w-2 h-2 rounded-xl bg-linear-to-r from-[#8f43ec] to-[#4e1e8a] animate-pulse"></span>
                                The Modern Tailor's Workspace
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{
                                opacity: 0,
                                y: 20,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            transition={{
                                duration: 0.6,
                                delay: 0.1,
                            }}
                            className="text-5xl md:text-6xl lg:text-7xl font-bold text-brand-navy leading-tight mb-8"
                        >
                            Manage Your Tailoring Business{' '}
                            <span className="bg-linear-to-r from-[#8f43ec] via-[#8545d3] to-[#4e1e8a] bg-clip-text text-transparent italic font-normal">
                                Like Never Before
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{
                                opacity: 0,
                                y: 20,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            transition={{
                                duration: 0.6,
                                delay: 0.2,
                            }}
                            className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed"
                        >
                            Elevate your craft with a digital transformation. Seamlessly manage
                            orders, organize custom measurements, and grow your clientele with
                            our elegant SaaS platform built exclusively for tailors.
                        </motion.p>

                        <motion.div
                            initial={{
                                opacity: 0,
                                y: 20,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            transition={{
                                duration: 0.6,
                                delay: 0.3,
                            }}
                            className="flex flex-col sm:flex-row items-center justify-center gap-4"
                        >
                            <a
                                href="/register"
                                className="w-full sm:w-auto px-8 py-4 bg-brand-gold hover:bg-brand-gold-dark text-white rounded-md font-medium text-lg transition-all shadow-lg shadow-brand-gold/20 hover:shadow-brand-gold/40 hover:-translate-y-0.5"
                            >
                                Start Free Trial
                            </a>
                            <a
                                href="#"
                                className="w-full sm:w-auto px-8 py-4 bg-white border border-stone-200 hover:border-brand-navy text-brand-navy rounded-md font-medium text-lg transition-all flex items-center justify-center gap-2 hover:bg-stone-50"
                            >
                                <PlayCircleIcon className="w-5 h-5" />
                                Watch Demo
                            </a>
                        </motion.div>

                        <motion.p
                            initial={{
                                opacity: 0,
                            }}
                            animate={{
                                opacity: 1,
                            }}
                            transition={{
                                duration: 0.6,
                                delay: 0.5,
                            }}
                            className="mt-6 text-sm text-slate-500"
                        >
                            No credit card required • 7-day free trial
                        </motion.p>
                    </div>
                </div>
            </div>
        </section>
    )
}
