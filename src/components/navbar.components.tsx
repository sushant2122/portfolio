import { DarkThemeToggle } from "flowbite-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { FaCode } from "react-icons/fa";
import { FaHandshake } from "react-icons/fa6";
import { Link } from "react-router";


function NavbarComponent() {
    const [ismenuopen, setismenuopen] = useState(false);

    return (
        <>
            <header className="sticky top-0 z-50 bg-white dark:bg-primary-black">
                <nav className=" border-gray-200  px-4 lg:px-6 py-2.5 dark:bg-gray-800">
                    <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                        className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                        <Link to="/" className="flex gap-2 items-center dark:text-white">
                            <FaCode size={25} />
                            <span className=" self-center text-xl text-primary-black font-semibold whitespace-nowrap dark:text-primary-gold">Sushant Paudyal</span>
                        </Link>
                        <div className="flex items-center lg:order-2 gap-1">

                            <Link to="contact" className=" flex items-center gap-2 text-black bg-primary-gold hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-3 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                                <FaHandshake />
                                <span className="hidden sm:block ">Hire me</span></Link>


                            <div className="flex items-center rounded ">
                                <DarkThemeToggle className="   hover:bg-primary-black text-primary-black border hover:text-white dark:text-white dark:bg-secondary-gray dark:hover:bg-primary-gold" />
                            </div>
                            <button
                                onClick={() => setismenuopen(!ismenuopen)}
                                data-collapse-toggle="mobile-menu-2" type="button" className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-gold dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
                                <span className="sr-only">Open main menu</span>
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                                <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            </button>
                        </div>
                        <div

                            className={`${ismenuopen ? "block" : "hidden"} justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2`}>
                            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                                <li>
                                    <Link to="/"
                                        onClick={() => setismenuopen(false)}
                                        className="block py-2 pr-4 pl-3
                                                text-black lg:text-gray-700 border-b border-gray-100 lg:border-0 hover:text-white lg:hover:text-primary-gold hover:bg-primary-gold lg:hover:bg-transparent lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700" aria-current="page">Home</Link>
                                </li>
                                <li>
                                    <Link
                                        onClick={() => setismenuopen(false)}
                                        to="about"
                                        className="block py-2 pr-4 pl-3
                                                text-black lg:text-gray-700 border-b border-gray-100 lg:border-0 hover:text-white lg:hover:text-primary-gold hover:bg-primary-gold lg:hover:bg-transparent lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                                    >
                                        About me
                                    </Link>
                                </li>
                                <li>
                                    <Link onClick={() => setismenuopen(false)} to="skill" className="block py-2 pr-4 pl-3
                                                text-black lg:text-gray-700 border-b border-gray-100 lg:border-0 hover:text-white lg:hover:text-primary-gold hover:bg-primary-gold lg:hover:bg-transparent lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Skills</Link>
                                </li>
                                <li>
                                    <Link onClick={() => setismenuopen(false)} to="project" className="block py-2 pr-4 pl-3
                                                text-black lg:text-gray-700 border-b border-gray-100 lg:border-0 hover:text-white lg:hover:text-primary-gold hover:bg-primary-gold lg:hover:bg-transparent lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700  ">Projects</Link>
                                </li>
                                <li>
                                    <Link onClick={() => setismenuopen(false)} to="experience" className="block py-2 pr-4 pl-3
                                                text-black lg:text-gray-700 border-b border-gray-100 lg:border-0 hover:text-white lg:hover:text-primary-gold hover:bg-primary-gold lg:hover:bg-transparent lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700 ">Experience</Link>
                                </li>

                            </ul>
                        </div>
                    </motion.div>
                </nav>
            </header>
        </>
    )
}

export default NavbarComponent