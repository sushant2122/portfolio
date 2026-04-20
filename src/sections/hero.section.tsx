import { motion } from "framer-motion";
import { FaDownload } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import herophoto from "../assets/hero.png";
import resume from "../assets/resume.pdf";
import { toast } from "react-toastify";

const STAGGER = 0.12;

function HeroSection() {
    const onDownload = () => {
        toast.info("CV will start downloading.");
    };

    return (
        <section
            id="home"
            className="relative overflow-hidden bg-white dark:bg-[#1D283C] min-h-[92vh] flex items-center"
        >
            {/* ── Background geometry ── */}
            {/* Large faint circle */}
            <div className="pointer-events-none absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full border border-primary-gold/10 dark:border-primary-gold/[0.07]" />
            <div className="pointer-events-none absolute -top-16 -right-16 w-[360px] h-[360px] rounded-full border border-primary-gold/10 dark:border-primary-gold/[0.07]" />

            {/* Dot-grid texture bottom-left */}
            <div
                className="pointer-events-none absolute bottom-0 left-0 w-72 h-72 opacity-[0.06] dark:opacity-[0.08]"
                style={{
                    backgroundImage:
                        "radial-gradient(circle, #D3AF37 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                }}
            />

            {/* Gold vertical accent line */}
            <div className="pointer-events-none absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-transparent via-primary-gold/40 to-transparent hidden lg:block" />

            <div className="relative z-10 grid max-w-screen-xl px-6 lg:px-16 py-16 mx-auto lg:gap-12 lg:py-24 lg:grid-cols-12 w-full">

                {/* ── Text Column ── */}
                <div className="mr-auto place-self-center lg:col-span-7">

                    {/* Eyebrow label */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: STAGGER * 0 }}
                        className="flex items-center gap-3 mb-6"
                    >
                        <span className="h-[1px] w-8 bg-primary-gold" />
                        <span className="text-[11px] tracking-[0.3em] uppercase font-semibold text-primary-gold">
                            Full Stack Developer
                        </span>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 28 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.75, delay: STAGGER * 1, ease: [0.22, 1, 0.36, 1] }}
                        className="max-w-xl mb-6 text-[2.6rem] md:text-5xl xl:text-[3.5rem] font-extrabold tracking-tight leading-[1.1] text-primary-black dark:text-white"
                    >
                        Turning Ideas into{" "}
                        <span className="relative inline-block">
                            <span className="relative z-10 text-primary-gold">Interactive</span>
                            {/* underline swoosh */}
                            <svg
                                className="absolute -bottom-1 left-0 w-full"
                                viewBox="0 0 200 8"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M2 6 Q100 1 198 6"
                                    stroke="#D3AF37"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    fill="none"
                                    opacity="0.5"
                                />
                            </svg>
                        </span>{" "}
                        Web Experiences
                    </motion.h1>

                    {/* Body */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: STAGGER * 2 }}
                        className="max-w-lg mb-10 text-[15px] leading-relaxed text-gray-500 dark:text-gray-400"
                    >
                        I build modern, responsive web applications using React and
                        Tailwind CSS — with a relentless focus on clean UI and
                        exceptional user experience.
                    </motion.p>

                    {/* CTA Row */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: STAGGER * 3 }}
                        className="flex flex-wrap items-center gap-4"
                    >
                        {/* Primary CTA */}
                        <a
                            href={resume} download="Sushant_ALL_CV.pdf" onClick={onDownload}
                            className="group inline-flex items-center gap-2.5 bg-primary-gold hover:bg-[#c4a030] text-primary-black font-semibold text-[14px] tracking-wide px-6 py-3.5 transition-all duration-200 shadow-[0_0_0_0_rgba(211,175,55,0.4)] hover:shadow-[0_0_20px_4px_rgba(211,175,55,0.25)]"
                        >
                            <FaDownload size={13} />
                            Download My CV
                        </a>

                        {/* Secondary CTA */}
                        <a
                            href="#project"
                            className="group inline-flex items-center gap-2 text-[14px] font-medium text-primary-black dark:text-gray-300 hover:text-primary-gold dark:hover:text-primary-gold transition-colors duration-200"
                        >
                            View Projects
                            <FaArrowRight
                                size={12}
                                className="group-hover:translate-x-1 transition-transform duration-200"
                            />
                        </a>
                    </motion.div>

                    {/* Stats strip */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: STAGGER * 5 }}
                        className="flex gap-8 mt-14 pt-8 border-t border-gray-100 dark:border-gray-700/50"
                    >
                        {[
                            { value: "1+", label: "Years Experience" },
                            { value: "5+", label: "Projects Built" },
                            { value: "1st", label: "Class Honours" },
                        ].map(({ value, label }) => (
                            <div key={label}>
                                <p className="text-2xl font-extrabold text-primary-black dark:text-white">
                                    {value}
                                </p>
                                <p className="text-[11px] tracking-wide text-gray-400 mt-0.5 uppercase">
                                    {label}
                                </p>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* ── Photo Column ── */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="hidden lg:flex lg:col-span-5 items-center justify-center"
                >
                    <div className="relative">
                        {/* Gold frame */}
                        <div className="absolute -inset-3 border border-primary-gold/30" />
                        <div className="absolute -inset-6 border border-primary-gold/10" />

                        {/* Decorative corner marks */}
                        {[
                            "top-0 left-0 border-t-2 border-l-2",
                            "top-0 right-0 border-t-2 border-r-2",
                            "bottom-0 left-0 border-b-2 border-l-2",
                            "bottom-0 right-0 border-b-2 border-r-2",
                        ].map((cls, i) => (
                            <div
                                key={i}
                                className={`absolute w-5 h-5 border-primary-gold -m-[10px] ${cls}`}
                            />
                        ))}

                        <img
                            src={herophoto}
                            alt="Sushant Paudyal"
                            className="relative z-10 w-full max-w-[420px] object-cover grayscale-[10%] hover:grayscale-0 transition-all duration-500"
                        />

                        {/* Floating badge */}
                        <motion.div
                            animate={{ y: [0, -6, 0] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -bottom-5 -left-5 bg-white dark:bg-[#1D283C] border border-primary-gold/40 px-4 py-2.5 shadow-xl z-20"
                        >
                            <p className="text-[10px] tracking-widest uppercase text-gray-400 mb-0.5">
                                Status
                            </p>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                <span className="text-[13px] font-semibold text-primary-black dark:text-white">
                                    Available to hire
                                </span>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

export default HeroSection;