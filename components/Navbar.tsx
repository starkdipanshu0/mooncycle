"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        if (latest > 50) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    });

    const navVariants = {
        top: {
            backgroundColor: "rgba(18, 22, 31, 0)",
            paddingTop: "1.5rem",
            paddingBottom: "1.5rem",
            backdropFilter: "blur(0px)"
        },
        scrolled: {
            backgroundColor: "rgba(245, 242, 235, 0.6)", // More transparent
            paddingTop: "1rem",
            paddingBottom: "1rem",
            backdropFilter: "blur(12px)",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)"
        }
    };

    return (
        <motion.nav
            variants={navVariants}
            initial="top"
            animate={isScrolled ? "scrolled" : "top"}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 lg:px-12"
        >
            {/* Logo Position: Left */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="relative w-28 lg:w-32 h-auto cursor-pointer z-50"
            >
                <Link href="/">
                    <motion.div
                        animate={{
                            filter: isScrolled
                                ? "brightness(1) invert(0)"
                                : "brightness(0) invert(1) sepia(1) saturate(5) hue-rotate(5deg)"
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        <Image
                            src="/Mcycle logo transpa. (1).png"
                            alt="MoonCycle Logo"
                            width={200}
                            height={100}
                            className="object-contain w-full h-auto"
                            priority
                        />
                    </motion.div>
                </Link>
            </motion.div>

            {/* Navigation Links (Right) */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex gap-8 lg:gap-10 items-center"
            >
                <NavLink href="#" text="Ritual" isScrolled={isScrolled} />
                <NavLink href="#" text="Materials" isScrolled={isScrolled} />
                <NavLink href="#" text="Shop" isScrolled={isScrolled} isButton />
            </motion.div>
        </motion.nav>
    );
};

const NavLink = ({ href, text, isScrolled, isButton = false }: { href: string, text: string, isScrolled: boolean, isButton?: boolean }) => {
    const textColor = isScrolled ? "text-[#12161F]" : "text-[#F5F2EB]";
    const hoverColor = "#D4AF37";

    if (isButton) {
        return (
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-2 font-serif text-sm tracking-widest font-bold uppercase border transition-colors duration-300 ${isScrolled ? "border-[#12161F] text-[#12161F] hover:bg-[#12161F] hover:text-white" : "border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#12161F]"}`}
            >
                {text}
            </motion.button>
        );
    }

    return (
        <Link href={href} className="relative group">
            <span className={`font-serif italic text-lg transition-colors duration-300 ${textColor} group-hover:text-[${hoverColor}]`}>
                {text}
            </span>
            <span
                className={`absolute -bottom-1 left-0 w-0 h-[1px] transition-all duration-300 group-hover:w-full ${isScrolled ? "bg-[#12161F]" : "bg-[#D4AF37]"}`}
            />
        </Link>
    );
};
