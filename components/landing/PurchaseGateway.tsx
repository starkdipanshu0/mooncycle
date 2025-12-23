"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export const PurchaseGateway = () => {
    return (
        <div className="h-screen w-full flex flex-col items-center justify-center bg-[#F5F2EB] relative z-20">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="relative w-64 h-64 md:w-80 md:h-80 mb-8"
                style={{ width: '20rem', height: '20rem' }}
            >
                <Image
                    src="/heating-pad.png"
                    alt="MoonCycle Heating Pad"
                    fill
                    className="object-contain"
                />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                className="text-center space-y-6"
            >
                <h2 className="text-3xl md:text-4xl font-serif text-stone-800">
                    MoonCycle Heating Pad
                </h2>
                <p className="text-lg text-stone-600 font-light">
                    Comfort, designed for your cycle.
                </p>

                <Link
                    href="/checkout"
                    className="inline-block px-8 py-3 mt-4 bg-stone-800 text-[#F5F2EB] rounded-full hover:bg-stone-700 transition-colors duration-300 text-lg tracking-wide"
                >
                    Begin Comfort
                </Link>
            </motion.div>
        </div>
    );
};
