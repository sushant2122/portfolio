import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import certSvc from "../services/cert.service";

interface Certification {
    cert_id: number;
    title: string;
    issuer: string;
    issue_date: string;
    expiry_date?: string | null;
    credential_id?: string | null;
    verification_link?: string | null;
    cert_img: string;
    skills?: string;
    description?: string;
    createdAt?: string;
    updatedAt?: string;
}

function formatDate(dateStr: string): string {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function CertCard({ cert, index }: { cert: Certification; index: number }) {
    const [flipped, setFlipped] = useState(false);
    const [imgError, setImgError] = useState(false);

    const skills = cert.skills?.split(",").map((s) => s.trim()).filter(Boolean) ?? [];
    const isExpired = cert.expiry_date ? new Date(cert.expiry_date) < new Date() : false;

    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 32 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 },
                },
            }}
            className="group relative"
            style={{ perspective: "1200px" }}
        >
            {/* Glow accent on hover */}
            <div className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary-gold/10 via-transparent to-transparent rounded-sm" />

            {/* Card flip container */}
            <div
                className="relative w-full cursor-pointer"
                style={{
                    transformStyle: "preserve-3d",
                    transition: "transform 0.65s cubic-bezier(0.22, 1, 0.36, 1)",
                    transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
                    minHeight: "340px",
                }}
                onClick={() => setFlipped((f) => !f)}
            >
                {/* ── FRONT ── */}
                <div
                    className="absolute inset-0 border border-gray-100 dark:border-gray-700/50 bg-gray-50 dark:bg-white/[0.025] hover:border-primary-gold/30 transition-all duration-300 overflow-hidden flex flex-col"
                    style={{ backfaceVisibility: "hidden" }}
                >
                    {/* Certificate image */}
                    <div className="relative w-full h-44 overflow-hidden bg-gray-100 dark:bg-white/5 shrink-0">
                        {!imgError ? (
                            <img
                                src={cert.cert_img}
                                alt={cert.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                onError={() => setImgError(true)}
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <span className="text-4xl font-black text-primary-gold/30">
                                    {cert.title.charAt(0).toUpperCase()}
                                </span>
                            </div>
                        )}

                        {/* Overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-transparent to-transparent" />

                        {/* Issuer badge */}
                        <div className="absolute bottom-3 left-3 flex items-center gap-2">
                            <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-white/90 bg-black/40 backdrop-blur-sm px-2 py-1">
                                {cert.issuer}
                            </span>
                        </div>

                        {/* Status badge */}
                        {cert.expiry_date && (
                            <div className="absolute top-3 right-3">
                                <span
                                    className={`text-[9px] tracking-[0.18em] uppercase font-bold px-2 py-1 ${isExpired
                                        ? "bg-red-500/20 text-red-400 border border-red-500/30"
                                        : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                                        }`}
                                >
                                    {isExpired ? "Expired" : "Valid"}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Info */}
                    <div className="flex flex-col flex-1 p-4 gap-3">
                        <div>
                            <h3 className="text-[15px] font-bold text-primary-black dark:text-white tracking-tight leading-snug mb-1">
                                {cert.title}
                            </h3>
                            <div className="flex items-center gap-1.5">
                                <span className="w-3 h-[1px] bg-primary-gold" />
                                <span className="text-[11px] text-primary-gold font-medium tracking-wide">{cert.issuer}</span>
                            </div>
                        </div>

                        {/* Skills */}
                        {skills.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mt-auto">
                                {skills.map((s) => (
                                    <span
                                        key={s}
                                        className="text-[10px] font-medium tracking-wide px-2 py-0.5 text-primary-gold/80 border border-primary-gold/20 bg-primary-gold/5"
                                    >
                                        {s}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-700/50">
                            <div className="flex items-center gap-1.5">
                                {/* Calendar icon */}
                                <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
                                </svg>
                                <span className="text-[11px] text-gray-400">{formatDate(cert.issue_date)}</span>
                                {cert.expiry_date && (
                                    <span className="text-[11px] text-gray-400">
                                        → {formatDate(cert.expiry_date)}
                                    </span>
                                )}
                            </div>

                            <span className="text-[10px] text-primary-gold/60 tracking-wider flex items-center gap-1">
                                Details
                                <svg className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path d="M9 18l6-6-6-6" />
                                </svg>
                            </span>
                        </div>
                    </div>
                </div>

                {/* ── BACK ── */}
                <div
                    className="absolute inset-0 border border-primary-gold/30 bg-white dark:bg-[#1a2235] flex flex-col p-5 gap-4"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                    {/* Back header */}
                    <div className="flex items-start justify-between gap-3">
                        <div>
                            <h3 className="text-[15px] font-bold text-primary-black dark:text-white tracking-tight">
                                {cert.title}
                            </h3>
                            <span className="text-[11px] text-primary-gold font-medium tracking-wide">{cert.issuer}</span>
                        </div>
                        <div className="w-8 h-8 border border-primary-gold/40 flex items-center justify-center shrink-0">
                            <svg className="w-4 h-4 text-primary-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                            </svg>
                        </div>
                    </div>

                    {/* Description */}
                    {cert.description && (
                        <p className="text-[12px] leading-relaxed text-gray-500 dark:text-gray-400 flex-1">
                            {cert.description}
                        </p>
                    )}

                    {/* Details grid */}
                    <div className="grid grid-cols-2 gap-2">
                        <div className="bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-gray-700/40 p-2.5">
                            <span className="text-[9px] tracking-[0.2em] uppercase text-gray-400 block mb-1">Issued</span>
                            <span className="text-[12px] font-semibold text-primary-black dark:text-white">{formatDate(cert.issue_date)}</span>
                        </div>
                        <div className="bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-gray-700/40 p-2.5">
                            <span className="text-[9px] tracking-[0.2em] uppercase text-gray-400 block mb-1">Expires</span>
                            <span className="text-[12px] font-semibold text-primary-black dark:text-white">
                                {cert.expiry_date ? formatDate(cert.expiry_date) : "No Expiry"}
                            </span>
                        </div>
                        {cert.credential_id && (
                            <div className="col-span-2 bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-gray-700/40 p-2.5">
                                <span className="text-[9px] tracking-[0.2em] uppercase text-gray-400 block mb-1">Credential ID</span>
                                <span className="text-[11px] font-mono text-primary-black dark:text-white truncate block">{cert.credential_id}</span>
                            </div>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 pt-1">
                        {cert.verification_link ? (
                            <a
                                href={cert.verification_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="flex-1 text-center text-[11px] font-semibold tracking-wider uppercase py-2 bg-primary-gold text-primary-black hover:bg-[#c4a030] transition-colors duration-200"
                            >
                                Verify Certificate
                            </a>
                        ) : (
                            <span className="flex-1 text-center text-[11px] text-gray-400 py-2 border border-gray-200 dark:border-gray-700/50">
                                No verification link
                            </span>
                        )}
                        <button
                            onClick={(e) => { e.stopPropagation(); setFlipped(false); }}
                            className="px-3 py-2 border border-gray-200 dark:border-gray-700/50 hover:border-primary-gold/40 text-gray-400 hover:text-primary-gold transition-colors duration-200"
                        >
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function CertificationSection() {
    const [certs, setCerts] = useState<Certification[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadCerts = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await certSvc.listCert();
            console.log("cert", response);
            if (response.data?.result) setCerts(response.data.result);
            else setCerts([]);
        } catch (err: any) {
            setError(err.message || "Failed to load certifications");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { loadCerts(); }, []);

    return (
        <section id="certification" className="relative overflow-hidden bg-gray-50 dark:bg-[#17202f] py-24 px-6">
            {/* Background accents — mirrors SkillSection */}
            <div className="pointer-events-none absolute top-0 right-0 w-[500px] h-[500px] bg-primary-gold/[0.03] rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
            <div className="pointer-events-none absolute bottom-0 left-0 w-[300px] h-[300px] bg-primary-gold/[0.025] rounded-full blur-3xl" />

            {/* Vertical line texture — right side */}
            <div
                className="pointer-events-none absolute top-0 right-0 w-56 h-full opacity-[0.025]"
                style={{
                    backgroundImage: "linear-gradient(rgba(211,175,55,1) 1px, transparent 1px)",
                    backgroundSize: "100% 32px",
                }}
            />

            <div className="mx-auto max-w-screen-xl">
                {/* ── Section Header ── */}
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
                                Credentials
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-primary-black dark:text-white">
                            My <span className="text-primary-gold">Certifications</span>
                        </h2>
                    </div>
                    <div className="hidden md:block flex-1 h-[1px] bg-gradient-to-r from-primary-gold/30 to-transparent ml-4" />
                </motion.div>

                {/* ── Hint ── */}
                {!loading && !error && certs.length > 0 && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-[11px] tracking-widest uppercase text-gray-400 mb-8 flex items-center gap-2"
                    >
                        <svg className="w-3.5 h-3.5 text-primary-gold/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" />
                        </svg>
                        Click any card to see details
                    </motion.p>
                )}

                {/* ── Loading ── */}
                {loading && (
                    <div className="flex justify-center items-center py-24">
                        <div className="relative w-12 h-12">
                            <div className="absolute inset-0 border-2 border-primary-gold/20 rotate-45" />
                            <div className="absolute inset-1 border-t-2 border-primary-gold animate-spin" />
                        </div>
                    </div>
                )}

                {/* ── Error ── */}
                {error && (
                    <div className="text-center py-24">
                        <p className="text-red-400 text-sm mb-4">{error}</p>
                        <button
                            onClick={loadCerts}
                            className="px-5 py-2.5 bg-primary-gold text-primary-black text-sm font-semibold hover:bg-[#c4a030] transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {/* ── Empty ── */}
                {!loading && !error && certs.length === 0 && (
                    <p className="text-center text-gray-400 py-24">No certifications found.</p>
                )}

                {/* ── Grid ── */}
                {!loading && !error && certs.length > 0 && (
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={{ hidden: {}, visible: {} }}
                        className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    >
                        {certs.map((cert, i) => (
                            <CertCard key={cert.cert_id} cert={cert} index={i} />
                        ))}
                    </motion.div>
                )}

                {/* ── Count strip ── */}
                {!loading && !error && certs.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        viewport={{ once: true }}
                        className="mt-14 flex items-center gap-4"
                    >
                        <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-primary-gold/20" />
                        <span className="text-[11px] tracking-[0.25em] uppercase text-gray-400">
                            {certs.length} Certificate{certs.length !== 1 ? "s" : ""} Earned
                        </span>
                        <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-primary-gold/20" />
                    </motion.div>
                )}
            </div>
        </section>
    );
}

export default CertificationSection;