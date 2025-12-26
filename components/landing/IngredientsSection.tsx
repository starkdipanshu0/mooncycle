"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const ingredients = [
    {
        title: "A Second Skin.",
        subtitle: "Organic Velvet",
        description: "Softness that doesn't just touch you, but understands you. An organic caress that immediately signals safety to your senses.",
        color: "bg-[#1A202C]",
        image: "/assets/velvet.png",
    },
    {
        title: "The Weight of a Hug.",
        subtitle: "Grounding Clay",
        description: "Gentle, distributed pressure to quiet the noise. Like a reassuring hand resting on you, saying 'I've got you'.",
        color: "bg-[#2D3748]",
        image: null,
    },
    {
        title: "Deep, Constant Warmth.",
        subtitle: "Intelligent Heat",
        description: "No fluctuations. No interruptions. Just a steady, penetrating warmth that unravels the tightest knots of pain.",
        color: "bg-[#B7950B]",
        image: null,
    },
];

export const IngredientsSection = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <div className="w-full relative bg-[#F5F2EB]">
            {!isMounted ? (
                <div className="h-[300vh]" />
            ) : (
                <IngredientsScroll />
            )}
        </div>
    );
};

const IngredientsScroll = () => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    // Determine horizontal movement based on viewport
    // Moving 3 sections (100vw each) - 1 viewport = -200vw total movement ideally for 3 items
    // But adjusting for padding/feel:
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.6%"]); // Move to show 3 items (0, -33, -66)

    return (
        <section ref={targetRef} className="relative h-[300vh] bg-[#F5F2EB]">
            {/* Sticky Container */}
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">

                {/* Horizontal Track */}
                <motion.div style={{ x }} className="flex">
                    {ingredients.map((item, index) => (
                        <Card key={index} item={item} index={index} />
                    ))}
                </motion.div>

                {/* Texture Overlay */}
                <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-multiply"></div>
            </div>
        </section>
    );
};

const Card = ({ item, index }: { item: typeof ingredients[0], index: number }) => {
    return (
        <div className="w-screen h-screen flex flex-col md:flex-row items-center justify-center p-6 md:p-20 shrink-0 relative bg-[#F5F2EB]">
            {/* TEXT CONTENT */}
            <div className="flex flex-col justify-center items-start w-full md:w-1/2 p-4 md:p-12 gap-8 z-10">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ margin: "-200px" }} // Trigger animation slightly before center
                >
                    <span className="text-xs md:text-sm tracking-[0.3em] uppercase font-bold text-[#D4AF37] mb-2 block">
                        Material 0{index + 1}
                    </span>
                    <h3 className="text-5xl md:text-7xl font-serif leading-[0.9] text-[#12161F] mb-6">
                        {item.title}
                    </h3>
                    <p className="text-lg md:text-xl font-sans text-[#12161F]/70 leading-relaxed max-w-lg">
                        {item.description}
                    </p>
                    {/* Decorative Line */}
                    <div className="w-24 h-[1px] bg-[#12161F]/20 mt-8"></div>
                </motion.div>
            </div>

            {/* VISUAL / IMAGE CARD */}
            <div className="w-full md:w-1/2 h-[45vh] md:h-[75%] flex items-center justify-center p-4 md:p-12">
                <motion.div
                    className={`relative w-full h-full rounded-[2rem] overflow-hidden shadow-2xl ${!item.image ? item.color : ''}`}
                    initial={{ scale: 0.9, rotate: 2 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} // smooth graceful ease
                    viewport={{ margin: "-200px" }}
                >
                    {item.image && (
                        <Image
                            src={item.image}
                            alt={item.subtitle}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    )}

                    {/* Inner Label */}
                    <div className="absolute top-6 left-6 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                        <span className="text-white text-xs tracking-widest uppercase font-medium">
                            {item.subtitle}
                        </span>
                    </div>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                </motion.div>
            </div>
        </div>
    );
}
