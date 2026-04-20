import { motion } from "framer-motion";
import { Link } from "react-router";
import { FaCode } from "react-icons/fa";

const LAST_UPDATED = "April 19, 2026";

const sections = [
    {
        id: "information-collected",
        title: "Information We Collect",
        content: [
            {
                subtitle: "Contact Form Data",
                text: "When you use the contact form on this portfolio, you voluntarily provide personal information including your full name, email address, an optional subject line, and your message. This is the only data actively collected on this site.",
            },
            {
                subtitle: "Automatically Collected Data",
                text: "Like most websites, basic technical information may be logged by the hosting provider — such as your IP address, browser type, operating system, and the pages you visit. This data is collected automatically by the server and is not personally identifiable in isolation.",
            },
        ],
    },
    {
        id: "how-we-use",
        title: "How We Use Your Information",
        content: [
            {
                subtitle: "Responding to Inquiries",
                text: "The primary purpose of collecting your name and email is to read and respond to your message. Your contact details will only be used to reply to your specific inquiry and will never be used for unsolicited communication.",
            },
            {
                subtitle: "No Marketing or Spam",
                text: "Your information will never be used to send promotional emails, newsletters, or any unsolicited messages. You will only receive a reply if you have sent a message first.",
            },
        ],
    },
    {
        id: "data-sharing",
        title: "Data Sharing & Third Parties",
        content: [
            {
                subtitle: "No Sale of Data",
                text: "Your personal information is never sold, rented, traded, or otherwise transferred to any third party for commercial purposes.",
            },
            {
                subtitle: "Service Providers",
                text: "This portfolio may be hosted on third-party infrastructure (such as Vercel, Netlify, or similar platforms). These providers may process server logs as part of normal hosting operations. They are bound by their own privacy policies and do not have access to the content of messages submitted through the contact form.",
            },
            {
                subtitle: "Legal Obligations",
                text: "Information may be disclosed if required by law, court order, or other governmental authority. In such cases, only the minimum necessary information will be provided.",
            },
        ],
    },
    {
        id: "data-retention",
        title: "Data Retention",
        content: [
            {
                subtitle: "Message Storage",
                text: "Contact form submissions are stored in a backend database to allow for review and response. Messages are retained only for as long as necessary to manage ongoing communication. You may request deletion of your submitted data at any time by reaching out directly.",
            },
        ],
    },
    {
        id: "your-rights",
        title: "Your Rights",
        content: [
            {
                subtitle: "Access & Correction",
                text: "You have the right to request access to any personal data held about you, and to request corrections if any information is inaccurate.",
            },
            {
                subtitle: "Deletion",
                text: "You may request that your personal data be deleted from records at any time. To do so, please contact using the email address listed on this portfolio.",
            },
            {
                subtitle: "Withdrawal of Consent",
                text: "Since data collection only occurs when you actively submit the contact form, you may simply choose not to submit the form. No personal data is collected through passive browsing of this site.",
            },
        ],
    },
    {
        id: "cookies",
        title: "Cookies & Tracking",
        content: [
            {
                subtitle: "No First-Party Cookies",
                text: "This portfolio does not use cookies, local storage tracking, or any client-side analytics scripts to track your behavior.",
            },
            {
                subtitle: "Third-Party Cookies",
                text: "The hosting platform may set basic technical cookies required for delivery of the website. These are not used for advertising or profiling purposes.",
            },
        ],
    },
    {
        id: "security",
        title: "Security",
        content: [
            {
                subtitle: "Measures in Place",
                text: "Reasonable technical measures are in place to protect your data, including HTTPS encryption for all data in transit and secure handling of the backend database. However, no method of transmission over the Internet or electronic storage is 100% secure, and absolute security cannot be guaranteed.",
            },
        ],
    },
    {
        id: "changes",
        title: "Changes to This Policy",
        content: [
            {
                subtitle: "Policy Updates",
                text: "This Privacy Policy may be updated from time to time to reflect changes in practices or for other operational, legal, or regulatory reasons. The 'Last Updated' date at the top of this page will always reflect the most recent revision. Continued use of this portfolio after any changes constitutes acceptance of the updated policy.",
            },
        ],
    },
    {
        id: "contact",
        title: "Contact",
        content: [
            {
                subtitle: "Questions or Requests",
                text: "If you have any questions about this Privacy Policy, or wish to exercise any of your rights regarding your personal data, please reach out via the contact form on this portfolio or directly at sushantpaudyal@gmail.com.",
            },
        ],
    },
];

function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-[#1D283C]">
            {/* Top accent */}
            <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-primary-gold to-transparent opacity-80" />

            {/* Back nav */}
            <div className="max-w-screen-xl mx-auto px-6 lg:px-16 pt-8">
                <Link
                    to="/"
                    className="inline-flex items-center gap-3 group w-fit"
                >
                    <div className="relative w-7 h-7 flex items-center justify-center shrink-0">
                        <div className="absolute inset-0 border border-primary-gold/40 rotate-45 group-hover:rotate-[135deg] transition-transform duration-500" />
                        <FaCode size={12} className="text-primary-gold relative z-10" />
                    </div>
                    <span className="text-[13px] font-semibold text-primary-black dark:text-white group-hover:text-primary-gold transition-colors duration-200">
                        Sushant Paudyal
                    </span>
                </Link>
            </div>

            {/* Hero header */}
            <div className="relative overflow-hidden">
                <div
                    className="pointer-events-none absolute top-0 right-0 w-72 h-72 opacity-[0.04]"
                    style={{
                        backgroundImage: "radial-gradient(circle, #D3AF37 1px, transparent 1px)",
                        backgroundSize: "18px 18px",
                    }}
                />
                <div className="max-w-screen-xl mx-auto px-6 lg:px-16 py-16 lg:py-20">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <span className="h-[1px] w-8 bg-primary-gold" />
                            <span className="text-[11px] tracking-[0.3em] uppercase font-semibold text-primary-gold">
                                Legal
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-primary-black dark:text-white mb-4">
                            Privacy <span className="text-primary-gold">Policy</span>
                        </h1>
                        <p className="text-[13px] text-gray-400 tracking-wide">
                            Last updated:{" "}
                            <span className="text-primary-gold font-medium">{LAST_UPDATED}</span>
                        </p>
                        <p className="mt-4 max-w-2xl text-[14px] leading-relaxed text-gray-500 dark:text-gray-400">
                            This Privacy Policy explains how personal information submitted through
                            this portfolio website is collected, used, and protected. This site is
                            a personal portfolio operated by Sushant Paudyal.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Divider */}
            <div className="max-w-screen-xl mx-auto px-6 lg:px-16">
                <div className="h-[1px] bg-gradient-to-r from-primary-gold/40 via-primary-gold/10 to-transparent" />
            </div>

            {/* Content */}
            <div className="max-w-screen-xl mx-auto px-6 lg:px-16 py-16">
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">

                    {/* Sticky sidebar TOC */}
                    <motion.aside
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="hidden lg:block lg:col-span-3"
                    >
                        <div className="sticky top-24">
                            <p className="text-[10px] uppercase tracking-[0.25em] text-primary-gold font-semibold mb-4">
                                Contents
                            </p>
                            <ul className="space-y-2">
                                {sections.map((s, i) => (
                                    <li key={s.id}>
                                        <a
                                            href={`#${s.id}`}
                                            className="flex items-center gap-2.5 text-[12px] text-gray-400 hover:text-primary-gold transition-colors duration-200 group py-0.5"
                                        >
                                            <span className="text-[10px] tabular-nums text-primary-gold/40 group-hover:text-primary-gold transition-colors duration-200">
                                                {String(i + 1).padStart(2, "0")}
                                            </span>
                                            {s.title}
                                        </a>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-10 border border-primary-gold/20 bg-primary-gold/[0.03] p-4">
                                <p className="text-[11px] text-gray-400 leading-relaxed">
                                    Questions about this policy?{" "}
                                    <a
                                        href="/#contact"
                                        className="text-primary-gold hover:underline"
                                    >
                                        Get in touch
                                    </a>
                                    .
                                </p>
                            </div>
                        </div>
                    </motion.aside>

                    {/* Main content */}
                    <motion.main
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.15 }}
                        className="lg:col-span-9 space-y-12"
                    >
                        {sections.map((section, si) => (
                            <section key={section.id} id={section.id} className="scroll-mt-24">
                                {/* Section heading */}
                                <div className="flex items-center gap-3 mb-6">
                                    <span className="text-[11px] tabular-nums font-bold text-primary-gold/60">
                                        {String(si + 1).padStart(2, "0")}
                                    </span>
                                    <h2 className="text-[18px] font-bold text-primary-black dark:text-white tracking-tight">
                                        {section.title}
                                    </h2>
                                    <div className="flex-1 h-[1px] bg-gray-100 dark:bg-gray-700/50" />
                                </div>

                                <div className="space-y-5 pl-7">
                                    {section.content.map(({ subtitle, text }) => (
                                        <div key={subtitle}>
                                            <h3 className="text-[13px] font-semibold text-primary-black dark:text-white mb-1.5 flex items-center gap-2">
                                                <span className="w-1 h-1 rounded-full bg-primary-gold shrink-0" />
                                                {subtitle}
                                            </h3>
                                            <p className="text-[13px] leading-relaxed text-gray-500 dark:text-gray-400 pl-3">
                                                {text}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        ))}

                        {/* Footer note */}
                        <div className="border-t border-gray-100 dark:border-gray-700/50 pt-10">
                            <div className="border border-primary-gold/20 bg-primary-gold/[0.03] p-5 relative">
                                {["top-0 left-0 border-t-2 border-l-2", "bottom-0 right-0 border-b-2 border-r-2"].map((cls, i) => (
                                    <div key={i} className={`absolute w-3 h-3 border-primary-gold/50 ${cls}`} />
                                ))}
                                <p className="text-[12px] leading-relaxed text-gray-400">
                                    This policy applies solely to information collected through this portfolio website.
                                    It does not apply to any third-party websites that may be linked from this site.
                                    By using this website, you acknowledge that you have read and understood this Privacy Policy.
                                </p>
                            </div>
                        </div>
                    </motion.main>
                </div>
            </div>

            {/* Bottom accent */}
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-primary-gold/30 to-transparent" />
        </div>
    );
}

export default PrivacyPolicyPage;