import { motion } from "framer-motion"

const experiences = [
    { name: "Islington college", from: "2022", to: "2025", position: "Student", color: "step-primary" },
    { name: "Sangalo tech", from: "2025", to: "2025", position: "Frontend Intern", color: "step-accent" },
    { name: "Islington college", from: "2026", to: "on going", position: "Full Stack Intern", color: "step-warning" },

]
function ExperienceSection() {
    return (
        <>
            <section id="experience" className="bg-white dark:bg-gray-900 py-16">
                <div className="max-w-screen-xl mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
                            My <span className="text-primary-gold"> Journey </span>
                        </h2>
                        <p className="text-gray-500 mt-3">
                            Years of dedication and practise.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="text-primary-black flex justify-center font-bold">
                        <ul className="steps steps-vertical">
                            {experiences.map((experience) => (
                                <li className={`step ${experience.color}`} >
                                    <div className="flex gap-2">
                                        <span className="text-primary-black">{experience.name}</span>
                                        <span className="text-secondary-gray">({experience.from}-{experience.to})</span>
                                        <span className="text-primary-gold">{experience.position}</span>

                                    </div>  </li>


                            ))}





                        </ul>
                    </motion.div>

                </div>
            </section >

        </>
    )
}

export default ExperienceSection