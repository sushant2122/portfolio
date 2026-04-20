import { motion } from "framer-motion";
import { Link } from "react-router";
import { FaCode } from "react-icons/fa";

const LAST_UPDATED = "April 19, 2026";

const sections = [
    {
        id: "acceptance",
        title: "Acceptance of Terms",
        content: [
            {
                subtitle: "Agreement to Terms",
                text: "By accessing or using this portfolio website (sushantpaudyal.com or any hosted equivalent), you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use this website.",
            },
            {
                subtitle: "Personal Portfolio",
                text: "This website is a personal portfolio operated by Sushant Paudyal, a Full Stack Developer. It is intended to showcase professional work, skills, and experience, and to facilitate professional contact.",
            },
        ],
    },
    {
        id: "intellectual-property",
        title: "Intellectual Property",
        content: [
            {
                subtitle: "Ownership of Content",
                text: "All content on this website — including but not limited to text, code, design, graphics, layouts, and project descriptions — is the intellectual property of Sushant Paudyal unless otherwise attributed. All rights are reserved.",
            },
            {
                subtitle: "Permitted Use",
                text: "You may view and browse this website for personal, non-commercial purposes. You may share links to this portfolio. You may not reproduce, copy, modify, distribute, or create derivative works from any content on this site without prior written permission.",
            },
            {
                subtitle: "Project Work",
                text: "Projects displayed in the portfolio may have been built for clients or employers. In such cases, intellectual property rights over those projects belong to the respective clients or employers. Display here is for portfolio demonstration purposes only.",
            },
        ],
    },
    {
        id: "contact-form",
        title: "Use of the Contact Form",
        content: [
            {
                subtitle: "Acceptable Use",
                text: "The contact form is provided for professional inquiries, project collaboration requests, and general questions. You agree to use it only for lawful purposes and in a manner that is respectful and professional.",
            },
            {
                subtitle: "Prohibited Use",
                text: "You may not use the contact form to submit spam, unsolicited commercial messages, harassment, threatening content, illegal content, or any automated or bot-generated submissions. Such submissions will be disregarded and may be reported.",
            },
            {
                subtitle: "No Guarantee of Response",
                text: "While every effort is made to respond to genuine inquiries in a timely manner, a response to every message cannot be guaranteed. Submission of the contact form does not create any contractual obligation.",
            },
        ],
    },
    {
        id: "disclaimer",
        title: "Disclaimer of Warranties",
        content: [
            {
                subtitle: "As-Is Basis",
                text: "This website and its content are provided on an 'as is' and 'as available' basis without any warranties of any kind, either express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, or non-infringement.",
            },
            {
                subtitle: "Accuracy of Information",
                text: "While reasonable efforts are made to ensure that information on this portfolio is accurate and up to date, no warranty is made regarding the completeness, reliability, or accuracy of any information presented. Technology, frameworks, and skill sets evolve — content may not always reflect the most current state.",
            },
        ],
    },
    {
        id: "limitation-of-liability",
        title: "Limitation of Liability",
        content: [
            {
                subtitle: "No Liability for Damages",
                text: "To the fullest extent permitted by applicable law, Sushant Paudyal shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of, or inability to use, this website or its content.",
            },
            {
                subtitle: "External Links",
                text: "This portfolio may contain links to external websites, GitHub repositories, or live project demos. These links are provided for convenience only. No responsibility is assumed for the content, privacy practices, or availability of any third-party websites. The inclusion of a link does not imply endorsement.",
            },
        ],
    },
    {
        id: "projects-demos",
        title: "Projects & Live Demos",
        content: [
            {
                subtitle: "Demonstration Purposes",
                text: "Live project demos linked from this portfolio are provided for demonstration purposes only. They may not always be available, may be running on free-tier infrastructure, or may be subject to downtime. No service level agreement is implied.",
            },
            {
                subtitle: "Open Source Code",
                text: "Where project source code is publicly available via GitHub, it is subject to the license specified within that repository. In the absence of a specified license, all rights are reserved by the respective owner.",
            },
        ],
    },
    {
        id: "privacy",
        title: "Privacy",
        content: [
            {
                subtitle: "Privacy Policy",
                text: "Your use of this website is also governed by the Privacy Policy, which is incorporated into these Terms and Conditions by reference. The Privacy Policy explains how information collected through the contact form is handled.",
            },
        ],
    },
    {
        id: "modifications",
        title: "Modifications to Terms",
        content: [
            {
                subtitle: "Right to Update",
                text: "These Terms and Conditions may be updated at any time without prior notice. The 'Last Updated' date at the top of this page will reflect the most recent revision. Continued use of this portfolio after any changes are posted constitutes your acceptance of the revised terms.",
            },
        ],
    },
    {
        id: "governing-law",
        title: "Governing Law",
        content: [
            {
                subtitle: "Jurisdiction",
                text: "These Terms and Conditions are governed by and construed in accordance with the laws of Nepal. Any disputes arising in connection with this website shall be subject to the exclusive jurisdiction of the courts of Nepal.",
            },
        ],
    },
    {
        id: "contact",
        title: "Contact",
        content: [
            {
                subtitle: "Questions About These Terms",
                text: "If you have any questions or concerns about these Terms and Conditions, please contact via the contact form on this portfolio or directly at sushantpaudyal@gmail.com.",
            },
        ],
    },
];

function TermsPage() {
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
                            Terms &amp; <span className="text-primary-gold">Conditions</span>
                        </h1>
                        <p className="text-[13px] text-gray-400 tracking-wide">
                            Last updated:{" "}
                            <span className="text-primary-gold font-medium">{LAST_UPDATED}</span>
                        </p>
                        <p className="mt-4 max-w-2xl text-[14px] leading-relaxed text-gray-500 dark:text-gray-400">
                            Please read these Terms and Conditions carefully before using this portfolio
                            website. By accessing or using any part of this site, you agree to be bound
                            by the following terms.
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
                                    Also read our{" "}
                                    <Link
                                        to="/privacy-policy"
                                        className="text-primary-gold hover:underline"
                                    >
                                        Privacy Policy
                                    </Link>
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
                                    By continuing to use this portfolio website you acknowledge that you have read,
                                    understood, and agree to be bound by these Terms and Conditions, as well as the{" "}
                                    <Link to="/privacy-policy" className="text-primary-gold hover:underline">
                                        Privacy Policy
                                    </Link>
                                    .
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

export default TermsPage;