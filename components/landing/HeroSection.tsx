"use client";

import React from 'react';
import Image from 'next/image';
import { Play, Droplets, Leaf, Hexagon } from 'lucide-react';
import { motion, Variants, useScroll, useTransform } from 'framer-motion';

const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } // Custom easing for premium feel
    }
};

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2
        }
    }
};

const imageReveal: Variants = {
    hidden: { opacity: 0, x: 100, scale: 1.1 },
    visible: {
        opacity: 1,
        x: 0,
        scale: 1,
        transition: {
            duration: 1.4,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.2
        }
    }
};

export const HeroSection = () => {
    const containerRef = React.useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const yText = useTransform(scrollYProgress, [0, 1], [0, 100]);
    const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const yImage = useTransform(scrollYProgress, [0, 1], [0, -50]);
    const scaleImage = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

    return (
        <section ref={containerRef} className="relative w-full min-h-screen bg-[#12161F] overflow-hidden flex flex-col lg:flex-row text-[#F5F2EB] items-center">

            {/* --- 1. LEFT SIDE: THE NARRATIVE (50%) --- */}
            <motion.div
                className="relative z-20 w-full lg:w-1/2 h-full flex flex-col justify-center px-6 lg:px-24 pt-32 lg:pt-32"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                style={{ y: yText, opacity: opacityText }}
            >

                {/* Eyebrow Tag */}
                <motion.div variants={fadeInUp} className="flex items-center gap-4 mb-6">
                    <span className="h-[1px] w-12 bg-[#D4AF37]"></span>
                    <span className="text-[#D4AF37] tracking-[0.3em] text-xs font-semibold uppercase font-sans">
                        Est. 2025 | Handcrafted in India
                    </span>
                </motion.div>

                {/* Headline */}
                <motion.h1 variants={fadeInUp} className="font-serif text-5xl lg:text-7xl leading-[1.1] mb-6">
                    <span className="block text-white">VELVET</span>
                    <span className="block text-[#D4AF37] italic">ARMOUR</span>
                    <span className="block text-3xl lg:text-4xl mt-2 font-light tracking-wide text-white/90">
                        FOR THE MODERN CYCLE.
                    </span>
                </motion.h1>

                {/* Sub-Headline */}
                <motion.p variants={fadeInUp} className="font-sans text-white/70 text-lg lg:text-xl leading-relaxed max-w-md mb-10">
                    Stop pausing your life for pain. Wrapped in brushed cotton and anchored by
                    <span className="text-white font-medium"> 750g of Himalayan Salt</span>
                    —this is the warmth that moves with you.
                </motion.p>

                {/* Buttons */}
                <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-6 items-start sm:items-center mb-16">
                    {/* Primary Button */}
                    <button className="group relative px-8 py-4 bg-[#D4AF37] text-[#12161F] font-serif font-bold tracking-wider hover:bg-white transition-colors duration-500">
                        BEGIN THE RITUAL
                    </button>

                    {/* Secondary Button */}
                    <button className="flex items-center gap-3 text-white/80 hover:text-[#D4AF37] transition-colors group">
                        <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center group-hover:border-[#D4AF37]">
                            <Play size={14} fill="currentColor" />
                        </div>
                        <span className="tracking-widest text-sm uppercase">Watch The Film</span>
                    </button>
                </motion.div>

                {/* Trust Badges (Footer of Hero) */}
                <motion.div variants={fadeInUp} className="flex gap-8 lg:gap-12 border-t border-white/10 pt-8">
                    <TrustItem icon={<Droplets size={18} />} text="Moist Heat Therapy" />
                    <TrustItem icon={<Leaf size={18} />} text="100% Organic Cotton" />
                    <TrustItem icon={<Hexagon size={18} />} text="Pure Himalayan Salt" />
                </motion.div>
            </motion.div>

            {/* --- 2. RIGHT SIDE: THE VISUAL (50%) --- */}
            <motion.div
                className="absolute top-0 right-0 w-full lg:w-[55%] h-full z-10"
                variants={imageReveal}
                initial="hidden"
                animate="visible"
                style={{ y: yImage, scale: scaleImage }}
            >

                {/* Gradient Overlay for blending */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#12161F] via-[#12161F]/40 to-transparent z-20 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12161F] via-transparent to-transparent z-20 pointer-events-none lg:hidden" />

                {/* IMAGE */}
                <div className="relative w-full h-full">
                    <img
                        src="/hero_velvet.webp"
                        alt="Avya Modern Rani"
                        className="object-cover w-full h-full opacity-90"
                    />

                    {/* Grain overlay for texture */}
                    <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
                </div>
            </motion.div>

        </section>
    );
};

// Minimal sub-component for badges
const TrustItem = ({ icon, text }: { icon: React.ReactNode, text: string }) => (
    <div className="flex items-center gap-3 text-[#D4AF37]/80">
        {icon}
        <span className="text-xs uppercase tracking-widest text-white/60 font-medium max-w-[80px] leading-tight">
            {text}
        </span>
    </div>
);