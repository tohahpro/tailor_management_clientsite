/* eslint-disable react/no-unescaped-entities */
"use client";

import { motion } from 'framer-motion'
import {
    CreditCardIcon,
    TagIcon,
    ClipboardListIcon,
    UsersIcon,
    SearchIcon,
    BarChart3Icon,
} from 'lucide-react'
export function FeaturesSection() {
    const features = [
        {
            title: 'Subscription Plans',
            description:
                'Choose flexible plans that grow with your business, from independent tailors to large workshops.',
            icon: CreditCardIcon,
        },
        {
            title: 'Custom Categories',
            description:
                'Create and organize your own measurement categories tailored to your unique cutting style.',
            icon: TagIcon,
        },
        {
            title: 'Order Management',
            description:
                'Track every order seamlessly from initial measurement to final fitting and delivery.',
            icon: ClipboardListIcon,
        },
        {
            title: 'Customer Database',
            description:
                'Store detailed customer profiles, past measurements, preferences, and order history securely.',
            icon: UsersIcon,
        },
        {
            title: 'Smart Search',
            description:
                'Find any order, customer, or specific measurement instantly with our powerful global search.',
            icon: SearchIcon,
        },
        {
            title: 'Analytics Dashboard',
            description:
                'Track revenue, monitor order volume, and visualize your business growth over time.',
            icon: BarChart3Icon,
        },
    ]
    const containerVariants = {
        hidden: {
            opacity: 0,
        },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    }
    const itemVariants = {
        hidden: {
            opacity: 0,
            y: 20,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
            },
        },
    }
    return (
        <section
            id="features"
            className="py-24 bg-linear-to-br from-[#8f43ec]/5 via-[#8545d3]/5 to-[#4e1e8a]/5 relative overflow-hidden"
        >
            <div className="container mx-auto px-5">

                {/* Background Glow */}
                <div className="absolute top-0 right-0 w-100 h-100 bg-[#8f43ec]/20 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-87.5 h-87.5 bg-[#4e1e8a]/20 rounded-full blur-3xl pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                    {/* Heading */}
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-4xl font-heading font-bold text-black mb-6"
                        >
                            Everything You Need to Run Your{" "}
                            <span className="bg-linear-to-r from-[#8f43ec] via-[#8545d3] to-[#4e1e8a] bg-clip-text text-transparent">
                                Tailoring Business
                            </span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-lg text-slate-600"
                        >
                            We've digitized the traditional tailor's notebook, bringing elegance
                            and efficiency to your daily workflow without losing the personal
                            touch.
                        </motion.p>
                    </div>

                    {/* Feature Cards */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-elegant hover:shadow-elegant-hover transition-all duration-300 hover:-translate-y-2 border border-white/40 group"
                            >
                                {/* Icon */}
                                <div className="w-12 h-12 bg-linear-to-br from-[#8f43ec]/10 via-[#8545d3]/10 to-[#4e1e8a]/10 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-all">
                                    <feature.icon className="w-6 h-6 text-[#8f43ec] group-hover:text-[#4e1e8a] transition-colors" />
                                </div>

                                {/* Title */}
                                <h3 className="text-xl font-heading font-bold text-black mb-3">
                                    {feature.title}
                                </h3>

                                {/* Description */}
                                <p className="text-slate-600 leading-relaxed">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
