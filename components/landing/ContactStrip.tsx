"use client";

import { motion } from "framer-motion";

export const ContactStrip = () => {
    return (
        <section className="w-full bg-[#D4AF37] overflow-hidden py-12 relative flex items-center justify-center">

            {/* Infinite Marquee Container */}
            <div className="flex whitespace-nowrap">
                <MarqueeContent />
                <MarqueeContent />
            </div>

            {/* Central Contact Button */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <button className="pointer-events-auto bg-[#12161F] text-[#F5F2EB] px-10 py-4 rounded-full font-serif text-lg tracking-widest uppercase hover:scale-110 active:scale-95 transition-transform duration-300 shadow-xl border-2 border-[#12161F] hover:bg-[#F5F2EB] hover:text-[#12161F]">
                    Contact Us
                </button>
            </div>

        </section>
    );
};

const MarqueeContent = () => {
    return (
        <motion.div
            initial={{ x: 0 }}
            animate={{ x: "-100%" }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="flex gap-8 items-center pr-8"
        >
            {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="flex items-center gap-8 opacity-20 hover:opacity-100 transition-opacity duration-500">
                    <span className="text-6xl md:text-8xl font-serif text-[#12161F]">Get in Touch</span>
                    <span className="w-4 h-4 rounded-full bg-[#12161F]"></span>
                </div>
            ))}
        </motion.div>
    );
};
