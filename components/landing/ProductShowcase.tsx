"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export const ProductShowcase = () => {
    return (
        <section className="w-full min-h-screen bg-[#F5F2EB] flex items-center justify-center p-6 md:p-24 relative overflow-hidden">

            {/* Background Texture */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-multiply" />

            {/* Main Content Container */}
            <div className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-between gap-12 md:gap-24 relative z-10">

                {/* Visual / Product Image */}
                <motion.div
                    className="w-full md:w-1/2 relative aspect-square md:aspect-[4/5]"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ margin: "-100px" }}
                >
                    <div className="relative w-full h-full rounded-[2rem] overflow-hidden shadow-2xl group">
                        <div className="absolute inset-0 bg-[#8B5E3C]/10 mix-blend-multiply z-10 pointer-events-none" />

                        {/* Placeholder for Product Image */}
                        {/* Replace with actual product image path */}
                        <div className="w-full h-full bg-[#E2DCC8] flex items-center justify-center">
                            <span className="text-[#12161F]/20 font-serif text-4xl">Product Image</span>
                        </div>

                        {/* Hover Effect Overlay */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                    </div>

                    {/* Floating Badge */}
                    <motion.div
                        initial={{ scale: 0, rotate: 10 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
                        className="absolute -top-4 -right-4 md:top-8 md:-right-8 bg-[#D4AF37] text-white p-6 rounded-full w-24 h-24 flex items-center justify-center shadow-xl z-20"
                    >
                        <span className="font-serif text-sm text-center leading-tight">New <br /> Arrival</span>
                    </motion.div>
                </motion.div>

                {/* Product Details */}
                <div className="w-full md:w-1/2 flex flex-col items-start gap-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ margin: "-100px" }}
                    >
                        <h4 className="text-[#D4AF37] text-sm tracking-[0.3em] uppercase font-bold mb-4">The Collection</h4>
                        <h2 className="text-5xl md:text-7xl font-serif text-[#12161F] leading-[0.9] mb-6">
                            MoonCycle <br /> Relief Pad
                        </h2>
                        <p className="text-lg text-[#12161F]/70 font-sans leading-relaxed max-w-md">
                            Engineered with organic clay and intelligent heat technology. Experience the warmth that remembers your body.
                        </p>
                    </motion.div>

                    {/* Price & Cart */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        viewport={{ margin: "-100px" }}
                        className="flex flex-col gap-6 w-full max-w-sm"
                    >
                        <div className="flex items-baseline gap-4">
                            <span className="text-3xl font-serif text-[#12161F]">$89.00</span>
                            <span className="text-lg font-sans text-[#12161F]/40 line-through">$120.00</span>
                        </div>

                        <button className="w-full bg-[#12161F] text-[#F5F2EB] py-5 rounded-full uppercase tracking-widest text-sm font-medium hover:scale-[1.02] active:scale-[0.98] transition-transform duration-300">
                            Add to Cart
                        </button>

                        <p className="text-xs text-[#12161F]/50 text-center font-sans">
                            Free shipping worldwide • 30-day trial
                        </p>
                    </motion.div>
                </div>

            </div>
        </section>
    );
};
