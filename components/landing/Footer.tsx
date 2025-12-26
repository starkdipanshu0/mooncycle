"use client";

import { motion } from "framer-motion";

export const Footer = () => {
    return (
        <footer className="relative w-full bg-[#F5F2EB] text-[#12161F] pt-[8vh] pb-[4vh] px-[5vw] overflow-hidden">

            <div className="max-w-[1920px] mx-auto flex flex-col">

                {/* Upper Section: Navigation & Newsletter */}
                <div className="flex flex-col md:flex-row justify-between gap-[5vw] md:gap-[12vw] z-10 relative mb-[5vh] md:mb-[10vh]">

                    {/* Newsletter */}
                    <div className="max-w-md">
                        <span className="block text-[#D4AF37] text-[clamp(0.65rem,0.8vw,0.75rem)] font-mono tracking-widest mb-6">NEWSLETTER</span>
                        <h3 className="text-[clamp(2rem,4vw,3.5rem)] font-serif mb-8 leading-tight">
                            Join the inner circle.
                        </h3>
                        <div className="relative border-b border-[#12161F]/20 pb-2">
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="w-full bg-transparent text-[clamp(1.125rem,1.5vw,1.5rem)] font-sans focus:outline-none placeholder:text-[#12161F]/30 text-[#12161F]"
                            />
                            <button className="absolute right-0 top-0 bottom-2 text-[#D4AF37] text-sm font-bold uppercase hover:opacity-80 transition-opacity">
                                Submit
                            </button>
                        </div>
                    </div>

                    {/* Navigation Columns */}
                    <div className="flex gap-12 md:gap-24">
                        <NavColumn title="Shop" links={["Relief Pad", "Bundles", "Accessories", "Gift Cards"]} />
                        <NavColumn title="About" links={["Our Story", "Science", "Reviews", "Journal"]} />
                        <NavColumn title="Support" links={["FAQ", "Shipping", "Returns", "Contact"]} />
                    </div>
                </div>

                {/* Massive Typography Reveal */}
                <div className="relative overflow-hidden -mb-4 md:-mb-10">
                    <motion.h1
                        initial={{ y: "100%" }}
                        whileInView={{ y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        viewport={{ once: true }}
                        className="text-[13.5vw] leading-[0.75] font-serif font-black text-[#12161F] tracking-tighter text-center md:text-left opacity-10 select-none pointer-events-none"
                    >
                        MOONCYCLE
                    </motion.h1>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[#12161F]/40 text-xs font-mono uppercase tracking-wider mt-[3vh] pt-[2vh] border-t border-[#12161F]/10">
                    <span>© 2024 MoonCycle Inc.</span>
                    <div className="flex gap-8">
                        <a href="#" className="hover:text-[#12161F] transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-[#12161F] transition-colors">Terms of Service</a>
                    </div>
                </div>

            </div>
        </footer>
    );
};

const NavColumn = ({ title, links }: { title: string, links: string[] }) => (
    <div className="flex flex-col gap-6">
        <h4 className="text-[#D4AF37] text-[clamp(0.65rem,0.8vw,0.75rem)] font-mono tracking-widest">{title.toUpperCase()}</h4>
        <ul className="flex flex-col gap-3">
            {links.map((link) => (
                <li key={link}>
                    <a href="#" className="text-[clamp(0.875rem,1vw,1rem)] text-[#12161F]/70 hover:text-[#12161F] transition-colors font-sans">
                        {link}
                    </a>
                </li>
            ))}
        </ul>
    </div>
);
