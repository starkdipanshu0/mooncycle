import Image from "next/image";
import Link from "next/link";

export const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-start pointer-events-none">
            {/* 
        Logo Position: Top Left
        pointer-events-auto ensures the logo itself is clickable if we adds links later,
        while the nav container lets clicks pass through to the underlying canvas/hero.
      */}
            <div className="relative w-32 h-auto pointer-events-auto">
                <Link href="/">
                    <Image
                        src="/Mcycle logo transpa. (1).png"
                        alt="MoonCycle Logo"
                        width={200}
                        height={100}
                        className="object-contain w-full h-auto drop-shadow-sm"
                        priority
                    />
                </Link>
            </div>
        </nav>
    );
};
