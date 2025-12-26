"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
    {
        question: "How does the intelligent heat work?",
        answer: "Our proprietary heating layer adapts to your body temperature, providing consistent, therapeutic warmth that targets deep tissue without overheating or causing discomfort."
    },
    {
        question: "Is the material machine washable?",
        answer: "The outer organic velvet cover is fully removable and machine washable on a gentle cycle. The inner heating core should be spot cleaned only."
    },
    {
        question: "Can I wear it while sleeping?",
        answer: "Yes. MoonCycle features an auto-shutoff safety mechanism after 90 minutes, allowing you to drift off to sleep without worry."
    },
    {
        question: "What is the battery life?",
        answer: "The rechargeable battery lasts up to 8 hours on the low setting and 4 hours on the high setting. It charges fully in just 90 minutes via USB-C."
    },
    {
        question: "Do you offer international shipping?",
        answer: "We ship worldwide. International orders typically arrive within 7-14 business days, depending on your location."
    }
];

export const FAQSection = () => {
    return (
        <section className="w-full bg-[#12161F] text-[#F5F2EB] py-[10vh] px-[5vw]">
            <div className="max-w-[clamp(20rem,60vw,60rem)] mx-auto">
                <div className="text-center mb-[8vh]">
                    <span className="text-[#D4AF37] text-[clamp(0.75rem,0.9vw,0.875rem)] tracking-[0.3em] uppercase font-bold block mb-4">
                        Common Questions
                    </span>
                    <h2 className="text-[clamp(2.25rem,5vw,4rem)] font-serif leading-tight">
                        Everything needed <br /> for your peace of mind.
                    </h2>
                </div>

                <div className="flex flex-col gap-[1vw]">
                    {faqs.map((faq, index) => (
                        <FAQItem key={index} question={faq.question} answer={faq.answer} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

const FAQItem = ({ question, answer, index }: { question: string, answer: string, index: number }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ margin: "-50px" }}
            className="border-b border-[#F5F2EB]/10 last:border-none"
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between py-[3vh] text-left group"
            >
                <span className="text-[clamp(1.125rem,1.5vw,1.5rem)] font-serif text-[#F5F2EB] group-hover:text-[#D4AF37] transition-colors duration-300">
                    {question}
                </span>
                <span className="relative flex items-center justify-center w-[clamp(1.5rem,2vw,2rem)] h-[clamp(1.5rem,2vw,2rem)]">
                    <motion.span
                        animate={{ rotate: isOpen ? 90 : 0 }}
                        className="absolute w-full h-[1px] bg-[#F5F2EB] group-hover:bg-[#D4AF37] transition-colors"
                    />
                    <motion.span
                        animate={{ rotate: isOpen ? 180 : 90 }}
                        className="absolute w-full h-[1px] bg-[#F5F2EB] group-hover:bg-[#D4AF37] transition-colors"
                    />
                </span>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <p className="text-[#F5F2EB]/60 font-sans text-[clamp(1rem,1.1vw,1.125rem)] leading-relaxed pb-8 max-w-2xl">
                            {answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
