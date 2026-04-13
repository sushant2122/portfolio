import { motion } from "framer-motion";
import { FaDownload } from "react-icons/fa";
import herophoto from "../assets/s1.png";
import resume from "../../public/resume.pdf";
function HeroSection() {
    return (
        <>
            <section id="home" className="bg-white dark:bg-gray-900 ">
                <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                    <motion.div

                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}

                        className="mr-auto place-self-center lg:col-span-7">
                        <h1 className="max-w-xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white"> Turning Ideas into Interactive Web Experiences</h1>
                        <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400 text-justify"> I build modern, responsive web applications using React and Tailwind CSS with a focus on clean UI and great user experience.</p>
                        <a href="/resume.pdf" download={resume} className=" font-semibold inline-flex gap-2 items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-primary-gray-700 rounded-lg bg-primary-gold hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                            Download My CV
                            <FaDownload size={15} />
                        </a>

                    </motion.div>
                    <motion.div

                        initial={{ opacity: 0, y: -100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }} className="hidden lg:mt-0 lg:col-span-5 lg:flex">
                        <img src={herophoto}
                            alt="mockup" />
                    </motion.div>
                </div>
            </section>
        </>
    )
}

export default HeroSection