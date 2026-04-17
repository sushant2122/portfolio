import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import skillSvc from "../services/skill.service";

interface Skill {
    skill_id: number;
    name: string;
    level: number;
    skill_img: string;
    createdAt?: string;
    updatedAt?: string;
}

// Animated bar that triggers on viewport entry
function SkillBar({ level, color }: { level: number; color: string }) {
    const [width, setWidth] = useState(0);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setWidth(level); },
            { threshold: 0.5 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [level]);

    return (
        <div ref={ref} className="w-full h-[3px] bg-gray-100 dark:bg-gray-700/60">
            <div
                className="h-full transition-all duration-1000 ease-out"
                style={{ width: `${width}%`, backgroundColor: color }}
            />
        </div>
    );
}

function getLevelMeta(level: number): { label: string; color: string } {
    if (level >= 80) return { label: "Expert", color: "#D3AF37" };
    if (level >= 60) return { label: "Proficient", color: "#6bb8d4" };
    if (level >= 40) return { label: "Intermediate", color: "#8b9ec7" };
    return { label: "Learning", color: "#9ca3af" };
}

function SkillSection() {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const listSkills = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await skillSvc.listSkill();
            if (response.data?.result) setSkills(response.data.result);
            else setSkills([]);
        } catch (err: any) {
            setError(err.message || "Failed to load skills");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { listSkills(); }, []);

    const sortedSkills = [...skills].sort((a, b) => b.level - a.level);

    return (
        <section id="skill" className="relative overflow-hidden bg-white dark:bg-[#1D283C] py-24 px-6">
            {/* Background accent */}
            <div className="pointer-events-none absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary-gold/[0.03] rounded-full blur-3xl" />
            <div
                className="pointer-events-none absolute top-0 left-0 w-56 h-full opacity-[0.025]"
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
                                Expertise
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-primary-black dark:text-white">
                            My <span className="text-primary-gold">Skills</span>
                        </h2>
                    </div>
                    <div className="hidden md:block flex-1 h-[1px] bg-gradient-to-r from-primary-gold/30 to-transparent ml-4" />
                </motion.div>

                {/* States */}
                {loading && (
                    <div className="flex justify-center items-center py-24">
                        <div className="relative w-12 h-12">
                            <div className="absolute inset-0 border-2 border-primary-gold/20 rotate-45" />
                            <div className="absolute inset-1 border-t-2 border-primary-gold animate-spin" />
                        </div>
                    </div>
                )}

                {error && (
                    <div className="text-center py-24">
                        <p className="text-red-400 text-sm mb-4">{error}</p>
                        <button
                            onClick={listSkills}
                            className="px-5 py-2.5 bg-primary-gold text-primary-black text-sm font-semibold hover:bg-[#c4a030] transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {!loading && !error && sortedSkills.length === 0 && (
                    <p className="text-center text-gray-400 py-24">No skills found.</p>
                )}

                {!loading && !error && sortedSkills.length > 0 && (
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={{
                            hidden: {},
                            visible: { transition: { staggerChildren: 0.07 } },
                        }}
                        className="grid md:grid-cols-2 gap-6"
                    >
                        {sortedSkills.map((skill) => {
                            const { label, color } = getLevelMeta(skill.level);
                            return (
                                <motion.div
                                    key={skill.skill_id}
                                    variants={{
                                        hidden: { opacity: 0, y: 20 },
                                        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                                    }}
                                    className="group flex items-center gap-4 border border-gray-100 dark:border-gray-700/50 bg-gray-50 dark:bg-white/[0.025] hover:border-primary-gold/30 dark:hover:border-primary-gold/30 p-4 transition-all duration-300 hover:bg-primary-gold/[0.02]"
                                >
                                    {/* Icon box */}
                                    <div className="relative shrink-0 w-12 h-12 flex items-center justify-center bg-white dark:bg-white/5 border border-gray-100 dark:border-gray-700/50 group-hover:border-primary-gold/40 transition-colors duration-300">
                                        <img
                                            src={skill.skill_img}
                                            className="w-7 h-7 object-contain"
                                            alt={skill.name}
                                            onError={(e) => {
                                                const el = e.target as HTMLImageElement;
                                                el.style.display = "none";
                                                const p = el.parentElement;
                                                if (p) p.innerHTML = `<span class="text-lg font-bold text-primary-gold">${skill.name.charAt(0).toUpperCase()}</span>`;
                                            }}
                                        />
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-2.5">
                                            <span className="text-[13px] font-semibold text-primary-black dark:text-white capitalize tracking-wide">
                                                {skill.name}
                                            </span>
                                            <div className="flex items-center gap-2">
                                                <span
                                                    className="text-[10px] font-medium tracking-wider uppercase px-2 py-0.5"
                                                    style={{ color, border: `1px solid ${color}33`, background: `${color}0d` }}
                                                >
                                                    {label}
                                                </span>
                                                <span className="text-[12px] font-bold tabular-nums" style={{ color }}>
                                                    {skill.level}%
                                                </span>
                                            </div>
                                        </div>
                                        <SkillBar level={skill.level} color={color} />
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                )}
            </div>
        </section>
    );
}

export default SkillSection;