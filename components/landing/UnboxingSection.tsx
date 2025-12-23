"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useWebPDecoder } from "@/utils/useWebPDecoder";

gsap.registerPlugin(ScrollTrigger);

export const UnboxingSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const padLineRef = useRef<SVGPathElement>(null);
    const pouchLineRef = useRef<SVGPathElement>(null);
    const padTextRef = useRef<HTMLDivElement>(null);
    const pouchTextRef = useRef<HTMLDivElement>(null);

    const heroRef = useRef<HTMLDivElement>(null);
    const heroTitleRef = useRef<HTMLHeadingElement>(null);
    const heroCTARef = useRef<HTMLButtonElement>(null);

    const { frames, isLoading } = useWebPDecoder("/closed-box.webp");

    const drawFrame = (ctx: CanvasRenderingContext2D, img: ImageBitmap) => {
        const canvas = ctx.canvas;
        const w = canvas.width;
        const h = canvas.height;

        const iw = img.width;
        const ih = img.height;

        const scale = Math.max(w / iw, h / ih);
        const x = (w - iw * scale) / 2;
        const y = (h - ih * scale) / 2;

        ctx.clearRect(0, 0, w, h);
        ctx.drawImage(img, x, y, iw * scale, ih * scale);
    };

    useEffect(() => {
        const resize = () => {
            if (!canvasRef.current || !containerRef.current) return;
            canvasRef.current.width = containerRef.current.offsetWidth;
            canvasRef.current.height = containerRef.current.offsetHeight;
        };
        resize();
        window.addEventListener("resize", resize);
        return () => window.removeEventListener("resize", resize);
    }, []);

    useGSAP(() => {
        if (!frames.length || !canvasRef.current) return;

        const ctx = canvasRef.current.getContext("2d");
        if (!ctx) return;

        drawFrame(ctx, frames[0]);

        // Prepare lines
        [padLineRef, pouchLineRef].forEach(ref => {
            if (!ref.current) return;
            const length = ref.current.getTotalLength();
            gsap.set(ref.current, {
                strokeDasharray: length,
                strokeDashoffset: length,
                opacity: 1
            });
        });

        // Initial text state
        gsap.set([padTextRef.current, pouchTextRef.current], { opacity: 0 });

        // Initial Hero State
        gsap.set(heroRef.current, { opacity: 0 }); // The container for the hero image
        gsap.set([heroTitleRef.current, heroCTARef.current], { opacity: 0, y: 20 });

        const progress = { frame: 0 };

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=700%", // Extended for the full 6-act flow
                scrub: true,
                pin: true,
            },
        });

        // ACT 1: UNBOXING & DOODLES
        // Box Opening (0 -> 4s)
        tl.to(progress, {
            frame: frames.length - 1,
            duration: 4,
            ease: "none",
            onUpdate: () => {
                const i = Math.round(progress.frame);
                if (frames[i]) drawFrame(ctx, frames[i]);
            },
        });

        // Doodles Draw (3.5s -> 5.5s) - Overlapping end of box
        tl.to(padLineRef.current, { strokeDashoffset: 0, duration: 1 }, "-=0.5")
            .to(padTextRef.current, { opacity: 1, duration: 0.5 }, "<0.2")
            .to(pouchLineRef.current, { strokeDashoffset: 0, duration: 1 }, "+=0.3")
            .to(pouchTextRef.current, { opacity: 1, duration: 0.5 }, "<0.2");

        // ACT 1 (Pause): Let user absorb (5.5s -> 6.5s)
        tl.to({}, { duration: 1 });

        // ACT 2: CLEAR THE STAGE (6.5s -> 8s)
        // Fade out doodles
        tl.to([padLineRef.current, pouchLineRef.current, padTextRef.current, pouchTextRef.current], {
            opacity: 0,
            duration: 1
        });
        // Fade out Box (Canvas) to reveal Hero Image underneath/in-place
        tl.to(canvasRef.current, { opacity: 0, duration: 1.5 }, "<0.5");

        // ACT 3: HERO MOMENT (8s -> 9s)
        // Hero Image fades in (it might be already visible if behind canvas, but let's control opacity to be safe)
        tl.to(heroRef.current, { opacity: 1, duration: 1 }, "<");

        // ACT 4: NAME IT (9s -> 10s)
        tl.to(heroTitleRef.current, { opacity: 1, y: 0, duration: 1 });

        // ACT 5: INVITATION (10s -> 11s)
        tl.to(heroCTARef.current, { opacity: 1, y: 0, duration: 1 });

        // Padding for final view
        tl.to({}, { duration: 2 });

    }, { dependencies: [frames] });

    return (
        <div
            ref={containerRef}
            className="relative h-screen w-full bg-[#F5F2EB] overflow-hidden flex flex-col items-center justify-center text-center"
        >
            {/* CANVAS LAYER (The Box) */}
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-10" />

            {/* DOODLE LAYER */}
            <svg
                className="absolute inset-0 w-full h-full pointer-events-none z-20"
                viewBox="0 0 1000 1000"
                preserveAspectRatio="none"
            >
                {/* Heating Pad Pointer */}
                <path
                    ref={padLineRef}
                    d="M300 520 C200 480, 150 420, 120 360"
                    stroke="#6B5E4A"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                />

                {/* Salt Pouch Pointer */}
                <path
                    ref={pouchLineRef}
                    d="M700 520 C820 500, 880 460, 920 420"
                    stroke="#6B5E4A"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                />
            </svg>

            {/* DOODLE LABELS */}
            <div
                ref={padTextRef}
                className="absolute left-[8%] top-[32%] text-sm text-[#6B5E4A] z-20 font-medium"
            >
                Gentle heat for cramp relief
            </div>

            <div
                ref={pouchTextRef}
                className="absolute right-[8%] top-[36%] text-sm text-[#6B5E4A] z-20 font-medium"
            >
                Himalayan salt for deep warmth
            </div>

            {/* HERO LAYER (Act 3-5) */}
            <div
                ref={heroRef}
                className="absolute inset-0 w-full h-full z-0"
            >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="/hero.jpg"
                    alt="MoonCycle Heating Pad"
                    className="object-cover w-full h-full"
                />
                {/* Gradient Overlay for Text Contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            {/* TEXT & CTA LAYER (Act 4-5) */}
            <div className="absolute bottom-[10%] left-0 right-0 z-30 flex flex-col items-center gap-6 pointer-events-none px-4">
                <h2
                    ref={heroTitleRef}
                    className="text-3xl md:text-5xl font-serif text-white max-w-2xl text-shadow-sm drop-shadow-md"
                >
                    MoonCycle Heating Pad
                    <span className="block text-lg md:text-xl font-sans font-normal mt-3 text-white/90">
                        Comfort, designed for your cycle.
                    </span>
                </h2>

                <button
                    ref={heroCTARef}
                    className="pointer-events-auto px-10 py-4 bg-white text-[#6B5E4A] rounded-full text-lg font-medium hover:bg-gray-100 transition-colors shadow-xl"
                    onClick={() => {
                        // Navigate to checkout or product page
                        console.log("Navigating to checkout...");
                    }}
                >
                    Begin Comfort
                </button>
            </div>


            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-[#F5F2EB] z-50">
                    Loading…
                </div>
            )}
        </div>
    );
};
