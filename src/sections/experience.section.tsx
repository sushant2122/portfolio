import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import experienceSvc from "../services/experience.service";

interface Experience {
    experience_id: number;
    title: string;
    position: string;
    from: string;
    to: string;
}

function getStatus(experience: Experience): "ongoing" | "future" | "completed" {
    const toRaw = (experience.to || "").toLowerCase().trim();
    // Check for ongoing/present first
    if (["ongoing", "present", ""].includes(toRaw)) return "ongoing";
    // Check if the end date is in the future
    if (new Date(experience.to) > new Date()) return "future";
    return "completed";
}

function formatMonthYear(dateString: string): string {
    if (!dateString) return "Present";
    const lower = dateString.toLowerCase();
    if (lower === "ongoing" || lower === "present") return "Present";

    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;

    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function TimelineItem({ experience, index }: { experience: Experience; index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.25 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    const status = getStatus(experience);
    const isOngoing = status === "ongoing";
    const isFuture = status === "future";
    const isActive = isOngoing || isFuture;

    const fromFormatted = formatMonthYear(experience.from);
    const toFormatted = isOngoing ? "Present" : formatMonthYear(experience.to);

    // Dot styling based on status
    const dotColor = isFuture ? "#6DB8FF" : isOngoing ? "#D3AF37" : "#D3AF37";
    const dotGlow = isFuture ? "rgba(109,184,255,0.08)" : "rgba(211,175,55,0.08)";
    const dotSize = isActive ? "w-3.5 h-3.5" : "w-2.5 h-2.5";
    const pulseClass = isActive ? "animate-pulse" : "";

    // Badge styling based on status
    let badgeStyle = {};
    let badgeLabel = "";

    if (isOngoing) {
        badgeStyle = { color: "#D3AF37", border: "0.5px solid rgba(211,175,55,0.3)", background: "rgba(211,175,55,0.06)" };
        badgeLabel = "Currently here";
    } else if (isFuture) {
        badgeStyle = { color: "#6DB8FF", border: "0.5px solid rgba(109,184,255,0.3)", background: "rgba(109,184,255,0.06)" };
        badgeLabel = "Currently here";
    } else {
        badgeStyle = { color: "#D3AF37", border: "0.5px solid var(--color-border-tertiary)" };
        badgeLabel = "Completed";
    }

    return (
        <div
            ref={ref}
            className="flex gap-0 mb-9"
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(24px)",
                transition: `opacity 0.6s ease ${index * 90}ms, transform 0.6s ease ${index * 90}ms`,
            }}
        >
            {/* Date column with month and year */}
            <div className="w-28 min-w-[112px] pr-5 text-right pt-[18px]">
                <div className="text-[12px] font-semibold text-primary-gold leading-relaxed">
                    {fromFormatted}
                    <br />
                    {(isFuture) ? <></> : <> <span className="text-[11px] text-gray-400">→ {toFormatted}</span></>}
                </div>
            </div>

            {/* Dot column */}
            <div className="w-10 min-w-[40px] flex flex-col items-center">
                <div
                    className={`mt-5 z-10 shrink-0 rounded-full border-2 border-primary-gold bg-primary-gold ${dotSize} ${pulseClass}`}
                    style={{ boxShadow: `0 0 0 4px ${dotGlow}`, backgroundColor: dotColor, borderColor: dotColor }}
                />
            </div>

            {/* Card */}
            <div className="flex-1 border border-gray-100 dark:border-gray-700/50 bg-gray-50 dark:bg-white/[0.025] hover:border-primary-gold/30 dark:hover:border-primary-gold/30 hover:bg-primary-gold/[0.02] transition-all duration-300 p-4 relative overflow-hidden group">
                <div className="absolute left-0 top-0 h-full w-[2px] bg-primary-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <p className="text-[14px] font-semibold text-primary-black dark:text-white mb-1">{experience.title}</p>
                <p className="text-[11px] font-semibold tracking-widest uppercase text-primary-gold mb-3">{experience.position}</p>
                <span
                    className="inline-flex items-center gap-1.5 text-[10px] font-medium tracking-wider uppercase px-2 py-0.5"
                    style={badgeStyle}
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-current dark:text-white" />
                    {badgeLabel}
                </span>
            </div>
        </div>
    );
}

function ExperienceSection() {
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const listExperiences = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await experienceSvc.listExps();
            if (response.data?.result) setExperiences(response.data.result);
            else setExperiences([]);
        } catch (err: any) {
            setError(err.message || "Failed to load experiences");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { listExperiences(); }, []);

    // Sort: ongoing/future first (active), then by most recent from date
    const sorted = [...experiences].sort((a, b) => {
        const statusA = getStatus(a);
        const statusB = getStatus(b);
        const activeA = statusA === "ongoing" || statusA === "future";
        const activeB = statusB === "ongoing" || statusB === "future";

        if (activeA !== activeB) {
            return activeA ? -1 : 1;
        }
        return new Date(b.from).getTime() - new Date(a.from).getTime();
    });

    return (
        <section id="journey" className="relative overflow-hidden bg-white dark:bg-[#1D283C] py-24 px-6">
            {/* Background accents — same as SkillSection */}
            <div className="pointer-events-none absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary-gold/[0.03] rounded-full blur-3xl" />
            <div
                className="pointer-events-none absolute top-0 right-0 w-56 h-full opacity-[0.025]"
                style={{
                    backgroundImage: "linear-gradient(rgba(211,175,55,1) 1px, transparent 1px)",
                    backgroundSize: "100% 32px",
                }}
            />

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
                                Experience
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-primary-black dark:text-white">
                            My <span className="text-primary-gold">Journey</span>
                        </h2>
                        <p className="text-gray-400 text-sm mt-2">Years of dedication and practice.</p>
                    </div>
                    <div className="hidden md:block flex-1 h-[1px] bg-gradient-to-r from-primary-gold/30 to-transparent ml-4" />
                </motion.div>

                {/* Loading */}
                {loading && (
                    <div className="flex justify-center items-center py-24">
                        <div className="relative w-12 h-12">
                            <div className="absolute inset-0 border-2 border-primary-gold/20 rotate-45" />
                            <div className="absolute inset-1 border-t-2 border-primary-gold animate-spin" />
                        </div>
                    </div>
                )}

                {/* Error */}
                {error && (
                    <div className="text-center py-24">
                        <p className="text-red-400 text-sm mb-4">{error}</p>
                        <button
                            onClick={listExperiences}
                            className="px-5 py-2.5 bg-primary-gold text-primary-black text-sm font-semibold hover:bg-[#c4a030] transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {/* Empty */}
                {!loading && !error && sorted.length === 0 && (
                    <p className="text-center text-gray-400 py-24">No experiences found.</p>
                )}

                {/* Timeline */}
                {!loading && !error && sorted.length > 0 && (
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
                        className="relative"
                    >
                        {/* Vertical line - adjusted left position to match wider date column */}
                        <div
                            className="absolute top-0 bottom-0 w-[1px]"
                            style={{
                                left: "152px",
                                background: "linear-gradient(to bottom, #D3AF37, rgba(211,175,55,0.05))",
                            }}
                        />
                        {sorted.map((exp, i) => (
                            <TimelineItem key={exp.experience_id} experience={exp} index={i} />
                        ))}
                    </motion.div>
                )}
            </div>
        </section>
    );
}

export default ExperienceSection;