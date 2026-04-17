import { DarkThemeToggle } from "flowbite-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { FaCode, FaHandshake } from "react-icons/fa";
import { Link } from "react-router";

const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skill" },
    { label: "Projects", href: "#project" },
    { label: "Experience", href: "#experience" },
];

function NavbarComponent() {
    const [ismenuopen, setismenuopen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            {/* Grain texture overlay */}
            <div
                className="pointer-events-none fixed inset-0 z-40 opacity-[0.025] dark:opacity-[0.04]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "repeat",
                    backgroundSize: "128px",
                }}
            />

            <header
                className={`sticky top-0 z-50 transition-all duration-500 ${scrolled
                    ? "bg-white/90 dark:bg-[#1D283C]/90 backdrop-blur-md shadow-[0_1px_0_0_rgba(211,175,55,0.2)]"
                    : "bg-white dark:bg-[#1D283C]"
                    }`}
            >
                {/* Gold top accent line */}
                <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-primary-gold to-transparent opacity-80" />

                <nav className="px-6 lg:px-10 py-0">
                    <motion.div
                        initial={{ opacity: 0, y: -16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl h-[64px]"
                    >
                        {/* Logo */}
                        <Link to="/" className="flex gap-3 items-center group">
                            <div className="relative w-8 h-8 flex items-center justify-center">
                                <div className="absolute inset-0 border border-primary-gold/40 rotate-45 group-hover:rotate-[135deg] transition-transform duration-500" />
                                <FaCode size={14} className="text-primary-gold relative z-10" />
                            </div>
                            <div className="flex flex-col leading-none">
                                <span className="text-[11px] tracking-[0.25em] uppercase text-primary-gold font-medium">
                                    Portfolio
                                </span>
                                <span className="text-[15px] font-bold tracking-tight text-primary-black dark:text-white">
                                    Sushant Paudyal
                                </span>
                            </div>
                        </Link>

                        {/* Desktop Nav */}
                        <div className="hidden lg:flex items-center gap-1">
                            {navLinks.map((link, i) => (
                                <motion.a
                                    key={link.href}
                                    href={link.href}
                                    initial={{ opacity: 0, y: -8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.1 + i * 0.07 }}
                                    className="relative px-4 py-1.5 text-[13px] font-medium tracking-wide text-gray-600 dark:text-gray-300 hover:text-primary-gold dark:hover:text-primary-gold transition-colors duration-200 group"
                                >
                                    {link.label}
                                    <span className="absolute bottom-0 left-4 right-4 h-[1px] bg-primary-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                                </motion.a>
                            ))}
                        </div>

                        {/* Right Actions */}
                        <div className="flex items-center gap-2 lg:gap-3">
                            <motion.a
                                href="#contact"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.6 }}
                                className="rounded flex items-center gap-2 bg-primary-gold hover:bg-[#c4a030] text-primary-black text-[13px] font-semibold tracking-wide px-4 py-2 transition-all duration-200 shadow-[0_0_0_0_rgba(211,175,55,0.4)] hover:shadow-[0_0_16px_2px_rgba(211,175,55,0.3)]"
                            >
                                <FaHandshake size={14} />
                                <span className="hidden sm:block">Hire Me</span>
                            </motion.a>

                            <DarkThemeToggle className="border border-gray-200 dark:border-gray-600 hover:border-primary-gold dark:hover:border-primary-gold text-primary-black dark:text-gray-300 hover:text-primary-gold dark:hover:text-primary-gold bg-transparent hover:bg-transparent transition-all duration-200" />

                            {/* Mobile menu toggle */}
                            <button
                                onClick={() => setismenuopen(!ismenuopen)}
                                className="lg:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-primary-gold border border-transparent hover:border-primary-gold/30 transition-all duration-200"
                                aria-label="Toggle menu"
                            >
                                <div className="w-5 flex flex-col gap-[5px]">
                                    <motion.span
                                        animate={ismenuopen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                                        className="block h-[1.5px] bg-current transition-all"
                                    />
                                    <motion.span
                                        animate={ismenuopen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                                        className="block h-[1.5px] bg-current"
                                    />
                                    <motion.span
                                        animate={ismenuopen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                                        className="block h-[1.5px] bg-current"
                                    />
                                </div>
                            </button>
                        </div>
                    </motion.div>
                </nav>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {ismenuopen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden border-t border-primary-gold/20 bg-white dark:bg-[#1D283C] lg:hidden"
                        >
                            <ul className="flex flex-col px-6 py-4 gap-1">
                                {navLinks.map((link, i) => (
                                    <motion.li
                                        key={link.href}
                                        initial={{ opacity: 0, x: -12 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.06 }}
                                    >
                                        <a
                                            href={link.href}
                                            onClick={() => setismenuopen(false)}
                                            className="flex items-center justify-between py-3 text-[14px] font-medium text-gray-700 dark:text-gray-300 hover:text-primary-gold dark:hover:text-primary-gold border-b border-gray-100 dark:border-gray-700/50 last:border-0 transition-colors duration-200"
                                        >
                                            {link.label}
                                            <span className="text-primary-gold/50 text-xs tracking-widest">
                                                0{i + 1}
                                            </span>
                                        </a>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>
        </>
    );
}

export default NavbarComponent;