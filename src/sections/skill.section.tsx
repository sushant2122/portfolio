import { motion } from "framer-motion";

import github from "../assets/github.svg"
const skills = [
    { name: "Git", icon: github, level: 80 },
];

function SkillSection() {
    return (
        <section id="skill" className="bg-white dark:bg-gray-900 py-16">
            <div className="max-w-screen-xl mx-auto px-8 py-8 rounded">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
                        My <span className="text-primary-gold"> Skills </span>
                    </h2>
                    <p className="text-gray-500 mt-3">
                        Technologies I use to build modern web applications
                    </p>
                </motion.div>

                {/* Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="grid md:grid-cols-2 gap-10">

                    {skills.map((skill) => (
                        <div className="flex items-center gap-4" >
                            <div className="text-primary-gold  bg-primary-gold rounded ">
                                <img src={skill.icon} className="w-10 h-auto border " />
                            </div>


                            <div className="w-full">
                                <div className="flex justify-between mb-1">
                                    <span className="text-sm font-medium text-gray-700 dark:text-white ">
                                        {skill.name}
                                    </span>
                                    <span className="text-sm text-gray-500 dark:text-white">
                                        {skill.level}%
                                    </span>
                                </div>

                                <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                                    <div
                                        className="bg-primary-gold h-2 rounded-full "
                                        style={{ width: `${skill.level}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    ))}


                </motion.div>
            </div>
        </section>
    );
}

export default SkillSection;