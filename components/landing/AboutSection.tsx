"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from "framer-motion";

export const AboutSection = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <div className="w-full relative bg-[#F5F2EB]">
            {!isMounted ? (
                <section className="h-[200vh] w-full" />
            ) : (
                <AboutScroll />
            )}
        </div>
    );
};

const AboutScroll = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Smooth out the scroll value for sweeter animations
    const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

    // --- ANIMATION MAPPINGS ---

    // 1. Background Color Transition
    // 0 -> 0.3 (Dark), 0.3 -> 0.6 (Warm), 0.6 -> 1 (Light)
    const bgColor = useTransform(
        smoothProgress,
        [0, 0.4, 1],
        ["#12161F", "#8B5E3C", "#F5F2EB"]
    );

    // 2. Text Color Transition
    const textColor = useTransform(
        smoothProgress,
        [0, 0.4, 0.6],
        ["#F5F2EB", "#F5F2EB", "#12161F"]
    );

    // 3. Visual Element Transformations
    // Rotate and scale a central "Core" shape
    const shapeRotate = useTransform(smoothProgress, [0, 1], [0, 180]);
    const shapeScale = useTransform(smoothProgress, [0, 0.5, 1], [0.5, 1.2, 0.8]);
    const shapeRadius = useTransform(smoothProgress, [0, 0.6, 1], ["0%", "50%", "50%"]);

    return (
        <motion.section
            ref={containerRef}
            className="relative w-full"
            style={{ backgroundColor: bgColor }}
        >
            <div className="flex flex-col md:flex-row max-w-[1920px] mx-auto">

                {/* --- LEFT: STICKY VISUAL --- */}
                <div className="w-full md:w-1/2 h-[50vh] md:h-screen sticky top-0 flex items-center justify-center overflow-hidden">
                    <div className="relative w-full h-full flex items-center justify-center">
                        {/* Dynamic Shape */}
                        <motion.div
                            style={{
                                rotate: shapeRotate,
                                scale: shapeScale,
                                borderRadius: shapeRadius,
                                borderColor: textColor
                            }}
                            className="w-[20vh] h-[20vh] md:w-[40vh] md:h-[40vh] border-[1px] opacity-20 absolute"
                        />
                        <motion.div
                            style={{
                                rotate: useTransform(smoothProgress, [0, 1], [0, -90]),
                                scale: useTransform(smoothProgress, [0, 1], [0.8, 1]),
                                borderRadius: shapeRadius,
                                borderColor: textColor
                            }}
                            className="w-[15vh] h-[15vh] md:w-[30vh] md:h-[30vh] border-[1px] opacity-40 absolute"
                        />
                        {/* Core Text changing based on stage */}
                        <div className="absolute z-10 text-center mix-blend-difference">
                            <StageLabel progress={smoothProgress} />
                        </div>
                    </div>

                    {/* Noise Overlay applied only to this sticky part if desired, or globally */}
                    <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                </div>

                {/* --- RIGHT: SCROLLING NARRATIVE --- */}
                <div className="w-full md:w-1/2 flex flex-col relative z-10">

                    {/* STAGE 1: THE NOISE */}
                    <NarrativeBlock
                        title="The Noise."
                        text="The world demands your constant motion. Pain becomes just another signal to ignore, buried under the weight of expectations and endless to-dos."
                        align="start"
                        color={textColor}
                    />

                    {/* STAGE 2: THE SHIFT */}
                    <NarrativeBlock
                        title="The Shift."
                        text="But what if you paused? What if, instead of fighting the cycle, you leaned into it? We designed a material that doesn't just sit on you, but holds you."
                        align="center"
                        color={textColor}
                    />

                    {/* STAGE 3: THE SANCTUARY */}
                    <NarrativeBlock
                        title="The Sanctuary."
                        text="Reclaim your rhythm. MoonCycle is more than a product; it's a permission slip to rest. Intelligent warmth that unravels the knots and lets you finally let go."
                        align="end"
                        color={textColor}
                    />

                    {/* Spacer for comfortable finish */}
                    <div className="h-[20vh]" />
                </div>
            </div>
        </motion.section>
    );
};

const NarrativeBlock = ({ title, text, align, color }: { title: string, text: string, align: 'start' | 'center' | 'end', color: any }) => {
    return (
        <div className={`h-[80vh] md:h-screen flex flex-col justify-center p-[4vw] md:p-[10vw] ${align === 'center' ? 'md:items-center md:text-center' : align === 'end' ? 'md:items-start' : 'md:items-start'}`}>
            <motion.h2
                style={{ color }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ margin: "-200px" }}
                className="text-[clamp(3rem,6vw,6rem)] font-serif mb-[3vh] leading-tight"
            >
                {title}
            </motion.h2>
            <motion.p
                style={{ color }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 0.8, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                viewport={{ margin: "-200px" }}
                className="text-[clamp(1.125rem,1.5vw,1.5rem)] font-sans max-w-md leading-relaxed"
            >
                {text}
            </motion.p>
        </div>
    );
};

// Helper component to switch text based on scroll position without complex conditional rendering in the loop
const StageLabel = ({ progress }: { progress: any }) => {
    const [stage, setStage] = useState(1);

    useMotionValueEvent(progress, "change", (latest: number) => {
        if (latest < 0.33) setStage(1);
        else if (latest < 0.66) setStage(2);
        else setStage(3);
    });

    return (
        <motion.span
            key={stage}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[clamp(0.875rem,1vw,1rem)] tracking-[0.3em] uppercase font-bold text-white/80"
        >
            {stage === 1 ? "DISCOMFORT" : stage === 2 ? "RELEASE" : "FLOW"}
        </motion.span>
    );
}
