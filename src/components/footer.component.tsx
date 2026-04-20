import { motion } from "framer-motion";
import {
    FaCode,
    FaEnvelope,
    FaFacebook,
    FaGithub,
    FaLinkedin,
    FaPhone,
} from "react-icons/fa";
import { IoIosPaper } from "react-icons/io";
import { RiFilePaperFill } from "react-icons/ri";
import { Link } from "react-router";
const socialLinks = [
    { icon: FaGithub, href: "https://github.com/sushant2122", label: "GitHub" },
    { icon: FaLinkedin, href: "https://www.linkedin.com/in/sushant-paudyal-a25aa5268/", label: "LinkedIn" },
    { icon: FaFacebook, href: "https://www.facebook.com/share/18ZTyoRyoL/?mibextid=wwXIfr", label: "Facebook" }
];

const legalLinks = [
    { icon: RiFilePaperFill, label: "Privacy Policy", to: 'privacy-policy' },
    { icon: IoIosPaper, label: "Terms & Conditions", to: 'term' },
];

function FooterComponent() {
    return (
        <footer className="relative overflow-hidden bg-[#141d2b] dark:bg-[#0f1520]">
            {/* Decorative top border */}
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-primary-gold/60 to-transparent" />

            {/* Background grid pattern */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(rgba(211,175,55,1) 1px, transparent 1px), linear-gradient(90deg, rgba(211,175,55,1) 1px, transparent 1px)`,
                    backgroundSize: "60px 60px",
                }}
            />

            {/* Radial gold glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-primary-gold/5 rounded-full blur-3xl pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                className="relative mx-auto w-full max-w-screen-xl px-6 lg:px-10 pt-14 pb-8"
            >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    {/* Brand Column */}
                    <div className="md:col-span-1">
                        <a href="#" className="flex gap-3 items-center mb-6 group w-fit">
                            <div className="relative w-8 h-8 flex items-center justify-center shrink-0">
                                <div className="absolute inset-0 border border-primary-gold/40 rotate-45 group-hover:rotate-[135deg] transition-transform duration-500" />
                                <FaCode size={14} className="text-primary-gold relative z-10" />
                            </div>
                            <div className="flex flex-col leading-none">
                                <span className="text-[10px] tracking-[0.25em] uppercase text-primary-gold font-medium">
                                    Portfolio
                                </span>
                                <span className="text-[15px] font-bold tracking-tight text-white">
                                    Sushant Paudyal
                                </span>
                            </div>
                        </a>

                        <p className="text-[13px] leading-relaxed text-gray-400 max-w-xs mb-8 border-l-2 border-primary-gold/40 pl-4 italic">
                            "Turning ideas into reality through clean code and creative design."
                        </p>

                        {/* Social Icons */}
                        <div className="flex gap-3">
                            {socialLinks.map(({ icon: Icon, href, label }) => (
                                <motion.a
                                    key={label}
                                    href={href}
                                    whileHover={{ y: -3, scale: 1.1 }}
                                    transition={{ duration: 0.2 }}
                                    aria-label={label}
                                    className="w-9 h-9 flex items-center justify-center border border-gray-700 hover:border-primary-gold/60 text-gray-500 hover:text-primary-gold bg-white/[0.03] hover:bg-primary-gold/10 transition-all duration-200"
                                >
                                    <Icon size={15} />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Contact Column */}
                    <div>
                        <h3 className="mb-6 text-[11px] font-semibold tracking-[0.2em] uppercase text-primary-gold">
                            Contact
                        </h3>
                        <ul className="space-y-4">
                            <li>
                                <a
                                    href="mailto:sushantpaudyal@gmail.com"
                                    className="flex items-center gap-3 text-[13px] text-gray-400 hover:text-white transition-colors duration-200 group"
                                >
                                    <span className="w-7 h-7 flex items-center justify-center border border-gray-700 group-hover:border-primary-gold/50 group-hover:text-primary-gold transition-all duration-200 shrink-0">
                                        <FaEnvelope size={11} />
                                    </span>
                                    sushantpaudyal@gmail.com
                                </a>
                            </li>
                            <li>
                                <a
                                    href="tel:+9779861200112"
                                    className="flex items-center gap-3 text-[13px] text-gray-400 hover:text-white transition-colors duration-200 group"
                                >
                                    <span className="w-7 h-7 flex items-center justify-center border border-gray-700 group-hover:border-primary-gold/50 group-hover:text-primary-gold transition-all duration-200 shrink-0">
                                        <FaPhone size={11} />
                                    </span>
                                    +977 9861200112
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Legal Column */}
                    <div>
                        <h3 className="mb-6 text-[11px] font-semibold tracking-[0.2em] uppercase text-primary-gold">
                            Legal
                        </h3>
                        <ul className="space-y-4">
                            {legalLinks.map(({ icon: Icon, label, to }) => (
                                <li key={label}>
                                    <Link
                                        to={to}
                                        className="flex items-center gap-3 text-[13px] text-gray-400 hover:text-white transition-colors duration-200 group"
                                    >
                                        <span className="w-7 h-7 flex items-center justify-center border border-gray-700 group-hover:border-primary-gold/50 group-hover:text-primary-gold transition-all duration-200 shrink-0">
                                            <Icon size={11} />
                                        </span>
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <span className="text-[12px] text-gray-500">
                        © 2026{" "}
                        <a href="#" className="text-gray-400 hover:text-primary-gold transition-colors duration-200">
                            Sushant Paudyal
                        </a>
                        . All Rights Reserved.
                    </span>
                    <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-[11px] text-gray-500 tracking-wide">
                            Available for freelance
                        </span>
                    </div>
                </div>
            </motion.div>
        </footer>
    );
}

export default FooterComponent;