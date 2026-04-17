import { motion } from "framer-motion";
import { useState } from "react";
import { FaEnvelope, FaPhone, FaLocationDot } from "react-icons/fa6";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { toast } from "react-toastify";

const contactInfo = [
    {
        icon: FaEnvelope,
        label: "Email",
        value: "sushantpaudyal@gmail.com",
        href: "mailto:sushantpaudyal@gmail.com",
    },
    {
        icon: FaPhone,
        label: "Phone",
        value: "+977 9861200112",
        href: "tel:+9779861200112",
    },
    {
        icon: FaLocationDot,
        label: "Location",
        value: "Kathmandu, Nepal",
        href: "#",
    },
];

const socialLinks = [
    { icon: FaGithub, href: "#", label: "GitHub" },
    { icon: FaLinkedin, href: "#", label: "LinkedIn" },
];

function ContactSection() {
    const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
    const [sending, setSending] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.message) {
            toast.error("Please fill in all required fields.");
            return;
        }
        setSending(true);
        // Replace with your actual send logic
        await new Promise((r) => setTimeout(r, 1200));
        setSending(false);
        toast.success("Message sent! I'll get back to you soon.");
        setForm({ name: "", email: "", subject: "", message: "" });
    };

    return (
        <section
            id="contact"
            className="relative overflow-hidden bg-white dark:bg-[#1D283C] py-24 px-6"
        >
            {/* Background elements */}
            <div
                className="pointer-events-none absolute bottom-0 right-0 w-72 h-72 opacity-[0.04]"
                style={{
                    backgroundImage: "radial-gradient(circle, #D3AF37 1px, transparent 1px)",
                    backgroundSize: "18px 18px",
                }}
            />
            <div className="pointer-events-none absolute -top-20 -left-20 w-72 h-72 bg-primary-gold/[0.04] rounded-full blur-3xl" />

            <div className="mx-auto max-w-screen-xl">
                {/* Header */}
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
                                Get In Touch
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-primary-black dark:text-white">
                            Contact <span className="text-primary-gold">Me</span>
                        </h2>
                    </div>
                    <div className="hidden md:block flex-1 h-[1px] bg-gradient-to-r from-primary-gold/30 to-transparent ml-4" />
                </motion.div>

                <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-start">
                    {/* Left panel */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        viewport={{ once: true }}
                        className="lg:col-span-2 flex flex-col gap-8"
                    >
                        <div>
                            <p className="text-[14px] leading-relaxed text-gray-500 dark:text-gray-400">
                                I'm currently open to new opportunities. Whether you have a project in mind,
                                a question, or just want to connect — my inbox is always open.
                            </p>
                        </div>

                        {/* Contact info cards */}
                        <div className="flex flex-col gap-3">
                            {contactInfo.map(({ icon: Icon, label, value, href }) => (
                                <a
                                    key={label}
                                    href={href}
                                    className="group flex items-center gap-4 border border-gray-100 dark:border-gray-700/50 hover:border-primary-gold/40 bg-gray-50 dark:bg-white/[0.025] hover:bg-primary-gold/[0.02] p-4 transition-all duration-200"
                                >
                                    <div className="w-10 h-10 flex items-center justify-center border border-gray-200 dark:border-gray-700/60 group-hover:border-primary-gold/50 group-hover:text-primary-gold text-gray-400 transition-all duration-200">
                                        <Icon size={14} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-0.5">
                                            {label}
                                        </p>
                                        <p className="text-[13px] font-semibold text-primary-black dark:text-white group-hover:text-primary-gold transition-colors duration-200">
                                            {value}
                                        </p>
                                    </div>
                                </a>
                            ))}
                        </div>

                        {/* Social links */}
                        <div>
                            <p className="text-[11px] uppercase tracking-widest text-gray-400 mb-3">
                                Connect
                            </p>
                            <div className="flex gap-3">
                                {socialLinks.map(({ icon: Icon, href, label }) => (
                                    <motion.a
                                        key={label}
                                        href={href}
                                        whileHover={{ y: -3 }}
                                        transition={{ duration: 0.2 }}
                                        aria-label={label}
                                        className="w-10 h-10 flex items-center justify-center border border-gray-200 dark:border-gray-700 hover:border-primary-gold/60 text-gray-400 hover:text-primary-gold transition-all duration-200 bg-gray-50 dark:bg-white/[0.025]"
                                    >
                                        <Icon size={15} />
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                        viewport={{ once: true }}
                        className="lg:col-span-3"
                    >
                        <div className="relative border border-gray-100 dark:border-gray-700/50 bg-gray-50 dark:bg-white/[0.02] p-8">
                            {/* Corner marks */}
                            {[
                                "top-0 left-0 border-t-2 border-l-2",
                                "top-0 right-0 border-t-2 border-r-2",
                                "bottom-0 left-0 border-b-2 border-l-2",
                                "bottom-0 right-0 border-b-2 border-r-2",
                            ].map((cls, i) => (
                                <div key={i} className={`absolute w-4 h-4 border-primary-gold/60 ${cls}`} />
                            ))}

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid sm:grid-cols-2 gap-5">
                                    {/* Name */}
                                    <div>
                                        <label className="block text-[11px] uppercase tracking-widest text-gray-400 mb-2">
                                            Name <span className="text-primary-gold">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={form.name}
                                            onChange={handleChange}
                                            placeholder="Your full name"
                                            className="w-full bg-white dark:bg-white/[0.04] border border-gray-200 dark:border-gray-700/60 focus:border-primary-gold focus:ring-0 outline-none px-4 py-3 text-[13px] text-primary-black dark:text-white placeholder:text-gray-400 transition-colors duration-200"
                                        />
                                    </div>
                                    {/* Email */}
                                    <div>
                                        <label className="block text-[11px] uppercase tracking-widest text-gray-400 mb-2">
                                            Email <span className="text-primary-gold">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            placeholder="your@email.com"
                                            className="w-full bg-white dark:bg-white/[0.04] border border-gray-200 dark:border-gray-700/60 focus:border-primary-gold focus:ring-0 outline-none px-4 py-3 text-[13px] text-primary-black dark:text-white placeholder:text-gray-400 transition-colors duration-200"
                                        />
                                    </div>
                                </div>

                                {/* Subject */}
                                <div>
                                    <label className="block text-[11px] uppercase tracking-widest text-gray-400 mb-2">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={form.subject}
                                        onChange={handleChange}
                                        placeholder="What's this about?"
                                        className="w-full bg-white dark:bg-white/[0.04] border border-gray-200 dark:border-gray-700/60 focus:border-primary-gold focus:ring-0 outline-none px-4 py-3 text-[13px] text-primary-black dark:text-white placeholder:text-gray-400 transition-colors duration-200"
                                    />
                                </div>

                                {/* Message */}
                                <div>
                                    <label className="block text-[11px] uppercase tracking-widest text-gray-400 mb-2">
                                        Message <span className="text-primary-gold">*</span>
                                    </label>
                                    <textarea
                                        name="message"
                                        value={form.message}
                                        onChange={handleChange}
                                        rows={5}
                                        placeholder="Tell me about your project or inquiry..."
                                        className="w-full resize-none bg-white dark:bg-white/[0.04] border border-gray-200 dark:border-gray-700/60 focus:border-primary-gold focus:ring-0 outline-none px-4 py-3 text-[13px] text-primary-black dark:text-white placeholder:text-gray-400 transition-colors duration-200"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={sending}
                                    className="w-full flex items-center justify-center gap-2.5 bg-primary-gold hover:bg-[#c4a030] disabled:opacity-60 text-primary-black font-semibold text-[13px] tracking-wide py-3.5 transition-all duration-200 shadow-[0_0_0_0_rgba(211,175,55,0.4)] hover:shadow-[0_0_20px_2px_rgba(211,175,55,0.2)]"
                                >
                                    {sending ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-primary-black/30 border-t-primary-black rounded-full animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <FaEnvelope size={13} />
                                            Send Message
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export default ContactSection;