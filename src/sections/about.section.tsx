import { motion } from "framer-motion";
import abtimg from "../assets/s2.png";
import { FaDiscord, FaGithub, FaFacebook, FaLinkedin } from "react-icons/fa";

function AboutSection() {
    return (
        <>
            <section id="about" className="bg-white px-4 py-8 antialiased dark:bg-gray-900 md:py-16">
                <motion.div
                    initial={{ opacity: 0, y: -100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}

                    className="mx-auto grid max-w-screen-xl rounded-lg  p-4 dark:bg-gray-800 md:p-8 lg:grid-cols-12 lg:gap-8 lg:p-16 xl:gap-16">
                    <div className="lg:col-span-5 lg:mt-0 flex justify-center">
                        <a href="#">
                            <img className="mb-4 h-56 w-56 dark:hidden sm:h-96 sm:w-96 md:h-120 md:w-full" src={abtimg} alt="about image." />

                        </a>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}

                        className="me-auto lg:col-span-7">
                        <h1 className="mb-3 text-2xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-4xl">
                            Hello, I'm <span className="text-primary-gold">Sushant paudyal</span>
                        </h1>
                        <h2 className="mb-3 text-xl font-light leading-tight tracking-tight text-gray-900 dark:text-white md:text-4xl">
                            <span className="text-primary-gold">Full Stack Developer</span>
                        </h2>
                        <p className=" text-gray-500 dark:text-gray-400">
                            I completed my Bachelor’s degree in BSc (Hons) Computing from Islington College with First Class Honours. During my academic journey, I developed a strong foundation in software engineering, web development, and problem-solving. Alongside my studies, I also completed additional training in Full Stack Development and DevOps, which helped me gain hands-on experience with modern technologies and real-world development workflows.

                        </p>
                        <p className=" pt-2 jumb-6 text-gray-500 dark:text-gray-400">
                            Currently, I am working as a Full Stack Developer, focusing on building modern, responsive, and scalable web applications using technologies like React, Node.js, and Tailwind CSS.
                        </p>
                        <a href="#" className="inline-flex items-center justify-center rounded-lg bg-primary-700 px-5 py-3 text-center text-base font-medium text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"> Pre-order now </a>

                        <div className="flex gap-4 mt-4 sm:justify-center sm:mt-0">
                            <a href="#" className="text-body hover:text-primary-gold">
                                <FaFacebook size={25} />
                                <span className="sr-only">Facebook page</span>
                            </a>
                            <a href="#" className="text-body hover:text-primary-gold ms-5">
                                <FaDiscord size={25} />
                                <span className="sr-only">Discord community</span>
                            </a>
                            <a href="#" className="text-body hover:text-primary-gold ms-5">

                                <FaLinkedin size={25} />
                                <span className="sr-only">LinkedIn page</span>
                            </a>
                            <a href="#" className="text-body hover:text-primary-gold ms-5">
                                <FaGithub size={25} />
                                <span className="sr-only">GitHub account</span>
                            </a>
                        </div>
                    </motion.div>

                </motion.div>
            </section>
        </>
    )
}

export default AboutSection