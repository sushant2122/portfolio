import { motion } from "framer-motion";
import { FaCode, FaDiscord, FaEnvelope, FaFacebook, FaGithub, FaPhone, FaTwitter } from "react-icons/fa"
import { IoIosPaper } from "react-icons/io";
import { RiFilePaperFill } from "react-icons/ri";

function FooterComponent() {
    return (
        <>


            <footer className="dark:bg-gray-800 pt-10 ">
                <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                    className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
                    <div className="md:flex md:justify-between">
                        <div className="  mb-6 md:mb-0 w-80">
                            <a href="#" className="flex gap-2 items-center dark:text-white">
                                <FaCode size={25} />
                                <span className=" self-center text-xl text-primary-black font-semibold whitespace-nowrap dark:text-primary-gold">Sushant Paudyal</span>
                            </a>
                            <p className="pt-8 text-l text-primary-black font-semibold dark:text-white "> “Turning ideas into reality through clean code and creative design.”</p>

                        </div>
                        <div className="grid grid-cols-1 gap-8 sm:gap-8 sm:grid-cols-2 dark:text-gray-400">
                            <div>
                                <h2 className="mb-6 text-sm font-semibold text-heading uppercase">Contact Info</h2>
                                <ul className="text-body font-medium">
                                    <li className="mb-4">
                                        <a href="https://flowbite.com/" className=" flex gap-2 items-center dark:hover:text-white hover:text-primary-gold"> <FaEnvelope size={15} /> sushantpaudyal@gmail.com </a>
                                    </li>
                                    <li>
                                        <a href="https://tailwindcss.com/" className=" flex gap-2 items-center dark:hover:text-white hover:text-primary-gold"><FaPhone size={15} />+977 9861200112</a>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h2 className="mb-6 text-sm font-semibold text-heading uppercase">Legal</h2>
                                <ul className="text-body font-medium">
                                    <li className="mb-4">
                                        <a href="#" className=" flex gap-2 items-center dark:hover:text-white hover:text-primary-gold">
                                            < RiFilePaperFill size={15} />
                                            Privacy Policy</a>
                                    </li>
                                    <li>
                                        <a href="#" className=" flex gap-2 items-center dark:hover:text-white hover:text-primary-gold">
                                            <IoIosPaper size={15} />
                                            Terms &amp; Conditions</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <hr className="my-6 border-default sm:mx-auto lg:my-8" />
                    <div className="sm:flex sm:items-center sm:justify-between dark:text-white">
                        <span className="text-sm text-body sm:text-center">© 2026 <a href="https://flowbite.com/" className="hover:underline">Sushant paudyal</a>. All Rights Reserved.
                        </span>
                        <div className="flex mt-4 sm:justify-center sm:mt-0 ">
                            <a href="#" className="text-body hover:text-heading hover:text-primary-gold">
                                <FaFacebook size={20} />
                                <span className="sr-only">Facebook page</span>
                            </a>
                            <a href="#" className="text-body hover:text-heading ms-5 hover:text-primary-gold">
                                <FaDiscord size={20} />
                                <span className="sr-only">Discord community</span>
                            </a>
                            <a href="#" className="text-body hover:text-heading ms-5 hover:text-primary-gold">

                                <FaTwitter size={20} />
                                <span className="sr-only">Twitter page</span>
                            </a>
                            <a href="#" className="text-body hover:text-heading ms-5 hover:text-primary-gold">
                                <FaGithub size={20} />
                                <span className="sr-only">GitHub account</span>
                            </a>
                        </div>
                    </div>
                </motion.div>
            </footer>

        </>
    )
}

export default FooterComponent