import { motion } from "framer-motion";
import abtimg from "../assets/abt.gif";
import { FaGithub, FaFacebook, FaLinkedin } from "react-icons/fa";

const socialLinks = [
    { icon: FaGithub, href: "https://github.com/sushant2122", label: "GitHub" },
    { icon: FaLinkedin, href: "https://www.linkedin.com/in/sushant-paudyal-a25aa5268/", label: "LinkedIn" },
    { icon: FaFacebook, href: "https://www.facebook.com/share/18ZTyoRyoL/?mibextid=wwXIfr", label: "Facebook" }
];

const highlights = [
    { label: "Degree", value: "BSc (Hons) Computing" },
    { label: "Grade", value: "First Class Honours" },
    { label: "College", value: "Islington College" },
    { label: "Role", value: "Full Stack Developer" },
];

function AboutSection() {
    return (
        <section
            id="about"
            className="relative overflow-hidden bg-gray-50 dark:bg-[#17202f] py-24 px-6"
        >
            {/* Background texture */}
            <div
                className="pointer-events-none absolute top-0 right-0 w-96 h-96 opacity-[0.04]"
                style={{
                    backgroundImage: "radial-gradient(circle, #D3AF37 1px, transparent 1px)",
                    backgroundSize: "18px 18px",
                }}
            />

            <div className="mx-auto max-w-screen-xl">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4 mb-16"
                >
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <span className="h-[1px] w-8 bg-primary-gold" />
                            <span className="text-[11px] tracking-[0.3em] uppercase font-semibold text-primary-gold">
                                My Story
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-primary-black dark:text-white">
                            About <span className="text-primary-gold">Me</span>
                        </h2>
                    </div>
                    <div className="hidden md:block flex-1 h-[1px] bg-gradient-to-r from-primary-gold/30 to-transparent ml-4" />
                </motion.div>

                <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                    {/* Image Column */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                        viewport={{ once: true }}
                        className="lg:col-span-5 flex justify-center"
                    >
                        <div className="relative w-full max-w-[400px]">
                            {/* Offset background block */}
                            <div className="absolute top-6 left-6 right-0 bottom-0 border border-primary-gold/30 bg-primary-gold/5" />

                            {/* Corner marks */}
                            {[
                                "top-5 left-6 border-t-2 border-l-2",
                                "top-5 right-0 border-t-2 border-r-2",
                                "bottom-0 left-6 border-b-2 border-l-2",
                                "bottom-0 right-6 border-b-2 border-r-2",
                            ].map((cls, i) => (
                                <div
                                    key={i}
                                    className={`absolute w-5 h-5 border-primary-gold z-20 ${cls}`}
                                />
                            ))}

                            <img
                                src={abtimg}
                                alt="Sushant Paudyal"
                                className=" z-10 w-full object-cover grayscale-[10%] hover:grayscale-0 transition-all duration-500"
                            />

                            {/* Experience badge */}
                            <motion.div
                                animate={{ y: [0, -5, 0] }}
                                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -bottom-4 -right-4 z-20 bg-primary-gold px-4 py-3 shadow-lg"
                            >
                                <p className="text-[22px] font-extrabold text-primary-black leading-none">1+</p>
                                <p className="text-[10px] font-semibold text-primary-black/70 uppercase tracking-widest mt-0.5">
                                    Yrs Exp.
                                </p>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Text Column */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                        viewport={{ once: true }}
                        className="lg:col-span-7"
                    >
                        <h3 className="text-2xl md:text-3xl font-bold text-primary-black dark:text-white mb-1 tracking-tight">
                            Hello, I'm{" "}
                            <span className="text-primary-gold">Sushant Paudyal</span>
                        </h3>
                        <p className="text-[13px] tracking-[0.2em] uppercase text-gray-400 font-medium mb-6">
                            Full Stack Developer
                        </p>

                        {/* Highlights grid */}
                        <div className="grid grid-cols-2 gap-3 mb-8">
                            {highlights.map(({ label, value }) => (
                                <div
                                    key={label}
                                    className="border border-gray-100 dark:border-gray-700/60 bg-white dark:bg-white/[0.03] px-4 py-3"
                                >
                                    <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">
                                        {label}
                                    </p>
                                    <p className="text-[13px] font-semibold text-primary-black dark:text-white">
                                        {value}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Bio paragraphs */}
                        <div className="space-y-4 text-[14px] leading-relaxed text-gray-500 dark:text-gray-400">
                            <p>
                                I completed my Bachelor's degree in BSc (Hons) Computing from{" "}
                                <span className="text-primary-black dark:text-gray-200 font-medium">
                                    Islington College
                                </span>{" "}
                                with First Class Honours. During my academic journey, I built a strong
                                foundation in software engineering, web development, and problem-solving.
                            </p>
                            <p>
                                Alongside my studies, I completed additional training in{" "}
                                <span className="text-primary-black dark:text-gray-200 font-medium">
                                    Full Stack Development
                                </span>{" "}
                                and{" "}
                                <span className="text-primary-black dark:text-gray-200 font-medium">
                                    DevOps
                                </span>
                                , gaining hands-on experience with modern technologies and real-world
                                development workflows. I currently focus on building scalable web
                                applications using React, Node.js, and Tailwind CSS.
                            </p>
                        </div>

                        {/* Social links */}
                        <div className="flex items-center gap-3 mt-8">
                            <span className="text-[11px] tracking-widest uppercase text-gray-400 mr-1">
                                Find me
                            </span>
                            {socialLinks.map(({ icon: Icon, href, label }) => (
                                <motion.a
                                    key={label}
                                    href={href}
                                    whileHover={{ y: -3, scale: 1.1 }}
                                    transition={{ duration: 0.2 }}
                                    aria-label={label}
                                    className="w-9 h-9 flex items-center justify-center border border-gray-200 dark:border-gray-700 hover:border-primary-gold/60 text-gray-400 hover:text-primary-gold dark:hover:text-primary-gold bg-white dark:bg-white/[0.03] hover:bg-primary-gold/5 transition-all duration-200"
                                >
                                    <Icon size={14} />
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export default AboutSection;