/* eslint-disable react/no-unescaped-entities */
"use client";

import { motion } from 'framer-motion'
export function HowItWorks() {
    const steps = [
        {
            number: '01',
            title: 'Choose Your Plan',
            description:
                'Select a subscription that fits your needs, whether you are a solo artisan or managing a large workshop.',
        },
        {
            number: '02',
            title: 'Set Up Your Workshop',
            description:
                'Add your custom measurement categories, define your services, and import existing customer profiles.',
        },
        {
            number: '03',
            title: 'Start Managing Orders',
            description:
                'Take new orders, track progress through various stages, and grow your tailoring business effortlessly.',
        },
    ]
    return (
        <section
            id="how-it-works"
            className="py-24 bg-white"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-20">
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
                        className="text-3xl md:text-4xl font-heading font-bold text-brand-navy mb-6"
                    >
                        Master Your Craft in Three Steps
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
                        className="text-lg text-slate-600"
                    >
                        Getting started with StitchCraft is as simple as taking a
                        measurement. We've designed the onboarding to be intuitive and fast.
                    </motion.p>
                </div>

                <div className="relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="container mx-auto px-5">
                        <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-[#ab71f1]" />
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                            {steps.map((step, index) => (
                                <motion.div
                                    key={index}
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
                                        delay: index * 0.2,
                                    }}
                                    className="relative flex flex-col items-center text-center"
                                >
                                    <div className="w-24 h-24 bg-white rounded-full border-3 border-[#7936CA] flex items-center justify-center shadow-elegant mb-8 relative z-10">
                                        <span className="text-3xl font-heading font-bold text-brand-gold">
                                            {step.number}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-heading font-bold text-brand-navy mb-4">
                                        {step.title}
                                    </h3>
                                    <p className="text-slate-600 leading-relaxed max-w-sm">
                                        {step.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
