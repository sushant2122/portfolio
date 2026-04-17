import { motion } from "framer-motion";
import { FaGithub, FaLink } from "react-icons/fa";
import { useEffect, useState } from "react";
import portfolioSvc from "../services/portfolio.service";

interface Project {
    portfolio_id: number;
    name: string;
    description: string;
    portfolio_img: string;
    git_URL: string;
    live_URL: string;
    createdAt?: string;
    updatedAt?: string;
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
    const hasLive = project.live_URL && project.live_URL !== "undefined";

    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
                },
            }}
            className="group relative flex flex-col bg-white dark:bg-white/[0.03] border border-gray-100 dark:border-gray-700/50 hover:border-primary-gold/40 dark:hover:border-primary-gold/40 overflow-hidden transition-all duration-400 hover:shadow-[0_8px_30px_rgba(211,175,55,0.08)]"
        >
            {/* Index badge */}
            <div className="absolute top-4 left-4 z-10 w-7 h-7 flex items-center justify-center bg-primary-gold text-primary-black text-[11px] font-bold">
                {String(index + 1).padStart(2, "0")}
            </div>

            {/* Image */}
            <div className="relative overflow-hidden h-48 bg-gray-100 dark:bg-gray-800">
                <img
                    src={project.portfolio_img}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 grayscale-[20%] group-hover:grayscale-0"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src =
                            "https://via.placeholder.com/400x300?text=No+Image";
                    }}
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-primary-black/0 group-hover:bg-primary-black/20 transition-all duration-400" />
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 p-5">
                <h5 className="text-[17px] font-bold tracking-tight text-primary-black dark:text-white mb-2 group-hover:text-primary-gold transition-colors duration-200">
                    {project.name}
                </h5>
                <p className="text-[13px] leading-relaxed text-gray-500 dark:text-gray-400 line-clamp-3 flex-1 mb-5">
                    {project.description || "No description available."}
                </p>

                {/* Divider */}
                <div className="h-[1px] bg-gray-100 dark:bg-gray-700/50 mb-4 group-hover:bg-primary-gold/20 transition-colors duration-300" />

                {/* Actions */}
                <div className="flex items-center gap-2">
                    {hasLive && (
                        <a
                            href={project.live_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 inline-flex items-center justify-center gap-2 bg-primary-gold hover:bg-[#c4a030] text-primary-black font-semibold text-[12px] tracking-wide px-4 py-2.5 transition-all duration-200"
                        >
                            <FaLink size={11} />
                            Live Preview
                        </a>
                    )}
                    <a
                        href={project.git_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub Repository"
                        className={`inline-flex items-center justify-center gap-2 border border-gray-200 dark:border-gray-700 hover:border-primary-gold/50 text-gray-500 dark:text-gray-400 hover:text-primary-gold dark:hover:text-primary-gold bg-transparent transition-all duration-200 px-4 py-2.5 ${!hasLive ? "flex-1 text-[12px] font-semibold tracking-wide" : ""
                            }`}
                    >
                        <FaGithub size={hasLive ? 16 : 14} />
                        {!hasLive && <span>View Code</span>}
                    </a>
                </div>
            </div>
        </motion.div>
    );
}

function ProjectSection() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const listPortfolio = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await portfolioSvc.listPortfolio();
            if (response.data?.result) setProjects(response.data.result);
            else setProjects([]);
        } catch (err: any) {
            setError(err.message || "Failed to load projects");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { listPortfolio(); }, []);

    const validProjects = projects.filter(
        (p) => p.name && p.git_URL && p.portfolio_img
    );

    return (
        <section
            id="project"
            className="relative overflow-hidden bg-gray-50 dark:bg-[#17202f] py-24 px-6"
        >
            {/* Background geometry */}
            <div
                className="pointer-events-none absolute top-0 right-0 w-72 h-72 opacity-[0.04]"
                style={{
                    backgroundImage: "radial-gradient(circle, #D3AF37 1px, transparent 1px)",
                    backgroundSize: "18px 18px",
                }}
            />
            <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-primary-gold/[0.04] rounded-full blur-3xl" />

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
                                Portfolio
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-primary-black dark:text-white">
                            My <span className="text-primary-gold">Projects</span>
                        </h2>
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
                            onClick={listPortfolio}
                            className="px-5 py-2.5 bg-primary-gold text-primary-black text-sm font-semibold hover:bg-[#c4a030] transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {/* Empty */}
                {!loading && !error && validProjects.length === 0 && (
                    <p className="text-center text-gray-400 py-24">No projects found.</p>
                )}

                {/* Grid */}
                {!loading && !error && validProjects.length > 0 && (
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={{
                            hidden: {},
                            visible: { transition: { staggerChildren: 0.1 } },
                        }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {validProjects.map((project, i) => (
                            <ProjectCard key={project.portfolio_id} project={project} index={i} />
                        ))}
                    </motion.div>
                )}
            </div>
        </section>
    );
}

export default ProjectSection;