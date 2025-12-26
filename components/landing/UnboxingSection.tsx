"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export const UnboxingSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const boxRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!containerRef.current || !boxRef.current || !titleRef.current) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=150%", // Box dissolves over 1.5 screen heights
                pin: true,     // Pin it so it stays while dissolving
                scrub: true,   // Direct 1:1 scrubbing for "parallax" feel
                anticipatePin: 1,
            }
        });

        // 1. The Box: Dissolves, Blurs, and slight Scale Up (Dreamy exit)
        tl.to(boxRef.current, {
            opacity: 0,
            scale: 1.1,
            filter: "blur(20px)",
            duration: 1,
            ease: "power1.in"
        }, 0);

        // 2. The Title: Moves up slightly faster (Parallax) and fades out
        tl.to(titleRef.current, {
            y: -100,
            opacity: 0,
            duration: 0.8, // Fades out a bit earlier than the box
            ease: "power1.in"
        }, 0);

    }, { scope: containerRef });

    return (
        <div
            ref={containerRef}
            className="relative h-screen w-full bg-[#F5F2EB] flex flex-col items-center justify-center overflow-hidden z-10"
        >
            <div ref={contentRef} className="relative w-full h-full flex items-center justify-center">

                {/* HERO IMAGE (The Box) */}
                {/* Using a static container for the image to apply transforms easily */}
                <div
                    ref={boxRef}
                    className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px] z-10"
                >
                    <Image
                        src="/closed-box.webp" // Using the first frame manually as per plan
                        alt="MoonCycle Box"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>

                {/* HERO COPY */}
                <div
                    ref={titleRef}
                    className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex flex-col items-center justify-center z-20 pointer-events-none mix-blend-multiply"
                >
                    {/* Note: mix-blend-multiply makes the text interact beautifully with the box if they overlap */}
                    <h1 className="text-[#6B5E4A] text-5xl md:text-8xl font-serif tracking-tighter opacity-90 drop-shadow-sm">
                        MoonCycle
                    </h1>
                    <p className="mt-4 text-[#6B5E4A]/70 text-sm md:text-base uppercase tracking-[0.3em] font-medium">
                        The Ritual
                    </p>
                </div>

                {/* SCROLL INDICATOR */}
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 opacity-40 animate-pulse">
                    <span className="text-[#6B5E4A] text-xs uppercase tracking-widest">Scroll to Begin</span>
                </div>
            </div>
        </div>
    );
};
