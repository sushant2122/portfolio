import { motion } from "framer-motion"
import prjimg from "../assets/s2.png"
import { FaGithub, FaLink } from "react-icons/fa"

const projects = [
    { name: "AM Production", description: "Hello this is a project.", img_url: prjimg, live_url: "#", git_url: "#" },
    { name: "AM Production2", description: "Hello this is a project.", img_url: prjimg, live_url: "#", git_url: "#" },
    { name: "AM Production3", description: "Hello this is a project3.", img_url: prjimg, live_url: "#", git_url: "#" },
    { name: "AM Production", description: "Hello this is a project.", img_url: prjimg, live_url: "#", git_url: "#" },
    { name: "AM Production2", description: "Hello this is a project.", img_url: prjimg, live_url: "#", git_url: "#" },
    { name: "AM Production3", description: "Hello this is a project3.", img_url: prjimg, live_url: "#", git_url: "#" }
]
function ProjectSection() {
    return (
        <>
            <section id="project" className='py-10  max-w-screen-xl mx-auto '>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
                        My <span className="text-primary-gold"> Projects</span>
                    </h2>
                    <p className="text-gray-500 mt-3">
                        Projects I have worked on so far.
                    </p>
                </motion.div>


                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                    {projects.map((project) => (
                        <div className="bg-neutral-primary-soft block max-w-sm p-6 border border-default rounded-base shadow-xs rounded sm:w-full">
                            <a href="#">
                                <img className="rounded-base" src={project.img_url} alt="" />

                            </a>
                            <a href="#">
                                <h5 className="mt-6 mb-2 text-2xl font-semibold tracking-tight text-heading">{project.name}</h5>
                            </a>
                            <p className="mb-6 text-body">{project.description}</p>
                            <div className="flex justify-between">
                                <a href={project.live_url} className="inline-flex gap-2 items-center text-body bg-neutral-secondary-medium bg-primary-gold box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-base rounded text-sm px-4 py-2.5 focus:outline-none">
                                    Visit Live Server
                                    <FaLink />
                                </a>

                                <a href={project.git_url} className="inline-flex items-center text-body bg-neutral-secondary-medium hover:text-primary-gold hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">
                                    <FaGithub size={30} />

                                </a>

                            </div>

                        </div>

                    ))}





                </motion.div>
            </section>
        </>
    )
}

export default ProjectSection