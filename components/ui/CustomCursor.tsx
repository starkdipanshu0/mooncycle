"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const CustomCursor = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Smooth mouse tracking
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const smoothOptions = { damping: 20, stiffness: 300, mass: 0.5 };
    const smoothX = useSpring(mouseX, smoothOptions);
    const smoothY = useSpring(mouseY, smoothOptions);

    useEffect(() => {
        const updateMousePosition = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);

            if (!isVisible) setIsVisible(true);
        };

        window.addEventListener("mousemove", updateMousePosition);

        return () => {
            window.removeEventListener("mousemove", updateMousePosition);
        };
    }, [mouseX, mouseY, isVisible]);

    if (!isVisible) return null;

    return (
        <>
            {/* Global Cursor Override */}
            <style jsx global>{`
                /* Hide default cursor only if device has fine pointer (mouse) */
                @media (pointer: fine) {
                    body, a, button, input, textarea {
                        cursor: none !important;
                    }
                }
            `}</style>

            {/* Main Cursor Dot */}
            <motion.div
                className="fixed top-0 left-0 w-4 h-4 rounded-full bg-[#D4AF37] mix-blend-difference pointer-events-none z-[9999]"
                style={{
                    x: smoothX,
                    y: smoothY,
                    translateX: "-50%",
                    translateY: "-50%"
                }}
            />

            {/* Trailing Ring */}
            <motion.div
                className="fixed top-0 left-0 w-12 h-12 rounded-full border border-[#D4AF37] mix-blend-difference pointer-events-none z-[9998]"
                style={{
                    x: smoothX,
                    y: smoothY,
                    translateX: "-50%",
                    translateY: "-50%"
                }}
                transition={{
                    type: "spring",
                    mass: 0.8
                }}
            />
        </>
    );
};
